import { DEFAULT_FILE_NAME_TEMPLATE } from "./constants";
import { FileNameUrl } from "./files";
import { getSyncStorage } from "./storage";

export function isJstage(): boolean {
  return window.location.href.match(
    /https:\/\/www.jstage.jst.go.jp\/article\/[^\S]*/
  )
    ? true
    : false;
}

export async function getFileFromJstage(): Promise<FileNameUrl> {
  const pdf_url_element = document.getElementsByName(
    "pdf_url"
  ) as unknown as HTMLMetaElement[];

  if (!pdf_url_element[0]) throw new Error("PDF URL not found");

  const authors_element = document.getElementsByName(
    "authors"
  ) as unknown as HTMLMetaElement[];

  // authors
  const authors: string[] = [];
  for (let i = 0; i < authors_element.length; ++i) {
    const author_name = authors_element[i]
      ? authors_element[i].content
      : "Unknown";
    authors.push(author_name);
  }

  const paper_title_element = document.getElementsByName(
    "title"
  ) as unknown as HTMLMetaElement[];
  const paper_publication_date_element = document.getElementsByName(
    "publication_date"
  ) as unknown as HTMLMetaElement[];

  // paper title
  const paper_title = paper_title_element[0]
    ? paper_title_element[0].content
    : "Unknown Title";

  // published date
  const paper_publication_date = paper_publication_date_element[0]
    ? new Date(paper_publication_date_element[0].content)
    : "Unknown publication date";
  const pdf_url = pdf_url_element[0].content;

  const file_name = await getFileNameFromTemplate({
    authors,
    title: paper_title,
    publication_date: paper_publication_date,
  });

  return {
    file_name,
    pdf_url,
  };
}

export type getFileNameFromTemplateProps = {
  authors?: string[];
  title?: string;
  publication_date?: Date | string;
  fileNameTemplate?: string;
};
export async function getFileNameFromTemplate(
  props: getFileNameFromTemplateProps
): Promise<string> {
  let fileNameTemplate: string =
    props.fileNameTemplate ||
    (await getSyncStorage("fileNameTemplate")).fileNameTemplate ||
    DEFAULT_FILE_NAME_TEMPLATE;

  // 著者が3人以上の場合、3人目以降は「ら」を付ける
  let authors: string[] =
    props.authors?.map((author) => author.replace("　", " ").split(" ")[0]) ||
    [];
  if (authors.length > 3) {
    authors = authors.slice(0, 3);
    authors[2] = `${authors[2]}ら`;
  }

  fileNameTemplate = fileNameTemplate.replace("%authors%", authors.join("・"));
  fileNameTemplate = fileNameTemplate.replace(
    "%title%",
    props.title || "Unknown Title"
  );
  fileNameTemplate = fileNameTemplate.replace(
    "%publication_date%",
    (props.publication_date || "")?.toLocaleString("ja-JP")
  );

  // props.publication_date is a Date object or string, so we need to format it
  if (props.publication_date instanceof Date) {
    fileNameTemplate = fileNameTemplate.replace(
      "%year%",
      props.publication_date.getFullYear().toString()
    );
  }

  return fileNameTemplate;
}
