"use client";
import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import {
  Modal,
  ModalTrigger,
  ModalBody,
  ModalContent,
} from "@/components/ui/animated-modal";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { BottomGradient, LabelInputContainer } from "@/components/ui/Login";

const columns = [
  { id: "email", label: "Email", minWidth: 170 },
  { id: "claimed", label: "Claimed", minWidth: 100 },
  {
    id: "regularhours",
    label: "Regular Hours",
    minWidth: 170,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "categories",
    label: "Category",
    minWidth: 170,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "edit",
    label: "Edit",
    minWidth: 30,
    align: "center",
  },
];

function createData(email, claimed, regularhours, categories) {
  // const density = population / size;
  return { email, claimed, regularhours, categories };
}

const rows = [
  createData("margi@tommasos.com","Claimed","Mon Closed | Tue - Sat: | 5:00 pm - 10:30 pm | Sun: | 4:00 pm - 9:30 pm","Restaurants, Italian Restaurants, Pizza"),
  createData("jenniemoreci@comcast.net","Claimed","Tue - Thu: | 4:00 pm - 9:30 pm | Fri - Sat: | 4:00 pm - 10:30 pm | Sun: | 3:00 pm - 9:30 pm","Cocktail Lounges, Bar & Grills, Bars, Caterers, Latin American Restaurants, Mexican Restaurants, Restaurants, Take Out Restaurants"),
  createData("sanfrancisco@ruthschris.com","UnClaimed","Mon - Thu: | 5:00 pm - 10:00 pm | Fri - Sat: | 5:00 pm - 10:30 pm | Sun: | 4:30 pm - 9:30 pm","Steak Houses, Restaurants"),
  createData("Brazened@aol.com","UnClaimed","Mon - Sun: | 4:00 pm - 2:00 am","American Restaurants, Bar & Grills, Bars, Restaurants, Steak Houses, Taverns"),
  createData("lousfishshack@yahoo.com","UnClaimed","Mon - Sun: | 11:00 am - 11:30 pm","American Restaurants, Family Style Restaurants, German Restaurants, Night Clubs, Restaurants, Seafood Restaurants"),
  createData("etuttoqua@mail.com","Claimed","Mon - Sun: | 12:00 pm - 9:00 pm","Italian Restaurants, Pasta, Pizza, Restaurants, Seafood Restaurants"),
  createData("lulu@restaurantlulu.com","Unclaimed","Mon - Fri: | 11:30 am - 11:30 pm | Sat - Sun: | 5:00 pm - 11:30 pm","Family Style Restaurants, Restaurants"),
];


export default function PageTables() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleEditClick = (row) => {
    // Implement your edit functionality here
  };

  return (
    <Paper sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
      <TableContainer
        // sx={{ maxHeight: 440, width: "100%", overflowY: "hidden" }}
      >
        <Table
          stickyHeader
          aria-label="sticky table"
          sx={{ tableLayout: "fixed" }}
        >
          <TableHead>
            <TableRow sx={{ backgroundColor: "#6366f1", color: "white" }}>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  sx={{
                    top: 0,
                    minWidth: column.minWidth,
                    backgroundColor: "#6366f1",
                    color: "white",
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.id === "edit" ? (
                          <IconButton
                            aria-label="edit"
                            onClick={() => handleEditClick(row)}
                          >
                            <Modal>
                              <ModalTrigger className="">
                                <EditIcon />
                              </ModalTrigger>
                              <ModalBody>
                                <ModalContent>
                                  <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-2">
                                    Edit Here
                                  </h4>
                                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-2">
                                    <LabelInputContainer className="mb-4">
                                      <Label htmlFor="businessName">
                                        Business Name
                                      </Label>
                                      <Input
                                        id="businessName"
                                        placeholder="Alpha LLC"
                                        type="text"
                                      />
                                    </LabelInputContainer>

                                    <LabelInputContainer className="mb-4">
                                      <Label htmlFor="phoneNumber">
                                        Phone Number
                                      </Label>
                                      <Input
                                        id="phoneNumber"
                                        placeholder="541-654-6168"
                                        type="tel"
                                      />
                                    </LabelInputContainer>

                                    <LabelInputContainer className="mb-4">
                                      <Label htmlFor="address">Address</Label>
                                      <Input
                                        id="address"
                                        placeholder="123 Main St, London, UK"
                                        type="text"
                                      />
                                    </LabelInputContainer>

                                    <LabelInputContainer className="mb-4">
                                      <Label htmlFor="website">Website</Label>
                                      <Input
                                        id="website"
                                        placeholder="https://www.alpha-llc.com"
                                        type="url"
                                      />
                                    </LabelInputContainer>

                                    <LabelInputContainer className="mb-4">
                                      <Label htmlFor="moreInfo">
                                        More Info
                                      </Label>
                                      <Input
                                        id="moreInfo"
                                        placeholder="Additional details about the business"
                                        type="text"
                                      />
                                    </LabelInputContainer>

                                    <LabelInputContainer className="mb-4">
                                      <Label htmlFor="extraPhones">
                                        Extra Phones
                                      </Label>
                                      <Input
                                        id="extraPhones"
                                        placeholder="041-564-5612"
                                        type="tel"
                                      />
                                    </LabelInputContainer>

                                    <LabelInputContainer className="mb-4">
                                      <Label htmlFor="otherLink">
                                        Other Link
                                      </Label>
                                      <Input
                                        id="otherLink"
                                        placeholder="http://www.example.com"
                                        type="url"
                                      />
                                    </LabelInputContainer>

                                    <LabelInputContainer className="mb-4">
                                      <Label htmlFor="cuisines">Cuisines</Label>
                                      <Input
                                        id="cuisines"
                                        placeholder="Bed & Breakfast, Resorts, Guesthouses"
                                        type="text"
                                      />
                                    </LabelInputContainer>

                                    <LabelInputContainer className="mb-4">
                                      <Label htmlFor="longDetails">
                                        Restaurant Long Description
                                      </Label>
                                      <Input
                                        id="longDetails"
                                        placeholder="A detailed description of the restaurant's offerings and atmosphere."
                                        type="text"
                                      />
                                    </LabelInputContainer>

                                    <LabelInputContainer className="mb-4">
                                      <Label htmlFor="shortDetails">
                                        Restaurant Short Description
                                      </Label>
                                      <Input
                                        id="shortDetails"
                                        placeholder="A brief summary of the restaurant."
                                        type="text"
                                      />
                                    </LabelInputContainer>
                                  </div>

                                  <button
                                    className="bg-gradient-to-br relative group/btn from-primaryColor dark:from-primaryColor dark:to-primaryColor to-neutral-600 block dark:bg-primaryColor w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--primaryColor)_inset,0px_-1px_0px_0px_var(--primaryColor)_inset]"
                                    type="submit"
                                  >
                                    Add &rarr;
                                    <BottomGradient />
                                  </button>
                                </ModalContent>
                              </ModalBody>
                            </Modal>
                          </IconButton>
                        ) : column.format && typeof value === "number" ? (
                          column.format(value)
                        ) : (
                          value
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      /> */}
    </Paper>
  );
}
