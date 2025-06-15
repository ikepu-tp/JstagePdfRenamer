import { Box, Button, FormControl, TextField } from "@mui/material";
import { useActionState, useEffect } from "react";

export type SettingResource = {
  fileNameTemplate: string;
};
export default function SettingForm(): React.ReactElement {
  const [initialState, action, isPending] = useActionState<SettingResource>(
    async (...args) => {
      console.log(args);
      return args[0];
    },
    {
      fileNameTemplate: "%authors% (%year%) %title%",
    }
  );

  useEffect(() => {}, []);

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
