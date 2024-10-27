import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Settings } from "lucide-react";
import { TextField } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function SettingsModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <button
        onClick={handleOpen}
        className="flex justify-center items-center space-x-2 px-1 py-1 sm:px-2 sm:py-2 rounded-md text-sm sm:text-lg bg-primaryColor text-white font-semibold tracking-wide transition duration-200 hover:bg-white hover:text-primaryColor border-2 border-transparent hover:border-primaryColor "
      >
        <Settings />
        <span>Settings</span>
      </button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="space-y-6 ">
        <TextField
          id="t"
          label="Business Name"
          defaultValue="Business Name"
          className=" w-full text-sm "
          
        />
        <TextField
          id="outlined-helperText"
          label="City"
          defaultValue="City"
          className=" w-full text-sm "
          
        />
        <TextField
          id="outlined-helperText"
          label="Zip Code"
          defaultValue="Zip Code"
          className=" w-full text-sm "
          
        />
        <TextField
          id="outlined-helperText"
          label="Primary Category"
          defaultValue="Primary Category"
          className=" w-full text-sm "
          
        />
        <TextField
          id="outlined-helperText"
          label="Number of listing you manage"
          defaultValue="Number of listing you manage"
          className=" w-full text-sm "
          
        />
        <button
        onClick={handleClose}
        className=" w-full text-center mx-auto px-4 py-1 rounded-md bg-primaryColor text-white font-medium  text-lg transition duration-200 hover:bg-white hover:text-primaryColor border-2 border-transparent hover:border-primaryColor"
      >
        Save
      </button>
        </Box>
      </Modal>
    </div>
  );
}
