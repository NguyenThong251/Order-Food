import { Box, useEffect, useState } from "@repo/ui";
import { Table } from "../../../../interface";
import request from "../../../../utils/request";
import { useTableStore } from "../../../../store";
interface CardTableProps {
  closeChangeTable: () => void;
}
const CardTable: React.FC<CardTableProps> = ({ closeChangeTable }) => {
  const [data, setData] = useState<Table[]>([]);
  const { setTableId } = useTableStore((state) => state);
  const tableId = useTableStore((state) => state._id);
  const fetchData = async () => {
    try {
      const res = await request.get("/table");
      setData(res.data);
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchDataId = async () => {
    try {
      const resId = await request.get(`/table/${tableId}`);
      const isTableId = data.find((data) => data._id === resId.data._id);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData();
    fetchDataId();
  }, []);

  const handleTableClick = (id: string) => {
    setTableId(id);
    closeChangeTable();
    window.location.reload();
  };
  return (
    <>
      {data.map((item) => (
        <div
          key={item._id}
          onClick={() => handleTableClick(item._id)}
          className={`flex items-center justify-center w-16 h-16 text-lg font-medium rounded-md cursor-pointer ${
            item._id === tableId
              ? "bg-blue-700 text-white"
              : "text-blue-500 duration-200 ease-in-out delay-150 bg-white border border-blue-500 transition hover:-translate-y-1 hover:scale-110 hover:shadow-md hover:shadow-blue-400"
          }`}
        >
          {item.name}
        </div>
      ))}

      {/* <div className="flex items-center justify-center w-16 h-16 text-lg font-medium text-blue-500 transition duration-200 ease-in-out delay-150 bg-white border border-blue-500 rounded-md cursor-pointer hover:-translate-y-1 hover:scale-110 hover:shadow-md hover:shadow-blue-400">
        1
      </div> */}
    </>
  );
};

export default CardTable;
