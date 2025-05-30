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