import { FileNameUrl } from "./files";

export function isJstage(): boolean {
  return window.location.href.match(
    /https:\/\/www.jstage.jst.go.jp\/article\/[^\S]*/
  )
    ? true
    : false;
}

export function getFileFromJstage(): FileNameUrl {
  const pdf_url_element = document.getElementsByName(
    "pdf_url"
  ) as unknown as HTMLMetaElement[];

  if (!pdf_url_element[0]) throw new Error("PDF URL not found");

  const authors_element = document.getElementsByName(
    "authors"
  ) as unknown as HTMLMetaElement[];
  const authors = [];
  for (let i = 0; i < authors_element.length; ++i) {
    const author_name = authors_element[i]
      ? authors_element[i].content
      : "Unknown";
    const splited_author_name = author_name.split(" ");
    if (i > 2) break;
    authors.push(splited_author_name[0] + (i === 2 ? "ら" : ""));
  }

  const paper_title_element = document.getElementsByName(
    "title"
  ) as unknown as HTMLMetaElement[];
  const paper_publication_date_element = document.getElementsByName(
    "publication_date"
  ) as unknown as HTMLMetaElement[];

  const paper_title = paper_title_element[0]
    ? paper_title_element[0].content
    : "Unknown Title";
  const paper_publication_date = paper_publication_date_element[0]
    ? new Date(paper_publication_date_element[0].content).getFullYear()
    : "Unknown publication date";
  const pdf_url = pdf_url_element[0].content;

  const file_name =
    authors.join("・") + "（" + paper_publication_date + "）" + paper_title;

  return {
    file_name,
    pdf_url,
  };
}
