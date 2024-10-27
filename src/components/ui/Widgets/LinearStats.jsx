import React from "react";

const LinearStats = () => {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gray-50 py-6 sm:py-12">
      <div className="w-96 rounded-xl bg-white p-8" id="widget">
        <h6 className="text-xs text-gray-400">Total earnings</h6>
        <div className="mt-2 flex text-xl font-semibold">
          <span>$27,956</span>
          <span className="ml-2 flex items-center text-xs text-green">
            31%
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7 11l5-5m0 0l5 5m-5-5v12"
              />
            </svg>
          </span>
        </div>
        <div className="mt-8 flex space-x-2">
          <div className="group relative flex flex-col items-center space-y-2">
            <div className="absolute top-2 hidden rounded-full bg-black px-2 py-1 text-xs text-white group-hover:block">
              10
            </div>
            <div className="flex h-32 w-3 items-end rounded-full bg-slate-200 group-hover:cursor-pointer">
              <div className="h-10 w-3 rounded-full bg-blue" />
            </div>
            <div className="text-xs text-gray-500">Jan</div>
          </div>
          <div className="group relative flex flex-col items-center space-y-2">
            <div className="absolute top-2 hidden rounded-full bg-black px-2 py-1 text-xs text-white group-hover:block">
              12
            </div>
            <div className="flex h-32 w-3 items-end rounded-full bg-slate-200 group-hover:cursor-pointer">
              <div className="h-8 w-3 rounded-full bg-blue" />
            </div>
            <div className="text-xs text-gray-500">Feb</div>
          </div>
          <div className="group relative flex flex-col items-center space-y-2">
            <div className="absolute top-2 hidden rounded-full bg-black px-2 py-1 text-xs text-white group-hover:block">
              20
            </div>
            <div className="flex h-32 w-3 items-end rounded-full bg-slate-200 group-hover:cursor-pointer">
              <div className="h-20 w-3 rounded-full bg-blue" />
            </div>
            <div className="text-xs text-gray-500">Mar</div>
          </div>
          <div className="group relative flex flex-col items-center space-y-2">
            <div className="absolute top-2 hidden rounded-full bg-black px-2 py-1 text-xs text-white group-hover:block">
              16
            </div>
            <div className="flex h-32 w-3 items-end rounded-full bg-slate-200 group-hover:cursor-pointer">
              <div className="h-16 w-3 rounded-full bg-blue" />
            </div>
            <div className="text-xs text-gray-500">Apr</div>
          </div>
          <div className="group relative flex flex-col items-center space-y-2">
            <div className="absolute top-2 hidden rounded-full bg-black px-2 py-1 text-xs text-white group-hover:block">
              8
            </div>
            <div className="flex h-32 w-3 items-end rounded-full bg-slate-200 group-hover:cursor-pointer">
              <div className="h-8 w-3 rounded-full bg-blue" />
            </div>
            <div className="text-xs text-gray-500">May</div>
          </div>
          <div className="group relative flex flex-col items-center space-y-2">
            <div className="absolute top-2 hidden rounded-full bg-black px-2 py-1 text-xs text-white group-hover:block">
              12
            </div>
            <div className="flex h-32 w-3 items-end rounded-full bg-slate-200 group-hover:cursor-pointer">
              <div className="h-12 w-3 rounded-full bg-blue" />
            </div>
            <div className="text-xs text-gray-500">Jun</div>
          </div>
          <div className="group relative flex flex-col items-center space-y-2">
            <div className="absolute top-2 hidden rounded-full bg-black px-2 py-1 text-xs text-white group-hover:block">
              8
            </div>
            <div className="flex h-32 w-3 items-end rounded-full bg-slate-200 group-hover:cursor-pointer">
              <div className="h-8 w-12 rounded-full bg-blue" />
            </div>
            <div className="text-xs text-gray-500">Jul</div>
          </div>
          <div className="group relative flex flex-col items-center space-y-2">
            <div className="absolute top-2 hidden rounded-full bg-black px-2 py-1 text-xs text-white group-hover:block">
              16
            </div>
            <div className="flex h-32 w-3 items-end rounded-full bg-slate-200 group-hover:cursor-pointer">
              <div className="h-16 w-3 rounded-full bg-blue" />
            </div>
            <div className="text-xs text-gray-500">Aug</div>
          </div>
          <div className="group relative flex flex-col items-center space-y-2">
            <div className="absolute top-2 hidden rounded-full bg-black px-2 py-1 text-xs text-white group-hover:block">
              12
            </div>
            <div className="flex h-32 w-3 items-end rounded-full bg-slate-200 group-hover:cursor-pointer">
              <div className="h-12 w-3 rounded-full bg-blue" />
            </div>
            <div className="text-xs text-gray-500">Sep</div>
          </div>
          <div className="group relative flex flex-col items-center space-y-2">
            <div className="absolute top-2 hidden rounded-full bg-black px-2 py-1 text-xs text-white group-hover:block">
              6
            </div>
            <div className="flex h-32 w-3 items-end rounded-full bg-slate-200 group-hover:cursor-pointer">
              <div className="h-6 w-3 rounded-full bg-blue" />
            </div>
            <div className="text-xs text-gray-500">Oct</div>
          </div>
          <div className="group relative flex flex-col items-center space-y-2">
            <div className="absolute top-2 hidden rounded-full bg-black px-2 py-1 text-xs text-white group-hover:block">
              16
            </div>
            <div className="flex h-32 w-3 items-end rounded-full bg-slate-200 group-hover:cursor-pointer">
              <div className="h-16 w-3 rounded-full bg-blue" />
            </div>
            <div className="text-xs text-gray-500">Nov</div>
          </div>
          <div className="group relative flex flex-col items-center space-y-2">
            <div className="absolute top-2 hidden transform rounded-full bg-black px-2 py-1 text-xs text-white duration-200 group-hover:block">
              12
            </div>
            <div className="flex h-32 w-3 items-end rounded-full bg-slate-200 group-hover:cursor-pointer">
              <div className="h-12 w-3 rounded-full bg-blue" />
            </div>
            <div className="text-xs text-gray-500">Dec</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinearStats;
