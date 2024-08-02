import React from "react";
import Tables from "../../../../components/client/pages/order/orderhis/Table";

const page = () => {
  return (
    <>
      <div className="flex flex-col gap-4 p-6">
        <div className="">filter</div>
        <div className="p-2 bg-white h-[80vh]  overflow-y-auto border-2 rounded-lg shadow-sm border-slate-100">
          <Tables />
        </div>
      </div>
    </>
  );
};

export default page;
