import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
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

export type ButtonColorInputProps = {
  field: AnyFieldApi;
  buttonDesign?: designType;
};
export default function ButtonColorInput({
  field,
  buttonDesign,
}: ButtonColorInputProps): React.ReactElement {
  return (
    <FormControl sx={{ mt: 2 }}>
      <InputLabel id="button-color-label">ボタンカラー</InputLabel>
      <Select
        labelId="button-color-label"
        label="ボタンカラー"
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value as colorType)}
      >
        <MenuItem value="primary">
          <Typography color="primary">青</Typography>
        </MenuItem>
        <MenuItem value="secondary">
          <Typography color="secondary">紫</Typography>
        </MenuItem>
        <MenuItem value="error">
          <Typography color="error">赤</Typography>
        </MenuItem>
        <MenuItem value="info">
          <Typography color="info">水</Typography>
        </MenuItem>
        <MenuItem value="success">
          <Typography color="success">緑</Typography>
        </MenuItem>
        <MenuItem value="warning">
          <Typography color="warning">橙</Typography>
        </MenuItem>
      </Select>
      <Accordion sx={{ mt: 1, width: "auto" }}>
        <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
          <Typography component={"span"}>説明</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Button
                variant={buttonDesign}
                color="primary"
                onClick={() => field.handleChange("primary")}
              >
                青
              </Button>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Button
                variant={buttonDesign}
                color="secondary"
                sx={{ ml: 1 }}
                onClick={() => field.handleChange("secondary")}
              >
                紫
              </Button>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Button
                variant={buttonDesign}
                color="error"
                sx={{ ml: 1 }}
                onClick={() => field.handleChange("error")}
              >
                赤
              </Button>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Button
                variant={buttonDesign}
                color="info"
                sx={{ ml: 1 }}
                onClick={() => field.handleChange("info")}
              >
                水
              </Button>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Button
                variant={buttonDesign}
                color="success"
                sx={{ ml: 1 }}
                onClick={() => field.handleChange("success")}
              >
                緑
              </Button>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Button
                variant={buttonDesign}
                color="warning"
                sx={{ ml: 1 }}
                onClick={() => field.handleChange("warning")}
              >
                橙
              </Button>
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>
    </FormControl>
  );
}
