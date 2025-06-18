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
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import React, { useActionState, useEffect, useState } from "react";
import { getFileNameFromTemplate } from "../utils/jstage";
import { buttonDesignType, setSyncStorage } from "../utils/storage";

export type SettingFormProps = {
  fileNameTemplate: string;
  buttonDesign: buttonDesignType;
};
export default function SettingForm(
  props: SettingFormProps
): React.ReactElement {
  const [, action, isPending] = useActionState<null>(async (data) => {
    setSyncStorage(Setting);
    return data;
  }, null);

  const [Setting, setSetting] = useState<SettingFormProps>(props);
  const [exampleFileName, setExampleFileName] = useState<string>("");
  const [TabValue, setTabValue] = useState<string>("fileName");

  useEffect(() => {
    getExampleFileName(Setting.fileNameTemplate);
  }, [Setting.fileNameTemplate]);

  async function getExampleFileName(name: string): Promise<void> {
    const fileName = await getFileNameFromTemplate({
      fileNameTemplate: name,
      authors: ["山田　太郎", "佐藤 花子", "鈴木一郎", "田中　次郎"],
      title: "サンプル論文タイトル",
      publication_date: new Date(),
    });
    setExampleFileName(fileName);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    Setting[e.target.name as keyof SettingFormProps] = e.target.value as never;
    setSetting({ ...{}, ...Setting });
  }

  function handleChangeButtonDesign(e: SelectChangeEvent<string>) {
    Setting[e.target.name as keyof SettingFormProps] = e.target.value as never;
    setSetting({ ...{}, ...Setting });
  }

  function handleChangeTab(_: React.SyntheticEvent, value: string) {
    setTabValue(value);
  }

  function TabPanel(props: {
    children?: React.ReactNode;
    value: string;
  }): React.ReactElement {
    const { children, value } = props;
    return (
      <div role="tabpanel" hidden={TabValue !== value} id={`tabpanel-${value}`}>
        <Box sx={{ p: 2 }}>{children}</Box>
      </div>
    );
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
        <Tabs value={TabValue} onChange={handleChangeTab}>
          <Tab value={"fileName"} label="ファイル名" />
          <Tab value={"button"} label="ボタン" />
        </Tabs>
        <TabPanel value={"fileName"}>
          <Typography variant="h6" component={"div"}>
            ファイル名設定
          </Typography>
          <FormControl>
            <TextField
              label="ファイル名テンプレート"
              type="text"
              name="fileNameTemplate"
              variant="outlined"
              value={Setting.fileNameTemplate}
              onChange={handleChange}
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
        </TabPanel>
        <TabPanel value={"button"}>
          <Typography variant="h6" component={"div"}>
            ボタン設定
          </Typography>
          <FormControl sx={{ mt: 2 }}>
            <InputLabel id="button-design-label">ボタンデザイン</InputLabel>
            <Select
              labelId="button-design-label"
              label="ボタンデザイン"
              name="buttonDesign"
              value={Setting.buttonDesign}
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
        </TabPanel>
        <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
          <Button type="submit" disabled={isPending} variant="contained">
            保存
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
