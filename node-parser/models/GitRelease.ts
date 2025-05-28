export interface GitRelease {
  tag_name: string;
  published_at: string;
  body: string;
  [key: string]: any;
}

export interface GitReleaseResponse {
  tag_name: string;
  published_at: string;
  body: string;
}
  