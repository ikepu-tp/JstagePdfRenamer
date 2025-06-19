import { colorType, designType, StorageResource } from "./storage";

export const DEFAULT_FILE_NAME_TEMPLATE: string = "%authors% (%year%) %title%";
export const DEFAULT_BUTTON_DESIGN: designType = "contained";
export const DEFAULT_BUTTON_COLOR: colorType = "primary";
export const DEFAULT_STORAGE: StorageResource = {
  fileNameTemplate: DEFAULT_FILE_NAME_TEMPLATE,
  buttonDesign: DEFAULT_BUTTON_DESIGN,
  buttonColor: DEFAULT_BUTTON_COLOR,
  minimize: false,
  visible: true,
};
