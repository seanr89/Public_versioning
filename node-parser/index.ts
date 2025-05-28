import { fetchGitHubReleases } from './fetcher';
import { GitRelease } from './models/GitRelease';

fetchGitHubReleases('seanr89', 'public_versioning', undefined, 2).then(
    (releases: GitRelease[]) => {
        releases.forEach((release) => {
            console.log(`Version: ${release.tag_name}`);
            console.log(`Published at: ${new Date(release.published_at).toLocaleString()}`);
            console.log(`URL: ${release.html_url}`);
            console.log('---');
        });
    }
).catch(console.error);
