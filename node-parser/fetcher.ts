import https from 'https';

/**
 * Fetches all releases for a given GitHub repository using the GitHub API.
 * @param owner - The owner of the repository.
 * @param repo - The name of the repository.
 * @param token - Optional GitHub Personal Access Token for authentication.
 * @param pageCount - The number of pages to fetch.
 * @returns Resolves to an array of release objects.
 */
export async function fetchGitHubReleases(
  owner: string,
  repo: string,
  token?: string,
  pageCount: number = 1
): Promise<any[]> {
  const allReleases: any[] = [];
  // we want to fetch all releases, so we loop through the pages
  for (let page = 1; page <= pageCount; page++) {
    const releases = await new Promise<any[]>((resolve, reject) => {
      const options: https.RequestOptions = {
        hostname: 'api.github.com',
        path: `/repos/${owner}/${repo}/releases?per_page=100&page=${page}`,
        method: 'GET',
        headers: {
          'User-Agent': 'node.js',
          'Accept': 'application/vnd.github.v3+json',
        },
      };
      if (token) {
        (options.headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
      }
      const req = https.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          if (res.statusCode === 200) {
            try {
              const releases = JSON.parse(data);
              resolve(releases);
            } catch (err: any) {
              reject(new Error('Failed to parse response: ' + err.message));
            }
          } else {
            reject(new Error(`GitHub API returned status ${res.statusCode}: ${data}`));
          }
        });
      });
      req.on('error', (err) => {
        reject(err);
      });
      req.end();
    });
    allReleases.push(...releases);
    // If less than 100 results, no more pages
    if (releases.length < 100) break;
  }
  return allReleases;
}
