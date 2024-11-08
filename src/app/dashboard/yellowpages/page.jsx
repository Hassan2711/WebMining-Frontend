// "use client";
// import MainButtons from "@/components/MainButtons";
// import PageTitle from "@/components/PageTitle";
// import { useEffect, useState } from "react";
// import { BACKEND_URL } from "@/components/ui/Login";
// import YellowTablePaginator from "@/components/YellowTablePaginator";
// import Stack from '@mui/material/Stack';
// import { Pagination } from "@mui/material";
// import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

// const fetchTableData = async (page = 1, limit = 10) => {
//   const response = await fetch(
//     `${BACKEND_URL}/scraper/yellowpages/paginate?page=${page}&limit=${limit}`
//   );
//   const data = await response.json();
//   console.log("page",data)
//   return data;
// };

// export default function Page() {
//   const [btnStatus, setStatus] = useState(false);
//   const [scrapeData, setScrapeData] = useState("");
//   const [data, setData] = useState([]);
//   const [totalCount, setTotalCount] = useState(0);
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   // const [loading, setLoading] = useState(false);

//   // const ChangeButtonStatus = () => {
//   //   setStatus((prevStatus) => !prevStatus);
//   //   if (!btnStatus) {
//   //     setLoading(true);
//   //   }
//   // }

//   // async function fetchData() {
//   //   try {
//   //     const response = await fetch(
//   //       `${BACKEND_URL}/scraper/yellowpages/paginate?page=1&limit=10`,
//   //       {
//   //         method: "GET",
//   //         headers: {
//   //           "Content-Type": "application/x-www-form-urlencoded",
//   //         },
//   //       }
//   //     );

//   //     if (!response.ok) {
//   //       throw new Error(`HTTP error! status: ${response.status}`);
//   //     }

//   //     return await response.json();
//   //   } catch (error) {

//   //     return { error: error.message };
//   //   }
//   // }
//   // useEffect(() => {
//   //   async function loadData() {
//   //     const result = await fetchData();
//   //     if (result.error) {

//   //     } else {
//   //       setScrapeData(result.data);

//   //     }
//   //   }

//   //   loadData();
//   // }, []);

//   // const [isDialogOpen, setDialogOpen] = useState(false);

//   // const handleOpenDialog = () => {
//   //   setDialogOpen(true);
//   // };

//   // const handleCloseDialog = () => {
//   //   setDialogOpen(false);
//   // };

//   useEffect(() => {
//     const loadTableData = async () => {
//       const { data, total_pages } = await fetchTableData(page + 1, rowsPerPage);
//       setData(data);
//       setTotalCount(total_pages);
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
//     <div className="bg-indigo-50/70 h-auto ">
//       {/* <div>
//       <Button variant="contained" onClick={handleOpenDialog}>
//         Open Dialog from Parent
//       </Button>

//       <FullScreenDialog open={isDialogOpen} onClose={handleCloseDialog} />
//     </div> */}
//       <div>
//         <PageTitle text={"Yellow Pages"} />

//         <div className="bg-white m-6 border rounded-md ">
//           <MainButtons scriptName={"yellowpages"} />
//           {/* <TableDemo data={tableData} /> */}
//           {/* <PageTables /> */}
//           {/* <DataTable/> */}
//           <YellowTablePaginator
//             data={data}
//             totalCount={totalCount}
//             page={page}
//             rowsPerPage={rowsPerPage}
//             onChangePage={handleChangePage}
//             onChangeRowsPerPage={handleChangeRowsPerPage}
//           />
//             <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
//       <div className="flex flex-1 justify-between sm:hidden">
//         <a
//           href="#"
//           className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
//         >
//           Previous
//         </a>
//         <a
//           href="#"
//           className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
//         >
//           Next
//         </a>
//       </div>
//       <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
//         <div>
//           <p className="text-sm text-gray-700">
//             Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '}
//             <span className="font-medium">97</span> results
//           </p>
//         </div>
//         <div>
//           <nav aria-label="Pagination" className="isolate inline-flex -space-x-px rounded-md shadow-sm">
//             <a
//               href="#"
//               className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
//             >
//               <span className="sr-only">Previous</span>
//               <ChevronLeftIcon aria-hidden="true" className="h-5 w-5" />
//             </a>
//             {/* Current: "z-10 bg-primaryColor text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primaryColor", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
//             <a
//               href="#"
//               aria-current="page"
//               className="relative z-10 inline-flex items-center bg-primaryColor px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primaryColor"
//             >
//               1
//             </a>
//             <a
//               href="#"
//               className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
//             >
//               2
//             </a>
//             <a
//               href="#"
//               className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
//             >
//               3
//             </a>
//             <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
//               ...
//             </span>
//             <a
//               href="#"
//               className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
//             >
//               8
//             </a>
//             <a
//               href="#"
//               className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
//             >
//               9
//             </a>
//             <a
//               href="#"
//               className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
//             >
//               10
//             </a>
//             <a
//               href="#"
//               className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
//             >
//               <span className="sr-only">Next</span>
//               <ChevronRightIcon aria-hidden="true" className="h-5 w-5" />
//             </a>
//           </nav>
//         </div>
//       </div>
//     </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// "use client";
// import React, { useEffect, useState } from "react";
// import MainButtons from "@/components/MainButtons";
// import PageTitle from "@/components/PageTitle";
// import { BACKEND_URL } from "@/components/ui/Login";
// import YellowTablePaginator from "@/components/YellowTablePaginator";
// import Loader from "@/components/ui/Loader";
// import CustomPagination from "@/components/ui/CustomPagination";
// import { ModalProvider } from "@/components/ui/TableModal";
// import { Toaster } from "react-hot-toast";
// import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

