import {
  getAuthorsFromJstage,
  getPdfUrlFromJstage,
  getPublicationDateFromJstage,
  getTitleFromJstage,
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

  if (isTest()) {
    pdf_url =
      "https://ikepu-tp.com/wp-content/uploads/2024/09/JstagePDFRenamer_cm.pdf";
    authors = ["ikepu-tp"];
    title = "JstagePDFRenamer_cm";
    publication_date = new Date("2024-09-01");
  }
  if (isJstage()) {
    pdf_url = getPdfUrlFromJstage();
    authors = getAuthorsFromJstage();
    title = getTitleFromJstage();
    publication_date = getPublicationDateFromJstage();
  }

  return {
    file_name: await makeFileName({
      authors,
      title,
      publication_date,
      fileNameTemplate,
    }),
    pdf_url,
  };
}

export type MakeFileNameProps = {
  authors?: string[];
  title?: string;
  publication_date?: Date;
  fileNameTemplate?: string;
};
export async function makeFileName({
  authors,
  title,
  publication_date,
  fileNameTemplate,
}: MakeFileNameProps): Promise<string> {
  if (!fileNameTemplate)
    fileNameTemplate =
      (await getSyncStorage("fileNameTemplate")).fileNameTemplate ||
      DEFAULT_FILE_NAME_TEMPLATE;

  // 著者が3人以上の場合、3人目以降は「ら」を付ける
  authors =
    authors?.map((author) => author.replace("　", " ").split(" ")[0]) || [];
  if (authors.length > 3) {
    authors = authors.slice(0, 3);
    authors[2] = `${authors[2]}ら`;
  }

  fileNameTemplate = fileNameTemplate.replace("%authors%", authors.join("・"));
  fileNameTemplate = fileNameTemplate.replace(
    "%title%",
    title || "Unknown Title"
  );
  fileNameTemplate = fileNameTemplate.replace(
    "%publication_date%",
    (publication_date || "")?.toLocaleString("ja-JP")
  );

  // publication_date is a Date object or string, so we need to format it
  if (publication_date instanceof Date) {
    fileNameTemplate = fileNameTemplate.replace(
      "%year%",
      publication_date.getFullYear().toString()
    );
  }

  return fileNameTemplate;
}
