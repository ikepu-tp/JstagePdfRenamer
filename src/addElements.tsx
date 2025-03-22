import DownloadArea from "./components/DownloadArea";
import render from "./main";

// 要素ラッパー
const Wrapper = document.createElement("div");
Wrapper.id = "pdf-download-extension";
document.body.appendChild(Wrapper);

render(Wrapper, <DownloadArea />);
