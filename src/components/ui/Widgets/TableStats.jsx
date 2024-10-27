import { Hotel } from "lucide-react";
import React from "react";

const TableStats = () => {
  return (
<div className=" flex flex-col px-8 justify-center sm:py-12 sm:mt-12 ">
  <div className="relative py-3 sm:max-w-xl sm:mx-auto font-inter" id="widget">
  <div className="rounded-lg bg-white shadow-md p-6 w-96 text-gray-700">
  <div className="font-semibold text-gray-800 mb-4">Hotel & Resort Rates</div>
  <div className="flex text-sm font-semibold text-gray-600">
    <div className="w-6/12">Hotel/Resort</div>
    <div className="w-3/12">Price/Night</div>
    <div className="w-3/12">Rating</div>
  </div>

  <div className="text-sm flex w-full">
    <div className="flex items-center space-x-2 mt-5 w-6/12">
<Hotel />
      <div>Grand Palace Hotel</div>
    </div>
    <div className="flex items-center space-x-2 mt-5 w-3/12 transform hover:scale-105 duration-200">
      $200
    </div>
    <div className="flex items-center space-x-2 mt-5 w-3/12 text-yellow-500 transform hover:scale-105 duration-200">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
      </svg>
      <span>4.5</span>
    </div>
  </div>

  <div className="text-sm flex w-full">
    <div className="flex items-center space-x-2 mt-5 w-6/12">
<Hotel />
      <div>Oceanview Resort</div>
    </div>
    <div className="flex items-center space-x-2 mt-5 w-3/12 transform hover:scale-105 duration-200">
      $350
    </div>
    <div className="flex items-center space-x-2 mt-5 w-3/12 text-yellow-500 transform hover:scale-105 duration-200">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
      </svg>
      <span>4.8</span>
    </div>
  </div>

  <div className="text-sm flex w-full">
    <div className="flex items-center space-x-2 mt-5 w-6/12">
<Hotel />
      <div>Mountain Lodge</div>
    </div>
    <div className="flex items-center space-x-2 mt-5 w-3/12 transform hover:scale-105 duration-200">
      $150
    </div>
    <div className="flex items-center space-x-2 mt-5 w-3/12 text-yellow-500 transform hover:scale-105 duration-200">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
      </svg>
      <span>4.2</span>
    </div>
  </div>

  <div className="text-sm flex w-full">
    <div className="flex items-center space-x-2 mt-5 w-6/12">
<Hotel />
      <div>City Center Inn</div>
    </div>
    <div className="flex items-center space-x-2 mt-5 w-3/12 transform hover:scale-105 duration-200">
      $100
    </div>
    <div className="flex items-center space-x-2 mt-5 w-3/12 text-yellow-500 transform hover:scale-105 duration-200">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
      </svg>
      <span>4.0</span>
    </div>
  </div>
</div>

  </div>
</div>

  );
};

export default TableStats;
