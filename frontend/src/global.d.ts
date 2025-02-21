import "jquery";

declare global {
  interface JQuery {
    timeline(options?: any): JQuery;
  }
}