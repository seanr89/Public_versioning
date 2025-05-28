import { fetchGitHubReleases } from './fetcher';
import { GitRelease, GitReleaseResponse } from './models/GitRelease';
import { ReleaseWriter } from './ReleaseWriter';

const minVersion = '0.2.0';
const maxVersion = '0.6.0';

const repoName = 'public_versioning';
const ownerName = 'seanr89';


fetchGitHubReleases(ownerName, repoName, undefined, 2).then(
    (releases: GitRelease[]) => {
        const validVersions: GitReleaseResponse[] = [];
        releases.forEach((release) => {
            // Check if the release tag is within the specified version range
            // Remove the 'v' prefix from the tag name for comparison
            if (release.tag_name.replace(/^v/, '') >= minVersion && release.tag_name.replace(/^v/, '') <= maxVersion) {
                validVersions.push({
                    tag_name: release.tag_name,
                    published_at: release.published_at,
                    body: release.body
                });
            }
        });

        console.log(`Found ${validVersions.length} valid versions between ${minVersion} and ${maxVersion}.`);
        ReleaseWriter.writeToFile(validVersions, `./${repoName}_${minVersion}_${maxVersion}.json`);
    }
).catch(console.error);
