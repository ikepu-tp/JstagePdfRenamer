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
                <TableRow>
                  <TableCell>%authors%</TableCell>
                  <TableCell>著者を中黒（・）で結合したもの</TableCell>
                  <TableCell>
                    <Button
                      type="button"
                      size="small"
                      onClick={() =>
                        field.handleChange(`${field.state.value}%authors%`)
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
                        field.handleChange(`${field.state.value}%year%`)
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
                        field.handleChange(`${field.state.value}%title%`)
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
    }).then((fileName) => {
      setExampleFileName(fileName);
    });
  }, [props.fileNameTemplate]);

  return <>{exampleFileName}</>;
}
