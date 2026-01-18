import { FormControlLabel, Switch } from "@mui/material";
import { AnyFieldApi } from "@tanstack/react-form";

export type VisibleSwitchProps = {
  field: AnyFieldApi;
};
export default function VisibleSwitch({
  field,
}: VisibleSwitchProps): React.ReactElement {
  return (
    <FormControlLabel
      control={
        <Switch
          checked={field.state.value}
          onChange={(e) => field.handleChange(e.target.checked)}
        />
      }
      label="表示"
    />
  );
}
