
/**
 * Converts a version string to a numeric representation.
 * @param version The version string to convert, e.g., "1.2.3".
 *                It can have up to 3 parts, e.g., "1.2.3", "1.2", or "1".
 *                The first part is the major version, the second part is the minor version,
 *                and the third part is the patch version.
 * @returns The numeric representation of the version.
 */
export function versionToNumber(version: string): number {
    const parts = version.split(".").map(Number);
    let number = 0;
    for (let i = 0; i < parts.length; i++) {
        number += parts[i] * Math.pow(100, 2 - i); // Assuming at most 3 parts

    }
    return number;
}

/**
 * Checks if a version is within a specified range.
 * @param version The version to check.
 * @param lowerBound The lower bound of the version range.
 * @param upperBound The upper bound of the version range.
 * @returns True if the version is within the range, false otherwise.
 */
export function isVersionInRange(version: string, lowerBound: string, 
    upperBound: string): boolean {
    const versionNumber = versionToNumber(version);
    const lowerBoundNumber = versionToNumber(lowerBound);
    const upperBoundNumber = versionToNumber(upperBound);
    return versionNumber >= lowerBoundNumber && versionNumber <= upperBoundNumber;
}