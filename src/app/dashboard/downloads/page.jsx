"use client";
import PageTitle from "@/components/PageTitle";
import React, { useEffect, useState } from "react";
import { BACKEND_URL } from "@/components/ui/Login";

const Page = () => {
  const [downloadHistory, setDownloadHistory] = useState(null);

  useEffect(() => {
    const fetchDownloadHistory = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/downloadedby`);
        const data = await response.json();
        setDownloadHistory(data);
      } catch (error) {
        console.error("Error fetching download history:", error);
      }
    };

    fetchDownloadHistory();
  }, []);

  const renderSourceSection = (title, checkedBy, time) => {
    if (!checkedBy && !time) return null;
    
    return (
      <div className="mb-6">
        <h4 className="scroll-m-20 text-lg font-semibold tracking-tight mb-2">
          {title}
        </h4>
        <div className="space-y-1">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Downloaded By: {checkedBy || 'N/A'}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Export Time: {time || 'N/A'}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div>
      <PageTitle text={"Downloads History"} />

      <div className="px-4 py-4 space-y-4">
        {downloadHistory && (
          <>
            {renderSourceSection("Yellow Pages", downloadHistory.yellowpages, downloadHistory.yellowpages_time)}
            {renderSourceSection("Procurement", downloadHistory.procurement, downloadHistory.procurement_time)}
            {renderSourceSection("Grants.gov", downloadHistory.grants_gov, downloadHistory.grants_gov_time)}
            {renderSourceSection("Article Factory", downloadHistory.article_factory, downloadHistory.article_factory_time)}
          </>
        )}
      </div>
    </div>
  );
};

export default Page;
