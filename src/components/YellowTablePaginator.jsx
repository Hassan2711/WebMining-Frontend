//  "use client";
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
// import {
//   Modal,
//   ModalTrigger,
//   ModalBody,
//   ModalContent,
// } from "@/components/ui/TableModal";
// import {
//   BACKEND_URL,
//   BottomGradient,
//   LabelInputContainer,
// } from "@/components/ui/Login";

// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import EditIcon from "@mui/icons-material/Edit";

// const fetchTableData = async (page = 1, limit = 10) => {
//   const response = await fetch(
//     `${BACKEND_URL}/scraper/yellowpages/paginate?page=${page}&limit=${limit}`
//   );
//   const data = await response.json();
//   return data;
// };

// const TablePaginator = () => {
//   const [data, setData] = useState([]);
//   const [totalCount, setTotalCount] = useState(0);
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [selectedRow, setSelectedRow] = useState(null);
//   const [visibleRows, setVisibleRows] = useState([]);

//   useEffect(() => {
//     const loadTableData = async () => {
//       const { data, total_count } = await fetchTableData(page + 1, rowsPerPage);
//       setData(data);
//       setTotalCount(total_count);
//       setVisibleRows([]); // Reset visible rows on data load

//       data.forEach((_, index) => {
//         setTimeout(() => {
//           setVisibleRows((prev) => [...prev, index]);
//         }, index * 1000); // Adjust delay time as needed (300ms here)
//       });
//     };

//     loadTableData();
//   }, [page, rowsPerPage]);

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0); // Reset to first page
//   };

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

//   return (
//     <Paper>
//       <TableContainer>
//         <Table>
//           <TableHead>
//             <TableRow>
//                <TableCell>Business Name</TableCell>

//               <TableCell>Status</TableCell>
//               <TableCell>Checked By</TableCell>
//               {/* <TableCell className="w-52">Categories</TableCell> */}
//               <TableCell>Edit</TableCell>
//               {/* Add more columns as needed */}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {data.map(
//               (row, index) =>
//                 visibleRows.includes(index) && (
//                   <TableRow className={``} key={row.id}>
//                     <TableCell>{row.name}</TableCell>
//                     <TableCell>
//                       <div className="flex space-x-4 items-center">
//                         <p>Approved </p>
//                         <p className="">
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             width={24}
//                             height={24}
//                             viewBox="0 0 24 24"
//                             fill="none"
//                             stroke="currentColor"
//                             strokeWidth={2}
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             className="lucide lucide-circle-check bg-green-500 rounded-full text-white "
//                           >
//                             <circle cx={12} cy={12} r={10} />
//                             <path d="m9 12 2 2 4-4" />
//                           </svg>
//                         </p>
//                       </div>
//                     </TableCell>
//                     <TableCell> Janet Snyder </TableCell>
//                     <TableCell>
//                       <IconButton
//                         aria-label="edit"
//                         onClick={() => handleEditClick(row)}
//                       >
//                         <Modal>
//                           <ModalTrigger>
//                             <EditIcon />
//                           </ModalTrigger>
//                           <ModalBody onClose={handleCloseModal}>
//                             <ModalContent>
//                               {/* <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-1">
//                                 Edit Here
//                               </h4> */}
//                               <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-2">
//                                 <LabelInputContainer className="mb-4">
//                                   <Label htmlFor="businessName">
//                                     Business Name
//                                   </Label>
//                                   <Input
//                                     id="name"
//                                     value={selectedRow?.name || ""}
//                                     onChange={handleChange}
//                                     placeholder="Alpha LLC"
//                                     type="text"
//                                   />
//                                 </LabelInputContainer>

//                                 <LabelInputContainer className="mb-4">
//                                   <Label htmlFor="phoneNumber">
//                                     Phone Number
//                                   </Label>
//                                   <Input
//                                     id="phone"
//                                     value={selectedRow?.phone || ""}
//                                     onChange={handleChange}
//                                     placeholder="541-654-6168"
//                                     type="tel"
//                                   />
//                                 </LabelInputContainer>

//                                 <LabelInputContainer className="mb-4">
//                                   <Label htmlFor="address">Address</Label>
//                                   <Input
//                                     id="address"
//                                     value={selectedRow?.address || ""}
//                                     onChange={handleChange}
//                                     placeholder="123 Main St, London, UK"
//                                     type="text"
//                                   />
//                                 </LabelInputContainer>

