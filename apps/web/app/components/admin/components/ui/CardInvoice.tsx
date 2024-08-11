import { table } from "console";
import { useEffect, useState } from "@repo/ui";
import { Table } from "../../../../interface";
import request from "../../../../utils/request";
// import { OrderData } from "../../../../interface";
interface OrderData {
  _id: string;
  table_id: string;
  date: String;
  sub_total: number | string;
  status: string;
}
const CardInvoice: React.FC<OrderData> = ({
  _id,
  table_id,
  date,
  sub_total,
  status,
}) => {
  const [dataTable, setDataTable] = useState<Table | null>(null);
  const fetchDataTable = async () => {
    try {
      const response = await request.get(`/table/${table_id}`);
      setDataTable(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDataTable();
  }, []);
  const handlePayment = async (id: string) => {
    console.log(id);
  };
  return (
    <>
      <tr>
        <td className="px-6 py-4 whitespace-nowrap">#{_id}</td>
        <td className="px-6 py-4 whitespace-nowrap">{dataTable?.name}</td>
        <td className="px-6 py-4 whitespace-nowrap">{date}</td>
        <td className="px-6 py-4 whitespace-nowrap">{sub_total}VNĐ</td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div
            className={`w-24 text-center rounded-lg ${status === "Pending" ? "text-red-600 bg-red-100" : "text-green-600 bg-green-100"}`}
          >
            {status}
          </div>
        </td>
        <td className="flex gap-3 px-6 py-4 text-sm font-medium whitespace-nowrap">
          <button
            onClick={() => handlePayment(_id)}
            // onClick={open}
            className="text-indigo-600 hover:text-indigo-900"
          >
            Payment
          </button>
          {/* <button className="text-indigo-600 hover:text-indigo-900">
            View
          </button> */}
        </td>
      </tr>
    </>
  );
};

export default CardInvoice;
