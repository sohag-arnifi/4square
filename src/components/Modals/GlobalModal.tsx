import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, IconButton, Typography } from "@mui/material";
import { Close } from "@mui/icons-material";
import theme from "@/theme";

interface IGlobalModalProps {
  title: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  okFn: () => void;
  info: React.ReactNode;
  loading?: boolean;
}

const GlobalModal: React.FC<IGlobalModalProps> = ({
  title,
  open,
  setOpen,
  okFn,
  info,
  loading,
}) => {
  const handleOk = () => {
    okFn();
  };

  return (
    <Dialog
      fullWidth
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="globel-dialog-title"
      aria-describedby="global-dialog-description"
      disableScrollLock
    >
      {title && (
        <DialogTitle id="globel-dialog-title">
          <Box display={"flex"} justifyContent={"space-between"}>
            <Typography variant="h4" color={theme.colorConstants.backGray}>
              {title}
            </Typography>

            <IconButton onClick={() => setOpen(false)} color="error">
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>
      )}

      <DialogContent>
        {info}
        <DialogContentText id="global-dialog-description"></DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          sx={{ textTransform: "none" }}
          color="error"
          onClick={() => setOpen(false)}
        >
          Cancel
        </Button>
        <Button sx={{ textTransform: "none" }} onClick={handleOk} autoFocus>
          {loading ? "Loading..." : "Yes"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default GlobalModal;
