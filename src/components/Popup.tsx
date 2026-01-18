import { Box, Button } from "@mui/material";
import { useForm } from "@tanstack/react-form";
import React, { useEffect, useState } from "react";
import { getSyncStorage, setSyncStorage } from "../utils/storage";
import VisibleSwitch from "./inputs/VisibleSwitch";

export type VisibilitySettingResource = {
  minimize?: boolean;
  visible?: boolean;
};
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
    <Box sx={{ padding: 1, mx: "auto" }}>
      {Setting && <PopupVisibility setting={Setting} />}
      <Button type="button" variant="contained" onClick={openSetting}>
        設定を開く
      </Button>
    </Box>
  );
}

function PopupVisibility(props: {
  setting: VisibilitySettingResource;
}): React.ReactNode {
  const form = useForm({
    defaultValues: {
      ...props.setting,
    },
    listeners: {
      onChange: ({ fieldApi }) => {
        setSyncStorage({ [fieldApi.name]: fieldApi.state.value });
      },
    },
  });

  useEffect(() => {
    const listener = (changes: {
      [key: string]: chrome.storage.StorageChange;
    }) => {
      for (const [key, { newValue }] of Object.entries(changes)) {
        if (key !== "visible" && key !== "minimize") continue;
        console.debug(key, newValue);
        form.setFieldValue(key, newValue);
      }
    };
    chrome.storage.onChanged.addListener(listener);
    return () => {
      chrome.storage.onChanged.removeListener(listener);
    };
  }, [form]);

  return (
    <form>
      <Box sx={{ mb: 1, display: "flex", flexDirection: "column" }}>
        <form.Field
          name="minimize"
          children={(field) => <VisibleSwitch field={field} label="最小化" />}
        />
      </Box>
      <Box sx={{ mb: 1, display: "flex", flexDirection: "column" }}>
        <form.Field
          name="visible"
          children={(field) => <VisibleSwitch field={field} label="表示" />}
        />
      </Box>
    </form>
  );
}
