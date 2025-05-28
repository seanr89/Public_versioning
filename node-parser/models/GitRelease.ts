export interface GitRelease {
  url: string;
  html_url: string;
  tag_name: string;
  published_at: string;
  [key: string]: any;
}
