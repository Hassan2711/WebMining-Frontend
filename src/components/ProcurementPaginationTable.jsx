// "use client";
// import React, { useState, useEffect } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TablePagination,
//   Paper,
//   IconButton,
// } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import {
//   Modal,
//   ModalTrigger,
//   ModalBody,
//   ModalContent,
// } from "@/components/ui/TableModal";
// import { LabelInputContainer } from "@/components/ui/Login";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";

// const ProcurementTablePaginator = ({
//   data,
//   totalCount,
//   page,
//   rowsPerPage,
//   onChangePage,
//   onChangeRowsPerPage,
// }) => {
//   const [selectedRow, setSelectedRow] = useState(null);
//   const [visibleRows, setVisibleRows] = useState([]); // State to manage visible rows
//   console.log("data table:", data);
//   // Effect to control the delayed rendering of rows
//   useEffect(() => {
//     setVisibleRows([]); // Reset visible rows on data load

//     data.forEach((_, index) => {
//       setTimeout(() => {
//         setVisibleRows((prev) => [...prev, index]);
//       }, index * 300); // Adjust delay time as needed (300ms here)
//     });

//     return () => {
//       setVisibleRows([]); // Cleanup timeout when data changes
//     };
//   }, [data]);

//   const handleEditClick = (row) => {
//     setSelectedRow(row); // Set the selected row data
//   };

//   const handleCloseModal = () => {
//     setSelectedRow(null); // Clear the selected row data when closing the modal
//   };

//   const handleChange = (event) => {
//     setSelectedRow({
//       ...selectedRow,
//       [event.target.id]: event.target.value,
//     });
//   };

//   if (!data || data.length === 0) {
//     return (
//       <Paper className="p-4 text-center">
//         <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold">
//           No data available
//         </h4>
//         <p>Please check back later</p>
//       </Paper>
//     );
//   }

//   return (
//     <Paper>
//       <TableContainer>
//         <Table>
//           <TableHead>
//             <TableRow>
//                <TableCell>Business Name</TableCell>

//               <TableCell>Status</TableCell>
//               <TableCell>Checked By</TableCell>
//               <TableCell>Edit</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {data.map((row, index) =>
//               visibleRows.includes(index) ? (
//                 <TableRow key={row.id}>
//                   <TableCell>
//                     {row.name ? row.name : row.title ? row.title : "N/A"}
//                   </TableCell>

//                   <TableCell>
//                     <div className="flex space-x-4 items-center">
//                       <p>Approved</p>
//                       <p>
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           width={24}
//                           height={24}
//                           viewBox="0 0 24 24"
//                           fill="none"
//                           stroke="currentColor"
//                           strokeWidth={2}
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           className="lucide lucide-circle-check bg-green-500 rounded-full text-white"
//                         >
//                           <circle cx={12} cy={12} r={10} />
//                           <path d="m9 12 2 2 4-4" />
//                         </svg>
//                       </p>
//                     </div>
//                   </TableCell>
//                    <TableCell align="center" className="capitalize text-center font-semibold mx-auto">{getUser || "Jared"}</TableCell>
//                   <TableCell>
//                     <IconButton
//                       aria-label="edit"
//                       onClick={() => handleEditClick(row)}
//                     >
//                       <Modal>
//                         <ModalTrigger>
//                           <EditIcon />
//                         </ModalTrigger>

//                         <ModalBody onClose={handleCloseModal}>
//                           <ModalContent>
//                             <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-2">
//                               Edit Here
//                             </h4>
//                             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-2">
//                               <LabelInputContainer className="mb-4">
//                                 <Label htmlFor="businessName">
//                                   Business Name
//                                 </Label>
//                                 <Input
//                                   id="name"
//                                   value={
//                                     selectedRow?.title ||
//                                     selectedRow?.title ||
//                                     ""
//                                   }
//                                   onChange={handleChange}
//                                   placeholder={
//                                     selectedRow?.name
//                                       ? "Alpha LLC"
//                                       : selectedRow?.title
//                                       ? "Title Placeholder"
//                                       : "Alpha LLC"
//                                   }
//                                   type="text"
//                                 />
//                               </LabelInputContainer>

//                               <LabelInputContainer className="mb-4">
//                                 <Label htmlFor="phoneNumber">Due Date</Label>
//                                 <Input
//                                   id="phone"
//                                   value={selectedRow?.due_date || ""}
//                                   onChange={handleChange}
//                                   placeholder="541-654-6168"
//                                   type="tel"
//                                 />
//                               </LabelInputContainer>

