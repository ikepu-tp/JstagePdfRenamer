try {
  if (
    !window.location.href.match(
      /https:\/\/www.jstage.jst.go.jp\/article\/[^\S]*/
    )
  )
    throw new Error("Invalid URL");
  const pdf_url_element = document.getElementsByName("pdf_url");

  if (!pdf_url_element[0]) throw new Error("PDF URL not found");

  const authors_element = document.getElementsByName("authors");
  const authors = [];
  for (let i = 0; i < authors_element.length; ++i) {
    const author_name = authors_element[i]
      ? authors_element[i].content
      : "Unknown";
    const splited_author_name = author_name.split(" ");
    if (i > 2) break;
    authors.push(splited_author_name[0] + (i === 2 ? "ら" : ""));
  }

  const paper_title_element = document.getElementsByName("title");
  const paper_publication_date_element =
    document.getElementsByName("publication_date");

  const paper_title = paper_title_element[0]
    ? paper_title_element[0].content
    : "Unknown Title";
  const paper_publication_date = paper_publication_date_element[0]
    ? new Date(paper_publication_date_element[0].content).getFullYear()
    : "Unknown publication date";
  const pdf_url = pdf_url_element[0].content;

  const file_name =
    authors.join("・") +
    "（" +
    paper_publication_date +
    "）" +
    paper_title +
    ".pdf";

  fileDownloadFromUrl(file_name, pdf_url);
} catch (e) {
  console.error(e);
  alert(e);
}

/**
 * ファイルダウンロード処理
 *
 * reference: https://zenn.dev/someone7140/articles/91cc1af6470ee9
 *
 * @param {*} fileName
 * @param {*} fileUrl
 */
async function fileDownloadFromUrl(fileName, fileUrl) {
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
