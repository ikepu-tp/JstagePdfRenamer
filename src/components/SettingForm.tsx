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
import { useForm } from "@tanstack/react-form";
import React, { useEffect, useState } from "react";
import { getFileNameFromTemplate } from "../models/jstage";
import {
  colorType,
  designType,
  setSyncStorage,
  StorageResource,
} from "../utils/storage";
import SuccessedNotification from "./SuccessedNotification";

export type SettingFormProps = {
  setting: StorageResource;
};
export default function SettingForm(
  props: SettingFormProps,
): React.ReactElement {
  const [TabValue, setTabValue] = useState<string>("fileName");
  const [openNotification, setOpenNotification] = useState<boolean>(false);

  const form = useForm({
    defaultValues: {
      ...{},
      ...props.setting,
    },
    onSubmit: async ({ value }) => {
      setSyncStorage(value);
    },
  });

  useEffect(() => {
    chrome.storage.onChanged.addListener(handleStorageChange);
    return () => {
      chrome.storage.onChanged.removeListener(handleStorageChange);
    };
  }, []);

  function handleStorageChange(): void {
    setOpenNotification(true);
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
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    e.stopPropagation();
    form.handleSubmit();
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
        onSubmit={handleSubmit}
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
          <form.Field
            name="fileNameTemplate"
            children={(field) => (
              <FormControl fullWidth>
                <TextField
                  label="ファイル名テンプレート"
                  type="text"
                  variant="outlined"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                <Alert color="info" variant="outlined" sx={{ mt: 1 }}>
                  例: <ExampleFileName fileNameTemplate={field.state.value} />
                </Alert>
                <Accordion sx={{ mt: 1, width: "auto" }} defaultExpanded>
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
                            <TableCell></TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow>
                            <TableCell>%authors%</TableCell>
                            <TableCell>
                              著者を中黒（・）で結合したもの
                            </TableCell>
                            <TableCell>
                              <Button
                                type="button"
                                size="small"
                                onClick={() =>
                                  field.handleChange(
                                    `${field.state.value}%authors%`,
                                  )
                                }
                              >
                                追加
                              </Button>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>%year%</TableCell>
                            <TableCell>発行年</TableCell>
                            <TableCell>
                              <Button
                                type="button"
                                size="small"
                                onClick={() =>
                                  field.handleChange(
                                    `${field.state.value}%year%`,
                                  )
                                }
                              >
                                追加
                              </Button>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>%title%</TableCell>
                            <TableCell>論文タイトル</TableCell>
                            <TableCell>
                              <Button
                                type="button"
                                size="small"
                                onClick={() =>
                                  field.handleChange(
                                    `${field.state.value}%title%`,
                                  )
                                }
                              >
                                追加
                              </Button>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </AccordionDetails>
                </Accordion>
              </FormControl>
            )}
          />
        </TabPanel>
        <TabPanel value={"button"}>
          <Typography variant="h6" component={"div"} sx={{ mb: 1 }}>
            ボタン設定
          </Typography>
          <Box sx={{ mb: 1, display: "flex", flexDirection: "column" }}>
            <form.Field
              name="buttonDesign"
              children={(field) => (
                <FormControl>
                  <InputLabel id="button-design-label">
                    ボタンデザイン
                  </InputLabel>
                  <Select
                    labelId="button-design-label"
                    label="ボタンデザイン"
                    value={field.state.value}
                    onChange={(e) =>
                      field.handleChange(e.target.value as designType)
                    }
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
                      <Button
                        variant="text"
                        color={form.state.values.buttonColor}
                      >
                        文字のみ
                      </Button>
                      <Button
                        variant="outlined"
                        sx={{ ml: 1 }}
                        color={form.state.values.buttonColor}
                      >
                        囲み
                      </Button>
                      <Button
                        variant="contained"
                        sx={{ ml: 1 }}
                        color={form.state.values.buttonColor}
                      >
                        色付き
                      </Button>
                    </AccordionDetails>
                  </Accordion>
                </FormControl>
              )}
            />
          </Box>
          <Box sx={{ mb: 1, display: "flex", flexDirection: "column" }}>
            <form.Field
              name="buttonColor"
              children={(field) => (
                <FormControl sx={{ mt: 2 }}>
                  <InputLabel id="button-color-label">ボタンカラー</InputLabel>
                  <Select
                    labelId="button-color-label"
                    label="ボタンカラー"
                    value={field.state.value}
                    onChange={(e) =>
                      field.handleChange(e.target.value as colorType)
                    }
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
                            variant={form.state.values.buttonDesign}
                            color="primary"
                          >
                            青
                          </Button>
                        </Box>
                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                          <Button
                            variant={form.state.values.buttonDesign}
                            color="secondary"
                            sx={{ ml: 1 }}
                          >
                            紫
                          </Button>
                        </Box>
                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                          <Button
                            variant={form.state.values.buttonDesign}
                            color="error"
                            sx={{ ml: 1 }}
                          >
                            赤
                          </Button>
                        </Box>
                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                          <Button
                            variant={form.state.values.buttonDesign}
                            color="info"
                            sx={{ ml: 1 }}
                          >
                            水
                          </Button>
                        </Box>
                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                          <Button
                            variant={form.state.values.buttonDesign}
                            color="success"
                            sx={{ ml: 1 }}
                          >
                            緑
                          </Button>
                        </Box>
                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                          <Button
                            variant={form.state.values.buttonDesign}
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
              )}
            />
          </Box>
        </TabPanel>
        <TabPanel value={"visibility"}>
          <Typography variant="h6" component={"div"} sx={{ mb: 1 }}>
            表示設定
          </Typography>

          <Box sx={{ mb: 1, display: "flex", flexDirection: "column" }}>
            <form.Field
              name="minimize"
              children={(field) => (
                <FormControlLabel
                  control={
                    <Switch
                      name="minimize"
                      checked={field.state.value}
                      onChange={(e) => field.handleChange(e.target.checked)}
                    />
                  }
                  label="最小化"
                />
              )}
            />
          </Box>
          <Box sx={{ mb: 1, display: "flex", flexDirection: "column" }}>
            <form.Field
              name="visible"
              children={(field) => (
                <FormControlLabel
                  control={
                    <Switch
                      name="visible"
                      checked={field.state.value}
                      onChange={(e) => field.handleChange(e.target.checked)}
                    />
                  }
                  label="表示"
                />
              )}
            />
          </Box>
        </TabPanel>
        <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
          <form.Subscribe
            selector={(state) => [
              state.canSubmit,
              state.isSubmitting,
              state.isPristine,
            ]}
            children={([canSubmit, isSubmitting, isPristine]) => (
              <Button
                type="submit"
                variant="contained"
                disabled={!canSubmit || isSubmitting || isPristine}
              >
                {isSubmitting ? "保存中..." : "保存"}
              </Button>
            )}
          />
        </Box>
        <SuccessedNotification
          open={openNotification}
          setOpen={setOpenNotification}
          message="設定を保存しました。"
        />
      </Box>
    </Paper>
  );
}

function ExampleFileName(props: {
  fileNameTemplate?: string;
}): React.ReactElement {
  const [exampleFileName, setExampleFileName] = useState<string>("");

  useEffect(() => {
    getFileNameFromTemplate({
      fileNameTemplate: props.fileNameTemplate,
      authors: ["山田　太郎", "佐藤 花子", "鈴木一郎", "田中　次郎"],
      title: "サンプル論文タイトル",
      publication_date: new Date(),
    }).then((fileName) => {
      setExampleFileName(fileName);
    });
  }, [props.fileNameTemplate]);

  return <>{exampleFileName}</>;
}
