import { GitRelease } from './models/GitRelease';
import * as fs from 'fs';
import * as path from 'path';

/**
 * ReleaseWriter is a utility class for writing Git release data to a file.
 * It provides a method to serialize an array of GitRelease objects to JSON
 */
export class ReleaseWriter {

    /**
     * Writes the release data to a JSON file.
     * @param releases - An array of GitRelease objects to write to the file.
     * @param filePath - The path to the file where the data should be written.
     */
    static writeToFile(releases: GitRelease[], filePath: string): void {
        const json = JSON.stringify(releases, null, 2);
        fs.writeFileSync(path.resolve(filePath), json, 'utf-8');
    }
}
