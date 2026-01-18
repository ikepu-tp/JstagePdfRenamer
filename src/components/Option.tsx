import { useEffect, useState } from "react";
import {
  DEFAULT_BUTTON_COLOR,
  DEFAULT_BUTTON_DESIGN,
  DEFAULT_FILE_NAME_TEMPLATE,
} from "../utils/constants";
import { getSyncStorage, StorageResource } from "../utils/storage";
import SettingForm from "./SettingForm";

export function Option(): React.ReactNode {
  const [setting, setSetting] = useState<StorageResource | undefined>(
    undefined,
  );

  useEffect(() => {
    getSetting();
  }, []);

  async function getSetting(): Promise<void> {
    const storage = await getSyncStorage([
      "fileNameTemplate",
      "buttonDesign",
      "buttonColor",
      "minimize",
      "visible",
    ]);
    const newSetting: StorageResource = {
      fileNameTemplate: storage.fileNameTemplate || DEFAULT_FILE_NAME_TEMPLATE,
      buttonDesign: storage.buttonDesign || DEFAULT_BUTTON_DESIGN,
      buttonColor: storage.buttonColor || DEFAULT_BUTTON_COLOR,
      minimize: storage.minimize === undefined ? false : storage.minimize,
      visible: storage.visible === undefined ? true : storage.visible,
    };

    setSetting({ ...{}, ...newSetting });
  }

  if (!setting) return null;

  return <SettingForm setting={setting} />;
}
