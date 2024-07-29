import React from "react";
import CardVoucher from "../../../../components/client/components/ui/CardVoucher";

const page = () => {
  return (
    <>
      <div className="m-6 bg-white rounded-md shadow-sm h-[37rem]">
        <div className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3">
          <CardVoucher />
        </div>
      </div>
    </>
  );
};

export default page;
