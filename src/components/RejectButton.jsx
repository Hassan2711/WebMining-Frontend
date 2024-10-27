"use client";
import React from "react";
import { useModal } from "./ui/TableModal";
import toast, { Toaster } from "react-hot-toast";

const RejectButton = () => {
  const { setOpen } = useModal(); // Access the modal context

  function notify() {
    toast('Rejected!', {
      icon: '⛔',
    });
  }

  

  const handleReject = () => {
    setOpen(false); // Open the modal
    notify();
  };

  return (
    <button
      onClick={handleReject}
      className="px-4 py-1 rounded-md bg-red-500 text-white text-lg font-medium transition duration-200 hover:bg-white hover:text-red-500 border-2 border-transparent hover:border-red-500"
    >
      Reject
    </button>
  );
};

export default RejectButton;
