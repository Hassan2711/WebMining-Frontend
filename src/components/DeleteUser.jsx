  // "use client";
  // import { useState } from "react";
  // import { BACKEND_URL } from "./ui/Login";
  // import Cookies from "js-cookie";
  // import { useRouter } from "next/navigation";
  // import { Trash2 } from "lucide-react";

  // export default function DeleteUser({ _id }) {
  //   const [isModalOpen, setIsModalOpen] = useState(false);
  //   const router = useRouter();
  //   const token = Cookies.get("token");

  //   const toggleModal = () => {
  //     setIsModalOpen(!isModalOpen);
  //   };

  //   const submitData = async () => {
  //     try {
  //       const response = await fetch(`${BACKEND_URL}/delete_user?id=${_id}`, {
  //         method: "DELETE",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });

  //       if (!response.ok) {
  //         const errorData = await response.json();
  //         console.error("Error:", errorData);
  //         return;
  //       }

  //       const data = await response.json();
  //       router.push("/dashboard/admin_settings");
  //       window.location.reload();
      
  //     } catch (error) {
  //       console.error("Fetch error:", error);
  //     }
  //   };

  //   return (
  //     <>
  //       <div className="flex justify-center m-5">
  //         <button onClick={toggleModal} className="" type="button">
  //           <Trash2 />
  //         </button>
  //       </div>
  //       {isModalOpen && (
  //         <div
  //           id="deleteModal"
  //           tabIndex={-1}
  //           aria-hidden="true"
  //           className="fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full overflow-y-auto overflow-x-hidden"
  //         >
  //           <div className="relative left-[32rem] top-48 p-4 w-full max-w-md h-full md:h-auto">
  //             <div className="relative p-4 text-center bg-indigo-50 border border-primaryColor rounded-lg shadow-lg dark:bg-gray-800 sm:p-5">
  //               <button
  //                 type="button"
  //                 className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
  //                 onClick={toggleModal}
  //               >
  //                 <svg
  //                   aria-hidden="true"
  //                   className="w-5 h-5"
  //                   fill="currentColor"
  //                   viewBox="0 0 20 20"
  //                   xmlns="http://www.w3.org/2000/svg"
  //                 >
  //                   <path
  //                     fillRule="evenodd"
  //                     d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
  //                     clipRule="evenodd"
  //                   />
  //                 </svg>
  //                 <span className="sr-only">Close modal</span>
  //               </button>
  //               <svg
  //                 className="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto"
  //                 aria-hidden="true"
  //                 fill="currentColor"
  //                 viewBox="0 0 20 20"
  //                 xmlns="http://www.w3.org/2000/svg"
  //               >
  //                 <path
  //                   fillRule="evenodd"
  //                   d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
  //                   clipRule="evenodd"
  //                 />
  //               </svg>
  //               <p className="mb-4 text-gray-500 dark:text-gray-300">
  //                 Are you sure you want to delete this user?
  //               </p>
  //               <div className="flex justify-center items-center space-x-4">
  //                 <button
  //                   onClick={toggleModal}
  //                   type="button"
  //                   className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
  //                 >
  //                   No, cancel
  //                 </button>
  //                 <button
  //                   onClick={submitData}
  //                   type="button"
  //                   className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
  //                 >
  //                   Yes, I&apos;m sure
  //                 </button>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       )}
  //     </>
  //   );
  // }

  "use client";
import { useState } from "react";
// import { BACKEND_URL } from "./ui/Login";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

export default function DeleteUser({ _id }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const token = Cookies.get("token");

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // const submitData = async () => {
    // try {
    //   const response = await fetch(`${BACKEND_URL}/delete_user?id=${_id}`, {
    //     method: "DELETE",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${token}`,
    //     },
    //   });

    //   if (!response.ok) {
    //     const errorData = await response.json();
    //     console.error("Error:", errorData);
    //     return;
    //   }

    //   const data = await response.json();
    //   router.push("/dashboard/admin_settings");
    //   window.location.reload();
    
    // } catch (error) {
    //   console.error("Fetch error:", error);
    // }
  // };

  return (
    <>
      <div className="flex justify-center m-5">
        <button onClick={toggleModal} className="" type="button">
          <Trash2 />
        </button>
      </div>
      {isModalOpen && (
        <div
          id="deleteModal"
          tabIndex={-1}
          aria-hidden="true"
          className="fixed inset-0 z-50 flex justify-center items-center w-full h-full overflow-y-auto bg-black bg-opacity-50"
        >
          <div className="relative p-4 w-full max-w-md h-full md:h-auto">
            <div className="relative p-4 text-center bg-indigo-50 border border-primaryColor rounded-lg shadow-lg dark:bg-gray-800 sm:p-5">
              <button
                type="button"
                className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={toggleModal}
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <svg
                className="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="mb-4 text-gray-500 dark:text-gray-300">
                Are you sure you want to delete this user?
              </p>
              <div className="flex justify-center items-center space-x-4">
                <button
                  onClick={toggleModal}
                  type="button"
                  className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                >
                  No, cancel
                </button>
                <button
                  onClick={submitData}
                  type="button"
                  className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
                >
                  Yes, I&apos;m sure
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
