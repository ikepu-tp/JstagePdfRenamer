import { Option } from "./components/Option";
import render from "./main";

console.log("Option page loaded");

render(document.getElementById("root") as HTMLDivElement, <Option />);
