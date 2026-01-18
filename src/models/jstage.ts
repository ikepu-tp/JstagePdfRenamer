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
  ) as NodeListOf<HTMLMetaElement>;

  return Array.from(authors_element).map((el) => el.content || "Unknown");
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

/**
 * 雑誌名取得
 *
 * @export
 * @return {*}  {string}
 */
export function getJournalTitleFromJstage(): string {
  const journal_title_element = document.getElementsByName(
    "journal_title",
  ) as NodeListOf<HTMLMetaElement>;

  if (!journal_title_element[0]) return "Unknown Journal";
  return journal_title_element[0].content;
}

/**
 * 巻取得
 *
 * @export
 * @return {string}
 */
export function getVolumeFromJstage(): string {
  const volume_element = document.getElementsByName(
    "citation_volume",
  ) as NodeListOf<HTMLMetaElement>;

  if (!volume_element[0]) return "Unknown Volume";
  return volume_element[0].content;
}

/**
 * 号取得
 *
 * @return {*}  {(string | undefined)}
 */
export function getIssueFromJstage(): string {
  const issue_element = document.getElementsByName(
    "citation_issue",
  ) as NodeListOf<HTMLMetaElement>;

  if (!issue_element[0]) return "Unknown Issue";

  return issue_element[0].content;
}

// ファーストページ取得
export function getFirstPageFromJstage(): string {
  const first_page_element = document.getElementsByName(
    "citation_firstpage",
  ) as NodeListOf<HTMLMetaElement>;

  if (!first_page_element[0]) return "Unknown First Page";

  return first_page_element[0].content;
}

/**
 * ラストページ取得
 *
 * @export
 * @return {*}  {string}
 */
export function getLastPageFromJstage(): string {
  const last_page_element = document.getElementsByName(
    "citation_lastpage",
  ) as NodeListOf<HTMLMetaElement>;

  if (!last_page_element[0]) return "Unknown Last Page";

  return last_page_element[0].content;
}
