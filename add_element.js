/** @type {{file_name: string; pdf_url: string;}} */
const fileNameUrl = getFileNameUrl();

// 要素ラッパー
const Wrapper = document.createElement("div");
Wrapper.style.position = "fixed";
Wrapper.style.right = "0";
Wrapper.style.top = "130px";
Wrapper.style.zIndex = 1000;
Wrapper.style.backgroundColor = "rgba(255, 255, 255)";
Wrapper.style.border = "1px solid gray";
Wrapper.style.borderRadius = "5px";
Wrapper.style.padding = "7px";
Wrapper.style.width = "500px";
Wrapper.style.maxWidth = "50%";
document.body.appendChild(Wrapper);

// ファイル名
const FileName = document.createElement("input");
FileName.type = "text";
FileName.value = fileNameUrl["file_name"];
Wrapper.appendChild(FileName);

// ダウンロードボタン
const Btn = document.createElement("button");
Btn.textContent = downloadText(FileName.value);
Btn.style.textAlign = "left";
Btn.addEventListener(
  "click",
  (e) => {
    e.preventDefault();
    fileDownloadFromUrl(FileName.value + ".pdf", fileNameUrl["pdf_url"]);
  },
  false
);
Wrapper.appendChild(Btn);

// ファイル名変更
FileName.addEventListener(
  "input",
  (e) => {
    Btn.textContent = downloadText(e.target.value);
  },
  false
);

/**
 * ボタンテキスト
 *
 * @param {string} [fileName=""]
 * @return {string}
 */
function downloadText(fileName = "") {
  if (!fileName) return `PDFをダウンロード`;
  return `PDFを「${fileName}」でダウンロード`;
}
