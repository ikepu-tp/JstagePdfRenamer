/**
 * PDFリンク取得
 *
 * @export
 * @return {*}  {string}
 */
export function getPdfUrlFromJstage(): string {
  const pdf_url_element = document.getElementsByName(
    "pdf_url",
  ) as unknown as HTMLMetaElement[];

  if (!pdf_url_element[0]) throw new Error("PDF URL not found");

  return pdf_url_element[0].content;
}

/**
 * 著者取得
 *
 * @export
 * @return {*}  {string[]}
 */
export function getAuthorsFromJstage(): string[] {
  const authors_element = document.getElementsByName(
    "authors",
  ) as unknown as HTMLMetaElement[];

  // authors
  const authors: string[] = [];
  for (let i = 0; i < authors_element.length; ++i) {
    const author_name = authors_element[i]
      ? authors_element[i].content
      : "Unknown";
    authors.push(author_name);
  }
  return authors;
}

/**
 * タイトル取得
 *
 * @export
 * @return {*}  {string}
 */
export function getTitleFromJstage(): string {
  const paper_title_element = document.getElementsByName(
    "title",
  ) as unknown as HTMLMetaElement[];

  if (!paper_title_element[0]) return "Unknown Title";
  return paper_title_element[0].content;
}

/**
 * 発行日取得
 *
 * @export
 * @return {*}  {(Date | undefined)}
 */
export function getPublicationDateFromJstage(): Date | undefined {
  // published date
  const paper_publication_date_element = document.getElementsByName(
    "publication_date",
  ) as unknown as HTMLMetaElement[];

  if (!paper_publication_date_element[0]) return undefined;
  return new Date(paper_publication_date_element[0].content);
}
