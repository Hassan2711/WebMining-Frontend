"use client";
import { FolderDown, Pause, Play, SendHorizontal, Settings, Trash } from "lucide-react";
import { MultiStepLoader as Loader } from "@/components/ui/MultiStepLoader";
import { IconSquareRoundedX } from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
import {
  Modal,
  ModalTrigger,
  ModalBody,
  ModalContent,
} from "@/components/ui/MainButtonTrigger";
import { BACKEND_URL } from "./ui/Login";
import axios from "axios";
import SettingsModal from "./ui/SettingsModal";
import BigModal from "./ui/BigModal";
import { useRouter } from "next/navigation";

const MainButtons = ({ scriptName }) => {
  const loadingStates = [
    {
      text: "Server is Up",
    },
    {
      text: "Minining is Started",
    },
    {
      text: "Data Collection Started",
    },
    {
      text: "Data Approving",
    },
    {
      text: "93% is Approved",
    },
  ];

  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [btnStatus, setStatus] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const timeoutRef = useRef(null);
  const [scriptStatus, setScriptStatus] = useState("Not Started");

  function ChangeButtonStatus() {
    fetch(`${BACKEND_URL}/scraper/${scriptName}/start`)
    .then((response) => response.json()) // Handle the response
    // .then((data) => console.log("Script started for:", scriptName, data))
    // .catch((error) => console.error("Error starting script:", error));
    setStatus((prevStatus) => !prevStatus);
    if (!btnStatus) {
      setLoading(true);
      setIsModalOpen(true); // Open the modal when starting new loading
    } else {
      // Stop loading and close the modal immediately
      setLoading(false);
      setIsModalOpen(false);

      // Clear existing timeout to avoid unwanted behavior
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    }
  }

  const storedValue = localStorage.getItem(scriptName);

  async function getCurrentStatus() {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/scraper/${scriptName}/status`,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      const getStatus = response.data; // Access the data from the response

      setScriptStatus(getStatus.status);
      if (getStatus.status === "completed") {
        setStatus(false);
        localStorage.removeItem(scriptName);
      }
    } catch (error) {
      console.error("Error fetching status:", error);
    }
  }

  let intervalId;
  useEffect(() => {
    if (storedValue) {
      setStatus(true);
    }
  }, [storedValue]);

  if (btnStatus === true) {
    // Call getCurrentStatus immediately
    getCurrentStatus();

    // Set up the interval to call getCurrentStatus every 10 seconds (10000 milliseconds)
    intervalId = setInterval(() => {
      getCurrentStatus();
    }, 10000);
  } else {
    // If btnStatus is false, clear the interval to stop calling getCurrentStatus
    clearInterval(intervalId);
  }

  async function handleStart() {
    const response = await axios.get(
      `http://127.0.0.1:8000/scraper/${scriptName}/start`,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    setStatus(true);
    localStorage.setItem(scriptName, true);
  }

  function ChangeButtonStatus() {
    fetch(`${BACKEND_URL}/scraper/${scriptName}/start`)
      .then((response) => response.json()) // Handle the response

      .then((data) => {
        if (data.status === "in_progress") {
          setIsModalOpen(true);
        }
      })
      .catch((error) => console.error("Error starting script:", error));

    setStatus((prevStatus) => !prevStatus);
    if (!btnStatus) {
      setLoading(true);
      // setIsModalOpen(true); // Open the modal when starting new loading
    } else {
      // Stop loading and close the modal immediately
      setLoading(false);
      setIsModalOpen(false);

      // Clear existing timeout to avoid unwanted behavior
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    }
  }

  function exportScraper() {
    fetch(`${BACKEND_URL}/scraper/${scriptName}/download`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => response.blob()) // Handle the response as a blob
      .then((blob) => {
        // Create a link element to download the file
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;

        // Set the download attribute with a file name
        a.download = "collection_data.csv"; // You can dynamically set the name if needed
        document.body.appendChild(a);
        a.click();

        // Clean up and remove the link
        a.remove();
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => console.error("Error exporting scraper data:", error));
  }

  function sendScraper() {
    fetch(`${BACKEND_URL}/scraper/${scriptName}/send`).then((response) =>
      response.json()
    );
  }

  const handleClick = () => {
    sendScraper();
    router.push(`/dashboard/transfer/${scriptName}`);
  };


  function DeleteScraper() {
    fetch(`${BACKEND_URL}/scraper/${scriptName}/clean`).then((response) =>
      response.json()
    );
  }

  function handleLoadingComplete() {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set a timeout to close the modal after a delay
    timeoutRef.current = setTimeout(() => {
      setStatus(false);
      setIsModalOpen(false); // Close the modal after the delay
    }, 60000); // 2000 ms = 2 seconds delay
  }

  return (
    <div className="flex justify-between items-center py-2 md:py-6 md:px-6 ">
      <div className="flex space-x-2">
        <div className="flex flex-col sm:flex-row   sm:space-y-0 ">
          {/* {isModalOpen && (
            <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
              <ModalTrigger>
                <Loader
                  loadingStates={loadingStates}
                  loading={loading}
                  duration={60000}
                  onComplete={handleLoadingComplete}
                />
              </ModalTrigger>
              <ModalBody>
                <div className="h-96 relative ">
                  <Loader
                    loadingStates={loadingStates}
                    loading={loading}
                    duration={60000}
                    onComplete={handleLoadingComplete}
                  />
                </div>
              </ModalBody>
            </Modal>
          )} */}

          {/* close button */}
          {/* {loading &&
            btnStatus && ( // Only show the close button when loading and btnStatus is true
              <button
                className="fixed top-4 right-4 text-black dark:text-white z-[120]"
                onClick={() => {
                  setLoading(false);
                  setIsModalOpen(false); // Close modal immediately
                }}
              >
                <IconSquareRoundedX className="h-10 w-10" />
              </button>
            )} */}
          <div className="flex flex-col md:flex-row  space-y-2  md:space-y-0 md:space-x-4  ">
            <div>
              <button
                onClick={handleStart}
                className="flex justify-center items-center space-x-2 px-1 py-1 sm:px-2 sm:py-2 rounded-md text-sm sm:text-lg bg-primaryColor text-white font-semibold tracking-wide transition duration-200 hover:bg-white hover:text-primaryColor border-2 border-transparent hover:border-primaryColor "
              >
                <div className="">
                  {btnStatus === false ? <Play /> : <Pause />}
                </div>
                <div>{btnStatus === false ? "Start" : "Stop"}</div>
              </button>
            </div>
           <SettingsModal/>
            <button
           
              onClick={handleClick}
              className="flex justify-center items-center space-x-2 px-1 py-1 sm:px-2 sm:py-2 rounded-md text-sm sm:text-lg bg-primaryColor text-white font-semibold tracking-wide transition duration-200 hover:bg-white hover:text-primaryColor border-2 border-transparent hover:border-primaryColor "
            >
              <SendHorizontal />
              <span>Send</span>
            
            </button>

            {/* <button onClick={DeleteScraper} className="hidden sm:flex justify-center items-center space-x-2 px-1 py-1 sm:px-2 sm:py-2 rounded-md text-sm sm:text-lg bg-primaryColor text-white font-semibold tracking-wide transition duration-200 hover:bg-white hover:text-primaryColor border-2 border-transparent hover:border-primaryColor">
              <Trash />
              <span>Delete</span>
            </button> */}

            <button
              onClick={exportScraper}
              className="hidden md:flex justify-center items-center space-x-2 px-1 py-1 sm:px-2 sm:py-2 rounded-md text-sm sm:text-lg bg-primaryColor text-white font-semibold tracking-wide transition duration-200 hover:bg-white hover:text-primaryColor border-2 border-transparent hover:border-primaryColor"
            >
              <FolderDown />
              <span>Export</span>
            </button>
          </div>
        </div>
        <div className="md:hidden flex flex-col space-y-2 ">
          {/* <button onClick={DeleteScraper} className="flex justify-center items-center space-x-2 px-1 py-1 sm:px-2 sm:py-2 rounded-md text-sm sm:text-lg bg-primaryColor text-white font-semibold tracking-wide transition duration-200 hover:bg-white hover:text-primaryColor border-2 border-transparent hover:border-primaryColor">
            <Trash />
            <span>Delete</span>
          </button> */}

          <button
            onClick={exportScraper}
            className="flex justify-center items-center space-x-2 px-1 py-1 sm:px-2 sm:py-2 rounded-md text-sm sm:text-lg bg-primaryColor text-white font-semibold tracking-wide transition duration-200 hover:bg-white hover:text-primaryColor border-2 border-transparent hover:border-primaryColor"
          >
            <FolderDown />
            <span>Export</span>
          </button>
        </div>
      </div>

      <div className=" flex justify-center items-center space-x-8">
        {/* <button className=" px-8 py-2 rounded-md bg-primaryColor text-white font-bold transition duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-primaryColor">
        Status
      </button> */}
        <div className="">
          <p className="font-semibold text-sm">Status:</p>
          <div className="flex items-center justify-center md:py-2 ">
            <p className="capitalize">{scriptStatus}</p>
            <div
              className={`${
                btnStatus === false ? "bg-red-500" : "bg-emerald-500"
              } w-5 h-5 rounded-full flex flex-col items-center justify-center ml-2 mt-1`}
            >
              <p
                className={` ${
                  btnStatus === false ? "bg-red-500" : "bg-emerald-500"
                } w-5 h-5 rounded-full animate-ping  `}
              ></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainButtons;

// "use client";
// import { useState, useRef } from "react";
// import { MultiStepLoader as Loader } from "@/components/ui/MultiStepLoader";
// import { IconSquareRoundedX } from "@tabler/icons-react";
// import { Modal, ModalTrigger, ModalBody, ModalContent } from "@/components/ui/animated-modal";
// import { FolderDown, Pause, Play, SendHorizontal, Trash } from "lucide-react";

// const MainButtons = () => {
//   const loadingStates = [
//     { text: "Server is Up" },
//     { text: "Mining is Started" },
//     { text: "Data Collection Started" },
//     { text: "Data Approving" },
//     { text: "56% is Approved" },
//   ];

// const [loading, setLoading] = useState(false);
// const [btnStatus, setStatus] = useState(false);
// const [isModalOpen, setIsModalOpen] = useState(true);
// const timeoutRef = useRef(null);

// function ChangeButtonStatus() {
//   setStatus((prevStatus) => !prevStatus);
//   if (!btnStatus) {
//     setLoading(true);
//     setIsModalOpen(true); // Open the modal when starting new loading
//   } else {
//     // Stop loading and close the modal immediately
//     setLoading(false);
//     setIsModalOpen(false);

//     // Clear existing timeout to avoid unwanted behavior
//     if (timeoutRef.current) {
//       clearTimeout(timeoutRef.current);
//     }
//   }
// }

// function handleLoadingComplete() {
//   // Clear any existing timeout
//   if (timeoutRef.current) {
//     clearTimeout(timeoutRef.current);
//   }

//   // Set a timeout to close the modal after a delay
//   timeoutRef.current = setTimeout(() => {
//     setStatus(false)
//     setIsModalOpen(false); // Close the modal after the delay
//   }, 2000); // 2000 ms = 2 seconds delay
// }

// return (
//   <div className="flex justify-between items-center py-6 px-6">
//     <div className="flex space-x-2">
//       <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-6">
//         {/* Modal component with loader */}
//         {isModalOpen && (
//           <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
//             <ModalTrigger>
//               <Loader
//                 loadingStates={loadingStates}
//                 loading={loading}
//                 duration={2000}
//                 onComplete={handleLoadingComplete}
//               />
//             </ModalTrigger>
//             <ModalBody>
//               <div className="h-96 relative">
//                 <Loader
//                   loadingStates={loadingStates}
//                   loading={loading}
//                   duration={2000}
//                   onComplete={handleLoadingComplete}
//                 />
//               </div>
//             </ModalBody>
//             <ModalContent>
//               {/* Optional content */}
//             </ModalContent>
//           </Modal>
//         )}

//         <button
//           onClick={ChangeButtonStatus}
//           className="flex justify-center items-center space-x-2 px-1 py-1 sm:px-2 sm:py-2 rounded-md text-sm sm:text-lg bg-primaryColor text-white font-semibold tracking-wide transition duration-200 hover:bg-white hover:text-primaryColor border-2 border-transparent hover:border-primaryColor"
//         >
//           <div className="">{btnStatus === false ? <Play /> : <Pause />}</div>
//           <div>{btnStatus === false ? "Start" : "Stop"}</div>
//         </button>
//         {loading && btnStatus && ( // Only show the close button when loading and btnStatus is true
//           <button
//             className="fixed top-4 right-4 text-black dark:text-white z-[120]"
//             onClick={() => {
//               setLoading(false);
//               setIsModalOpen(false); // Close modal immediately
//             }}
//           >
//             <IconSquareRoundedX className="h-10 w-10" />
//           </button>
//         )}
//       </div>
//     </div>
//   </div>
// );
// };

// export default MainButtons;