//                                 <LabelInputContainer className="mb-4">
//                                   <Label htmlFor="website">Website</Label>
//                                   <Input
//                                     id="website"
//                                     value={selectedRow?.link || ""}
//                                     onChange={handleChange}
//                                     placeholder="https://www.alpha-llc.com"
//                                     type="url"
//                                   />
//                                 </LabelInputContainer>

//                                 <LabelInputContainer className="mb-4">
//                                   <Label htmlFor="moreInfo">More Info</Label>
//                                   <Input
//                                     id="moreInfo"
//                                     value={selectedRow?.other_info || ""}
//                                     onChange={handleChange}
//                                     placeholder="Additional details about the business"
//                                     type="text"
//                                   />
//                                 </LabelInputContainer>

//                                 <LabelInputContainer className="mb-4">
//                                   <Label htmlFor="extraPhones">
//                                     Extra Phones
//                                   </Label>
//                                   <Input
//                                     id="extraPhones"
//                                     value={selectedRow?.extra_phones || ""}
//                                     onChange={handleChange}
//                                     placeholder="041-564-5612"
//                                     type="tel"
//                                   />
//                                 </LabelInputContainer>

//                                 <LabelInputContainer className="mb-4">
//                                   <Label htmlFor="otherLink">Other Link</Label>
//                                   <Input
//                                     id="otherLink"
//                                     value={selectedRow?.other_links || ""}
//                                     onChange={handleChange}
//                                     placeholder="http://www.example.com"
//                                     type="url"
//                                   />
//                                 </LabelInputContainer>

//                                 <LabelInputContainer className="mb-4">
//                                   <Label htmlFor="cuisines">Cuisines</Label>
//                                   <Input
//                                     id="cuisines"
//                                     value={selectedRow?.cuisines || ""}
//                                     onChange={handleChange}
//                                     placeholder="Bed & Breakfast, Resorts, Guesthouses"
//                                     type="text"
//                                   />
//                                 </LabelInputContainer>

//                                 <LabelInputContainer className="mb-4">
//                                   <Label htmlFor="shortDetails">
//                                     Restaurant Short Description
//                                   </Label>
//                                   <Input
//                                     id="shortDetails"
//                                     value={selectedRow?.short_details || ""}
//                                     onChange={handleChange}
//                                     placeholder="A brief summary of the restaurant."
//                                     type="text"
//                                   />
//                                 </LabelInputContainer>
//                                 <LabelInputContainer className="mb-4 md:col-span-3">
//                                   <Label htmlFor="longDetails">
//                                     Restaurant Long Description
//                                   </Label>
//                                   <textarea
//                                     id="longDetails"
//                                     value={selectedRow?.long_details || ""}
//                                     onChange={handleChange}
//                                     placeholder="A detailed description of the restaurant's offerings and atmosphere."
//                                     rows={6} // Adjust the number of rows as needed
//                                     className="w-full h-40 p-3 text-lg  rounded-md border border-black"
//                                   />
//                                 </LabelInputContainer>
//                               </div>
//                               <div className="flex space-x-4 items-center justify-center ">
//                                 <button className="px-8 py-2 rounded-md bg-red-500 text-white font-bold transition duration-200 hover:bg-white hover:text-red-500 border-2 border-transparent hover:border-red-500">
//                                   Reject
//                                 </button>
//                                 <button className="px-8 py-2 rounded-md bg-teal-500 text-white font-bold transition duration-200 hover:bg-white hover:text-teal-500 border-2 border-transparent hover:border-teal-500">
//                                   Approved
//                                 </button>
//                               </div>
//                             </ModalContent>
//                           </ModalBody>
//                         </Modal>
//                       </IconButton>
//                     </TableCell>
//                     {/* Add more cells as needed */}
//                   </TableRow>
//                 )
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
//         onPageChange={handleChangePage}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//       />
//     </Paper>
//   );
// };

// export default TablePaginator;

// "use client"

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
// import { BACKEND_URL } from "@/components/ui/Login";

// const fetchTableData = async (page = 1, limit = 10) => {
//   const response = await fetch(`${BACKEND_URL}/scraper/yellowpages/paginate?page=${page}&limit=${limit}`);
//   const data = await response.json();
//   return data;
// };

// const TablePaginator = () => {
//   const [data, setData] = useState([]);
//   const [totalCount, setTotalCount] = useState(0);
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [visibleRows, setVisibleRows] = useState([]);

