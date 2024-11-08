import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const Dropdown = ({ filter, onFilterChange }) => {
  return (
    <FormControl fullWidth>
      <InputLabel id="filter-select-label">Filter</InputLabel>
      <Select
        labelId="filter-select-label"
        id="filter-select"
        label="Filter"
        value={filter ?? "null"} // Show "All" as the default option when filter is null
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
