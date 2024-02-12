try {
  const fileNameUrl = getFileNameUrl();
  fileDownloadFromUrl(
    fileNameUrl["file_name"] + ".pdf",
    fileNameUrl["pdf_url"]
  );
} catch (e) {
  console.error(e);
  alert(e);
}
