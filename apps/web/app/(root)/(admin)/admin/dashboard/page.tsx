"use client";
import React from "react";
import LayoutBarChart from "../../../../components/admin/components/chart/BarChart";

const page = () => {
  return (
    <>
      <div className="p-3">
        <h3 className="text-xl font-medium">Default Dashboard</h3>
        <div className="grid grid-cols-4">
          <div className="">
            <LayoutBarChart />
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