// const fetchTableData = async (page = 1, limit = 10) => {
//   const response = await fetch(
//     `${BACKEND_URL}/scraper/yellowpages/paginate?page=${page}&limit=${limit}`
//   );
//   const data = await response.json();

//   return data;
// };

// export default function Page() {
//   const [data, setData] = useState([]);
//   const [totalCount, setTotalCount] = useState(0);
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const loadTableData = async () => {
//       setLoading(true);
//       const { data, total_pages } = await fetchTableData(page + 1, rowsPerPage);

//       setData(data);
//       setTotalCount(total_pages); // This updates the total count but asynchronously.
//       setLoading(false);
//     };

//     loadTableData();
//   }, [page, rowsPerPage]);

//   // Log `totalCount` when it updates.
//   useEffect(() => {}, [totalCount]);

//   // useEffect(() => {
//   //   const loadTableData = async () => {
//   //     setLoading(true);
//   //     const { data, total_pages } = await fetchTableData(page + 1, rowsPerPage);
//   //     console.log("useStatedata",data,total_pages)
//   //     setData(data);
//   //     setTotalCount(total_pages);
//   //     setLoading(false);
//   //     console.log("useStatedata111---",data,totalCount)
//   //   };
//   //   loadTableData();
//   // }, [page, rowsPerPage]);

//   const handleChangePage = (event, newPage) => {
//     setPage(event);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const totalPages = Math.ceil(totalCount / rowsPerPage);

//   return (
//     <div className="bg-indigo-50/70 h-auto ">
//       <div>
//         <PageTitle text={"Yellow Pages"} />
//         <div className="bg-white m-6 border rounded-md ">
//           <MainButtons scriptName={"yellowpages"} />
//           <FormControl fullWidth>
//             <InputLabel id="demo-simple-select-label">Filter</InputLabel>
//             <Select
//               labelId="demo-simple-select-label"
//               id="demo-simple-select"
//               label="Filter"
//             >
//               <MenuItem value="null">All</MenuItem>
//               <MenuItem value={"Approved"}>Approved</MenuItem>
//               <MenuItem value={"Rejected"}>Rejected</MenuItem>
//             </Select>
//           </FormControl>
//           <ModalProvider>
//             <YellowTablePaginator
//               data={data}
//               totalCount={totalCount}
//               page={page}
//               rowsPerPage={rowsPerPage}
//               onChangePage={handleChangePage}
//               onChangeRowsPerPage={handleChangeRowsPerPage}
//             />
//           </ModalProvider>
//           <Toaster position="top-right" reverseOrder={false} />
//           <CustomPagination
//             page={page}
//             totalPages={totalCount}
//             onChangePage={handleChangePage}
//             loading={loading}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";
import React, { useEffect, useState } from "react";
import MainButtons from "@/components/MainButtons";
import PageTitle from "@/components/PageTitle";
import { BACKEND_URL } from "@/components/ui/Login";
import YellowTablePaginator from "@/components/YellowTablePaginator";
import Loader from "@/components/ui/Loader";
import CustomPagination from "@/components/ui/CustomPagination";
import { ModalProvider } from "@/components/ui/TableModal";
import { Toaster } from "react-hot-toast";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Dropdown from "@/components/ui/DropDown";

const fetchTableData = async (page = 1, limit = 10, filter = "null") => {
  const filterParam = filter === "null" ? "" : `&filterBy=${filter}`;
  const url = `${BACKEND_URL}/scraper/yellowpages/paginate?page=${page}&limit=${limit}${filterParam}`;
  console.log("Fetching URL:", url); // Log URL
  const response = await fetch(url);
  const data = await response.json();
  console.log("Fetched data:", data); // Log data
  return data;
};


export default function Page() {
  const [data, setData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("null"); // New state for filter

  useEffect(() => {
    const loadTableData = async () => {
      setLoading(true);
      const { data, total_pages } = await fetchTableData(
        page + 1,
        rowsPerPage,
        filter
      );

      setData(data);
      setTotalCount(total_pages);
      setLoading(false);
    };

    loadTableData();
  }, [page, rowsPerPage, filter]); // Added filter to dependency array

  const handleChangePage = (event, newPage) => {
    setPage(event);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterChange = (event) => {
    const value = event.target.value;
    console.log("Selected filter:", value); // Debugging line
    setFilter(value === "null" ? "null" : value);
    setPage(0);
  };
  
  const totalPages = Math.ceil(totalCount / rowsPerPage);

  return (
    <div className="bg-indigo-50/70 h-auto ">
      <div>
        <PageTitle text={"Yellow Pages"} />
        <div className="bg-white m-1 md:m-6 border rounded-md ">
          <MainButtons scriptName={"yellowpages"} />
          <div className="mt-4 md:mt-0">
            <Dropdown filter={filter} onFilterChange={handleFilterChange} />
          </div>

          <ModalProvider>
            <YellowTablePaginator
              data={data}
              totalCount={totalCount}
              page={page}
              rowsPerPage={rowsPerPage}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </ModalProvider>
          <Toaster position="top-right" reverseOrder={false} />
          <CustomPagination
            page={page}
            totalPages={totalCount}
            onChangePage={handleChangePage}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}
