"use client";
import {
  Modal,
  Pagination,
  useDisclosure,
  useEffect,
  useState,
} from "@repo/ui";
import { OrderData, Products, Bill, Table } from "../../../../../interface";
import request from "../../../../../utils/request";
import TableItem from "../../../components/ui/TableItem";
import { useUserStore } from "../../../../../store";

const Tables = () => {
  const [tableData, setTableData] = useState<Table | null>(null);
  const [dataBill, setDataBill] = useState<Bill[]>([]);
  const user = useUserStore((state) => state.user);
  const [selectedBill, setSelectedBill] = useState<Bill | null>(null);
  const [productDetails, setProductDetails] = useState<Products[]>([]);
  const [opened, { open, close }] = useDisclosure(false);
  const fetchDataBill = async () => {
    try {
      const response = await request.get("/bill");
      if (user) {
        const billIdUser = response.data.filter(
          (item: Bill) => item.user_id === user._id
        );
        setDataBill(billIdUser);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const fetchProductDetails = async (bill: Bill) => {
    try {
      const products = await Promise.all(
        bill.products.map(async (product) => {
          const response = await request.get(`/products/${product.product_id}`);
          return { ...response.data[0], quantity: product.quantity };
        })
      );

      setProductDetails(products);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchTableData = async (tableId: string) => {
    try {
      const response = await request.get(`/table/${tableId}`);
      setTableData(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleView = async (bill: Bill) => {
    setSelectedBill(bill);
    fetchTableData(bill.table_id);
    fetchProductDetails(bill);
    open();
  };
  useEffect(() => {
    fetchDataBill();
  }, []);
  return (
    <>
      <Modal opened={opened} onClose={close} title="Bill Details">
        {selectedBill && tableData && (
          <div className="p-6 space-y-4 bg-white rounded-lg dark:bg-neutral-800">
            <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
              ID: {selectedBill._id}
            </p>
            <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
              Date: {new Date(selectedBill.date).toLocaleDateString()}
            </p>
            <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
              Total: {selectedBill.total.toLocaleString()} VNĐ
            </p>
            <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
              Table: {tableData.name}
            </p>
            <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
              Quantity:{" "}
              {selectedBill.products.reduce(
                (sum, product) => sum + product.quantity,
                0
              )}
            </p>
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">
              Products:
            </h3>
            <ul className="space-y-2">
              {productDetails.map((product: Products) => (
                <li
                  key={product._id}
                  className="flex justify-between p-2 bg-gray-100 rounded dark:bg-neutral-700"
                >
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    {product.name}
                  </span>
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    x {product.quantity}
                  </span>
                </li>
              ))}
            </ul>
            <p
              className={`py-2 text-lg font-semibold text-center text-white rounded-lg ${
                selectedBill.status === "Pending Payment"
                  ? "bg-red-400"
                  : "bg-green-400"
              } dark:text-gray-300`}
            >
              {selectedBill.status}
            </p>
          </div>
        )}
      </Modal>
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
                      TABLE
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium text-gray-500 uppercase text-start dark:text-neutral-500"
                    >
                      TOTAL
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium text-center text-gray-500 uppercase dark:text-neutral-500"
                    >
                      QUANTITY
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium text-center text-gray-500 uppercase dark:text-neutral-500"
                    >
                      STATUS
                    </th>

                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium text-gray-500 uppercase text-end dark:text-neutral-500"
                    >
                      ACTION
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                  {dataBill.map((bill) => (
                    <TableItem
                      key={bill._id}
                      _id={bill._id}
                      date={new Date(bill.date).toLocaleDateString()}
                      quantity={bill.products.reduce(
                        (sum, product) => sum + product.quantity,
                        0
                      )}
                      table={bill.table_id}
                      status={bill.status}
                      total={bill.total}
                      handleView={() => handleView(bill)}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tables;
