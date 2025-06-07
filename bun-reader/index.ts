import { fetchGitHubReleases } from "./fetcher";
import type { GitRelease, GitReleaseResponse } from "./models/GitRelease";
import { ReleaseWriter } from "./ReleaseWriter";
import { isVersionInRange, getLatestVersion } from "./versionchecker";

// Accept runtime parameters for owner, repo, and token
// const [, , ownerName = 'defaultOwner', repoName = 'defaultRepo', token = ''] = process.argv;

// console.log('Owner:', ownerName);
// console.log('Repo:', repoName);
// console.log('Token:', token ? '[provided]' : '[not provided]');

console.log("Hello via Bun!");

const minVersion = '0.2.0';
const maxVersion = '0.9.0';

const repoName = 'public_versioning';
const ownerName = 'seanr89';

/**
 * Fetches GitHub releases for a given repository and filters them based on version range.
 * The filtered releases are then written to a JSON file.
 * @param {string} ownerName - The GitHub username or organization name.
 * @param {string} repoName - The name of the GitHub repository.
 */
fetchGitHubReleases(ownerName, repoName, undefined, 5).then(
    (releases: GitRelease[]) => {

        const version = getLatestVersion(releases.map(release => release.tag_name.replace('v', '')));
        
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

        console.log(`Found ${validVersions.length} valid versions between ${minVersion} and ${maxVersion}`);
        ReleaseWriter.writeToFile(validVersions, `./${repoName}_${minVersion}_${maxVersion}.json`);
        console.log(`Latest version found: ${version}`);
    }
).catch(console.error);
