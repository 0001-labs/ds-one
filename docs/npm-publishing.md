# NPM Publishing Guide for DS one

This guide walks you through publishing DS one to NPM and installing it in other projects.

## Prerequisites

1. **NPM Account**: Create an account at [npmjs.com](https://www.npmjs.com)
2. **NPM CLI**: Already installed with Node.js/Bun
3. **Git Repository**: Already set up at github.com/Jo4712/ds-one

## Step 1: Login to NPM

```bash
npm login
```

Enter your NPM username, password, and email when prompted.

## Step 2: Verify Package Configuration

Check that your package.json is correct:

```bash
npm pack --dry-run
```

This shows what files will be included in the package without actually creating it.

## Step 3: Test Locally with Bun Link

Before publishing, test the package locally:

```bash
# In the DS one directory
bun link

# In your test project directory
bun link ds-one

# Install in test project
cd /path/to/test-project
bun add ds-one@alpha
```

## Step 4: Publish to NPM

### For Beta Release (Recommended First)

```bash
# Make sure you're on the main branch
git checkout main

# Publish as beta
npm publish --tag beta
```

### For Stable Release

```bash
npm publish
```

## Step 5: Installing in Another Project

Once published, install in any project:

```bash
# Using bun
bun add ds-one@alpha

# Using npm
npm install ds-one@alpha

# Install specific version
bun add ds-one@0.1.11-alpha.0
```

## Usage in Another Project

### Import All Components

```javascript
import "ds-one";
import "ds-one/styles";

// All components are now registered
document.body.innerHTML = `
  <ds-button variant="primary">Click me</ds-button>
  <text-v1 variant="heading">Hello World</text-v1>
`;
```

### Import Specific Components

```javascript
import "ds-one/components/ds-button";
import "ds-one/components/text-v1";
import "ds-one/styles";
```

### Import in HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" href="node_modules/ds-one/DS/1 Root/screen.css" />
    <script type="module">
      import "node_modules/ds-one/dist/index.esm.js";
    </script>
  </head>
  <body>
    <ds-button variant="primary" key="myButton">Get Started</ds-button>
  </body>
</html>
```

## Version Management

### Update Version

```bash
# Patch version (0.1.0-beta -> 0.1.1-beta)
npm version patch

# Minor version (0.1.0-beta -> 0.2.0-beta)
npm version minor

# Major version (0.1.0-beta -> 1.0.0)
npm version major

# Remove beta tag
npm version 0.1.0
```

### Publish Update

```bash
git push origin main --tags
npm publish
```

## Unpublish (Use with Caution)

You can only unpublish within 72 hours:

```bash
npm unpublish ds-one@alpha
```

## Package URLs

After publishing, your package will be available at:

- **NPM**: https://www.npmjs.com/package/ds-one
- **jsDelivr CDN**: https://cdn.jsdelivr.net/npm/ds-one@alpha
- **unpkg CDN**: https://unpkg.com/ds-one@alpha

## Troubleshooting

### Package Name Taken

If "ds-one" is taken, try:

- @jo4712/ds-one (scoped package)
- ds-one-components
- ds1

Update package.json name field and republish.

### Files Not Included

Check the "files" field in package.json. Run:

```bash
npm pack
tar -xvzf ds-one-0.1.0-beta.tgz
ls package/
```

### Import Errors

Make sure your import paths match the exports in package.json:

```json
{
  "exports": {
    "./styles": "./DS/1 Root/screen.css",
    "./components/*": "./DS/2 Core/*.js"
  }
}
```

## Best Practices

1. **Always test locally** with `bun link` before publishing
2. **Use semantic versioning**: MAJOR.MINOR.PATCH
3. **Tag beta releases**: `npm publish --tag beta`
4. **Update CHANGELOG.md** before each release
5. **Push to GitHub** before publishing to NPM
6. **Never publish** with uncommitted changes

## Quick Reference

```bash
# Check what will be published
npm pack --dry-run

# Login to NPM
npm login

# Publish beta
npm publish --tag beta

# Publish stable
npm publish

# Update version
npm version patch

# View published package
npm view ds-one

# Install in another project
bun add ds-one@alpha
```

## Next Steps

After publishing:

1. Test installation in a clean project
2. Update README with installation instructions
3. Create usage examples
4. Share on social media
5. Submit to component libraries/directories
