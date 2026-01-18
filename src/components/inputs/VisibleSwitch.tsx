import { FormControlLabel, Switch } from "@mui/material";
import { AnyFieldApi } from "@tanstack/react-form";
import React from "react";

export type VisibleSwitchProps = {
  field: AnyFieldApi;
  label: React.ReactNode;
};
export default function VisibleSwitch({
  field,
  label,
}: VisibleSwitchProps): React.ReactElement {
  return (
    <FormControlLabel
      control={
        <Switch
          checked={field.state.value ?? true}
          onChange={(e) => field.handleChange(e.target.checked)}
        />
      }
      label={label}
    />
  );
}
