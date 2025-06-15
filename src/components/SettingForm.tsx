import { Box, Button, FormControl, TextField } from "@mui/material";
import { useActionState, useEffect, useState } from "react";
import { getSyncStorage, setSyncStorage } from "../utils/storage";

export type SettingResource = {
  fileNameTemplate: string;
};
export default function SettingForm(): React.ReactElement {
  const [, action, isPending] = useActionState<SettingResource>(
    async (data) => {
      // 入力値をchrome.storage.syncに保存
      if (fileNameTemplate === "")
        throw new Error("Input file name template is required");
      setSyncStorage({ fileNameTemplate });

      return data;
    },
    {
      fileNameTemplate: "",
    }
  );
  const [fileNameTemplate, setFileNameTemplate] = useState<string>("");

  useEffect(() => {
    getFileNameTemplate();
  }, []);

  function handleChangeFileNameTemplate(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    setFileNameTemplate(e.target.value);
  }

  async function getFileNameTemplate(): Promise<void> {
    const name =
      (await getSyncStorage("fileNameTemplate")).fileNameTemplate || "";
    setFileNameTemplate(name);
  }

  return (
    <Box sx={{ padding: 1, minWidth: "300px", width: "auto" }}>
      <Box
        component={"form"}
        sx={{ display: "flex", flexDirection: "column", rowGap: 1, p: 2 }}
        action={action}
      >
        <FormControl>
          <TextField
            label="ファイル名テンプレート"
            type="text"
            variant="outlined"
            value={fileNameTemplate}
            onChange={handleChangeFileNameTemplate}
          />
        </FormControl>
        <Box>
          <Button type="submit" disabled={isPending} variant="contained">
            保存
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
