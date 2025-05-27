const https = require('https');

/**
 * Fetches all releases for a given GitHub repository using the GitHub API.
 * @param {string} owner - The owner of the repository.
 * @param {string} repo - The name of the repository.
 * @param {string} [token] - Optional GitHub Personal Access Token for authentication.
 * @returns {Promise<Array>} - Resolves to an array of release objects.
 */
function fetchGitHubReleases(owner, repo, token) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.github.com',
      path: `/repos/${owner}/${repo}/releases?per_page=100`,
      method: 'GET',
      headers: {
        'User-Agent': 'node.js',
        'Accept': 'application/vnd.github.v3+json',
      },
    };
    if (token) {
      options.headers['Authorization'] = `Bearer ${token}`;
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
          } catch (err) {
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
}

module.exports = { fetchGitHubReleases };

