# Public_versioning
app to test public local versioning and git commands

## node-parser package

This directory contains TypeScript code to fetch GitHub release data and write it to a JSON file.

### Operations
- `npm run build`: Compiles TypeScript files to JavaScript in the `dist/` directory.
- `npm run dev`: Compiles and runs the main script (`index.ts`).
- `npm start`: Runs the compiled main script from `dist/index.js`.

### index.ts flow
1. Fetches all releases for the specified GitHub repository using `fetchGitHubReleases`.
2. Logs each release's version, publish date, and body.
3. Filters releases between `minVersion` and `maxVersion`.
4. Writes the filtered releases to `releases.json` using `ReleaseWriter`.

The main logic is in `index.ts`, and the output is a JSON file containing the filtered release data.
