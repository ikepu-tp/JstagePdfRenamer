import { FileNameUrl } from "./files";

export function isTest(): boolean {
  return true;
}

export function getFileFromTest(): FileNameUrl {
  return {
    file_name: "test",
    pdf_url:
      "https://ikepu-tp.com/wp-content/uploads/2024/09/JstagePDFRenamer_cm.pdf",
  };
}
