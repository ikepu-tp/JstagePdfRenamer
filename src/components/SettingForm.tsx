import { Box, Button, Paper, Tab, Tabs, Typography } from "@mui/material";
import { useForm } from "@tanstack/react-form";
import React, { useEffect, useState } from "react";
import { setSyncStorage, StorageResource } from "../utils/storage";
import SuccessedNotification from "./SuccessedNotification";
import ButtonColorInput from "./inputs/ButtonColorInput";
import ButtonInput from "./inputs/ButtonInput";
import FileNameInput from "./inputs/FileNameInput";
import MinimizeSwitch from "./inputs/MinimizeSwitch";
import VisibleSwitch from "./inputs/VisibleSwitch";

export type SettingFormProps = {
  setting: StorageResource;
};
export default function SettingForm(
  props: SettingFormProps,
): React.ReactElement {
  const [TabValue, setTabValue] = useState<string>("fileName");
  const [openNotification, setOpenNotification] = useState<boolean>(false);

  const form = useForm({
    defaultValues: {
      ...{},
      ...props.setting,
    },
    onSubmit: async ({ value }) => {
      setSyncStorage(value);
    },
  });

  useEffect(() => {
    chrome.storage.onChanged.addListener(handleStorageChange);
    return () => {
      chrome.storage.onChanged.removeListener(handleStorageChange);
    };
  }, []);

  function handleStorageChange(): void {
    setOpenNotification(true);
  }

  function handleChangeTab(_: React.SyntheticEvent, value: string) {
    setTabValue(value);
  }

  function TabPanel(props: {
    children?: React.ReactNode;
    value: string;
  }): React.ReactElement {
    const { children, value } = props;
    return (
      <div role="tabpanel" hidden={TabValue !== value} id={`tabpanel-${value}`}>
        <Box sx={{ p: 2 }}>{children}</Box>
      </div>
    );
  }
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    e.stopPropagation();
    form.handleSubmit();
  }

  return (
    <Paper
      sx={{
        padding: 1,
        minWidth: "300px",
        width: "auto",
        maxWidth: "600px",
        mx: "auto",
        mt: 4,
      }}
    >
      <Box
        component={"form"}
        sx={{ display: "flex", flexDirection: "column", rowGap: 1, p: 2 }}
        onSubmit={handleSubmit}
      >
        <Tabs value={TabValue} onChange={handleChangeTab}>
          <Tab value={"fileName"} label="ファイル名" />
          <Tab value={"button"} label="ボタン" />
          <Tab value={"visibility"} label="表示" />
        </Tabs>
        <TabPanel value={"fileName"}>
          <Typography variant="h6" component={"div"} sx={{ mb: 1 }}>
            ファイル名設定
          </Typography>
          <form.Field
            name="fileNameTemplate"
            children={(field) => <FileNameInput field={field} />}
          />
        </TabPanel>
        <TabPanel value={"button"}>
          <Typography variant="h6" component={"div"} sx={{ mb: 1 }}>
            ボタン設定
          </Typography>
          <Box sx={{ mb: 1, display: "flex", flexDirection: "column" }}>
            <form.Field
              name="buttonDesign"
              children={(field) => (
                <ButtonInput
                  field={field}
                  buttonColor={form.state.values.buttonColor}
                />
              )}
            />
          </Box>
          <Box sx={{ mb: 1, display: "flex", flexDirection: "column" }}>
            <form.Field
              name="buttonColor"
              children={(field) => <ButtonColorInput field={field} />}
            />
          </Box>
        </TabPanel>
        <TabPanel value={"visibility"}>
          <Typography variant="h6" component={"div"} sx={{ mb: 1 }}>
            表示設定
          </Typography>
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
        </TabPanel>
        <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
          <form.Subscribe
            selector={(state) => [
              state.canSubmit,
              state.isSubmitting,
              state.isPristine,
            ]}
            children={([canSubmit, isSubmitting, isPristine]) => (
              <Button
                type="submit"
                variant="contained"
                disabled={!canSubmit || isSubmitting || isPristine}
              >
                {isSubmitting ? "保存中..." : "保存"}
              </Button>
            )}
          />
        </Box>
        <SuccessedNotification
          open={openNotification}
          setOpen={setOpenNotification}
          message="設定を保存しました。"
        />
      </Box>
    </Paper>
  );
}
