import { Box, Button, FormControl, TextField } from "@mui/material";
import { useActionState, useEffect } from "react";
import { getSyncStorage, setSyncStorage } from "../utils/storage";

export type SettingResource = {
  fileNameTemplate: string;
};
export default function SettingForm(): React.ReactElement {
  const [initialState, action, isPending] = useActionState<SettingResource>(
    async (data) => {
      setSyncStorage(data);
      return data;
    },
    {
      fileNameTemplate: "%authors% (%year%) %title%",
    }
  );

  useEffect(() => {
    getSyncStorage("fileNameTemplate").then((data) => {
      console.log(data);
    });
  }, []);

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
            defaultValue={initialState.fileNameTemplate}
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
