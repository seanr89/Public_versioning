import { fetchGitHubReleases } from './fetcher';
import { GitRelease, GitReleaseResponse } from './models/GitRelease';
import { ReleaseWriter } from './ReleaseWriter';

const minVersion = '0.2.0';
const maxVersion = '0.6.0';

fetchGitHubReleases('seanr89', 'public_versioning', undefined, 2).then(
    (releases: GitRelease[]) => {
        const validVersions: GitReleaseResponse[] = [];
        releases.forEach((release) => {
            console.log(`Version: ${release.tag_name}`);
            console.log(`Published at: ${new Date(release.published_at).toLocaleString()}`);
            console.log(`Body: ${release.body}`);
            console.log('---');

            if (release.tag_name.replace(/^v/, '') >= minVersion && release.tag_name.replace(/^v/, '') <= maxVersion) {
                validVersions.push({
                    tag_name: release.tag_name,
                    published_at: release.published_at,
                    body: release.body
                });
            }
        });

        ReleaseWriter.writeToFile(validVersions, './releases.json');
    }
).catch(console.error);
