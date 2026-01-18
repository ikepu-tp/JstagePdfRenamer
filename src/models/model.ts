export function isJstage(): boolean {
  return window.location.href.startsWith(
    "https://www.jstage.jst.go.jp/article/",
  );
}

export function isTest(): boolean {
  return false;
}
