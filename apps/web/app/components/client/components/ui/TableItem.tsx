import React, { useEffect, useState } from "react";
import { Table } from "../../../../interface";
import request from "../../../../utils/request";
interface TableItemProps {
  _id: string;
  date: string;
  quantity: number;
  total: number;
  status: string;
  table: string;
  handleView: () => void;
}
const TableItem: React.FC<TableItemProps> = ({
  _id,
  date,
  quantity,
  total,
  status,
  table,
  handleView,
}) => {
  const [dataTable, setDataTable] = useState<Table | null>(null);

  const fetchDataTable = async () => {
    try {
      const res = await request.get(`/table/${table}`);
      console.log(res.data);
      setDataTable(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDataTable();
  }, []);

  return (
    <>
      <tr>
        <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap dark:text-neutral-200">
          {_id}
        </td>
        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap dark:text-neutral-200">
          {date}
        </td>
        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap dark:text-neutral-200">
          {dataTable?.name}
        </td>
        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap dark:text-neutral-200">
          {total.toLocaleString()} VNĐ
        </td>
        <td className="px-6 py-4 text-sm text-center text-gray-800 whitespace-nowrap dark:text-neutral-200">
          {quantity}
        </td>
        {status === "Pending Payment" ? (
          <td className="px-6 py-4 text-sm text-center text-gray-800 whitespace-nowrap dark:text-neutral-200">
            <div className="py-2 font-medium text-white bg-red-400 rounded-lg">
              {status}
            </div>
          </td>
        ) : (
          <td className="px-6 py-4 text-sm text-center text-gray-800 whitespace-nowrap dark:text-neutral-200">
            <div className="py-2 font-medium text-white bg-green-400 rounded-lg">
              {status}
            </div>
          </td>
        )}

        <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-end">
          <button
            onClick={handleView}
            type="button"
            className="inline-flex items-center text-sm font-semibold text-blue-600 border border-transparent rounded-lg gap-x-2 hover:text-blue-800 focus:outline-none focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:text-blue-400"
          >
            View
          </button>
        </td>
      </tr>
    </>
  );
};

export default TableItem;
