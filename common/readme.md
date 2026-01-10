## Build instructions

Requirements:
- Node.js v18 or later
- npm

Steps:
1. npm install
2. npx webpack
3. Copy dist/content.js to src/content.js

The extension uses src/content.js as the final built file.

Note:
For the distributed add-on package, build artifacts in the dist directory
and npm-related files are removed after copying dist/content.js to src/content.js.
The original source file src/content.jsx is not included in the distributed package.
Other static files (such as CSS, images, icons, and manifest files)
are included as-is without any build processing.
