import React from "react";
interface TableItemProps {
    _id: string;
    date: string;
    quantity: number;
    total: number;
    handleView: () => void;
  }
const TableItem : React.FC<TableItemProps>=({ _id, date, quantity, total, handleView }) => {
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
          {total.toLocaleString()} VNĐ
        </td>
        <td className="px-6 py-4 text-sm text-gray-800 text-center whitespace-nowrap dark:text-neutral-200">
          {quantity}
        </td>

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
