import { Box } from "@mui/material";
import React, { ChangeEvent, useEffect, useState } from "react";
import { getSyncStorage, setSyncStorage } from "../utils/storage";
import Visibility, { VisibilitySettingResource } from "./Visibility";

export default function Popup(): React.ReactNode {
  const [Setting, setSetting] = useState<
    VisibilitySettingResource | undefined
  >();

  useEffect(() => {
    getSetting();
  }, []);
  useEffect(() => {
    if (!Setting) return;
    setSyncStorage(Setting);
  }, [Setting]);

  async function getSetting(): Promise<void> {
    const storage = await getSyncStorage(["minimize", "visible"]);
    const newSetting: VisibilitySettingResource = {
      minimize: storage.minimize === undefined ? false : storage.minimize,
      visible: storage.visible === undefined ? true : storage.visible,
    };

    setSetting({ ...{}, ...newSetting });
  }

  return (
    <Box sx={{ padding: 1 }}>
      {Setting && <PopupVisibility {...Setting} />}
      <button onClick={() => chrome.runtime.openOptionsPage()}>
        設定を開く
      </button>
    </Box>
  );
}

function PopupVisibility(props: VisibilitySettingResource): React.ReactNode {
  const [Setting, setSetting] = useState<VisibilitySettingResource>(props);

  function handleChecked(
    e: ChangeEvent<HTMLInputElement>,
    checked: boolean
  ): void {
    setSetting({
      ...Setting,
      [e.currentTarget.name]: checked,
    });
  }
  return <Visibility Setting={Setting} handleChecked={handleChecked} />;
}
