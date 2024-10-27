import React from "react";

const UserTableStats = () => {
  return (
<div className=" sm:p-10 ">
<div
  className="rounded-lg shadow-md p-4 w-96 mx-auto bg-white"
  id="widget"
>
  <div className="flex">
    <div className="p-2 pl-6">
      <h2 className="text-xl">Grand Palace Hotel</h2>
      <span className="text-sm text-gray-400">Bangkok, Thailand</span>
      <div className="flex text-yellow-300 my-2">
        {/* Rating stars */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="text-yellow-300 mx-1"
          width={16}
          height={16}
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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="text-yellow-300 mx-1"
          width={16}
          height={16}
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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="text-yellow-300 mx-1"
          width={16}
          height={16}
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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="text-yellow-300 mx-1"
          width={16}
          height={16}
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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="text-yellow-300 mx-1"
          width={16}
          height={16}
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
      </div>
    </div>
  </div>
  <div className="my-5">
    <div className="flex justify-between my-2">
      <div className="text-sm">Rooms Available</div>
      <div className="text-sm text-primaryColor">200</div>
    </div>
    <div className="bg-primaryColor w-full h-2 rounded-full">
      <div className="bg-primaryColor w-3/4 h-2 rounded-full" />
    </div>
  </div>
  <div className="my-5">
    <div className="flex justify-between my-2">
      <div className="text-sm">Restaurant Rating</div>
      <div className="text-sm text-primaryColor">4.5</div>
    </div>
    <div className="bg-primaryColor w-full h-2 rounded-full">
      <div className="bg-primaryColor w-1/2 h-2 rounded-full" />
    </div>
  </div>
  <div className="my-5">
    <div className="flex justify-between my-2">
      <div className="text-sm">Spa Rating</div>
      <div className="text-sm text-primaryColor">4.8</div>
    </div>
    <div className="bg-primaryColor w-full h-2 rounded-full">
      <div className="bg-primaryColor w-5/6 h-2 rounded-full" />
    </div>
  </div>
</div>

</div>

  );
};

export default UserTableStats;
