// "use client";

// import React, { useEffect, useState } from "react";
// import { BACKEND_URL } from "@/components/ui/Login";
// import Cookies from "js-cookie";
// import PageTitle from "@/components/PageTitle";

// export default function Page() {
//   async function fetchUserData() {
//     try {
//       const token = Cookies.get("token");
//       console.log("new", token);
//       const response = await fetch(`${BACKEND_URL}/users/me/`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/x-www-form-urlencoded",
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       console.log("response:", response);

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       return await response.json();
//     } catch (error) {
//       console.error("Error fetching user data:", error.message);
//       return { error: error.message };
//     }
//   }

//   const [data, setData] = useState(null);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [admin, setAdmin] = useState(false);

//   useEffect(() => {
//     async function loadData() {
//       const result = await fetchUserData();
//       if (result.error) {
//         setError(result.error);
//       } else {
//         setData(result);
//         if (result.role === "admin") {
//           setAdmin(true);
//         }
//       }
//       setLoading(false);
//     }

//     loadData();
//   }, [fetchUserData]);

//   return (
//     <section className="my-auto bg-indigo-50/70">
//       <PageTitle text={"Profile"} />
//       {admin ? (
//         <div className="py-8 lg:w-[80%] md:w-[90%] xs:w-[96%] mx-auto flex gap-4">
//           <div className="lg:w-[88%] md:w-[80%] sm:w-[88%] xs:w-full mx-auto shadow-2xl p-4 rounded-xl h-fit self-center bg-white">
//             <div>
//               <form>
//                 <h2 className="text-center mt-1 font-semibold dark:text-gray-300">
//                   Upload Profile and Cover Image
//                 </h2>
//                 <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
//                   <div className="w-full mb-4 mt-6">
//                     <label
//                       htmlFor="firstName"
//                       className="mb-2 dark:text-gray-300"
//                     >
//                       First Name
//                     </label>
//                     <input
//                       id="firstName"
//                       type="text"
//                       className="mt-2 p-2 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
//                       placeholder="First Name"
//                     />
//                   </div>
//                   <div className="w-full mb-4 lg:mt-6">
//                     <label htmlFor="lastName" className="dark:text-gray-300">
//                       Last Name
//                     </label>
//                     <input
//                       id="lastName"
//                       type="text"
//                       className="mt-2 p-2 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
//                       placeholder="Last Name"
//                     />
//                   </div>
//                 </div>
//                 <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
//                   <div className="w-full">
//                     <h3 className="dark:text-gray-300 mb-2">Sex</h3>
//                     <select className="w-full text-grey border-2 rounded-lg p-2 pl-2 pr-2 dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800">
//                       <option disabled value="">
//                         Select Sex
//                       </option>
//                       <option value="Male">Male</option>
//                       <option value="Female">Female</option>
//                     </select>
//                   </div>
//                   <div className="w-full">
//                     <h3 className="dark:text-gray-300 mb-2">Date Of Birth</h3>
//                     <input
//                       type="date"
//                       className="text-grey p-2 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
//                     />
//                   </div>
//                 </div>
//                 <div className="w-1/4 mx-auto rounded-lg bg-primaryColor hover:bg-white mt-4 text-white hover:text-primaryColor hover:border hover:border-primaryColor text-lg font-semibold">
//                   <button type="submit" className="w-full p-2">
//                     Submit
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       ) : (
//         ""
//       )}
//     </section>
//   );
// }

"use client";

import React, { useCallback, useEffect, useState } from "react";
import { BACKEND_URL } from "@/components/ui/Login";
import Cookies from "js-cookie";
import PageTitle from "@/components/PageTitle";

export default function Page() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [admin, setAdmin] = useState(false);

  const fetchUserData = useCallback(async () => {
    try {
      const token = Cookies.get("token");
  
      const response = await fetch(`${BACKEND_URL}/users/me/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${token}`,
        },
      });
 

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
     
      return { error: error.message };
    }
  }, []);

  useEffect(() => {
    async function loadData() {
      const result = await fetchUserData();
      if (result.error) {
        setError(result.error);
      } else {
        setData(result);
        if (result.role === "admin") {
          setAdmin(true);
        }
      }
      setLoading(false);
    }

    loadData();
  }, [fetchUserData]);

  return (
    <section className="my-auto bg-indigo-50/70 h-screen">
      <PageTitle text={"Profile"} />
      {admin ? (
        <div className="py-8 lg:w-[80%] md:w-[90%] xs:w-[96%] mx-auto flex gap-4">
          <div className="lg:w-[88%] md:w-[80%] sm:w-[88%] xs:w-full mx-auto shadow-2xl p-4 rounded-xl h-fit self-center bg-white">
            <div>
              <form>
                <h2 className="text-center mt-1 font-semibold dark:text-gray-300">
                  Update Profile
                </h2>
                <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                  <div className="w-full mb-4 mt-6">
                    <label
                      htmlFor="firstName"
                      className="mb-2 dark:text-gray-300"
                    >
                      Username
                    </label>
                    <input
                      id="username"
                      type="text"
                      className="mt-2 p-2 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                      placeholder="umer07"
                    />
                  </div>
                  {/* <div className="w-full mb-4 lg:mt-6">
                    <label htmlFor="lastName" className="dark:text-gray-300">
                      Last Name
                    </label>
                    <input
                      id="lastName"
                      type="text"
                      className="mt-2 p-2 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                      placeholder="Last Name"
                    />
                  </div> */}
                </div>
                {/* <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                  <div className="w-full">
                    <h3 className="dark:text-gray-300 mb-2">Sex</h3>
                    <select className="w-full text-grey border-2 rounded-lg p-2 pl-2 pr-2 dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800">
                      <option disabled value="">
                        Select Sex
                      </option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                  <div className="w-full">
                    <h3 className="dark:text-gray-300 mb-2">Date Of Birth</h3>
                    <input
                      type="date"
                      className="text-grey p-2 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                    />
                  </div>
                </div> */}
                <div className="w-1/4 mx-auto rounded-lg bg-primaryColor hover:bg-white mt-4 text-white hover:text-primaryColor hover:border hover:border-primaryColor text-lg font-semibold">
                  <button type="submit" className="w-full p-2">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </section>
  );
}

