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

const GrantsgovTablePaginator = ({
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
  const [opportunityTitle, setOpportunityTitle] = useState("");
  const [opportunityNumber, setOpportunityNumber] = useState("");
  const [postedDate, setPostedDate] = useState("");
  const [closeDate, setCloseDate] = useState("");
  const [opportunityStatus, setOpportunityStatus] = useState("");
  const [url, setUrl] = useState("");
  const [checkedByUser, setCheckedByUser] = useState('N/A');

  const submitData = async (id) => {
    try {
      let response = await fetch(`http://127.0.0.1:8000/scraper/grants_gov/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          "Opportunity Number": opportunityNumber,
          "Opportunity Title": opportunityTitle,
          "Opportunity Status": opportunityStatus,
          "Posted Date": postedDate,
          "Close Date": closeDate,
          url: url,
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
      let response = await fetch(`http://127.0.0.1:8000/scraper/grants_gov/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          "Opportunity Number": opportunityNumber,
          "Opportunity Title": opportunityTitle,
          "Opportunity Status": opportunityStatus,
          "Posted Date": postedDate,
          "Close Date": closeDate,
          url: url,
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
      const response = await fetch(`http://127.0.0.1:8000/scraper/grants_gov/${id}`, {
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

    data?.forEach((_, index) => {
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
      setOpportunityNumber(selectedRow["Opportunity Number"] || "");
      setOpportunityTitle(selectedRow["Opportunity Title"] || "");
      setPostedDate(selectedRow["Posted Date"] || "");
      setCloseDate(selectedRow["Close Date"] || "");
      setOpportunityStatus(selectedRow["Opportunity Status"] || "");
      setUrl(selectedRow.url || "");
    }
  }, [selectedRow]);

  useEffect(() => {
    const fetchCheckedByData = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/checkedby`);
        if (!response.ok) {
          throw new Error('Failed to fetch checked by data');
        }
        const data = await response.json();
        setCheckedByUser(data.grants_gov || 'N/A'); // Using grants_gov field
      } catch (error) {
        console.error('Error fetching checked by data:', error);
        setCheckedByUser('N/A');
      }
    };

    fetchCheckedByData();
  }, []);

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
        "Opportunity Title": opportunityTitle,
        "Posted Date": postedDate,
        "Close Date": closeDate,
        "Opportunity Status": opportunityStatus,
        url,
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
                  <TableCell>{row["Opportunity Title"]}</TableCell>
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
                    {checkedByUser}
                  </TableCell>
                  <TableCell>
                    <div onClick={() => handleEditClick(row)}>
                      <BigModal>
                        <div className="grid grid-cols-1 md:grid-cols-1 gap-4 p-4">
                          <LabelInputContainer className="mb-4">
                            <Label htmlFor="opportunityTitle">
                              Opportunity Number
                            </Label>
                            <Input
                              id="opportunityTitle"
                              value={opportunityNumber}
                              onChange={handleFieldChange(
                                setOpportunityNumber
                              )}
                              placeholder="Opportunity Number"
                              type="text"
                            />
                          </LabelInputContainer>
                          <LabelInputContainer className="mb-4">
                            <Label htmlFor="opportunityTitle">
                              Opportunity Title
                            </Label>
                            <Input
                              id="opportunityTitle"
                              value={opportunityTitle}
                              onChange={handleFieldChange(
                                setOpportunityTitle
                              )}
                              placeholder="Opportunity Title"
                              type="text"
                            />
                          </LabelInputContainer>

                          <LabelInputContainer className="mb-4">
                            <Label htmlFor="postedDate">Posted Date</Label>
                            <Input
                              id="postedDate"
                              value={postedDate}
                              onChange={handleFieldChange(setPostedDate)}
                              placeholder="Posted Date"
                              type="text"
                            />
                          </LabelInputContainer>

                          <LabelInputContainer className="mb-4">
                            <Label htmlFor="closeDate">Close Date</Label>
                            <Input
                              id="closeDate"
                              value={closeDate}
                              onChange={handleFieldChange(setCloseDate)}
                              placeholder="Close Date"
                              type="text"
                            />
                          </LabelInputContainer>

                          <LabelInputContainer className="mb-4">
                            <Label htmlFor="opportunityStatus">
                              Opportunity Status
                            </Label>
                            <Input
                              id="opportunityStatus"
                              value={opportunityStatus}
                              onChange={handleFieldChange(
                                setOpportunityStatus
                              )}
                              placeholder="Opportunity Status"
                              type="text"
                            />
                          </LabelInputContainer>

                          <LabelInputContainer className="mb-4">
                            <Label htmlFor="url">URL</Label>
                            <Input
                              id="url"
                              value={url}
                              onChange={handleFieldChange(setUrl)}
                              placeholder="URL"
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
    </Paper>
  );
};

export default GrantsgovTablePaginator;
