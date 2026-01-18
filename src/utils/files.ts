export type FileNameUrl = { file_name: string; pdf_url: string };

/**
 * ファイルダウンロード処理
 *
 * reference: https://zenn.dev/someone7140/articles/91cc1af6470ee9
 *
 * @param {*} fileName
 * @param {*} fileUrl
 */
export async function fileDownloadFromUrl(fileName: string, fileUrl: string) {
  const response = await fetch(fileUrl);
  const blob = await response.blob();
  const newBlob = new Blob([blob]);
  const objUrl = window.URL.createObjectURL(newBlob);
  const link = document.createElement("a");
  link.href = objUrl;
  link.download = fileName;
  link.click();
  /**
   * For Firefox it is necessary to delay revoking the ObjectURL.
   */
  setTimeout(() => {
    window.URL.revokeObjectURL(objUrl);
  }, 250);
}
