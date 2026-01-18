import {
  getAuthorsFromJstage,
  getFirstPageFromJstage,
  getIssueFromJstage,
  getJournalTitleFromJstage,
  getLastPageFromJstage,
  getPdfUrlFromJstage,
  getPublicationDateFromJstage,
  getTitleFromJstage,
  getVolumeFromJstage,
} from "../models/jstage";
import { isJstage, isTest } from "../models/model";
import { DEFAULT_FILE_NAME_TEMPLATE } from "./constants";
import { getSyncStorage } from "./storage";

export type FileMeta = {
  file_name: string;
  pdf_url: string;
};

/**
 * ファイル情報取得
 *
 * @export
 * @return {*}  {FileMeta}
 */
export async function getFileMeta(): Promise<FileMeta> {
  let pdf_url: string = "";
  let authors: string[] | undefined;
  let title: string | undefined;
  let publication_date: Date | undefined;
  let fileNameTemplate: string | undefined;
  let journalTitle: string | undefined;
  let volume: string | undefined;
  let issue: string | undefined;
  let firstPage: string | undefined;
  let lastPage: string | undefined;

  if (isTest()) {
    pdf_url =
      "https://ikepu-tp.com/wp-content/uploads/2024/09/JstagePDFRenamer_cm.pdf";
    authors = ["ikepu-tp"];
    title = "JstagePDFRenamer_cm";
    publication_date = new Date("2024-09-01");
    journalTitle = "JstagePDFRenamer Test Journal";
    volume = "1";
    issue = "1";
    firstPage = "1";
    lastPage = "10";
  }
  if (isJstage()) {
    pdf_url = getPdfUrlFromJstage();
    authors = getAuthorsFromJstage();
    title = getTitleFromJstage();
    publication_date = getPublicationDateFromJstage();
    journalTitle = getJournalTitleFromJstage();
    volume = getVolumeFromJstage();
    issue = getIssueFromJstage();
    firstPage = getFirstPageFromJstage();
    lastPage = getLastPageFromJstage();
  }

  return {
    file_name: await makeFileName({
      authors,
      title,
      publication_date,
      fileNameTemplate,
      journalTitle,
      volume,
      issue,
      firstPage,
      lastPage,
    }),
    pdf_url,
  };
}

export type MakeFileNameProps = {
  authors?: string[];
  title?: string;
  publication_date?: Date;
  fileNameTemplate?: string;
  journalTitle?: string;
  volume?: string;
  issue?: string;
  firstPage?: string;
  lastPage?: string;
};
export async function makeFileName({
  authors,
  title,
  publication_date,
  fileNameTemplate,
  journalTitle,
  volume,
  issue,
  firstPage,
  lastPage,
}: MakeFileNameProps): Promise<string> {
  // ファイル名テンプレート
  if (!fileNameTemplate)
    fileNameTemplate =
      (await getSyncStorage("fileNameTemplate")).fileNameTemplate ||
      DEFAULT_FILE_NAME_TEMPLATE;

  // 著者
  // 著者が3人以上の場合、3人目以降は「ら」を付ける
  authors =
    authors?.map((author) => author.replace("　", " ").split(" ")[0]) || [];
  if (authors.length > 3) {
    authors = authors.slice(0, 3);
    authors[2] = `${authors[2]}ら`;
  }

  fileNameTemplate = fileNameTemplate.replace(/%authors%/g, authors.join("・"));

  // タイトル
  fileNameTemplate = fileNameTemplate.replace(
    /%title%/g,
    title || "Unknown Title",
  );

  // 発行日

  // publication_date is a Date object or string, so we need to format it
  if (publication_date instanceof Date) {
    fileNameTemplate = fileNameTemplate.replace(
      /%year%/g,
      publication_date.getFullYear().toString(),
    );
    fileNameTemplate = fileNameTemplate.replace(
      /%publication_date%/g,
      `${publication_date.getFullYear()}年${
        publication_date.getMonth() + 1
      }月${publication_date.getDate()}日`,
    );
  } else {
    fileNameTemplate = fileNameTemplate.replace(/%year%/g, "Unknown Year");
    fileNameTemplate = fileNameTemplate.replace(
      /%publication_date%/g,
      "Unknown Publication Date",
    );
  }

  // 雑誌名
  fileNameTemplate = fileNameTemplate.replace(
    /%journal_title%/g,
    journalTitle || "Unknown Journal",
  );

  // 巻
  fileNameTemplate = fileNameTemplate.replace(
    /%volume%/g,
    volume || "Unknown Volume",
  );

  // 号
  fileNameTemplate = fileNameTemplate.replace(
    /%issue%/g,
    issue || "Unknown Issue",
  );

  // ページ
  fileNameTemplate = fileNameTemplate.replace(
    /%first_page%/g,
    firstPage || "Unknown First Page",
  );
  fileNameTemplate = fileNameTemplate.replace(
    /%last_page%/g,
    lastPage || "Unknown Last Page",
  );

  return fileNameTemplate;
}
