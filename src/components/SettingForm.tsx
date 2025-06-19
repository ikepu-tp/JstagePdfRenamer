import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Switch,
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
import React, { ChangeEvent, useActionState, useEffect, useState } from "react";
import { getFileNameFromTemplate } from "../utils/jstage";
import { setSyncStorage, StorageResource } from "../utils/storage";

export type SettingFormProps = StorageResource & {};
export default function SettingForm(
  props: SettingFormProps
): React.ReactElement {
  const [, action, isPending] = useActionState<null>(async (data) => {
    setSyncStorage(Setting);
    return data;
  }, null);

  const [Setting, setSetting] = useState<StorageResource>(props);
  const [exampleFileName, setExampleFileName] = useState<string>("");
  const [TabValue, setTabValue] = useState<string>("fileName");

  useEffect(() => {
    getExampleFileName(Setting.fileNameTemplate);
  }, [Setting.fileNameTemplate]);

  async function getExampleFileName(name: string | undefined): Promise<void> {
    const fileName = await getFileNameFromTemplate({
      fileNameTemplate: name,
      authors: ["山田　太郎", "佐藤 花子", "鈴木一郎", "田中　次郎"],
      title: "サンプル論文タイトル",
      publication_date: new Date(),
    });
    setExampleFileName(fileName);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSetting({
      ...Setting,
      [e.target.name]: e.target.value,
    });
  }

  function handleChangeBySelect(e: SelectChangeEvent<string>) {
    setSetting({
      ...Setting,
      [e.target.name]: e.target.value,
    });
  }

  function handleChecked(
    e: ChangeEvent<HTMLInputElement>,
    checked: boolean
  ): void {
    setSetting({
      ...Setting,
      [e.currentTarget.name]: checked,
    });
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
          <Tab value={"visibility"} label="表示" />
        </Tabs>
        <TabPanel value={"fileName"}>
          <Typography variant="h6" component={"div"} sx={{ mb: 1 }}>
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
          <Typography variant="h6" component={"div"} sx={{ mb: 1 }}>
            ボタン設定
          </Typography>
          <Box sx={{ mb: 1, display: "flex", flexDirection: "column" }}>
            <FormControl>
              <InputLabel id="button-design-label">ボタンデザイン</InputLabel>
              <Select
                labelId="button-design-label"
                label="ボタンデザイン"
                name="buttonDesign"
                value={Setting.buttonDesign}
                onChange={handleChangeBySelect}
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
                  <Button variant="text" color={Setting.buttonColor}>
                    文字のみ
                  </Button>
                  <Button
                    variant="outlined"
                    sx={{ ml: 1 }}
                    color={Setting.buttonColor}
                  >
                    囲み
                  </Button>
                  <Button
                    variant="contained"
                    sx={{ ml: 1 }}
                    color={Setting.buttonColor}
                  >
                    色付き
                  </Button>
                </AccordionDetails>
              </Accordion>
            </FormControl>
          </Box>
          <Box sx={{ mb: 1, display: "flex", flexDirection: "column" }}>
            <FormControl sx={{ mt: 2 }}>
              <InputLabel id="button-color-label">ボタンカラー</InputLabel>
              <Select
                labelId="button-color-label"
                label="ボタンカラー"
                name="buttonColor"
                value={Setting.buttonColor}
                onChange={handleChangeBySelect}
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
                      <Button variant={Setting.buttonDesign} color="primary">
                        青
                      </Button>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <Button
                        variant={Setting.buttonDesign}
                        color="secondary"
                        sx={{ ml: 1 }}
                      >
                        紫
                      </Button>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <Button
                        variant={Setting.buttonDesign}
                        color="error"
                        sx={{ ml: 1 }}
                      >
                        赤
                      </Button>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <Button
                        variant={Setting.buttonDesign}
                        color="info"
                        sx={{ ml: 1 }}
                      >
                        水
                      </Button>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <Button
                        variant={Setting.buttonDesign}
                        color="success"
                        sx={{ ml: 1 }}
                      >
                        緑
                      </Button>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <Button
                        variant={Setting.buttonDesign}
                        color="warning"
                        sx={{ ml: 1 }}
                      >
                        橙
                      </Button>
                    </Box>
                  </Box>
                </AccordionDetails>
              </Accordion>
            </FormControl>
          </Box>
        </TabPanel>
        <TabPanel value={"visibility"}>
          <Typography variant="h6" component={"div"} sx={{ mb: 1 }}>
            表示設定
          </Typography>
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
