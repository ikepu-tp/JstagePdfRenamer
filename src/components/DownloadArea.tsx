import { Box, Button, FormControl, TextField } from "@mui/material";
import React, {
  ChangeEvent,
  MouseEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  fileDownloadFromUrl,
  FileNameUrl,
  getFileNameUrl,
} from "./../utils/files";

export default function DownloadArea(): React.ReactElement {
  const [fileName, setFileName] = useState<string>("");
  const fileRef = useRef<FileNameUrl>({ file_name: "", pdf_url: "" });

  useEffect(() => {
    getFile();
  }, []);

  function handleChangeFileName(e: ChangeEvent<HTMLInputElement>) {
    setFileName(e.target.value);
  }

  function handleClick(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    fileDownloadFromUrl(`${fileName}.pdf`, fileRef.current.pdf_url);
  }

  async function getFile(): Promise<void> {
    const fileNameUrl = await getFileNameUrl();
    setFileName(fileNameUrl.file_name);
    fileRef.current = fileNameUrl;
  }
  return (
    <Box
      sx={{
        padding: 2,
        position: "fixed",
        right: 0,
        top: "130px",
        zIndex: 1000,
        backgroundColor: "rgba(255, 255, 255)",
        border: "1px solid gray",
        borderRadius: "5px",
        minWidth: "300px",
        width: "fit-content",
        maxWidth: "500px",
      }}
    >
      <FormControl sx={{ display: "block", mb: 1 }}>
        <TextField
          variant="outlined"
          fullWidth
          label="ファイル名"
          type="text"
          value={fileName}
          onChange={handleChangeFileName}
          required
          error={fileName === ""}
          helperText={fileName === "" ? "ファイル名を入力してください" : ""}
        />
      </FormControl>
      <Button
        type="button"
        onClick={handleClick}
        variant="contained"
        disabled={fileName === ""}
      >
        PDFを「{fileName}」でダウンロード
      </Button>
    </Box>
  );
}
