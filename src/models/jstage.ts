function getMetaContentByName(
  name: string,
  fallback: string | undefined,
): string | undefined {
  const element = document.getElementsByName(
    name,
  ) as NodeListOf<HTMLMetaElement>;
  if (!element[0]) return fallback;
  return element[0].content;
}

/**
 * PDFリンク取得
 *
 * @export
 * @return {*}  {string}
 */
export function getPdfUrlFromJstage(): string {
  const pdf_url = getMetaContentByName("pdf_url", undefined);
  if (pdf_url) return pdf_url;
  throw new Error("PDF URL not found");
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
  return getMetaContentByName("title", "Unknown Title")!;
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
  return getMetaContentByName("journal_title", "Unknown Journal")!;
}

/**
 * 巻取得
 *
 * @export
 * @return {string}
 */
export function getVolumeFromJstage(): string {
  return getMetaContentByName("citation_volume", "Unknown Volume")!;
}

/**
 * 号取得
 *
 * @return {*}  {(string | undefined)}
 */
export function getIssueFromJstage(): string {
  return getMetaContentByName("citation_issue", "Unknown Issue")!;
}

/**
 * ファーストページ取得
 *
 * @export
 * @return {*}  {string}
 */
export function getFirstPageFromJstage(): string {
  return getMetaContentByName("citation_firstpage", "Unknown First Page")!;
}

/**
 * ラストページ取得
 *
 * @export
 * @return {*}  {string}
 */
export function getLastPageFromJstage(): string {
  return getMetaContentByName("citation_lastpage", "Unknown Last Page")!;
}
