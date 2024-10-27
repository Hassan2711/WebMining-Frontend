"use client";
import MainButtons from "@/components/MainButtons";
import PageTitle from "@/components/PageTitle";
import { useEffect, useState } from "react";
// import { BACKEND_URL } from "@/components/ui/Login";
import ProcurementTablePaginator from "@/components/ProcurementPaginationTable";
import CustomPagination from "@/components/ui/CustomPagination";
import { ModalProvider } from "@/components/ui/TableModal";
import Dropdown from "@/components/ui/DropDown";

const fetchTableData = async (page = 1, limit = 10, filter = "null") => {
  const response = await fetch(
    // `${BACKEND_URL}/scraper/procurement/paginate?page=${page}&limit=${limit}&filterBy=${filter}`
  );
  const data = await response.json();
  console.log("dataaa:", data);
  return data;
};

export default function Page() {
  const [btnStatus, setStatus] = useState(false);
  const [scrapeData, setScrapeData] = useState("");
  const [data, setData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("null");
  // const [loading, setLoading] = useState(false);

  const ChangeButtonStatus = () => {
    setStatus((prevStatus) => !prevStatus);
    if (!btnStatus) {
      setLoading(true);
    }
  }

  async function fetchData() {
    try {
      const response = await fetch(
        `http://localhost:3000/scraper/yellowpages/paginate?page=1&limit=10`,
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

      return await response.json();
    } catch (error) {

      return { error: error.message };
    }
  }
  useEffect(() => {
    async function loadData() {
      const result = await fetchData();
      if (result.error) {

      } else {
        setScrapeData(result.data);

      }
    }

    loadData();
  }, []);

  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    setPage(0); // Reset to first page when filter changes
  };


  useEffect(() => {
    const loadTableData = async () => {
      const { data, total_pages } = await fetchTableData(page + 1, rowsPerPage);
      setData(data);
      setTotalCount(total_pages);
    };

    loadTableData();
  }, [page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(event);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page
  };

  return (
    <div className="bg-indigo-50/70 h-auto ">
      {/* <div>
      <Button variant="contained" onClick={handleOpenDialog}>
        Open Dialog from Parent
      </Button>
      
  
      <FullScreenDialog open={isDialogOpen} onClose={handleCloseDialog} />
    </div> */}
      <div>
        <PageTitle text={"Procurement"} />

        <div className="bg-white m-6 border rounded-md ">
          <MainButtons scriptName={"procurement"} />
          {/* <TableDemo data={tableData} /> */}
          {/* <PageTables /> */}
          {/* <DataTable/> */}
           <div className="mt-4 md:mt-0">
            <Dropdown filter={filter} onFilterChange={handleFilterChange} />
          </div>          <ModalProvider>
            <ProcurementTablePaginator
              data={data}
              totalCount={totalCount}
              page={page}
              rowsPerPage={rowsPerPage}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </ModalProvider>
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
