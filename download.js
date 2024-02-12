try {
  const fileNameUrl = getFileNameUrl();
  fileDownloadFromUrl(fileNameUrl["file_name"], fileNameUrl["pdf_url"]);
} catch (e) {
  console.error(e);
  alert(e);
}
