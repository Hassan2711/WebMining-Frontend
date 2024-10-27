import PageTitle from "@/components/PageTitle";
import React from "react";

const page = ({ params }) => {
  return (
    <div>
      <PageTitle text={params.scriptname} />
      <div className="px-4 py-4 space-y-4">
        <div className="flex">
          <div>
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
              Source
            </h4>
            <ul className="max-w-md  divide-gray-200 dark:divide-gray-700 grid grid-cols-2">
              <li className="pb-3 sm:pb-4">
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                      From ABC
                    </p>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                      Completed
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
              Destination
            </h4>
            <ul className="max-w-md  divide-gray-200 dark:divide-gray-700 grid grid-cols-2">
              <li className="pb-3 sm:pb-4">
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                      To XYZ
                    </p>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                      Completed
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Transfer Detail
        </h3>
        <ul className="max-w-md  divide-gray-200 dark:divide-gray-700 grid grid-cols-2">
          <li className="pb-3 sm:pb-4">
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                  Business Name
                </p>
                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                  email@flowbite.com
                </p>
              </div>
            </div>
          </li>
          <li className="pb-3 sm:pb-4">
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                  Category
                </p>
                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                  email@flowbite.com
                </p>
              </div>
            </div>
          </li>
          <li className="pb-3 sm:pb-4">
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                  Phone
                </p>
                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                  email@flowbite.com
                </p>
              </div>
            </div>
          </li>
          <li className="pb-3 sm:pb-4">
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                  Address
                </p>
                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                  email@flowbite.com
                </p>
              </div>
            </div>
          </li>
        </ul>
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Transfer History
        </h3>
        <ul className="max-w-md  divide-gray-200 dark:divide-gray-700 grid grid-cols-2">
          <li className="pb-3 sm:pb-4">
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                  23 September 2024
                </p>
                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                  Completed
                </p>
              </div>
            </div>
          </li>
          <li className="pb-3 sm:pb-4">
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                  23 September 2024
                </p>
                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                  In Progress
                </p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default page;