//                               <LabelInputContainer className="mb-4">
//                                 <Label htmlFor="address">organization</Label>
//                                 <Input
//                                   id="address"
//                                   value={selectedRow?.Organization || ""}
//                                   onChange={handleChange}
//                                   placeholder="123 Main St, London, UK"
//                                   type="text"
//                                 />
//                               </LabelInputContainer>

//                               <LabelInputContainer className="mb-4">
//                                 <Label htmlFor="website">Release Date</Label>
//                                 <Input
//                                   id="website"
//                                   value={selectedRow?.release_date || ""}
//                                   onChange={handleChange}
//                                   placeholder="https:www.alpha-llc.com"
//                                   type="url"
//                                 />
//                               </LabelInputContainer>

//                               <LabelInputContainer className="mb-4">
//                                 <Label htmlFor="moreInfo">State</Label>
//                                 <Input
//                                   id="moreInfo"
//                                   value={selectedRow?.state || ""}
//                                   onChange={handleChange}
//                                   placeholder="Additional details about the business"
//                                   type="text"
//                                 />
//                               </LabelInputContainer>

//                               {/* <LabelInputContainer className="mb-4">
//                                 <Label htmlFor="extraPhones">
//                                   Extra Phones
//                                 </Label>
//                                 <Input
//                                   id="extraPhones"
//                                   value={selectedRow?.extra_phones || ""}
//                                   onChange={handleChange}
//                                   placeholder="041-564-5612"
//                                   type="tel"
//                                 />
//                               </LabelInputContainer>

//                               <LabelInputContainer className="mb-4">
//                                 <Label htmlFor="otherLink">Other Link</Label>
//                                 <Input
//                                   id="otherLink"
//                                   value={selectedRow?.other_links || ""}
//                                   onChange={handleChange}
//                                   placeholder="http:www.example.com"
//                                   type="url"
//                                 />
//                               </LabelInputContainer>

//                               <LabelInputContainer className="mb-4">
//                                 <Label htmlFor="cuisines">Cuisines</Label>
//                                 <Input
//                                   id="cuisines"
//                                   value={selectedRow?.cuisines || ""}
//                                   onChange={handleChange}
//                                   placeholder="Bed & Breakfast, Resorts, Guesthouses"
//                                   type="text"
//                                 />
//                               </LabelInputContainer>

//                               <LabelInputContainer className="mb-4">
//                                 <Label htmlFor="shortDetails">
//                                   Restaurant Short Description
//                                 </Label>
//                                 <Input
//                                   id="shortDetails"
//                                   value={selectedRow?.short_details || ""}
//                                   onChange={handleChange}
//                                   placeholder="A brief summary of the restaurant."
//                                   type="text"
//                                 />
//                               </LabelInputContainer>
//                               <LabelInputContainer className="mb-4 md:col-span-3">
//                                 <Label htmlFor="longDetails">
//                                   Restaurant Long Description
//                                 </Label>
//                                 <textarea
//                                   id="longDetails"
//                                   value={selectedRow?.long_details || ""}
//                                   onChange={handleChange}
//                                   placeholder="A detailed description of the restaurant's offerings and atmosphere."
//                                   rows={6}
//                                   className="w-full h-40 p-3 text-lg  rounded-md border border-black"
//                                 />
//                               </LabelInputContainer> */}
//                             </div>
//                             <div className="flex space-x-4 items-center justify-center ">
//                               <button className="px-8 py-2 rounded-md bg-red-500 text-white font-bold transition duration-200 hover:bg-white hover:text-red-500 border-2 border-transparent hover:border-red-500">
//                                 Reject
//                               </button>
//                               <button className="px-8 py-2 rounded-md bg-teal-500 text-white font-bold transition duration-200 hover:bg-white hover:text-teal-500 border-2 border-transparent hover:border-teal-500">
//                                 Approved
//                               </button>
//                             </div>
//                           </ModalContent>
//                         </ModalBody>
//                       </Modal>
//                     </IconButton>
//                   </TableCell>
//                 </TableRow>
//               ) : null
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <TablePagination
//         rowsPerPageOptions={[10, 25, 50, 250, 500, 1000]}
//         component="div"
//         count={totalCount}
//         rowsPerPage={rowsPerPage}
//         page={page}
//         onPageChange={onChangePage}
//         onRowsPerPageChange={onChangeRowsPerPage}
//       />
//     </Paper>
//   );
// };

// export default ProcurementTablePaginator;

"use client";
import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import {
  Modal,
  ModalTrigger,
  ModalBody,
  ModalContent,
} from "@/components/ui/TableModal";
import { LabelInputContainer } from "@/components/ui/Login";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import RejectButton from "./RejectButton";
import ApprovedButton from "./ApprovedButton";
import BigModal from "./ui/BigModal";

