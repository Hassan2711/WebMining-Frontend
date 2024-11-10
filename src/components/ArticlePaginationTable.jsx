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
import Link from "next/link";
import BigModal, {
  ApprovedModalButton,
  RejectModalButton,
} from "./ui/BigModal";

const ArticleTablePaginator = ({
  data,
  totalCount,
  page,
  rowsPerPage,
  onChangePage,
  onChangeRowsPerPage,
  onSaveChanges, // Callback for saving changes
  onReject, // Callback for rejecting articles
  onApprove, // Callback for approving articles
}) => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [visibleRows, setVisibleRows] = useState([]); // State to manage visible rows
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseBigModal = () => {
    setIsModalOpen(false);
  };

  // Separate states for each field
  const [name, setName] = useState("");
  const [articleUrl, setArticleUrl] = useState("");
  const [author, setAuthor] = useState("");
  const [categories, setCategories] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [mediaImage, setMediaImage] = useState("");
  const [tags, setTags] = useState("");
  const [content, setContent] = useState("");
  const [checkedByUser, setCheckedByUser] = useState('N/A');

  // const submitData = async (id) => {
  //   try {
  //     let response = await fetch(
  //       `${BACKEND_URL}/scraper/article_factory/${id}`,
  //       {
  //         method: "PUT",
  //         body: JSON.stringify({
  //           title: name,
  //           date_time: dateTime,
  //           author: author,
  //           media_image: mediaImage,
  //           tags: tags,
  //           categories: categories,
  //           article_content: content,
  //           article_url: articleUrl,
  //           status: "Approved",
  //         }),
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );

  //     if (!response.ok) {
  //       const errorData = await response.json();
  //       console.error("Error:", errorData);
  //       return;
  //     } else {
  //       const dateresponse = await response.json();
  //     }
  //   } catch (error) {
  //     console.error("Fetch error:", error);
  //   }
  // };
  // const submitRejectData = async (id) => {
  //   try {
  //     let response = await fetch(
  //       `${BACKEND_URL}/scraper/article_factory/${id}`,
  //       {
  //         method: "PUT",
  //         body: JSON.stringify({
  //           title: name,
  //           date_time: dateTime,
  //           author: author,
  //           media_image: mediaImage,
  //           tags: tags,
  //           categories: categories,
  //           article_content: content,
  //           article_url: articleUrl,
  //           status: "Rejected",
  //         }),
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );

  //     if (!response.ok) {
  //       const errorData = await response.json();
  //       console.error("Error:", errorData);
  //       return;
  //     } else {
  //       const dateresponse = await response.json();
  //     }
  //   } catch (error) {
  //     console.error("Fetch error:", error);
  //   }
  // };

  // const deleteData = async (id) => {
  //   try {
  //     const response = await fetch(
  //       `${BACKEND_URL}/scraper/article_factory/${id}`,
  //       {
  //         method: "DELETE",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );

  //     if (!response.ok) {
  //       const errorData = await response.json();
  //       return;
  //     }
  //   } catch (error) {
  //     console.error("Fetch error:", error);
  //   }
  // };

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
      setName(selectedRow.name || selectedRow.title || "");
      setArticleUrl(selectedRow.article_url || "");
      setAuthor(selectedRow.author || "");
      setCategories(selectedRow.categories || "");
      setDateTime(selectedRow.date_time || "");
      setMediaImage(selectedRow.media_image || "");
      setTags(selectedRow.tags || "");
      setContent(selectedRow.article_content || "");
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
        setCheckedByUser(data.article_factory || 'N/A'); // Note: using article_factory instead of yellowpages
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
        name,
        article_url: articleUrl,
        author,
        categories,
        date_time: dateTime,
        media_image: mediaImage,
        tags,
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
    handleCloseBigModal();
  };

   const handleReject = async () => {
    if (selectedRow) {
      await submitRejectData(selectedRow.id);
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
                    {checkedByUser}
                  </TableCell>
                  <TableCell>
                    <div onClick={() => handleEditClick(row)}>
                      <BigModal>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                          <LabelInputContainer className="mb-4">
                            <Label htmlFor="name">Business Name</Label>
                            <Input
                              id="name"
                              value={name}
                              onChange={handleFieldChange(setName)}
                              placeholder={name ? name : "Alpha LLC"}
                              type="text"
                            />
                          </LabelInputContainer>

                          <LabelInputContainer className="mb-4">
                            <Label htmlFor="articleUrl">Article Url</Label>
                            <Input
                              id="articleUrl"
                              value={articleUrl}
                              onChange={handleFieldChange(setArticleUrl)}
                              placeholder="https://www.example.com"
                              type="url"
                            />
                          </LabelInputContainer>

                          <LabelInputContainer className="mb-4">
                            <Label htmlFor="author">Author</Label>
                            <Input
                              id="author"
                              value={author}
                              onChange={handleFieldChange(setAuthor)}
                              placeholder="Author Name"
                              type="text"
                            />
                          </LabelInputContainer>

                          <LabelInputContainer className="mb-4">
                            <Label htmlFor="categories">Categories</Label>
                            <Input
                              id="categories"
                              value={categories}
                              onChange={handleFieldChange(setCategories)}
                              placeholder="Article Categories"
                              type="text"
                            />
                          </LabelInputContainer>

                          <LabelInputContainer className="mb-4">
                            <Label htmlFor="dateTime">Date Time</Label>
                            <Input
                              id="dateTime"
                              value={dateTime}
                              onChange={handleFieldChange(setDateTime)}
                              placeholder="Date and Time"
                              type="text"
                            />
                          </LabelInputContainer>

                          <LabelInputContainer className="mb-4 ">
                            <Label htmlFor="tags">Tags</Label>
                            <Input
                              id="tags"
                              value={tags}
                              onChange={handleFieldChange(setTags)}
                              placeholder="Tags"
                              type="text"
                            />
                          </LabelInputContainer>

                          <LabelInputContainer className="mb-4 ">
                            <Label htmlFor="mediaImage">Media Image</Label>
                            <Link href={mediaImage} target="_blank">
                              <img
                                src={mediaImage}
                                alt="Media Image"
                                width={200}
                              />
                            </Link>
                          </LabelInputContainer>

                          <LabelInputContainer className="mb-4 col-span-2">
                            <Label htmlFor="longDetails">Article Content</Label>
                            <textarea
                              id="Content"
                              value={selectedRow?.article_content || ""}
                              onChange={handleFieldChange(setContent)}
                              placeholder="A detailed description of the restaurant's offerings and atmosphere."
                              rows={6}
                              className="w-full h-40 p-3 text-lg  rounded-md border border-black"
                            />
                          </LabelInputContainer>
                        </div>
                        <div className="flex space-x-4 items-center justify-center">
                          <div onClick={handleReject}>
                            <RejectModalButton />
                          </div>
                          <div onClick={handleApprove}>
                            <ApprovedModalButton />
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

export default ArticleTablePaginator;

// old modal here:
{
  /* <IconButton
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-2">
        <LabelInputContainer className="mb-4">
          <Label htmlFor="name">Business Name</Label>
          <Input
            id="name"
            value={name}
            onChange={handleFieldChange(setName)}
            placeholder={name ? name : "Alpha LLC"}
            type="text"
          />
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="articleUrl">Article Url</Label>
          <Input
            id="articleUrl"
            value={articleUrl}
            onChange={handleFieldChange(setArticleUrl)}
            placeholder="https://www.example.com"
            type="url"
          />
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="author">Author</Label>
          <Input
            id="author"
            value={author}
            onChange={handleFieldChange(setAuthor)}
            placeholder="Author Name"
            type="text"
          />
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="categories">Categories</Label>
          <Input
            id="categories"
            value={categories}
            onChange={handleFieldChange(setCategories)}
            placeholder="Article Categories"
            type="text"
          />
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="dateTime">Date Time</Label>
          <Input
            id="dateTime"
            value={dateTime}
            onChange={handleFieldChange(setDateTime)}
            placeholder="Date and Time"
            type="text"
          />
        </LabelInputContainer>

        <LabelInputContainer className="mb-4 md:col-span-2">
          <Label htmlFor="tags">Tags</Label>
          <Input
            id="tags"
            value={tags}
            onChange={handleFieldChange(setTags)}
            placeholder="Tags"
            type="text"
          />
        </LabelInputContainer>

        <LabelInputContainer className="mb-4 row-span-">
          <Label htmlFor="mediaImage">Media Image</Label>
          <Link href={mediaImage} target="_blank">
            <img
              src={mediaImage}
              alt="Media Image"
              width={200}
            />
          </Link>
          {/* <Input
            id="mediaImage"
            value={mediaImage}
            onChange={handleFieldChange(setMediaImage)}
            placeholder="Image URL"
            type="url"
          /> */
}
//         </LabelInputContainer>

//         <LabelInputContainer className="mb-4 md:col-span-4">
//           <Label htmlFor="longDetails">
//             Article Content
//           </Label>
//           <textarea
//             id="Content"
//             value={selectedRow?.article_content || ""}
//             onChange={handleFieldChange(setContent)}
//             placeholder="A detailed description of the restaurant's offerings and atmosphere."
//             rows={6}
//             className="w-full h-40 p-3 text-lg  rounded-md border border-black"
//           />
//         </LabelInputContainer>
//       </div>
//       <div className="flex space-x-4 items-center justify-center">
//         <div onClick={handleReject}>
//           <RejectButton />
//         </div>
//         <div onClick={handleApprove}>
//           <ApprovedButton />
//         </div>
//       </div>
//     </ModalContent>
//   </ModalBody>
// </Modal>
// </IconButton> */}
