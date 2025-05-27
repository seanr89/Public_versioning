
const { fetchGitHubReleases } = require('./fetcher');
fetchGitHubReleases('seanr89', 'public_versioning', null).then(console.log).catch(console.error);