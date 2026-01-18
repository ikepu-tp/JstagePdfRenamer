import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
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

import { AnyFieldApi } from "@tanstack/react-form";
import { useEffect, useState } from "react";
import { makeFileName } from "../../utils/fileMeta";

export type FileNameInputProps = {
  field: AnyFieldApi;
};
const variables: { key: string; description: string }[] = [
  { key: "%authors%", description: "著者を中黒（・）で結合したもの" },
  { key: "%year%", description: "発行年" },
  { key: "%title%", description: "論文タイトル" },
  { key: "%journal_title%", description: "雑誌名" },
  { key: "%publication_date%", description: "発行日（ローカル形式）" },
  { key: "%volume%", description: "巻" },
];
export default function FileNameInput({
  field,
}: FileNameInputProps): React.ReactNode {
  return (
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
                {variables.map((variable) => (
                  <TableRow key={variable.key}>
                    <TableCell>{variable.key}</TableCell>
                    <TableCell>{variable.description}</TableCell>
                    <TableCell>
                      <Button
                        type="button"
                        size="small"
                        onClick={() =>
                          field.handleChange(
                            `${field.state.value}${variable.key}`,
                          )
                        }
                      >
                        追加
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </AccordionDetails>
      </Accordion>
    </FormControl>
  );
}

function ExampleFileName(props: {
  fileNameTemplate?: string;
}): React.ReactElement {
  const [exampleFileName, setExampleFileName] = useState<string>("");

  useEffect(() => {
    makeFileName({
      fileNameTemplate: props.fileNameTemplate,
      authors: ["山田　太郎", "佐藤 花子", "鈴木一郎", "田中　次郎"],
      title: "サンプル論文タイトル",
      publication_date: new Date(),
      journalTitle: "サンプル雑誌名",
    }).then((fileName) => {
      setExampleFileName(fileName);
    });
  }, [props.fileNameTemplate]);

  return <>{exampleFileName}</>;
}
