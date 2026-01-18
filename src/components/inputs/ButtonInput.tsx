import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React from "react";

import { AnyFieldApi } from "@tanstack/react-form";
import { colorType, designType } from "../../utils/storage";

export type ButtonInputProps = {
  field: AnyFieldApi;
  buttonColor?: colorType;
};
export default function ButtonInput({
  field,
  buttonColor,
}: ButtonInputProps): React.ReactElement {
  return (
    <FormControl>
      <InputLabel id="button-design-label">ボタンデザイン</InputLabel>
      <Select
        labelId="button-design-label"
        label="ボタンデザイン"
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value as designType)}
      >
        <MenuItem value="text">文字のみ</MenuItem>
        <MenuItem value="outlined">囲み</MenuItem>
        <MenuItem value="contained">色付き</MenuItem>
      </Select>
      <Accordion sx={{ mt: 1, width: "auto" }}>
        <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
          <Typography component={"span"}>説明</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Button variant="text" color={buttonColor}>
            文字のみ
          </Button>
          <Button variant="outlined" sx={{ ml: 1 }} color={buttonColor}>
            囲み
          </Button>
          <Button variant="contained" sx={{ ml: 1 }} color={buttonColor}>
            色付き
          </Button>
        </AccordionDetails>
      </Accordion>
    </FormControl>
  );
}
