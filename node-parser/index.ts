import { fetchGitHubReleases } from './fetcher';
import { GitRelease, GitReleaseResponse } from './models/GitRelease';
import { ReleaseWriter } from './ReleaseWriter';
import { isVersionInRange } from './versionchecker';

const minVersion = '0.2.0';
const maxVersion = '0.6.0';

const repoName = 'public_versioning';
const ownerName = 'seanr89';


fetchGitHubReleases(ownerName, repoName, undefined, 2).then(
    (releases: GitRelease[]) => {
        const validVersions: GitReleaseResponse[] = [];
        releases.forEach((release) => {

            if(isVersionInRange(release.tag_name.replace('v', ''),
                    minVersion, maxVersion) && 
                release.tag_name.endsWith('.0')) {

                validVersions.push({
                    tag_name: release.tag_name,
                    body: release.body,
                    published_at: release.published_at
                });
            }

        });

        console.log(`Found ${validVersions.length} valid versions between ${minVersion} and ${maxVersion} with patch 0.`);
        ReleaseWriter.writeToFile(validVersions, `./${repoName}_${minVersion}_${maxVersion}.json`);
    }
).catch(console.error);
