import { GitRelease } from './models/GitRelease';
import * as fs from 'fs';
import * as path from 'path';

export class ReleaseWriter {
    static writeToFile(releases: GitRelease[], filePath: string): void {
        const json = JSON.stringify(releases, null, 2);
        fs.writeFileSync(path.resolve(filePath), json, 'utf-8');
    }
}
