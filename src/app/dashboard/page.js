"use client";
import React from "react";
import PageTitle from "@/components/PageTitle";
import MainStats from "@/components/ui/Widgets/MainStats";
import PieAnimation from "@/components/charts/MuiCircleChat";
import SameDataComposed from "@/components/charts/SameDataComposed";
import PieActiveArc from "@/components/charts/PieActiveArc";
import BigModal from "@/components/ui/BigModal";


function Page() {
  return (
    <div className="bg-indigo-50/70 h-full">
      <PageTitle text={"Dashboard"} />
      <div className="mt-4 lg:mt-0">
        <div className="flex  flex-col lg:flex-row space-x-4 mt-8 mx-1">
          {/* <CrossHair/> */}
          {/* <UserTableStats /> */}
          {/* <TableStats /> */}
          {/* <MainStats/> */}
 

          {/* <BasicPi /> */}
          <p className="lg:w-2/5   m-0 p-2    bg-white  border rounded-md">
            <SameDataComposed />
          </p>
          <p className="lg:w-3/5   m-0 p-2   bg-white  border rounded-md">
           <PieActiveArc/>
          </p>
          {/* <p className="w-full  m-0    bg-white  border rounded-md ">
            <CustomLineChart />
          </p>
          <p className="w-full  m-0    bg-white  border rounded-md">
            <BrushBarChart /> */}
          {/* </p> */}
        </div>
        <div className=" flex flex-col sm:flex-row sm:flex-wrap justify-center items-center  space-y-4 sm:space-y-0 sm:space-x-4">
          <MainStats />
        </div>
      </div>
 
    </div>
  );
}

export default Page;
