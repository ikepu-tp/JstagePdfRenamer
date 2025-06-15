import SettingForm from "./components/SettingForm";
import render from "./main";

console.log("Setting page loaded");

render(document.getElementById("root") as HTMLDivElement, <SettingForm />);
