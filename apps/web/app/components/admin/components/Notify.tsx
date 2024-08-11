import {
  Button,
  Indicator,
  Menu,
  Modal,
  NumberInput,
  Swal,
  TbBell,
  TextInput,
  useEffect,
  useForm,
  useState,
} from "@repo/ui";
import CardNoti from "./ui/CardNoti";
import {
  Bill,
  CodeVoucher,
  Notification,
  OrderData,
  Products,
  Table,
  User,
  UserVoucher,
} from "../../../interface";
import request from "../../../utils/request";
import { useRouter } from "next/navigation";
import PaymentDetailModal from "./modal/PaymentDetailModal";

const Notify = () => {
  const [dataNoti, setDataNoti] = useState<Notification[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentNotification, setCurrentNotification] =
    useState<Notification | null>(null);
  const [dataOrder, setDataOrder] = useState<OrderData | null>(null);
  const [tableData, setTableData] = useState<Table | null>(null);
  const [Discount, setDiscount] = useState<number | null>(null);
  const [surcharge, setSurcharge] = useState<number | null>(null);
  const [productDetails, setProductDetails] = useState<Products[]>([]);
  const [allVouchers, setAllVouchers] = useState<UserVoucher[]>([]);
  const [userData, setUserData] = useState<User | null>(null);
  const router = useRouter();
  const form = useForm({
    initialValues: {
      voucherCode: "",
      surcharge: 0,
    },
  });
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
  const fetchAllVouchers = async () => {
    try {
      const dataUser = await request.get("/users");
      const allVouchers: UserVoucher[] = [];

      dataUser.data.forEach((user: User) => {
        if (user.vouchers) {
          allVouchers.push(...user.vouchers);
        }
      });

      setAllVouchers(allVouchers);
    } catch (err) {
      console.error(err);
    }
  };
  const fetchUserByVoucher = async (
    voucherCode: string
  ): Promise<User | null> => {
    try {
      const resUser = await request.get("/users");
      let matchedUser: User | null = null;
      resUser.data.forEach((user: User) => {
        if (user.vouchers) {
          const matchedVoucher = user.vouchers.find(
            (voucher: UserVoucher) => voucher.code === voucherCode
          );
          if (matchedVoucher) {
            matchedUser = user;
          }
        }
      });
      return matchedUser;
    } catch (err) {
      return null;
    }
  };
  const handleVoucherSubmit = async (values: { voucherCode: string }) => {
    try {
      const matchedUser = await fetchUserByVoucher(values.voucherCode);
      const matchedVoucher = allVouchers.find(
        (voucher: UserVoucher) => voucher.code === values.voucherCode
      );

      if (matchedVoucher && matchedUser) {
        await request.delete(
          `/users/${matchedUser?._id}/voucher/${matchedVoucher?._id}`
        );
        const discountVoucher = await request.get(
          `vouchers/${matchedVoucher?.voucher_id}`
        );
        const discount = discountVoucher.data.discount;
        setDiscount(discount);
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        Toast.fire({
          icon: "success",
          title: "Voucher add successful!",
        });
      } else {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        Toast.fire({
          icon: "error",
          title: "Voucher is not valid",
        });
      }
    } catch (err) {
      console.error(err);
    }
  };
  const handleSurchargeSubmit = async (values: { surcharge: number }) => {
    try {
      setSurcharge(values.surcharge);
      Swal.fire({
        icon: "success",
        title: "Surcharge add successful!",
        timer: 3000,
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timerProgressBar: true,
      });
      if (values.surcharge === 0) {
        Swal.fire({
          icon: "error",
          title: "Validation failed",
          timer: 3000,
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timerProgressBar: true,
        });
      }
    } catch (err) {
      console.error(err);
    }
  };
  const calculateTotal = () => {
    if (!dataOrder) return 0;

    const subTotal = dataOrder.sub_total;
    const discountAmount = Discount ? (subTotal * Discount) / 100 : 0;
    const total = subTotal - discountAmount + (surcharge || 0);
    return total;
  };
  const handlePayment = async () => {
    const dataBill = {
      order_id: dataOrder?._id,
      discount: Discount,
      surcharge: surcharge,
      total: calculateTotal(),
      date: new Date(new Date().getTime() + 7 * 60 * 60 * 1000),
    };
    // console.log(dataBill);
    try {
      await request.put(`/order/${dataOrder?._id}`, {
        ...dataOrder,
        status: "Paid",
      });
      await request.put(`/notify/${currentNotification?._id}`, {
        ...currentNotification,
        isActive: false,
      });
      const res = await request.post("/bill", dataBill);
      console.log(res.data);
      Swal.fire({
        icon: "success",
        title: "Payment successful!",
        timer: 3000,
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timerProgressBar: true,
      });
      setModalOpen(false);
      // router.push("/admin/invoice");
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchDataNoti();
    fetchAllVouchers();
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

          {dataNoti.map((item: Notification) => (
            <Menu.Item>
              <CardNoti
                key={item._id}
                _id={item._id}
                handleCheck={() => handleCheck(item)}
                order_id={item.order_id}
              />{" "}
            </Menu.Item>
          ))}
        </Menu.Dropdown>
      </Menu>
      {currentNotification && dataOrder && tableData && (
        // <Modal
        //   opened={modalOpen}
        //   onClose={() => setModalOpen(false)}
        //   title="Payment Details"
        // >
        //   {/* {selectedBill && tableData && ( */}
        //   <div className="space-y-2 bg-white rounded-lg dark:bg-neutral-800">
        //     <p className="font-semibold text-gray-700 text-md dark:text-gray-300">
        //       {/* ID: {selectedBill._id} */}
        //       ID: {dataOrder._id}
        //     </p>
        //     <p className="font-semibold text-gray-700 text-md dark:text-gray-300">
        //       {/* Date: {new Date(selectedBill.date).toLocaleDateString()} */}
        //       Date: {new Date(dataOrder.date).toLocaleDateString()}
        //     </p>
        //     <p className="font-semibold text-gray-700 text-md dark:text-gray-300">
        //       Table:{tableData.name}
        //       {/* {tableData.name} */}
        //     </p>
        //     <p className="font-semibold text-gray-700 text-md dark:text-gray-300">
        //       Quantity:
        //       {dataOrder.products.reduce(
        //         (sum, product) => sum + product.quantity,
        //         0
        //       )}
        //     </p>
        //     <h3 className="font-bold text-gray-800 text-md dark:text-gray-200">
        //       Products:
        //     </h3>
        //     <ul className="space-y-2">
        //       {productDetails.map((product: Products) => (
        //         <li
        //           key={product._id}
        //           className="flex justify-between p-2 bg-gray-100 rounded dark:bg-neutral-700"
        //         >
        //           <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
        //             {product.name}
        //           </span>
        //           <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
        //             x {product.quantity}
        //           </span>
        //         </li>
        //       ))}
        //     </ul>
        //     <p className="font-semibold text-gray-700 text-md dark:text-gray-300">
        //       Sub Total: {dataOrder.sub_total.toLocaleString()} VNĐ
        //     </p>
        //     {/* .toLocaleString() */}
        //     <p className="font-semibold text-gray-700 text-md dark:text-gray-300">
        //       Voucher
        //     </p>

        //     <form
        //       className="flex justify-between gap-2"
        //       onSubmit={form.onSubmit(handleVoucherSubmit)}
        //     >
        //       <TextInput
        //         className="w-[70%]"
        //         {...form.getInputProps("voucherCode")}
        //       />
        //       <Button type="submit">Confirm</Button>
        //     </form>
        //     <p className="font-semibold text-gray-700 text-md dark:text-gray-300">
        //       Surcharge
        //     </p>
        //     <form
        //       className="flex justify-between gap-2"
        //       onSubmit={form.onSubmit(handleSurchargeSubmit)}
        //     >
        //       <NumberInput
        //         className="w-[70%]"
        //         {...form.getInputProps("surcharge")}
        //       />
        //       <Button type="submit">Confirm</Button>
        //     </form>
        //     <p className="font-semibold text-gray-700 text-md dark:text-gray-300">
        //       Discount: {Discount}%
        //     </p>
        //     <p className="font-semibold text-gray-700 text-md dark:text-gray-300">
        //       Total Amount: {calculateTotal().toLocaleString()} VNĐ
        //     </p>

        //     <Button
        //       onClick={handlePayment}
        //       disabled={dataOrder.status === "Paid"}
        //       className={`w-full py-2 font-semibold text-center text-white rounded-lg text-md ${
        //         dataOrder.status === "Paid"
        //           ? "bg-gray-400"
        //           : "bg-green-400 hover:bg-green-600"
        //       }`}
        //     >
        //       {/* {selectedBill.status} */}
        //       Payment
        //     </Button>
        //   </div>
        //   {/* )} */}
        // </Modal>
        <PaymentDetailModal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          dataOrder={dataOrder}
          tableData={tableData}
          productDetails={productDetails}
          currentNotification={currentNotification}
          fetchAllVouchers={fetchAllVouchers}
          allVouchers={allVouchers}
        />
      )}
    </>
  );
};

export default Notify;