//   useEffect(() => {
//     const loadTableData = async () => {
//       const { data, total_count } = await fetchTableData(page + 1, rowsPerPage);
//       setData(data);
//       setTotalCount(total_count);
//       setVisibleRows([]); // Reset visible rows on data load

//       data.forEach((_, index) => {
//         setTimeout(() => {
//           setVisibleRows((prev) => [...prev, index]);
//         }, index * 300); // Adjust delay time as needed (300ms here)
//       });
//     };

//     loadTableData();
//   }, [page, rowsPerPage]);

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0); // Reset to first page
//   };

//   return (
//     <TableContainer component={Paper}>
//       <Table>
//         <TableHead>
//           <TableRow>
//             <TableCell>ID</TableCell>
//             <TableCell>Name</TableCell>
//             <TableCell>Address</TableCell>
//             <TableCell>Phone</TableCell>
//             <TableCell>Link</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {data.map((row, index) => (
//             visibleRows.includes(index) && (
//               <TableRow
//                 key={row.id}
//                 className={`transition-opacity duration-500 ease-in-out opacity-0 animate-fadeIn`}
//               >
//                 <TableCell>{row.id}</TableCell>
//                 <TableCell>{row.name}</TableCell>
//                 <TableCell>{row.address}</TableCell>
//                 <TableCell>{row.phone}</TableCell>
//                 <TableCell>
//                   <IconButton onClick={() => handleEditClick(row)}>
//                     <EditIcon />
//                   </IconButton>
//                 </TableCell>
//               </TableRow>
//             )
//           ))}
//         </TableBody>
//       </Table>
//       <TablePagination
//         rowsPerPageOptions={[5, 10, 25]}
//         component="div"
//         count={totalCount}
//         rowsPerPage={rowsPerPage}
//         page={page}
//         onPageChange={handleChangePage}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//       />
//     </TableContainer>
//   );
// };

// export default TablePaginator;

// __________________________________________________________________________________

// components/TablePaginator.js
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
//   Stack,
//   Pagination,
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

// const YellowTablePaginator = ({
//   data,
//   totalCount,
//   page,
//   rowsPerPage,
//   onChangePage,
//   onChangeRowsPerPage,
// }) => {
//   const [selectedRow, setSelectedRow] = useState(null);
//   const [visibleRows, setVisibleRows] = useState([]); // State to manage visible rows
//   // console.log("data table:", data);
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
//                   <TableCell>{row.name}</TableCell>

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
//                             <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-1">
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
//                                     selectedRow?.name ||
//                                     ""
//                                   }
//                                   onChange={handleChange}
//                                   placeholder={
//                                     selectedRow?.name
//                                       ? "Alpha LLC"
//                                       : selectedRow?.name
//                                       ? "Title Placeholder"
//                                       : "Alpha LLC"
//                                   }
//                                   type="text"
//                                 />
//                               </LabelInputContainer>

//                               <LabelInputContainer className="mb-4">
//                                 <Label htmlFor="phoneNumber">
//                                   Phone Number
//                                 </Label>
//                                 <Input
//                                   id="phone"
//                                   value={selectedRow?.phone || ""}
//                                   onChange={handleChange}
//                                   placeholder="541-654-6168"
//                                   type="tel"
//                                 />
//                               </LabelInputContainer>

//                               <LabelInputContainer className="mb-4">
//                                 <Label htmlFor="address">Address</Label>
//                                 <Input
//                                   id="address"
//                                   value={selectedRow?.address || ""}
//                                   onChange={handleChange}
//                                   placeholder="123 Main St, London, UK"
//                                   type="text"
//                                 />
//                               </LabelInputContainer>

//                               <LabelInputContainer className="mb-4">
//                                 <Label htmlFor="link">Link</Label>
//                                 <Input
//                                   id="link"
//                                   value={selectedRow?.link || ""}
//                                   onChange={handleChange}
//                                   placeholder="https:www.alpha-llc.com"
//                                   type="url"
//                                 />
//                               </LabelInputContainer>

//                               <LabelInputContainer className="mb-4">
//                                 <Label htmlFor="neighborhoods">Neighborhoods</Label>
//                                 <Input
//                                   id="neighborhoods"
//                                   value={selectedRow?.neighborhoods || ""}
//                                   onChange={handleChange}
//                                   placeholder="Additional details about the business"
//                                   type="text"
//                                 />
//                               </LabelInputContainer>

