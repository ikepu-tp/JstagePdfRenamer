import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Box,
  Button,
  FormControl,
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
import { DEFAULT_FILE_NAME_TEMPLATE } from "../utils/constants";
import { getFileNameFromTemplate } from "../utils/jstage";
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
  const [exampleFileName, setExampleFileName] = useState<string>("");

  useEffect(() => {
    getFileNameTemplate();
  }, []);
  useEffect(() => {
    if (!fileNameTemplate) return;
    getExampleFileName(fileNameTemplate);
  }, [fileNameTemplate]);

  function handleChangeFileNameTemplate(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    setFileNameTemplate(e.target.value);
  }

  async function getFileNameTemplate(): Promise<void> {
    const name =
      (await getSyncStorage("fileNameTemplate")).fileNameTemplate ||
      DEFAULT_FILE_NAME_TEMPLATE;

    setFileNameTemplate(name);
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
        <Box>
          <Button type="submit" disabled={isPending} variant="contained">
            保存
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
