"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  IconButton,
  TablePagination,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import {
  Modal,
  ModalTrigger,
  ModalBody,
  ModalContent,
} from "@/components/ui/TableModal";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  BACKEND_URL,
  BottomGradient,
  LabelInputContainer,
} from "@/components/ui/Login";
import ProfileName from "./ProfileName";

const DataTable = () => {
  const [scrapeData, setScrapeData] = useState([]);
  const [error, setError] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalRows, setTotalRows] = useState(0);

  const fetchData = async (page, limit) => {
    try {
      const response = await fetch(
        `${ BACKEND_URL }/scraper/yellowpages/paginate?page=${
          page + 1
        }&limit=${limit}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
    
      setTotalRows(result.total_pages); // Assuming your backend provides total count
      return result.data;
    } catch (error) {
      
      setError(error.message);
      return [];
    }
  };

  useEffect(() => {
    async function loadData() {
      // console.log("page,>>>>>>>>>>>>", page, "rowsPerPage", rowsPerPage);
      const data = await fetchData(page, rowsPerPage);
      setScrapeData(data);
      // console.log(
      //   "page",
      //   page,
      //   "rowsPerPage",
      //   rowsPerPage,
      //   "totalRows",
      //   totalRows
      // );
    }

    loadData();
  }, [page, rowsPerPage]);

  const handleEditClick = (row) => {
    setSelectedRow(row);
  };

  const handleCloseModal = () => {
    setSelectedRow(null);
  };

  const handleChange = (event) => {
    setSelectedRow({
      ...selectedRow,
      [event.target.id]: event.target.value,
    });
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page when rows per page changes
  };


  // Calculate total number of pages
  const totalPages = Math.ceil(totalRows / rowsPerPage);

  if (error) {
    return <Typography color="error">Error: {error}</Typography>;
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
               <TableCell>Business Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Source</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Checked By</TableCell>
              {/* <TableCell className="w-52">Categories</TableCell> */}
              <TableCell>Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {scrapeData.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.name}</TableCell>
                <TableCell>
                  <div className="flex space-x-4 items-center">
                    <p>Approved </p>
                    <p className="">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-circle-check bg-green-500 rounded-full text-white "
                      >
                        <circle cx={12} cy={12} r={10} />
                        <path d="m9 12 2 2 4-4" />
                      </svg>
                    </p>
                  </div>
                </TableCell>
                <TableCell> Janet Snyder </TableCell>
                {/* <TableCell>{row.categories}</TableCell> */}
                <TableCell>
                  <IconButton
                    aria-label="edit"
                    onClick={() => handleEditClick(row)}
                  >
                    <Modal>
                      <ModalTrigger>
                        <EditIcon />
                      </ModalTrigger>
                      <ModalBody onClose={handleCloseModal}>
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
                                id="name"
                                value={selectedRow?.name || ""}
                                onChange={handleChange}
                                placeholder="Alpha LLC"
                                type="text"
                              />
                            </LabelInputContainer>

                            <LabelInputContainer className="mb-4">
                              <Label htmlFor="phoneNumber">Phone Number</Label>
                              <Input
                                id="phone"
                                value={selectedRow?.phone || ""}
                                onChange={handleChange}
                                placeholder="541-654-6168"
                                type="tel"
                              />
                            </LabelInputContainer>

                            <LabelInputContainer className="mb-4">
                              <Label htmlFor="address">Address</Label>
                              <Input
                                id="address"
                                value={selectedRow?.address || ""}
                                onChange={handleChange}
                                placeholder="123 Main St, London, UK"
                                type="text"
                              />
                            </LabelInputContainer>

                            <LabelInputContainer className="mb-4">
                              <Label htmlFor="website">Website</Label>
                              <Input
                                id="website"
                                value={selectedRow?.link || ""}
                                onChange={handleChange}
                                placeholder="https://www.alpha-llc.com"
                                type="url"
                              />
                            </LabelInputContainer>

                            <LabelInputContainer className="mb-4">
                              <Label htmlFor="moreInfo">More Info</Label>
                              <Input
                                id="moreInfo"
                                value={selectedRow?.other_info || ""}
                                onChange={handleChange}
                                placeholder="Additional details about the business"
                                type="text"
                              />
                            </LabelInputContainer>

                            <LabelInputContainer className="mb-4">
                              <Label htmlFor="extraPhones">Extra Phones</Label>
                              <Input
                                id="extraPhones"
                                value={selectedRow?.extra_phones || ""}
                                onChange={handleChange}
                                placeholder="041-564-5612"
                                type="tel"
                              />
                            </LabelInputContainer>

                            <LabelInputContainer className="mb-4">
                              <Label htmlFor="otherLink">Other Link</Label>
                              <Input
                                id="otherLink"
                                value={selectedRow?.other_links || ""}
                                onChange={handleChange}
                                placeholder="http://www.example.com"
                                type="url"
                              />
                            </LabelInputContainer>

                            <LabelInputContainer className="mb-4">
                              <Label htmlFor="cuisines">Cuisines</Label>
                              <Input
                                id="cuisines"
                                value={selectedRow?.cuisines || ""}
                                onChange={handleChange}
                                placeholder="Bed & Breakfast, Resorts, Guesthouses"
                                type="text"
                              />
                            </LabelInputContainer>

                            <LabelInputContainer className="mb-4">
                              <Label htmlFor="shortDetails">
                                Restaurant Short Description
                              </Label>
                              <Input
                                id="shortDetails"
                                value={selectedRow?.short_details || ""}
                                onChange={handleChange}
                                placeholder="A brief summary of the restaurant."
                                type="text"
                              />
                            </LabelInputContainer>
                            <LabelInputContainer className="mb-4 md:col-span-3">
                              <Label htmlFor="longDetails">
                                Restaurant Long Description
                              </Label>
                              <textarea
                                id="longDetails"
                                value={selectedRow?.long_details || ""}
                                onChange={handleChange}
                                placeholder="A detailed description of the restaurant's offerings and atmosphere."
                                rows={6} // Adjust the number of rows as needed
                                className="w-full h-40 p-3 text-lg  rounded-md"
                              />
                            </LabelInputContainer>
                          </div>
                          <div className="flex space-x-4 items-center justify-center ">
                            <button className="px-8 py-2 rounded-md bg-red-500 text-white font-bold transition duration-200 hover:bg-white hover:text-red-500 border-2 border-transparent hover:border-red-500">
                              Reject
                            </button>
                            <button className="px-8 py-2 rounded-md bg-teal-500 text-white font-bold transition duration-200 hover:bg-white hover:text-teal-500 border-2 border-transparent hover:border-teal-500">
                              Approved
                            </button>
                          </div>
                        </ModalContent>
                      </ModalBody>
                    </Modal>
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{ padding: "16px" }}>
        <Typography variant="body2">
          Page {page + 1} of {totalPages}
        </Typography>
      </div>
      <TablePagination
        rowsPerPageOptions={[10, 20]}
        component="div"
        count={totalRows}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </>
  );
};

export default DataTable;
