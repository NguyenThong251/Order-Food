"use client";
import { Pagination, useEffect, useState } from "@repo/ui";
import { OrderData } from "../../../../../interface";
import request from "../../../../../utils/request";

const Table = () => {
  const [dataOrder, setDataOrder] = useState<OrderData[]>([]);
  const fetchDataOrder = async () => {
    try {
      const response = await request.get("/order");

      console.log(response.data);
      //   if (user) {
      //   }
      setDataOrder(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchDataOrder();
  }, []);
  return (
    <>
      <div className="flex flex-col">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                <thead className="sticky top-0 bg-white dark:bg-neutral-800">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium text-gray-500 uppercase text-start dark:text-neutral-500"
                    >
                      ID
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium text-gray-500 uppercase text-start dark:text-neutral-500"
                    >
                      DATE
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium text-gray-500 uppercase text-start dark:text-neutral-500"
                    >
                      TOTAL
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium text-gray-500 uppercase text-end dark:text-neutral-500"
                    >
                      QUANTITY
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium text-gray-500 uppercase text-end dark:text-neutral-500"
                    >
                      STATUS
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                    >
                      ACTION
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap dark:text-neutral-200">
                      11
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap dark:text-neutral-200">
                      11/03/2002
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap dark:text-neutral-200">
                      2100000 vnd
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800 text-end whitespace-nowrap dark:text-neutral-200">
                      11
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800 text-end whitespace-nowrap dark:text-neutral-200">
                      waiting to pay
                    </td>

                    <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-end">
                      <button
                        type="button"
                        className="inline-flex items-center text-sm font-semibold text-blue-600 border border-transparent rounded-lg gap-x-2 hover:text-blue-800 focus:outline-none focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:text-blue-400"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Table;
