import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useActionState, useEffect, useState } from "react";
import {
  DEFAULT_BUTTON_DESIGN,
  DEFAULT_FILE_NAME_TEMPLATE,
} from "../utils/constants";
import { getFileNameFromTemplate } from "../utils/jstage";
import {
  buttonDesignType,
  getSyncStorage,
  setSyncStorage,
} from "../utils/storage";

export default function SettingForm(): React.ReactElement {
  const [, action, isPending] = useActionState<null>(async (data) => {
    setSyncStorage({ fileNameTemplate, buttonDesign });
    return data;
  }, null);

  const [fileNameTemplate, setFileNameTemplate] = useState<string>("");
  const [buttonDesign, setButtonDesign] =
    useState<buttonDesignType>("contained");
  const [exampleFileName, setExampleFileName] = useState<string>("");

  useEffect(() => {
    getFileNameTemplate();
    getButtonDesign();
  }, []);
  useEffect(() => {
    if (!fileNameTemplate) return;
    getExampleFileName(fileNameTemplate);
  }, [fileNameTemplate]);

  async function getFileNameTemplate(): Promise<void> {
    const name =
      (await getSyncStorage("fileNameTemplate")).fileNameTemplate ||
      DEFAULT_FILE_NAME_TEMPLATE;

    setFileNameTemplate(name);
  }

  async function getButtonDesign(): Promise<void> {
    const design =
      (await getSyncStorage("buttonDesign")).buttonDesign ||
      DEFAULT_BUTTON_DESIGN;
    setButtonDesign(design);
  }

  async function getExampleFileName(name: string): Promise<void> {
    const fileName = await getFileNameFromTemplate({
      fileNameTemplate: name,
      authors: ["山田　太郎", "佐藤 花子", "鈴木一郎", "田中　次郎"],
      title: "サンプル論文タイトル",
      publication_date: new Date(),
    });
    setExampleFileName(fileName);
  }

  function handleChangeFileNameTemplate(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    setFileNameTemplate(e.target.value);
  }

  function handleChangeButtonDesign(e: SelectChangeEvent<string>) {
    setButtonDesign(e.target.value as buttonDesignType);
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
          <Alert color="info" variant="outlined" sx={{ mt: 1 }}>
            例: {exampleFileName}
          </Alert>
          <Accordion sx={{ mt: 1, width: "auto" }}>
            <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
              <Typography component={"span"}>説明</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>変数</TableCell>
                      <TableCell>表示内容</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>%authors%</TableCell>
                      <TableCell>著者を中黒（・）で結合したもの</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>%year%</TableCell>
                      <TableCell>発行年</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>%title%</TableCell>
                      <TableCell>論文タイトル</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </AccordionDetails>
          </Accordion>
        </FormControl>
        <FormControl sx={{ mt: 2 }}>
          <InputLabel id="button-design-label">ボタンデザイン</InputLabel>
          <Select
            labelId="button-design-label"
            label="ボタンデザイン"
            value={buttonDesign}
            onChange={handleChangeButtonDesign}
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
              <Button variant="text">文字のみ</Button>
              <Button variant="outlined" sx={{ ml: 1 }}>
                囲み
              </Button>
              <Button variant="contained" sx={{ ml: 1 }}>
                色付き
              </Button>
            </AccordionDetails>
          </Accordion>
        </FormControl>
        <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
          <Button type="submit" disabled={isPending} variant="contained">
            保存
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
