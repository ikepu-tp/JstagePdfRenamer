import Popup from "./components/Popup";
import render from "./main";

console.log("Popup page loaded");

render(document.getElementById("root") as HTMLDivElement, <Popup />);
