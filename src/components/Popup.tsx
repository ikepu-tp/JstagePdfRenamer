import { Box, Button } from "@mui/material";
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

  async function getSetting(): Promise<void> {
    const storage = await getSyncStorage(["minimize", "visible"]);
    const newSetting: VisibilitySettingResource = {
      minimize: storage.minimize === undefined ? false : storage.minimize,
      visible: storage.visible === undefined ? true : storage.visible,
    };

    setSetting({ ...{}, ...newSetting });
  }

  function openSetting() {
    chrome.runtime.openOptionsPage();
  }

  return (
    <Box sx={{ padding: 1 }}>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        {Setting && <PopupVisibility {...Setting} />}
        <Button type="button" variant="contained" onClick={openSetting}>
          設定を開く
        </Button>
      </Box>
    </Box>
  );
}

function PopupVisibility(props: VisibilitySettingResource): React.ReactNode {
  const [Setting, setSetting] = useState<VisibilitySettingResource>(props);

  useEffect(() => {
    chrome.storage.onChanged.addListener((changes) => {
      for (const [key, { newValue }] of Object.entries(changes)) {
        console.debug(key, newValue);
        Setting[key as keyof VisibilitySettingResource] = newValue;
        setSetting({ ...{}, ...Setting });
      }
    });
  }, []);
  useEffect(() => {
    if (!Setting) return;
    setSyncStorage(Setting);
  }, [Setting]);

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
