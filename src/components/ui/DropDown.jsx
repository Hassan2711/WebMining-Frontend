import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const Dropdown = ({ filter, onFilterChange }) => {
  return (
    <FormControl className='' fullWidth>
      <InputLabel id="demo-simple-select-label">Filter</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        label="Filter"
        value={filter}
        onChange={onFilterChange}
      >
        <MenuItem value="null">All</MenuItem>
        <MenuItem value="Approved">Approved</MenuItem>
        <MenuItem value="Rejected">Rejected</MenuItem>
      </Select>
    </FormControl>
  );
};

export default Dropdown;