// import React from "react";

// const MainStats = () => {

//   async function fetchDailyStats() {
//     const response = await fetch(`${BACKEND_URL}/daily_localwork`);
//     const result = await response.json();

//     return result.data;
//   }

//   async function fetchWeeklyStats() {
//     const response = await fetch(`${BACKEND_URL}/weekly_localwork`);
//     const result = await response.json();

//     return result.data;
//   }

//   async function fetchMonthlyStats() {
//     const response = await fetch(`${BACKEND_URL}/monthly_localwork`);
//     const result = await response.json();

//     return result.data;
//   }

//   async function fetchYearlyStats() {
//     const response = await fetch(`${BACKEND_URL}/yearly_localwork`);
//     const result = await response.json();

//     return result.data;
//   }

//   async function fetchDailyBATripsStats() {
//     try {
//       const response = await fetch(`${BACKEND_URL}/daily_batrips`);
//       const result = await response.json();
//       console.log("result:", result);
//       desktopOS[0].value = result.data; // Update the desktopOS array with the fetched value
//     } catch (error) {
//       console.error("Error fetching daily BA trips stats:", error);
//     }
//   }

//   async function fetchWeeklyBATripsStats() {
//     try {
//       const response = await fetch(`${BACKEND_URL}/weekly_batrips`);
//       const result = await response.json();
//       desktopOS[1].value = result.data; // Update the desktopOS array with the fetched value
//     } catch (error) {
//       console.error("Error fetching weekly BA trips stats:", error);
//     }
//   }

//   async function fetchMonthlyBATripsStats() {
//     try {
//       const response = await fetch(`${BACKEND_URL}/monthly_batrips`);
//       const result = await response.json();
//       desktopOS[2].value = result.data; // Update the desktopOS array with the fetched value
//     } catch (error) {
//       console.error("Error fetching monthly BA trips stats:", error);
//     }
//   }

//   async function fetchYearlyBATripsStats() {
//     try {
//       const response = await fetch(`${BACKEND_URL}/yearly_batrips`);
//       const result = await response.json();
//       desktopOS[3].value = result.data; // Update the desktopOS array with the fetched value
//     } catch (error) {
//       console.error("Error fetching yearly BA trips stats:", error);
//     }
//   }

//   return (
//     <section className="py-4 leading-6 text-primaryColor sm:py-4 lg:py-16">
//       <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
//         <div className="mx-auto max-w-xl text-center">
//           <h2 className="text-3xl font-bold leading-9 sm:text-4xl sm:leading-tight text-primaryColor">
//             Exceptional Data  Statistics
//           </h2>
//         </div>
//         <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 md:gap-8 lg:mt-16">
//           <div className="relative overflow-hidden rounded-xl shadow border-t-4 border-primaryColor bg-white">
//             <div className="py-10 px-6">
//               <div className="flex items-center">
//                 <h3 className="relative ml-2 inline-block text-4xl font-bold leading-none">
//                   <span className="absolute -top-4 h-2 w-full bg-primaryColor" />
//                   {
//                     fetchDailyStats() + fetchDailyBATripsStats()
//                   }
//                 </h3>
//                 <span className="ml-3 text-base font-medium capitalize">
//                   Hotels Featured
//                 </span>
//               </div>
//             </div>
//           </div>
//           <div className="relative overflow-hidden rounded-xl shadow border-t-4 border-primaryColor bg-white">
//             <div className="py-10 px-6">
//               <div className="flex items-center">
//                 <h3 className="relative ml-2 inline-block text-4xl font-bold leading-none">
//                   <span className="absolute -top-4 h-2 w-full bg-primaryColor" />
//                   75
//                 </h3>
//                 <span className="ml-3 text-base font-medium capitalize">
//                   Resorts Listed
//                 </span>
//               </div>
//             </div>
//           </div>
//           <div className="relative overflow-hidden rounded-xl shadow border-t-4 border-primaryColor bg-white">
//             <div className="py-10 px-6">
//               <div className="flex items-center">
//                 <h3 className="relative ml-2 inline-block text-4xl font-bold leading-none">
//                   <span className="absolute -top-4 h-2 w-full bg-primaryColor" />
//                   500+
//                 </h3>
//                 <span className="ml-3 text-base font-medium capitalize">
//                   Rooms Available
//                 </span>
//               </div>
//             </div>
//           </div>
//           <div className="relative overflow-hidden rounded-xl shadow border-t-4 border-primaryColor bg-white">
//             <div className="py-10 px-6">
//               <div className="flex items-center">
//                 <h3 className="relative ml-2 inline-block text-4xl font-bold leading-none">
//                   <span className="absolute -top-4 h-2 w-full bg-primaryColor" />
//                   98%
//                 </h3>
//                 <span className="ml-3 text-base font-medium capitalize">
//                   Guest Reviews
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default MainStats;

