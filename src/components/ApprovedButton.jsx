"use client";
import React from "react";
import { useModal } from "./ui/TableModal";
import toast, { Toaster } from "react-hot-toast";

const ApprovedButton = () => {
  const { setOpen } = useModal(); // Access the modal context

  function notify() {
    toast.success("Approved Successfully!");
  }

  const handleApproved = () => {
    setOpen(false); // Close the modal
    notify();
  };

  return (
    <>
      <button
        onClick={handleApproved}
        className="px-4 py-1 rounded-md bg-teal-500 text-white font-medium text-lg transition duration-200 hover:bg-white hover:text-teal-500 border-2 border-transparent hover:border-teal-500"
      >
        Approved
      </button>
    </>
  );
};

export default ApprovedButton;
