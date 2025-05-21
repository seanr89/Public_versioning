# Public_versioning
app to test public local versioning and git commands

## get_github_releases.sh

This script fetches all release versions for a specified GitHub repository using the GitHub API. It requires `curl` and `jq` to be installed. You can use it for both public and private repositories (for private repos or to avoid rate limiting, set a GitHub Personal Access Token in the script).

**Usage:**

```sh
./get_github_releases.sh <owner> <repo>
```

Example:

```sh
./get_github_releases.sh "octocat" "Spoon-Knife"
```

The script will print all release tags for the repository, or an error message if the repository is not found or there are no releases.
