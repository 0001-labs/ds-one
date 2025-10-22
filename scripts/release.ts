#!/usr/bin/env bun
// Simple Bun release helper: bumps version in root package.json and optionally commits/tags
import { $ } from 'bun';
import * as fs from 'node:fs';
import * as path from 'node:path';

type BumpType = 'patch' | 'minor' | 'major' | 'prerelease';

function readJson(file: string) {
  return JSON.parse(fs.readFileSync(file, 'utf8')) as Record<string, any>;
}

function writeJson(file: string, data: unknown) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n');
}

function bumpSemver(version: string, type: BumpType, preid = 'alpha'): string {
  // Basic semver bump supporting pre-release. For complex cases prefer semver lib.
  const pre = /-(.*)$/.exec(version)?.[1] ?? null;
  const [major, minor, patch] = version.replace(/-.*/, '').split('.').map((n) => parseInt(n, 10));
  if (Number.isNaN(major) || Number.isNaN(minor) || Number.isNaN(patch)) {
    throw new Error(`Invalid version: ${version}`);
  }

  let nextMajor = major, nextMinor = minor, nextPatch = patch;
  let nextPre: string | null = null;

  if (type === 'major') {
    nextMajor += 1; nextMinor = 0; nextPatch = 0;
  } else if (type === 'minor') {
    nextMinor += 1; nextPatch = 0;
  } else if (type === 'patch') {
    nextPatch += 1;
  } else if (type === 'prerelease') {
    // If already pre, increment numeric suffix or append .0
    if (pre && pre.startsWith(preid)) {
      const m = new RegExp(`^${preid}(?:\\.(\\d+))?$`).exec(pre);
      const n = m?.[1] ? parseInt(m[1], 10) + 1 : 0;
      return `${major}.${minor}.${patch}-${preid}.${n}`;
    }
    return `${major}.${minor}.${patch}-${preid}.0`;
  }

  return `${nextMajor}.${nextMinor}.${nextPatch}`;
}

async function main() {
  const args = process.argv.slice(2);
  const type = (args[0] as BumpType) || 'patch';
  const preidArg = args.find((a) => a.startsWith('--preid='));
  const preid = preidArg ? preidArg.split('=')[1] : 'alpha';
  const noGit = args.includes('--no-git');
  const push = args.includes('--push');

  if (!['patch', 'minor', 'major', 'prerelease'].includes(type)) {
    console.error('Usage: bun run scripts/release.ts <patch|minor|major|prerelease> [--preid=alpha] [--no-git] [--push]');
    process.exit(1);
  }

  const pkgPath = path.resolve(process.cwd(), 'package.json');
  const pkg = readJson(pkgPath);
  const current = pkg.version as string;
  const next = bumpSemver(current, type, preid);

  pkg.version = next;
  writeJson(pkgPath, pkg);
  console.log(`Version bumped: ${current} -> ${next}`);

  if (!noGit) {
    await $`git add package.json`;
    await $`git commit -m ${`release: v${next}`}`.nothrow();
    await $`git tag -a v${next} -m ${`release: v${next}`}`.nothrow();
    if (push) {
      await $`git push`;
      await $`git push --tags`;
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});