const ProcurementTablePaginator = ({
  data,
  totalCount,
  page,
  rowsPerPage,
  onChangePage,
  onChangeRowsPerPage,
  onSaveChanges, // Callback for saving changes
  onReject, // Callback for rejecting changes
  onApprove, // Callback for approving changes
}) => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [visibleRows, setVisibleRows] = useState([]); // State to manage visible rows

  // Separate states for each field
  const [name, setName] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [organization, setOrganization] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [state, setState] = useState("");

  const submitData = async (id) => {
    try {
      let response = await fetch(`http://localhost:3000/scraper/yellowpages/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          title: name,
          organization: organization,
          state: state,
          release_date: releaseDate,
          due_date: dueDate,
          status: "Approved",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error:", errorData);
        return;
      } else {
        const dateresponse = await response.json();
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };
  const submitRejectData = async (id) => {
    try {
      let response = await fetch(`http://localhost:3000/scraper/yellowpages/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          title: name,
          organization: organization,
          state: state,
          release_date: releaseDate,
          due_date: dueDate,
          status: "Rejected",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error:", errorData);
        return;
      } else {
        const dateresponse = await response.json();
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const getStatusText = (statusTag) => {
    if (statusTag === "Approved" || statusTag === "Rejected") {
      return statusTag;
    }
    return "N/A";
  };

  const deleteData = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/scraper/yellowpages/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        return;
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  // Effect to control the delayed rendering of rows
  useEffect(() => {
    setVisibleRows([]); // Reset visible rows on data load

    data.forEach((_, index) => {
      setTimeout(() => {
        setVisibleRows((prev) => [...prev, index]);
      }, index * 0); // Adjust delay time as needed (300ms here)
    });

    return () => {
      setVisibleRows([]); // Cleanup timeout when data changes
    };
  }, [data]);

  useEffect(() => {
    if (selectedRow) {
      setName(selectedRow.name || "");
      setDueDate(selectedRow.due_date || "");
      setOrganization(selectedRow.organization || "");
      setReleaseDate(selectedRow.release_date || "");
      setState(selectedRow.state || "");
    }
  }, [selectedRow]);

  const handleEditClick = (row) => {
    setSelectedRow(row); // Set the selected row data
  };

  const handleCloseModal = () => {
    setSelectedRow(null); // Clear the selected row data when closing the modal
  };

  const handleFieldChange = (setter) => (event) => {
    setter(event.target.value);
  };

  const handleSaveChanges = () => {
    if (selectedRow) {
      const updatedRow = {
        ...selectedRow,
        name,
        due_date: dueDate,
        organization,
        release_date: releaseDate,
        state,
      };

      onSaveChanges(updatedRow); // Call the callback to save changes
      handleCloseModal();
    }
  };

  const handleApprove = async () => {
    if (selectedRow) {
      await submitData(selectedRow.id);
      setTimeout(() => {
        window.location.reload();
      }, 2000); // 2000 milliseconds = 2 seconds
    }
  };

  const handleReject = async () => {
    if (selectedRow) {
      await submitRejectData(selectedRow.id);
      setTimeout(() => {
        window.location.reload();
      }, 2000); // 2000 milliseconds = 2 seconds
    }
  };

  let getUser = localStorage.getItem("userName");

  if (!data || data.length === 0) {
    return (
      <Paper className="p-4 text-center">
        <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold">
          No data available
        </h4>
        <p>Please check back later</p>
      </Paper>
    );
  }

  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Business Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Source</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Checked By</TableCell>
              <TableCell>Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) =>
              visibleRows.includes(index) ? (
                <TableRow key={row.id}>
                  <TableCell>
                    {row.name ? row.name : row.title ? row.title : "N/A"}
                  </TableCell>
                  <TableCell>{row.categories || "N/A"}</TableCell>
                  <TableCell>{row.source || "N/A"}</TableCell>
                  <TableCell>
                    <div className="flex space-x-4 items-center">
                      <p className="capitalize">{getStatusText(row.status)}</p>
                      <p>
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
                          className={`lucide lucide-circle-check ${
                            row.status === "Rejected" && "bg-red-500"
                          } ${row.status === "Approved" && "bg-green-500"} 
                          ${
                            getStatusText(row.status) === "N/A" && "bg-gray-500"
                          } 
                          rounded-full text-white`}
                        >
                          <circle cx={12} cy={12} r={10} />
                          <path d="m9 12 2 2 4-4" />
                        </svg>
                      </p>
                    </div>
                  </TableCell>
                  <TableCell
                    align="center"
                    className="capitalize text-center font-semibold mx-auto"
                  >
                    {getUser || "Jared"}
                  </TableCell>
                  <TableCell>
                    {/* <IconButton
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
                                <Label htmlFor="name">Business Name</Label>
                                <Input
                                  id="name"
                                  value={name}
                                  onChange={handleFieldChange(setName)}
                                  placeholder="Business Name"
                                  type="text"
                                />
                              </LabelInputContainer>

                              <LabelInputContainer className="mb-4">
                                <Label htmlFor="dueDate">Due Date</Label>
                                <Input
                                  id="dueDate"
                                  value={dueDate}
                                  onChange={handleFieldChange(setDueDate)}
                                  placeholder="Due Date"
                                  type="text"
                                />
                              </LabelInputContainer>

                              <LabelInputContainer className="mb-4">
                                <Label htmlFor="organization">
                                  Organization
                                </Label>
                                <Input
                                  id="organization"
                                  value={organization}
                                  onChange={handleFieldChange(setOrganization)}
                                  placeholder="Organization"
                                  type="text"
                                />
                              </LabelInputContainer>

                              <LabelInputContainer className="mb-4">
                                <Label htmlFor="releaseDate">
                                  Release Date
                                </Label>
                                <Input
                                  id="releaseDate"
                                  value={releaseDate}
                                  onChange={handleFieldChange(setReleaseDate)}
                                  placeholder="Release Date"
                                  type="text"
                                />
                              </LabelInputContainer>

                              <LabelInputContainer className="mb-4">
                                <Label htmlFor="state">State</Label>
                                <Input
                                  id="state"
                                  value={state}
                                  onChange={handleFieldChange(setState)}
                                  placeholder="State"
                                  type="text"
                                />
                              </LabelInputContainer>
                            </div>
                            <div className="flex space-x-4 items-center justify-center">
                                <div onClick={handleReject}>
                                  <RejectButton />
                                </div>
                                <div onClick={handleApprove}>
                                  <ApprovedButton />
                                </div>
                              </div>
                          </ModalContent>
                        </ModalBody>
                      </Modal>
                    </IconButton> */}
                    <div onClick={() => handleEditClick(row)}>
                      <BigModal>
                        <div className="grid grid-cols-1 md:grid-cols-1 gap-4 p-4">
                          <LabelInputContainer className="mb-4">
                            <Label htmlFor="name">Business Name</Label>
                            <Input
                              id="name"
                              value={name}
                              onChange={handleFieldChange(setName)}
                              placeholder="Business Name"
                              type="text"
                            />
                          </LabelInputContainer>

                          <LabelInputContainer className="mb-4">
                            <Label htmlFor="dueDate">Due Date</Label>
                            <Input
                              id="dueDate"
                              value={dueDate}
                              onChange={handleFieldChange(setDueDate)}
                              placeholder="Due Date"
                              type="text"
                            />
                          </LabelInputContainer>

                          <LabelInputContainer className="mb-4">
                            <Label htmlFor="organization">Organization</Label>
                            <Input
                              id="organization"
                              value={organization}
                              onChange={handleFieldChange(setOrganization)}
                              placeholder="Organization"
                              type="text"
                            />
                          </LabelInputContainer>

                          <LabelInputContainer className="mb-4">
                            <Label htmlFor="releaseDate">Release Date</Label>
                            <Input
                              id="releaseDate"
                              value={releaseDate}
                              onChange={handleFieldChange(setReleaseDate)}
                              placeholder="Release Date"
                              type="text"
                            />
                          </LabelInputContainer>

                          <LabelInputContainer className="mb-4">
                            <Label htmlFor="state">State</Label>
                            <Input
                              id="state"
                              value={state}
                              onChange={handleFieldChange(setState)}
                              placeholder="State"
                              type="text"
                            />
                          </LabelInputContainer>
                        </div>
                        <div className="flex space-x-4 items-center justify-center">
                          <div onClick={handleReject}>
                            <RejectButton />
                          </div>
                          <div onClick={handleApprove}>
                            <ApprovedButton />
                          </div>
                        </div>
                      </BigModal>
                    </div>
                  </TableCell>
                </TableRow>
              ) : null
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <TablePagination
        rowsPerPageOptions={[10, 25, 50, 250, 500, 1000]}
        component="div"
        count={totalCount}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={onChangePage}
        onRowsPerPageChange={onChangeRowsPerPage}
      /> */}
    </Paper>
  );
};

export default ProcurementTablePaginator;
