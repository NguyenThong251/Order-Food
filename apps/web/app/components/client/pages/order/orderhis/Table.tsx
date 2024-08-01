"use client";
import { Modal, Pagination, useDisclosure, useEffect, useState } from "@repo/ui";
import { OrderData, Products,Bill } from "../../../../../interface";
import request from "../../../../../utils/request";
import TableItem from "../../../components/ui/TableItem";
import { useUserStore } from "../../../../../store";

const Table = () => {
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
          return { ...response.data, quantity: product.quantity };
        })
      );
      console.log(products.map(product =>product.quantity))
      setProductDetails(products);
    } catch (error) {
      console.error(error);
    }
  };
  const handleView = async(billId: Bill) => {
    setSelectedBill(billId);
  fetchProductDetails(billId);
    open();
  };
  useEffect(() => {
    fetchDataBill();
    
  }, []);
  return (
    <>
     <Modal opened={opened} onClose={close} title="Bill Details">
        {selectedBill && (
          <div>
            <p>ID: {selectedBill._id}</p>
            <p>Date: {new Date(selectedBill.date).toLocaleDateString()}</p>
            <p>Total: {selectedBill.total.toLocaleString()} VNĐ</p>
            <p>Quantity: {selectedBill.products.reduce((sum, product) => sum + product.quantity, 0)}</p>
            <h3>Products:</h3>
            <ul>
              {productDetails.map((product: Products) => (
                <li key={product._id}>
                  {product.name}: {product.quantity}
                </li>
              ))}
            </ul>
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
                      TOTAL
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium text-gray-500 uppercase text-center dark:text-neutral-500"
                    >
                      QUANTITY
                    </th>

                    <th
                      scope="col"
                      className="px-6 py-3 text-xs text-end font-medium text-gray-500 uppercase dark:text-neutral-500"
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
                   quantity={bill.products.reduce((sum, product) => sum + product.quantity, 0)}
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

export default Table;
