
/*
  * This file defines the GitRelease interface and GitReleaseResponse interface
  * for use in a Node.js application that interacts with the GitHub API.
  * The interfaces are used to structure the data related to Git releases.
  *
  * @module models/GitRelease
  */
export interface GitRelease {
  tag_name: string;
  published_at: string;
  body: string;
  [key: string]: any;
}

/**
 * Represents a response from the GitHub API for a release.
 * This interface is used to define the structure of the data returned
 * when fetching releases from a GitHub repository.
 * @param tag_name - The name of the release tag.
 * @param published_at - The date and time when the release was published.
 * @param body - The description or notes of the release.
 */
export interface GitReleaseResponse {
  tag_name: string;
  published_at: string;
  body: string;
}
  