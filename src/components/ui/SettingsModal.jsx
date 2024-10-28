"use client";
import * as React from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Settings } from "lucide-react";
import { TextField, Select, MenuItem, FormControl, InputLabel } from "@mui/material";

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

const states = [
  { name: 'Alabama', abbr: 'AL' },
  { name: 'Alaska', abbr: 'AK' },
  { name: 'Arizona', abbr: 'AZ' },
  { name: 'Arkansas', abbr: 'AR' },
  { name: 'California', abbr: 'CA' },
  { name: 'Colorado', abbr: 'CO' },
  { name: 'Connecticut', abbr: 'CT' },
  { name: 'Delaware', abbr: 'DE' },
  { name: 'Florida', abbr: 'FL' },
  { name: 'Georgia', abbr: 'GA' },
  { name: 'Hawaii', abbr: 'HI' },
  { name: 'Idaho', abbr: 'ID' },
  { name: 'Illinois', abbr: 'IL' },
  { name: 'Indiana', abbr: 'IN' },
  { name: 'Iowa', abbr: 'IA' },
  { name: 'Kansas', abbr: 'KS' },
  { name: 'Kentucky', abbr: 'KY' },
  { name: 'Louisiana', abbr: 'LA' },
  { name: 'Maine', abbr: 'ME' },
  { name: 'Maryland', abbr: 'MD' },
  { name: 'Massachusetts', abbr: 'MA' },
  { name: 'Michigan', abbr: 'MI' },
  { name: 'Minnesota', abbr: 'MN' },
  { name: 'Mississippi', abbr: 'MS' },
  { name: 'Missouri', abbr: 'MO' },
  { name: 'Montana', abbr: 'MT' },
  { name: 'Nebraska', abbr: 'NE' },
  { name: 'Nevada', abbr: 'NV' },
  { name: 'New Hampshire', abbr: 'NH' },
  { name: 'New Jersey', abbr: 'NJ' },
  { name: 'New Mexico', abbr: 'NM' },
  { name: 'New York', abbr: 'NY' },
  { name: 'North Carolina', abbr: 'NC' },
  { name: 'North Dakota', abbr: 'ND' },
  { name: 'Ohio', abbr: 'OH' },
  { name: 'Oklahoma', abbr: 'OK' },
  { name: 'Oregon', abbr: 'OR' },
  { name: 'Pennsylvania', abbr: 'PA' },
  { name: 'Rhode Island', abbr: 'RI' },
  { name: 'South Carolina', abbr: 'SC' },
  { name: 'South Dakota', abbr: 'SD' },
  { name: 'Tennessee', abbr: 'TN' },
  { name: 'Texas', abbr: 'TX' },
  { name: 'Utah', abbr: 'UT' },
  { name: 'Vermont', abbr: 'VT' },
  { name: 'Virginia', abbr: 'VA' },
  { name: 'Washington', abbr: 'WA' },
  { name: 'West Virginia', abbr: 'WV' },
  { name: 'Wisconsin', abbr: 'WI' },
  { name: 'Wyoming', abbr: 'WY' }
];

const validCategories = [
  'Auto Services',
  'Beauty',
  'Home Services',
  'Insurance',
  'Legal Services',
  'Medical Services',
  'Pet Services',
  'Restaurants'
];

export default function SettingsModal() {
  const [open, setOpen] = React.useState(false);
  const [selectedState, setSelectedState] = React.useState('CA');
  const [primaryCategory, setPrimaryCategory] = React.useState('Restaurants');
  const [categoryError, setCategoryError] = React.useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
  };

  const handleCategoryChange = (event) => {
    const value = event.target.value;
    setPrimaryCategory(value);
    
    if (value === '') {
      setCategoryError('');
    } else if (!validCategories.some(category => 
      category.toLowerCase() === value.toLowerCase()
    )) {
      setCategoryError("This primary category doesn't exist");
    } else {
      const properCategory = validCategories.find(category => 
        category.toLowerCase() === value.toLowerCase()
      );
      setPrimaryCategory(properCategory);
      setCategoryError('');
    }
  };

  const handleSave = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/scraper/yellowpages/start", {
        state: selectedState,
        category: primaryCategory,
      });
  
      if (response.status === 200) {
        console.log("API request successful:", response.data);
        handleClose();
      } else {
        console.error("API request failed:", response.data);
      }
    } catch (error) {
      console.error("Error during API request:", error);
    }
    setOpen(false);
  };
  

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
        <Box sx={style} className="space-y-6">
          <TextField
            id="t"
            label="Business Name"
            defaultValue="Business Name"
            className="w-full text-sm"
            disabled
          />
          <FormControl fullWidth>
            <InputLabel id="state-select-label">State</InputLabel>
            <Select
              labelId="state-select-label"
              id="state-select"
              value={selectedState}
              label="State"
              onChange={handleStateChange}
              className="w-full text-sm"
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 224,
                  },
                },
              }}
            >
              {states.map((state) => (
                <MenuItem key={state.abbr} value={state.abbr}>
                  {state.name} - {state.abbr}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            id="outlined-helperText"
            label="Zip Code"
            defaultValue="Zip Code"
            className=" w-full text-sm "
            disabled
          />
          <TextField
            id="outlined-helperText"
            label="Primary Category"
            value={primaryCategory}
            onChange={handleCategoryChange}
            className="w-full text-sm"
            error={!!categoryError}
            helperText={categoryError}
          />
          <TextField
            id="outlined-helperText"
            label="Number of listing you manage"
            defaultValue="Number of listing you manage"
            className=" w-full text-sm "
            disabled
          />
          <button
            onClick={handleSave}
            className="w-full text-center mx-auto px-4 py-1 rounded-md bg-primaryColor text-white font-medium text-lg transition duration-200 hover:bg-white hover:text-primaryColor border-2 border-transparent hover:border-primaryColor"
          >
            Save
          </button>
        </Box>
      </Modal>
    </div>
  );
}
