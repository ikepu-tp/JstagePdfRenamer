import { FormControlLabel, Switch } from "@mui/material";
import { AnyFieldApi } from "@tanstack/react-form";

export type MinimizeSwitchProps = {
  field: AnyFieldApi;
};
export default function MinimizeSwitch({
  field,
}: MinimizeSwitchProps): React.ReactElement {
  return (
    <FormControlLabel
      control={
        <Switch
          checked={field.state.value}
          onChange={(e) => field.handleChange(e.target.checked)}
        />
      }
      label="最小化"
    />
  );
}
