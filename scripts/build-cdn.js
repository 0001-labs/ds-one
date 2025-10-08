#!/usr/bin/env node

import { build } from 'esbuild';
import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

console.log('Building CDN bundle...');

// Build the main CDN bundle
await build({
  entryPoints: ['dist/index.esm.js'],
  bundle: true,
  format: 'esm',
  outfile: 'dist/ds-one.bundle.js',
  minify: false,
  sourcemap: true,
  platform: 'browser',
  target: ['es2020'],
  external: [],
  loader: {
    '.ts': 'ts',
    '.js': 'js'
  }
}).catch(() => process.exit(1));

console.log('✓ CDN bundle created: dist/ds-one.bundle.js');
console.log('✓ Size:', (readFileSync('dist/ds-one.bundle.js').length / 1024).toFixed(2), 'KB');

// Create minified version
await build({
  entryPoints: ['dist/index.esm.js'],
  bundle: true,
  format: 'esm',
  outfile: 'dist/ds-one.bundle.min.js',
  minify: true,
  sourcemap: true,
  platform: 'browser',
  target: ['es2020'],
  external: [],
  loader: {
    '.ts': 'ts',
    '.js': 'js'
  }
}).catch(() => process.exit(1));

console.log('✓ Minified bundle created: dist/ds-one.bundle.min.js');
console.log('✓ Size:', (readFileSync('dist/ds-one.bundle.min.js').length / 1024).toFixed(2), 'KB');
console.log('\n🎉 CDN bundles ready for publishing!');