import React, { useState, useEffect } from "react";
import { BACKEND_URL } from "../Login";

const MainStats = () => {
  const [dailyStats, setDailyStats] = useState(null);
  const [weeklyStats, setWeeklyStats] = useState(null);
  const [monthlyStats, setMonthlyStats] = useState(null);
  const [yearlyStats, setYearlyStats] = useState(null);
  const [dailyBATripsStats, setDailyBATripsStats] = useState(null);
  const [weeklyBATripsStats, setWeeklyBATripsStats] = useState(null);
  const [monthlyBATripsStats, setMonthlyBATripsStats] = useState(null);
  const [yearlyBATripsStats, setYearlyBATripsStats] = useState(null);

  // Reusable function to fetch data
  const fetchData = async (endpoint, setter) => {
    try {
      const response = await fetch(`${BACKEND_URL}/${endpoint}`);
      const result = await response.json();
      setter(result.data);
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchData("daily_localwork", setDailyStats);
    fetchData("weekly_localwork", setWeeklyStats);
    fetchData("monthly_localwork", setMonthlyStats);
    fetchData("yearly_localwork", setYearlyStats);
    fetchData("daily_batrips", setDailyBATripsStats);
    fetchData("weekly_batrips", setWeeklyBATripsStats);
    fetchData("monthly_batrips", setMonthlyBATripsStats);
    fetchData("yearly_batrips", setYearlyBATripsStats);
  }, []); // Empty dependency array ensures it runs only once on mount

  return (
    <section className="py-4 leading-6 text-primaryColor sm:py-4 lg:py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-3xl font-bold leading-9 sm:text-4xl sm:leading-tight text-primaryColor">
            Exceptional Data Statistics
          </h2>
        </div>
        {/* cdfv*/}

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 md:gap-8 lg:mt-16">
          <div className="relative overflow-hidden rounded-xl shadow border-t-4 border-primaryColor bg-white">
            <div className="py-10 px-6">
              <div className="flex items-center">
                <h3 className="relative ml-2 inline-block text-4xl font-bold leading-none">
                  <span className="absolute -top-4 h-2 w-full bg-primaryColor" />
                 {(dailyStats + dailyBATripsStats) ?? "50"}
                </h3>
                <span className="ml-3 text-base font-medium capitalize">
                  Daily
                </span>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-xl shadow border-t-4 border-primaryColor bg-white">
            <div className="py-10 px-6">
              <div className="flex items-center">
                <h3 className="relative ml-2 inline-block text-4xl font-bold leading-none">
                  <span className="absolute -top-4 h-2 w-full bg-primaryColor" />
                  {(weeklyStats + weeklyBATripsStats) ?? "150"}
                 </h3>
                <span className="ml-3 text-base font-medium capitalize">
                  Weekly
                </span>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-xl shadow border-t-4 border-primaryColor bg-white">
            <div className="py-10 px-6">
              <div className="flex items-center">
                <h3 className="relative ml-2 inline-block text-4xl font-bold leading-none">
                  <span className="absolute -top-4 h-2 w-full bg-primaryColor" />
                  {(monthlyStats + monthlyBATripsStats) ?? "450"}
                </h3>
                <span className="ml-3 text-base font-medium capitalize">
                  Monthly
                </span>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-xl shadow border-t-4 border-primaryColor bg-white">
            <div className="py-10 px-6">
              <div className="flex items-center">
                <h3 className="relative ml-2 inline-block text-4xl font-bold leading-none">
                  <span className="absolute -top-4 h-2 w-full bg-primaryColor" />
                  {(yearlyStats + yearlyBATripsStats) ?? "450"}
                </h3>
                <span className="ml-3 text-base font-medium capitalize">
                  Yearly
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* cdfv*/}
      </div>
    </section>
  );
};

export default MainStats;
