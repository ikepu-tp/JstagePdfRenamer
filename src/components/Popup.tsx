import { Box, Button } from "@mui/material";
import { useForm } from "@tanstack/react-form";
import React, { useEffect, useState } from "react";
import { getSyncStorage, setSyncStorage } from "../utils/storage";
import MinimizeSwitch from "./inputs/MinimizeSwitch";
import VisibleSwitch from "./inputs/VisibleSwitch";
import { VisibilitySettingResource } from "./Visibility";

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
      ...{},
      ...props.setting,
    },
    listeners: {
      onChange: ({ fieldApi }) => {
        setSyncStorage({ [fieldApi.name]: fieldApi.state.value });
      },
    },
  });

  useEffect(() => {
    chrome.storage.onChanged.addListener((changes) => {
      for (const [key, { newValue }] of Object.entries(changes)) {
        if (key !== "visible" && key !== "minimize") continue;
        console.debug(key, newValue);
        form.setFieldValue(key, newValue);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <form>
      <Box sx={{ mb: 1, display: "flex", flexDirection: "column" }}>
        <form.Field
          name="minimize"
          children={(field) => <MinimizeSwitch field={field} />}
        />
      </Box>
      <Box sx={{ mb: 1, display: "flex", flexDirection: "column" }}>
        <form.Field
          name="visible"
          children={(field) => <VisibleSwitch field={field} />}
        />
      </Box>
    </form>
  );
}
