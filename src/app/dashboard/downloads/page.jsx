import PageTitle from "@/components/PageTitle";
import React from "react";

const page = () => {
  return (
    <div>
      <PageTitle text={"Downloads Listings"} />

      <div className="px-4 py-4 space-y-4">
      <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
     Files
    </h4>
        <ul className="max-w-md  divide-gray-200 dark:divide-gray-700 ">
          <li className="pb-3 sm:pb-4">
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                  yellowpages.csv
                </p>
                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                  Data row: 0 to 100
                </p>
              </div>
            </div>
          </li>
          <li className="pb-3 sm:pb-4">
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                  articlefactory.csv
                </p>
                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                  Data row: 50 to 100
                </p>
              </div>
            </div>
          </li>

        </ul>
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
    Previous Sessions
    </h4>
    <ul className="max-w-md  divide-gray-200 dark:divide-gray-700 ">
          <li className="pb-3 sm:pb-4">
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                  yellowpages.csv
                </p>
                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                Today 10:00
                </p>
              </div>
            </div>
          </li>
          <li className="pb-3 sm:pb-4">
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                  articlefactory.csv
                </p>
                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                  Yesterday 15:00
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
