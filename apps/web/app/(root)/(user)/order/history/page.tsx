"use client";
import { useState } from "@repo/ui";
import Tables from "../../../../components/client/pages/order/orderhis/Table";
const page = () => {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(e.target.value);
  };
  return (
    <>
      <div className="flex flex-col gap-4 p-6">
        <div className="">
          <div className="flex items-center gap-4">
            <input
              type="date"
              value={startDate}
              onChange={handleStartDateChange}
              className="p-2 border-2 rounded-lg"
            />
            <input
              type="date"
              value={endDate}
              onChange={handleEndDateChange}
              className="p-2 border-2 rounded-lg"
            />
          </div>
          <div className="p-2 mt-4 bg-white h-[76vh] overflow-y-auto border-2 rounded-lg shadow-sm border-slate-100">
            <Tables startDate={startDate} endDate={endDate} />
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
