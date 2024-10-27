// // components/Pagination.js
// import React from 'react';
// import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

// const CustomPagination = ({ page, totalPages, onChangePage, loading }) => {
//   const visiblePageCount = 5;
//   const startPage = Math.max(0, page - Math.floor(visiblePageCount / 2));
//   const endPage = Math.min(totalPages - 1, startPage + visiblePageCount - 1);

//   return (
//     <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
//       <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
//         <div>
//           <p className="text-sm text-gray-700">
//             Showing <span className="font-medium">{page * 10 + 1}</span> to{' '}
//             <span className="font-medium">{Math.min((page + 1) * 10, totalPages * 10)}</span> of{' '}
//             <span className="font-medium">{totalPages * 10}</span> results
//           </p>
//         </div>
//         <div>
//           <nav
//             aria-label="Pagination"
//             className="isolate inline-flex -space-x-px rounded-md shadow-sm"
//           >
//             <button
//               onClick={() => onChangePage(page > 0 ? page - 1 : 0)}
//               disabled={page === 0 || loading}
//               className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
//             >
//               <span className="sr-only">Previous</span>
//               <ChevronLeftIcon aria-hidden="true" className="h-5 w-5" />
//             </button>

//             {/* Display page numbers in the calculated range */}
//             {Array.from({ length: Math.min(visiblePageCount, totalPages) }, (_, i) => {
//               const pageIndex = startPage + i;
//               console.log("pageIndex",pageIndex)
//               return (
//                 <button
//                   key={pageIndex}
//                   onClick={() => onChangePage(pageIndex)}
//                   className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
//                     pageIndex === page
//                       ? "z-10 bg-primaryColor text-white"
//                       : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
//                   } focus:z-20 focus:outline-offset-0`}
//                 >
//                   {pageIndex + 1}
//                 </button>
//               );
//             })}

//             <button
//               onClick={() => onChangePage(page < totalPages - 1 ? page + 1 : page)}
//               disabled={page >= totalPages - 1 || loading}
//               className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
//             >
//               <span className="sr-only">Next</span>
//               <ChevronRightIcon aria-hidden="true" className="h-5 w-5" />
//             </button>
//           </nav>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CustomPagination;

// components/Pagination.js
import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

const CustomPagination = ({ page, totalPages, onChangePage, loading }) => {
  const visiblePageCount = 5;
  
  // Adjust the start and end page calculations
  const startPage = Math.max(0, page - Math.floor(visiblePageCount / 2));
  const endPage = Math.min(totalPages - 1, startPage + visiblePageCount - 1);

  // Adjust startPage if the range exceeds totalPages
  const adjustedStartPage = Math.max(0, endPage - visiblePageCount + 1);
  
  // Generate an array of page numbers within the totalPages limit
  const pages = Array.from({ length: Math.min(totalPages, endPage - adjustedStartPage + 1) }, (_, i) => adjustedStartPage + i);

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 flex-1 items-center justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{page * 10 + 1}</span> to{' '}
            <span className="font-medium">{Math.min((page + 1) * 10, totalPages * 10)}</span> of{' '}
            <span className="font-medium">{totalPages * 10}</span> results
          </p>
        </div>
        <div>
          <nav
            aria-label="Pagination"
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
          >
            <button
              onClick={() => onChangePage(page > 0 ? page - 1 : 0)}
              disabled={page === 0 || loading}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon aria-hidden="true" className="h-5 w-5" />
            </button>

            {/* Display page numbers in the calculated range */}
            {pages.map(pageIndex => (
              <button
                key={pageIndex}
                onClick={() => onChangePage(pageIndex)}
                className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                  pageIndex === page
                    ? "z-10 bg-primaryColor text-white"
                    : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                } focus:z-20 focus:outline-offset-0`}
              >
                {pageIndex + 1}
              </button>
            ))}

            <button
              onClick={() => onChangePage(page < totalPages - 1 ? page + 1 : page)}
              disabled={page >= totalPages - 1 || loading}
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon aria-hidden="true" className="h-5 w-5" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default CustomPagination;
