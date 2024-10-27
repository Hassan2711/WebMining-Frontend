import { FolderDown } from "lucide-react";
import React from "react";
import PositionedMenu from "./PositionedMenu";

const PageTitle = ({ text }) => {
  return (
    <div className=" py-4 sm:py-3 zero:py-14  bg-primaryColor space-y-6">
      <div className="flex justify-between px-8 items-center">
        <div>
          <h1 className="pl-8 text-xs sm:text-lg font-medium text-white text-center leading-relaxed scroll-m-20 tracking-wider uppercase">
            {text}
          </h1>
        </div>
        <div>
          {/* <button className="flex items-center animate-shimmer gap-x-2 px-4 py-2 rounded-xl border border-neutral-600 text-black bg-white hover:bg-gray-100 transition duration-200">
            <span>
              <FolderDown size={20} />
            </span>
            Export
          
          </button> */}

          <PositionedMenu />
        </div>
      </div>
    </div>
  );
};

export default PageTitle;
