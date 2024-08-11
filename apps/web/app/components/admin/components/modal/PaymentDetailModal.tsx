// components/PaymentDetailModal.tsx
import {
  Swal,
  Button,
  Modal,
  NumberInput,
  TextInput,
  useForm,
  useState,
} from "@repo/ui";
import {
  Bill,
  Notification,
  OrderData,
  Products,
  Table,
  User,
  UserVoucher,
} from "../../../../interface";
import request from "../../../../utils/request";

interface PaymentDetailModalProps {
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  dataOrder: OrderData;
  tableData: Table;
  productDetails: Products[];
  currentNotification: Notification;
  fetchAllVouchers: () => Promise<void>;
  allVouchers: UserVoucher[];
}

const PaymentDetailModal = ({
  modalOpen,
  setModalOpen,
  dataOrder,
  tableData,
  productDetails,
  currentNotification,
  fetchAllVouchers,
  allVouchers,
}: PaymentDetailModalProps) => {
  const [Discount, setDiscount] = useState<number | null>(null);
  const [surcharge, setSurcharge] = useState<number | null>(null);
  const form = useForm({
    initialValues: {
      voucherCode: "",
      surcharge: 0,
    },
  });

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

  return (
    <Modal
      opened={modalOpen}
      onClose={() => setModalOpen(false)}
      title="Payment Details"
    >
      <div className="space-y-2 bg-white rounded-lg dark:bg-neutral-800">
        <p className="font-semibold text-gray-700 text-md dark:text-gray-300">
          ID: {dataOrder._id}
        </p>
        <p className="font-semibold text-gray-700 text-md dark:text-gray-300">
          Date: {new Date(dataOrder.date).toLocaleDateString()}
        </p>
        <p className="font-semibold text-gray-700 text-md dark:text-gray-300">
          Table: {tableData.name}
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
        <p className="font-semibold text-gray-700 text-md dark:text-gray-300">
          Voucher
        </p>
        <form
          className="flex justify-between gap-2"
          onSubmit={form.onSubmit(handleVoucherSubmit)}
        >
          <TextInput
            className="w-[70%]"
            {...form.getInputProps("voucherCode")}
          />
          <Button type="submit">Confirm</Button>
        </form>
        <p className="font-semibold text-gray-700 text-md dark:text-gray-300">
          Surcharge
        </p>
        <form
          className="flex justify-between gap-2"
          onSubmit={form.onSubmit(handleSurchargeSubmit)}
        >
          <NumberInput
            className="w-[70%]"
            {...form.getInputProps("surcharge")}
          />
          <Button type="submit">Confirm</Button>
        </form>
        <p className="font-semibold text-gray-700 text-md dark:text-gray-300">
          Discount: {Discount}%
        </p>
        <p className="font-semibold text-gray-700 text-md dark:text-gray-300">
          Total Amount: {calculateTotal().toLocaleString()} VNĐ
        </p>

        <Button
          onClick={handlePayment}
          disabled={dataOrder.status === "Paid"}
          className={`w-full py-2 font-semibold text-center text-white rounded-lg text-md ${
            dataOrder.status === "Paid"
              ? "bg-gray-400"
              : "bg-green-400 hover:bg-green-600"
          }`}
        >
          Payment
        </Button>
      </div>
    </Modal>
  );
};

export default PaymentDetailModal;
