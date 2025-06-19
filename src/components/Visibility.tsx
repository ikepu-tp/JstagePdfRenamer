import { Box, FormControlLabel, Switch } from "@mui/material";
import React from "react";

export type VisibilityProps = {
  Setting: {
    minimize?: boolean;
    visible?: boolean;
  };
  handleChecked: (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => void;
};
export default function Visibility({
  Setting,
  handleChecked,
}: VisibilityProps): React.ReactNode {
  return (
    <>
      <Box sx={{ mb: 1, display: "flex", flexDirection: "column" }}>
        <FormControlLabel
          control={
            <Switch
              name="minimize"
              checked={Setting.minimize}
              onChange={handleChecked}
            />
          }
          label="最小化"
        />
      </Box>
      <Box sx={{ mb: 1, display: "flex", flexDirection: "column" }}>
        <FormControlLabel
          control={
            <Switch
              name="visible"
              checked={Setting.visible}
              onChange={handleChecked}
            />
          }
          label="表示"
        />
      </Box>
    </>
  );
}
