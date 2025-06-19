import CloseIcon from "@mui/icons-material/Close";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  TextField,
} from "@mui/material";
import React, {
  ChangeEvent,
  MouseEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { DEFAULT_STORAGE } from "../utils/constants";
import {
  getSyncStorage,
  setSyncStorage,
  StorageResource,
} from "../utils/storage";
import {
  fileDownloadFromUrl,
  FileNameUrl,
  getFileNameUrl,
} from "./../utils/files";

export default function DownloadArea(): React.ReactNode {
  const [fileName, setFileName] = useState<string>("");
  const fileRef = useRef<FileNameUrl>({ file_name: "", pdf_url: "" });
  const [StorageValue, setStorageValue] = useState<StorageResource>({
    ...{},
    ...DEFAULT_STORAGE,
  });

  useEffect(() => {
    getFile();
    getStorage();
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

  function toggleVisible(): void {
    const visible = !StorageValue.visible;
    setSyncStorage({ visible });
    setStorageValue({ ...{}, ...StorageValue, visible });
  }

  function toggleMinimize(): void {
    const minimize = !StorageValue.minimize;
    setSyncStorage({ minimize });
    setStorageValue({ ...{}, ...StorageValue, minimize });
  }

  async function getStorage(): Promise<void> {
    const storage = await getSyncStorage([
      "fileNameTemplate",
      "buttonDesign",
      "buttonColor",
      "minimize",
      "visible",
    ]);
    setStorageValue({ ...{}, ...storage });
  }

  if (!StorageValue.visible) return;
  if (StorageValue.minimize)
    return <MinimizeDownloadArea toggleMinimize={toggleMinimize} />;

  return (
    <Box
      sx={{
        padding: 0,
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
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            pt: 2,
            pl: 2,
          }}
        >
          名前を付けて保存
        </Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <ButtonGroup variant="text">
            <Button type="button" onClick={toggleMinimize}>
              <CloseFullscreenIcon />
            </Button>
            <Button type="button" onClick={toggleVisible}>
              <CloseIcon />
            </Button>
          </ButtonGroup>
        </Box>
      </Box>
      <Box sx={{ padding: 2 }}>
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
          variant={StorageValue.buttonDesign}
          color={StorageValue.buttonColor}
          disabled={fileName === ""}
        >
          PDFをダウンロード
        </Button>
      </Box>
    </Box>
  );
}

type MinimizeDownloadAreaProps = {
  toggleMinimize: () => void;
};
function MinimizeDownloadArea(
  props: MinimizeDownloadAreaProps
): React.ReactNode {
  return (
    <Button
      type="button"
      onClick={props.toggleMinimize}
      sx={{
        padding: 0,
        position: "fixed",
        right: 0,
        top: "130px",
        zIndex: 1000,
        backgroundColor: "rgba(255, 255, 255)",
        border: "1px solid gray",
        borderRadius: "5px",
        minWidth: 0,
        minHeight: 0,
      }}
    >
      <OpenInFullIcon fontSize="large" />
    </Button>
  );
}