//                               <LabelInputContainer className="mb-4">
//                                 <Label htmlFor="Claimed">Claimed </Label>
//                                 <Input
//                                   id="claimed"
//                                   value={selectedRow?.claimed || ""}
//                                   onChange={handleChange}
//                                   placeholder="041-564-5612"
//                                   type="tel"
//                                 />
//                               </LabelInputContainer>

//                               <LabelInputContainer className="mb-4">
//                                 <Label htmlFor="categories">Category</Label>
//                                 <Input
//                                   id="categories"
//                                   value={selectedRow?.categories || ""}
//                                   onChange={handleChange}
//                                   placeholder="Bed & Breakfast, Resorts, Guesthouses"
//                                   type="text"
//                                 />
//                               </LabelInputContainer>

//                               <LabelInputContainer className="mb-4">
//                                 <Label htmlFor="other_info">Other_info</Label>
//                                 <Input
//                                   id="other_info"
//                                   value={selectedRow?.other_info || ""}
//                                   onChange={handleChange}
//                                   placeholder="A brief summary of the restaurant."
//                                   type="text"
//                                 />
//                               </LabelInputContainer>
//                               <LabelInputContainer className="mb-4">
//                                 <Label htmlFor="email">Email</Label>
//                                 <Input
//                                   id="email"
//                                   value={selectedRow?.email || ""}
//                                   onChange={handleChange}
//                                   placeholder="A brief summary of the restaurant."
//                                   type="text"
//                                 />
//                               </LabelInputContainer>
//                               <LabelInputContainer className="mb-4">
//                                 <Label htmlFor="regular_hours">
//                                   Regular Hours
//                                 </Label>
//                                 <Input
//                                   id="regular_hours"
//                                   value={selectedRow?.regular_hours || ""}
//                                   onChange={handleChange}
//                                   placeholder="A brief summary of the restaurant."
//                                   type="text"
//                                 />
//                               </LabelInputContainer>
//                               <LabelInputContainer className="mb-4">
//                                 <Label htmlFor="general_info">
//                                   General Info
//                                 </Label>
//                                 <Input
//                                   id="general_info"
//                                   value={selectedRow?.general_info || ""}
//                                   onChange={handleChange}
//                                   placeholder="A brief summary of the restaurant."
//                                   type="text"
//                                 />
//                               </LabelInputContainer>
//                               <LabelInputContainer className="mb-4">
//                                 <Label htmlFor="services_products">
//                                   Services Products
//                                 </Label>
//                                 <Input
//                                   id="services_products"
//                                   value={selectedRow?.services_products || ""}
//                                   onChange={handleChange}
//                                   placeholder="A brief summary of the restaurant."
//                                   type="text"
//                                 />
//                               </LabelInputContainer>
//                               <LabelInputContainer className="mb-4">
//                                 <Label htmlFor="amenities">Amenities</Label>
//                                 <Input
//                                   id="amenities"
//                                   value={selectedRow?.amenities || ""}
//                                   onChange={handleChange}
//                                   placeholder="A brief summary of the restaurant."
//                                   type="text"
//                                 />
//                               </LabelInputContainer>
//                               <LabelInputContainer className="mb-4">
//                                 <Label htmlFor="languages">Languages</Label>
//                                 <Input
//                                   id="languages"
//                                   value={selectedRow?.languages || ""}
//                                   onChange={handleChange}
//                                   placeholder="A brief summary of the restaurant."
//                                   type="text"
//                                 />
//                               </LabelInputContainer>
//                               <LabelInputContainer className="mb-4">
//                                 <Label htmlFor="aka">aka</Label>
//                                 <Input
//                                   id="aka"
//                                   value={selectedRow?.aka || ""}
//                                   onChange={handleChange}
//                                   placeholder="A brief summary of the restaurant."
//                                   type="text"
//                                 />
//                               </LabelInputContainer>
//                               {/* <LabelInputContainer className="mb-4 md:col-span-3">
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

