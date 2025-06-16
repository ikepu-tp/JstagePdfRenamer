import { useEffect, useState } from "react";
import {
  DEFAULT_BUTTON_DESIGN,
  DEFAULT_FILE_NAME_TEMPLATE,
} from "../utils/constants";
import { getSyncStorage } from "../utils/storage";
import SettingForm, { SettingFormProps } from "./SettingForm";

export function Option(): React.ReactNode {
  const [setting, setSetting] = useState<SettingFormProps | undefined>(
    undefined
  );

  useEffect(() => {
    getSetting();
  }, []);

  async function getSetting(): Promise<void> {
    const storage = await getSyncStorage(["fileNameTemplate", "buttonDesign"]);
    const newSetting: SettingFormProps = {
      fileNameTemplate: storage.fileNameTemplate || DEFAULT_FILE_NAME_TEMPLATE,
      buttonDesign: storage.buttonDesign || DEFAULT_BUTTON_DESIGN,
    };

    setSetting({ ...{}, ...newSetting });
  }

  if (!setting) return;

  return <SettingForm {...setting} />;
}
