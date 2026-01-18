export function isJstage(): boolean {
  return window.location.href.match(
    /https:\/\/www.jstage.jst.go.jp\/article\/[^\S]*/
  )
    ? true
    : false;
}

export function isTest(): boolean {
  return false;
}