// export default YellowTablePaginator;

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
  Pagination,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import {
  Modal,
  ModalTrigger,
  ModalBody,
  ModalContent,
  useModal,
  ModalProvider,
} from "@/components/ui/TableModal";
import { BACKEND_URL, LabelInputContainer } from "@/components/ui/Login";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Cookies from "js-cookie";
import AnotherComponent from "./ApprovedButton";
import ApprovedButton from "./ApprovedButton";
import RejectButton from "./RejectButton";
import { Toaster } from "react-hot-toast";
import { fetchTableData } from "@/app/dashboard/yellowpages/page";
import { useRouter } from "next/router";
import BigModal from "./ui/BigModal";

export const submitData = async (
  id,
  editName,
  address,
  phone,
  link,
  email,
  regular_hours,
  claimed,
  general_info,
  services_products,
  neighborhoods,
  amenities,
  languages,
  aka,
  categories,
  other_info
) => {
  try {
    let response = await fetch(`http://localhost:3000/scraper/yellowpages/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        name: editName,
        address: address,
        phone: phone,
        link: link,
        email: email,
        regular_hours: regular_hours,
        claimed: claimed,
        general_info: general_info,
        services_products: services_products,
        neighborhoods: neighborhoods,
        amenities: amenities,
        languages: languages,
        aka: aka,
        social_links: "",
        categories: categories,
        other_info: other_info,
        other_links: "",
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
export const submitRejectData = async (
  id,
  editName,
  address,
  phone,
  link,
  email,
  regular_hours,
  claimed,
  general_info,
  services_products,
  neighborhoods,
  amenities,
  languages,
  aka,
  categories,
  other_info
) => {
  try {
    let response = await fetch(`http://localhost:3000/scraper/yellowpages/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        name: editName,
        address: address,
        phone: phone,
        link: link,
        email: email,
        regular_hours: regular_hours,
        claimed: claimed,
        general_info: general_info,
        services_products: services_products,
        neighborhoods: neighborhoods,
        amenities: amenities,
        languages: languages,
        aka: aka,
        social_links: "",
        categories: categories,
        other_info: other_info,
        other_links: "",
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

const YellowTablePaginator = ({
  data,
  totalCount,
  page,
  rowsPerPage,
  onChangePage,
  onChangeRowsPerPage,
  onSaveChanges,
}) => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [visibleRows, setVisibleRows] = useState([]);

  const [editName, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [link, setLink] = useState("");
  const [neighborhoods, setNeighborhoods] = useState("");
  const [claimed, setClaimed] = useState("");
  const [categories, setCategories] = useState("");
  const [other_info, setOtherInfo] = useState("");
  const [email, setEmail] = useState("");
  const [regular_hours, setRegularHours] = useState("");
  const [general_info, setGeneralInfo] = useState("");
  const [services_products, setServicesProducts] = useState("");
  const [amenities, setAmenities] = useState("");
  const [languages, setLanguages] = useState("");
  const [aka, setAka] = useState("");

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

  useEffect(() => {
    setVisibleRows([]);

    data?.forEach((_, index) => {
      setTimeout(() => {
        setVisibleRows((prev) => [...prev, index]);
      }, index * 0);
    });

    return () => {
      setVisibleRows([]);
    };
  }, [data]);

  useEffect(() => {
    if (selectedRow) {
      setName(selectedRow.name || "");
      setPhone(selectedRow.phone || "");
      setAddress(selectedRow.address || "");
      setLink(selectedRow.link || "");
      setNeighborhoods(selectedRow.neighborhoods || "");
      setClaimed(selectedRow.claimed || "");
      setCategories(selectedRow.categories || "");
      setOtherInfo(selectedRow.other_info || "");
      setEmail(selectedRow.email || "");
      setRegularHours(selectedRow.regular_hours || "");
      setGeneralInfo(selectedRow.general_info || "");
      setServicesProducts(selectedRow.services_products || "");
      setAmenities(selectedRow.amenities || "");
      setLanguages(selectedRow.languages || "");
      setAka(selectedRow.aka || "");
    }
  }, [selectedRow]);

  const handleEditClick = (row) => {
    setSelectedRow(row);
  };

  const handleCloseModal = () => {
    setSelectedRow(null);
  };

  const handleFieldChange = (setter) => (event) => {
    setter(event.target.value);
  };

  const handleSaveChanges = () => {
    if (selectedRow) {
      const updatedRow = {
        ...selectedRow,
        name,
        phone,
        address,
        link,
        neighborhoods,
        claimed,
        categories,
        other_info,
        email,
        regular_hours,
        general_info,
        services_products,
        amenities,
        languages,
        aka,
      };

      onSaveChanges(updatedRow);
      handleCloseModal();
    }
  };

  const handleApprove = async () => {
    if (selectedRow) {
      await submitData(
        selectedRow.id,
        editName,
        address,
        phone,
        link,
        email,
        regular_hours,
        claimed,
        general_info,
        services_products,
        neighborhoods,
        amenities,
        languages,
        aka,
        categories,
        other_info
      );
      setTimeout(() => {
        window.location.reload();
      }, 2000); // 2000 milliseconds = 2 seconds
    }
  };

  const handleReject = async () => {
    if (selectedRow) {
      submitRejectData(
        selectedRow.id,
        editName,
        address,
        phone,
        link,
        email,
        regular_hours,
        claimed,
        general_info,
        services_products,
        neighborhoods,
        amenities,
        languages,
        aka,
        categories,
        other_info
      );
      setTimeout(() => {
        window.location.reload();
      }, 2000); // 2000 milliseconds = 2 seconds
    }
  };

  const getStatusText = (statusTag) => {
    if (statusTag === "Approved" || statusTag === "Rejected") {
      return statusTag;
    }
    return "N/A";
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
              <TableCell align="left">Checked By</TableCell>
              <TableCell>Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) =>
              visibleRows.includes(index) ? (
                <TableRow key={row.id}>
                  <TableCell>{row.name}</TableCell>
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
                  <TableCell className="capitalize text-center font-semibold mx-auto">
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
  <div className="">
    <ModalBody className="" onClose={handleCloseModal}>
      <ModalContent>
        <h4 className="text-sm md:text-lg text-neutral-600 dark:text-neutral-100 font-bold text-center mb-1">
          Edit Here
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-1 ">
          <LabelInputContainer className="mb-1">
            <Label htmlFor="name" className="text-xs">Business Name</Label>
            <Input
              id="name"
              value={editName}
              onChange={handleFieldChange(setName)}
              placeholder="Alpha LLC"
              type="text"
              className="text-xs"
            />
          </LabelInputContainer>

          <LabelInputContainer className="mb-1">
            <Label htmlFor="phone" className="text-xs">Phone Number</Label>
            <Input
              id="phone"
              value={phone}
              onChange={handleFieldChange(setPhone)}
              placeholder="541-654-6168"
              type="tel"
              className="text-xs"
            />
          </LabelInputContainer>

          <LabelInputContainer className="mb-1 md:col-span-3">
            <Label htmlFor="categories" className="text-xs">Category</Label>
            <Input
              id="categories"
              value={categories}
              onChange={handleFieldChange(setCategories)}
              placeholder="Bed & Breakfast, Resorts, Guesthouses"
              type="text"
              className="text-xs"
            />
          </LabelInputContainer>


          <LabelInputContainer className="mb-1 md:col-span-2">
            <Label htmlFor="address" className="text-xs">Address</Label>
            <Input
              id="address"
              value={address}
              onChange={handleFieldChange(setAddress)}
              placeholder="123 Main St, London, UK"
              type="text"
              className="text-xs"
            />
          </LabelInputContainer>

          <LabelInputContainer className="mb-1 md:col-span-3">
            <Label htmlFor="link" className="text-xs">Link</Label>
            <Input
              id="link"
              value={link}
              onChange={handleFieldChange(setLink)}
              placeholder="https://www.alpha-llc.com"
              type="url"
              className="text-xs"
            />
          </LabelInputContainer>

          <LabelInputContainer className="mb-1 md:col-span-2">
            <Label htmlFor="neighborhoods" className="text-xs">Neighborhoods</Label>
            <Input
              id="neighborhoods"
              value={neighborhoods}
              onChange={handleFieldChange(setNeighborhoods)}
              placeholder="Additional details about the business"
              type="text"
              className="text-xs"
            />
          </LabelInputContainer>

          <LabelInputContainer className="mb-1 md:col-span-3">
            <Label htmlFor="other_info" className="text-xs">Other Info</Label>
            <Input
              id="other_info"
              value={other_info}
              onChange={handleFieldChange(setOtherInfo)}
              placeholder="A brief summary of the restaurant."
              type="text"
              className="text-xs"
            />
          </LabelInputContainer>





          <LabelInputContainer className="mb-1 md:col-span-5">
            <Label htmlFor="general_info" className="text-xs">General Info</Label>
            <Input
              id="general_info"
              value={general_info}
              onChange={handleFieldChange(setGeneralInfo)}
              placeholder="A brief summary of the restaurant."
              type="text"
              className="text-xs"
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-1">
            <Label htmlFor="email" className="text-xs">Email</Label>
            <Input
              id="email"
              value={email}
              onChange={handleFieldChange(setEmail)}
              placeholder="example@example.com"
              type="email"
              className="text-xs"
            />
          </LabelInputContainer>

          <LabelInputContainer className="mb-1">
            <Label htmlFor="regular_hours" className="text-xs">Regular Hours</Label>
            <Input
              id="regular_hours"
              value={regular_hours}
              onChange={handleFieldChange(setRegularHours)}
              placeholder="9 AM - 5 PM"
              type="text"
              className="text-xs"
            />
          </LabelInputContainer>

          <LabelInputContainer className="mb-1">
            <Label htmlFor="services_products" className="text-xs">Services Products</Label>
            <Input
              id="services_products"
              value={services_products}
              onChange={handleFieldChange(setServicesProducts)}
              placeholder="A brief summary of the restaurant."
              type="text"
              className="text-xs"
            />
          </LabelInputContainer>

          <LabelInputContainer className="mb-1">
            <Label htmlFor="amenities" className="text-xs">Amenities</Label>
            <Input
              id="amenities"
              value={amenities}
              onChange={handleFieldChange(setAmenities)}
              placeholder="A brief summary of the restaurant."
              type="text"
              className="text-xs"
            />
          </LabelInputContainer>

          <LabelInputContainer className="mb-1">
            <Label htmlFor="languages" className="text-xs">Languages</Label>
            <Input
              id="languages"
              value={languages}
              onChange={handleFieldChange(setLanguages)}
              placeholder="A brief summary of the restaurant."
              type="text"
              className="text-xs"
            />
          </LabelInputContainer>

          <LabelInputContainer className="mb-1">
            <Label htmlFor="aka" className="text-xs">AKA</Label>
            <Input
              id="aka"
              value={aka}
              onChange={handleFieldChange(setAka)}
              placeholder="A brief summary of the restaurant."
              type="text"
              className="text-xs"
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-1">
            <Label htmlFor="claimed" className="text-xs">Claimed</Label>
            <Input
              id="claimed"
              value={claimed}
              onChange={handleFieldChange(setClaimed)}
              placeholder="041-564-5612"
              type="tel"
              className="text-xs"
            />
          </LabelInputContainer>
        </div>

        <div className="flex space-x-2 items-center justify-center">
          <div onClick={handleReject}>
            <RejectButton />
          </div>
          <div onClick={handleApprove}>
            <ApprovedButton />
          </div>
        </div>
      </ModalContent>
    </ModalBody>
  </div>
</Modal>

                    </IconButton> */}
                    <div onClick={() => handleEditClick(row)}>
                      <BigModal>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-1 p-4 ">
                          <LabelInputContainer className="mb-1">
                            <Label htmlFor="name" className="text-xs">
                              Business Name
                            </Label>
                            <Input
                              id="name"
                              value={editName}
                              onChange={handleFieldChange(setName)}
                              placeholder="Alpha LLC"
                              type="text"
                              className="text-xs"
                            />
                          </LabelInputContainer>

                          <LabelInputContainer className="mb-1">
                            <Label htmlFor="phone" className="text-xs">
                              Phone Number
                            </Label>
                            <Input
                              id="phone"
                              value={phone}
                              onChange={handleFieldChange(setPhone)}
                              placeholder="541-654-6168"
                              type="tel"
                              className="text-xs"
                            />
                          </LabelInputContainer>

                          <LabelInputContainer className="mb-1">
                            <Label htmlFor="categories" className="text-xs">
                              Category
                            </Label>
                            <Input
                              id="categories"
                              value={categories}
                              onChange={handleFieldChange(setCategories)}
                              placeholder="Bed & Breakfast, Resorts, Guesthouses"
                              type="text"
                              className="text-xs"
                            />
                          </LabelInputContainer>

                          <LabelInputContainer className="mb-1">
                            <Label htmlFor="address" className="text-xs">
                              Address
                            </Label>
                            <Input
                              id="address"
                              value={address}
                              onChange={handleFieldChange(setAddress)}
                              placeholder="123 Main St, London, UK"
                              type="text"
                              className="text-xs"
                            />
                          </LabelInputContainer>

                          <LabelInputContainer className="mb-1">
                            <Label htmlFor="link" className="text-xs">
                              Link
                            </Label>
                            <Input
                              id="link"
                              value={link}
                              onChange={handleFieldChange(setLink)}
                              placeholder="https://www.alpha-llc.com"
                              type="url"
                              className="text-xs"
                            />
                          </LabelInputContainer>

                          <LabelInputContainer className="mb-1 ">
                            <Label htmlFor="neighborhoods" className="text-xs">
                              Neighborhoods
                            </Label>
                            <Input
                              id="neighborhoods"
                              value={neighborhoods}
                              onChange={handleFieldChange(setNeighborhoods)}
                              placeholder="Additional details about the business"
                              type="text"
                              className="text-xs"
                            />
                          </LabelInputContainer>

                          <LabelInputContainer className="mb-1 ">
                            <Label htmlFor="other_info" className="text-xs">
                              Other Info
                            </Label>
                            <Input
                              id="other_info"
                              value={other_info}
                              onChange={handleFieldChange(setOtherInfo)}
                              placeholder="A brief summary of the restaurant."
                              type="text"
                              className="text-xs"
                            />
                          </LabelInputContainer>


                          <LabelInputContainer className="mb-1">
                            <Label htmlFor="email" className="text-xs">
                              Email
                            </Label>
                            <Input
                              id="email"
                              value={email}
                              onChange={handleFieldChange(setEmail)}
                              placeholder="example@example.com"
                              type="email"
                              className="text-xs"
                            />
                          </LabelInputContainer>

                          <LabelInputContainer className="mb-1">
                            <Label htmlFor="regular_hours" className="text-xs">
                              Regular Hours
                            </Label>
                            <Input
                              id="regular_hours"
                              value={regular_hours}
                              onChange={handleFieldChange(setRegularHours)}
                              placeholder="9 AM - 5 PM"
                              type="text"
                              className="text-xs"
                            />
                          </LabelInputContainer>

                          <LabelInputContainer className="mb-1">
                            <Label
                              htmlFor="services_products"
                              className="text-xs"
                            >
                              Services Products
                            </Label>
                            <Input
                              id="services_products"
                              value={services_products}
                              onChange={handleFieldChange(setServicesProducts)}
                              placeholder="A brief summary of the restaurant."
                              type="text"
                              className="text-xs"
                            />
                          </LabelInputContainer>

                          <LabelInputContainer className="mb-1">
                            <Label htmlFor="amenities" className="text-xs">
                              Amenities
                            </Label>
                            <Input
                              id="amenities"
                              value={amenities}
                              onChange={handleFieldChange(setAmenities)}
                              placeholder="A brief summary of the restaurant."
                              type="text"
                              className="text-xs"
                            />
                          </LabelInputContainer>

                          <LabelInputContainer className="mb-1">
                            <Label htmlFor="languages" className="text-xs">
                              Languages
                            </Label>
                            <Input
                              id="languages"
                              value={languages}
                              onChange={handleFieldChange(setLanguages)}
                              placeholder="A brief summary of the restaurant."
                              type="text"
                              className="text-xs"
                            />
                          </LabelInputContainer>

                          <LabelInputContainer className="mb-1">
                            <Label htmlFor="aka" className="text-xs">
                              AKA
                            </Label>
                            <Input
                              id="aka"
                              value={aka}
                              onChange={handleFieldChange(setAka)}
                              placeholder="A brief summary of the restaurant."
                              type="text"
                              className="text-xs"
                            />
                          </LabelInputContainer>
                          <LabelInputContainer className="mb-1">
                            <Label htmlFor="claimed" className="text-xs">
                              Claimed
                            </Label>
                            <Input
                              id="claimed"
                              value={claimed}
                              onChange={handleFieldChange(setClaimed)}
                              placeholder="041-564-5612"
                              type="tel"
                              className="text-xs"
                            />
                          </LabelInputContainer>
                          <LabelInputContainer className="mb-1 md:col-span-2">
                            <Label htmlFor="general_info" className="text-xs">
                              General Info
                            </Label>
                            <Input
                              id="general_info"
                              value={general_info}
                              onChange={handleFieldChange(setGeneralInfo)}
                              placeholder="A brief summary of the restaurant."
                              type="text"
                              className="text-xs"
                            />
                          </LabelInputContainer>
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

export default YellowTablePaginator;
