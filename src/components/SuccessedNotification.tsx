import { Alert, Snackbar } from "@mui/material";
import React from "react";

export type SuccessedNotificationProps = {
  message: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function SuccessedNotification(
  props: SuccessedNotificationProps
): React.ReactNode {
  const handleClose = () => {
    props.setOpen(false);
  };

  return (
    <div>
      <Snackbar
        open={props.open}
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          {props.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
