"use client";
import {
  Button,
  Modal,
  NumberInput,
  TextInput,
  useDisclosure,
  useEffect,
  useState,
} from "@repo/ui";
import CardInvoice from "../../../../components/admin/components/ui/CardInvoice";
import { OrderData } from "../../../../interface";
import request from "../../../../utils/request";

const page = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [dataOrder, setDataOrder] = useState<OrderData[]>([]);
  const fetchDataOrder = async () => {
    try {
      const response = await request.get("/order");
      setDataOrder(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDataOrder();
  }, []);
  return (
    <>
      {/* <Modal opened={opened} onClose={close} title="Bill Details">
        <div className="space-y-2 bg-white rounded-lg dark:bg-neutral-800">
          <p className="font-semibold text-gray-700 text-md dark:text-gray-300">
            ID: 123
          </p>
          <p className="font-semibold text-gray-700 text-md dark:text-gray-300">
            Date: 11-2-2003
          </p>
          <p className="font-semibold text-gray-700 text-md dark:text-gray-300">
            Table:Name
          </p>
          <p className="font-semibold text-gray-700 text-md dark:text-gray-300">
            Quantity: 2
          </p>
          <h3 className="font-bold text-gray-800 text-md dark:text-gray-200">
            Products:
          </h3>
          <ul className="space-y-2">
            <li className="flex justify-between p-2 bg-gray-100 rounded dark:bg-neutral-700">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                Name
              </span>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                1
              </span>
            </li>
          </ul>
          <p className="font-semibold text-gray-700 text-md dark:text-gray-300">
            Sub Total: 123456 VNĐ
          </p>

          <p className="font-semibold text-gray-700 text-md dark:text-gray-300">
            Voucher
          </p>
          <div className="flex justify-between gap-2">
            <TextInput className="w-[70%] " />
            <Button>Confirm</Button>
          </div>
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
          <Button className="w-full py-2 font-semibold text-center text-white bg-green-400 rounded-lg text-md hover:bg-green-600">
            Payment
          </Button>
        </div>
      </Modal> */}
      <div className="p-4">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 font-medium tracking-wider text-left text-gray-500 uppercase text-md">
                ID
              </th>
              <th className="px-6 py-3 font-medium tracking-wider text-left text-gray-500 uppercase text-md">
                Table
              </th>
              <th className="px-6 py-3 font-medium tracking-wider text-left text-gray-500 uppercase text-md">
                Date
              </th>
              <th className="px-6 py-3 font-medium tracking-wider text-left text-gray-500 uppercase text-md">
                Sub total
              </th>
              <th className="px-6 py-3 font-medium tracking-wider text-left text-gray-500 uppercase text-md">
                Status
              </th>
              <th className="px-6 py-3 font-medium tracking-wider text-left text-gray-500 uppercase text-md">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {dataOrder.map((item) => (
              <CardInvoice
                key={item._id}
                _id={item._id}
                table_id={item.table_id}
                date={new Date(item.date).toLocaleDateString("vi-VN")}
                sub_total={item.sub_total.toLocaleString()}
                status={item.status}
              />
            ))}
            {/* <tr>
              <td className="px-6 py-4 whitespace-nowrap">#123</td>
              <td className="px-6 py-4 whitespace-nowrap">A</td>
              <td className="px-6 py-4 whitespace-nowrap">11-01-1961</td>
              <td className="px-6 py-4 whitespace-nowrap">1234444 VNĐ</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {" "}
                <div className="w-24 text-center text-red-600 bg-red-100 rounded-lg">
                  {" "}
                  Pending
                </div>
              </td>
              <td className="flex gap-3 px-6 py-4 text-sm font-medium whitespace-nowrap">
                <button
                  onClick={open}
                  className="text-indigo-600 hover:text-indigo-900"
                >
                  Payment
                </button>
                <button className="text-indigo-600 hover:text-indigo-900">
                  View
                </button>
              </td>
            </tr> */}
            {/* <tr>
              <td className="px-6 py-4 whitespace-nowrap">#123</td>
              <td className="px-6 py-4 whitespace-nowrap">A</td>
              <td className="px-6 py-4 whitespace-nowrap">11-01-1961</td>
              <td className="px-6 py-4 whitespace-nowrap">1234444 VNĐ</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="w-24 text-center text-green-600 bg-green-100 rounded-lg">
                  {" "}
                  Completed
                </div>
              </td>
              <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                <button className="text-indigo-600 hover:text-indigo-900">
                  View
                </button>
              </td>
            </tr> */}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default page;
