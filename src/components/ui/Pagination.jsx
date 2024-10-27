"use client";
import * as React from "react";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Stack from "@mui/material/Stack";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Typography } from "@mui/material";

export default function PaginationControlled() {
  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <Stack spacing={2}>
      {/* <Typography>Page: {page}</Typography> */}
      <Pagination
        count={10}
        page={page}
        onChange={handleChange}
        className="text-primaryColor "
      />
    </Stack>
  );
}
