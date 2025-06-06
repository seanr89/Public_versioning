# bun-reader

To install dependencies:

```bash
bun install
```

To run (with parameters):

```bash
bun run index.ts <ownerName> <repoName> <token>
```

- `<ownerName>`: GitHub username or organization (required)
- `<repoName>`: Repository name (required)
- `<token>`: (Optional) GitHub Personal Access Token for private repos or higher rate limits

Example:

```bash
bun run index.ts seanr89 public_versioning ghp_YourTokenHere
```

This project was created using `bun init` in bun v1.1.8. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
