import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { EditIcon } from "lucide-react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const ApprovedModalButton = () => {
  return (
    <button className="px-4 py-1 rounded-md bg-teal-500 text-white font-medium text-lg transition duration-200 hover:bg-white hover:text-teal-500 border-2 border-transparent hover:border-teal-500">
      Approved
    </button>
  );
};
export const RejectModalButton = () => {
  return (
    <button className="px-4 py-1 rounded-md bg-red-500 text-white text-lg font-medium transition duration-200 hover:bg-white hover:text-red-500 border-2 border-transparent hover:border-red-500">
      Reject
    </button>
  );
};

export default function BigModal({ children }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {   
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant="" onClick={handleClickOpen}>
        <EditIcon />
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative", bgcolor: "#2e3940", mb: 2 }}>
          <Toolbar>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Edit
            </Typography>

            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        {children}

      </Dialog>
    </React.Fragment>
  );
}
