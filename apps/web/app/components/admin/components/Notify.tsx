import {
  Button,
  Indicator,
  Menu,
  Modal,
  NumberInput,
  TbBell,
  TextInput,
  useEffect,
  useState,
} from "@repo/ui";
import CardNoti from "./ui/CardNoti";
import { Bill, Notification, Products, Table } from "../../../interface";
import request from "../../../utils/request";
import { useRouter } from "next/navigation";

const Notify = () => {
  const [dataNoti, setDataNoti] = useState<Notification[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentNotification, setCurrentNotification] =
    useState<Notification | null>(null);
  const [dataOrder, setDataOrder] = useState<Bill | null>(null);
  const [tableData, setTableData] = useState<Table | null>(null);
  const [productDetails, setProductDetails] = useState<Products[]>([]);
  const router = useRouter();
  const fetchDataNoti = async () => {
    try {
      const res = await request.get("/notify");
      //   console.log(res.data);
      const data = res.data.filter(
        (item: Notification) => item.isActive === true
      );
      setDataNoti(data);
    } catch (err) {
      console.error(err);
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
  const fetchDataOrder = async (orderId: string) => {
    try {
      const res = await request.get(`/order/${orderId}`);
      setDataOrder(res.data);
      console.log(res.data);
      await fetchTableData(res.data.table_id);
      await fetchProductDetails(res.data);
    } catch (err) {
      console.error(err);
    }
  };
  const handleCheck = async (notification: Notification) => {
    try {
      setCurrentNotification(notification);
      setModalOpen(true);
      await fetchDataOrder(notification.order_id);
      //   await request.put(`/notify/${id}`, { isActive: false });
      //   fetchDataNoti(); // Refresh the notifications after updating
      router.push("/admin/invoice");
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchDataNoti();
  }, []);
  return (
    <>
      <Menu shadow="md" width={500}>
        <Menu.Target>
          <Indicator inline label={dataNoti.length} size={16}>
            <li className="w-10 h-10 bg-[#f4f5f8] ms-3 flex items-center justify-center relative">
              <TbBell className="text-2xl" />
            </li>
          </Indicator>
        </Menu.Target>
        <Menu.Dropdown className="w-80">
          <Menu.Label>Notifications</Menu.Label>
          <Menu.Item>
            {dataNoti.map((item: Notification) => (
              <CardNoti
                key={item._id}
                _id={item._id}
                handleCheck={() => handleCheck(item)}
                order_id={item.order_id}
              />
            ))}
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
      {currentNotification && dataOrder && tableData && (
        <Modal
          opened={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Payment Details"
        >
          {/* {selectedBill && tableData && ( */}
          <div className="space-y-2 bg-white rounded-lg dark:bg-neutral-800">
            <p className="font-semibold text-gray-700 text-md dark:text-gray-300">
              {/* ID: {selectedBill._id} */}
              ID: {dataOrder._id}
            </p>
            <p className="font-semibold text-gray-700 text-md dark:text-gray-300">
              {/* Date: {new Date(selectedBill.date).toLocaleDateString()} */}
              Date: {new Date(dataOrder.date).toLocaleDateString()}
            </p>
            <p className="font-semibold text-gray-700 text-md dark:text-gray-300">
              Table:{tableData.name}
              {/* {tableData.name} */}
            </p>
            <p className="font-semibold text-gray-700 text-md dark:text-gray-300">
              Quantity:
              {dataOrder.products.reduce(
                (sum, product) => sum + product.quantity,
                0
              )}
            </p>
            <h3 className="font-bold text-gray-800 text-md dark:text-gray-200">
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
            <p className="font-semibold text-gray-700 text-md dark:text-gray-300">
              Sub Total: {dataOrder.sub_total.toLocaleString()} VNĐ
            </p>
            {/* .toLocaleString() */}
            <p className="font-semibold text-gray-700 text-md dark:text-gray-300">
              Voucher
            </p>
            <form className="flex justify-between gap-2">
              <TextInput className="w-[70%] " />
              <Button>Confirm</Button>
            </form>
            <p className="font-semibold text-gray-700 text-md dark:text-gray-300">
              Surcharge
            </p>
            <div className="flex justify-between gap-2">
              <NumberInput className="w-[70%] " />
              <Button>Confirm</Button>
            </div>
            <p className="font-semibold text-gray-700 text-md dark:text-gray-300">
              Total: 123456 VNĐ
            </p>
            <Button
              //   className={`py-2 text-md font-semibold text-center text-white rounded-lg ${
              //     selectedBill.status === "Pending Payment"
              //       ? "bg-red-400"
              //       : "bg-green-400"
              //   } dark:text-gray-300`}
              className="w-full py-2 font-semibold text-center text-white bg-green-400 rounded-lg text-md hover:bg-green-600"
            >
              {/* {selectedBill.status} */}
              Payment
            </Button>
          </div>
          {/* )} */}
        </Modal>
      )}
    </>
  );
};

export default Notify;
