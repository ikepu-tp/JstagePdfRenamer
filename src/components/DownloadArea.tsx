import CloseIcon from "@mui/icons-material/Close";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import MinimizeIcon from "@mui/icons-material/Minimize";
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
  const [isMaximum, setIsMaximum] = useState<boolean>(false);
  const fileRef = useRef<FileNameUrl>({ file_name: "", pdf_url: "" });
  const [StorageValue, setStorageValue] = useState<StorageResource>({
    ...{},
    ...DEFAULT_STORAGE,
  });

  useEffect(() => {
    getFile();
    getStorage();
    chrome.storage.onChanged.addListener((changes) => {
      for (const [key, { newValue }] of Object.entries(changes)) {
        console.debug(key, newValue);
        StorageValue[key] = newValue;
        setStorageValue({ ...{}, ...StorageValue });
      }
    });
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

  function toggleMaximum(): void {
    setIsMaximum(!isMaximum);
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
    <div
      style={{
        padding: 0,
        position: "fixed",
        right: 0,
        top: "130px",
        zIndex: 1000,
        backgroundColor: "rgba(255, 255, 255)",
        border: "1px solid gray",
        borderRadius: "5px",
        minWidth: "300px",
        width: isMaximum ? "100vw" : "fit-content",
        maxWidth: isMaximum ? "100vw" : "500px",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            pt: 1,
            pl: 2,
          }}
        >
          名前を付けて保存
        </Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <ButtonGroup variant="text">
            <Button type="button" onClick={toggleMaximum}>
              {isMaximum ? <CloseFullscreenIcon /> : <OpenInFullIcon />}
            </Button>
            <Button type="button" onClick={toggleMinimize}>
              <MinimizeIcon />
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
    </div>
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
