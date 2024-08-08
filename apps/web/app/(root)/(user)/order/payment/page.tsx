"use client";
import {
  Button,
  Card,
  Image,
  Modal,
  Swal,
  TbBasketCheck,
  TbCopyPlus,
  TbPhone,
  useDisclosure,
  useEffect,
  useState,
} from "@repo/ui";
import Order from "../../../../components/client/pages/order/dashboard/Order";
import CardCheckout from "../../../../components/client/components/ui/CardCheckout";
import {
  OrderData,
  OrderProduct,
  Products,
  User,
  Voucher,
} from "../../../../interface";
import request from "../../../../utils/request";
import { useOrderStore, useTableStore, useUserStore } from "../../../../store";
import CardVoucher from "../../../../components/client/components/ui/CardVoucher";
import Link from "next/link";
import { useRouter } from "next/navigation";
const page = () => {
  const router = useRouter();
  const { user } = useUserStore((state) => state);
  const [dataProduct, setDataProduct] = useState<
    (Products & { quantity: number })[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [opened, { open, close }] = useDisclosure(false);
  const [dataVoucher, setDataVoucher] = useState<Voucher[]>([]);
  const [voucher, setVoucher] = useState<Voucher | null>(null);
  const [dataArrayProduct, setArrayProducts] = useState<Products[]>([]);
  const { orderId, setOrderId, clearOrderId } = useOrderStore((state) => state);
  const tableId = useTableStore((state) => state._id);

  const fetchDataProductsCheckoutItem = async () => {
    try {
      if (!orderId) return;
      const dataOrder = await request.get(`/order/${orderId}`);
      const products = dataOrder.data?.products || [];
      const res = await Promise.all(
        products.map((item: OrderProduct) =>
          request.get(`products/${item.product_id}`).then((res) => ({
            ...res.data,
            quantity: item.quantity,
          }))
        )
      );
      const flattenedRes = res.map((item) => ({
        ...item[0],
        quantity: item.quantity,
      }));
      setDataProduct(flattenedRes);
    } catch (err) {
      console.error("Error fetching cart items for user:", err);
    } finally {
      setLoading(false);
    }
  };
  const calculateSubtotal = () => {
    return dataProduct.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
  };
  const calculateTotal = (subtotal: number, discount: number) => {
    return subtotal - (subtotal * discount) / 100;
  };

  const handleCallPayment = async () => {
    try {
      await request.post("/notify", {
        order_id: orderId,
        user_id: user ? user._id : null,
      });
      Swal.fire({
        icon: "success",
        title: "You wait a moment",
        showConfirmButton: false,
        timer: 1500,
      });
      clearOrderId();
      router.push("/order/dashboard");
    } catch (error) {
      console.log(error);
    }
  };
  const subTotal = calculateSubtotal();
  const discount = voucher ? voucher.discount : 0;
  const totalPrice = calculateTotal(subTotal, discount);
  useEffect(() => {
    fetchDataProductsCheckoutItem();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {dataProduct.length > 0 ? (
        <>
          <div className="flex flex-col gap-4 justify-between h-[92vh] p-6 md:flex-row">
            <div className="w-full h-[92vh] overflow-y-auto sm:overflow-y-hidden md:w-2/3">
              <div className="grid grid-cols-1 gap-2 p-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {dataProduct.flat().map((item) => (
                  <CardCheckout
                    key={item._id}
                    _id={item._id}
                    thumbnails={item.thumbnails}
                    name={item.name}
                    price={item.price}
                    description={item.description}
                    seller={item.seller}
                    quantity={item.quantity}
                    category={item.category}
                  />
                ))}
              </div>
            </div>
            <div className="w-full rounded-lg md:w-1/3">
              <div className="flex flex-col gap-3 p-4 bg-white rounded-md">
                <div className="flex items-center justify-between ">
                  <div className="text-xl">Total:</div>
                  <div className="text-lg font-semibold">
                    {subTotal.toLocaleString()} VNĐ
                  </div>
                </div>

                <Button
                  onClick={handleCallPayment}
                  className="flex justify-center w-full gap-3"
                  color="red"
                >
                  {" "}
                  <TbPhone className="text-xl me-4" />
                  Call Payment
                </Button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center justify-center mt-10">
            <Image
              className=" w-96 h-96"
              src="https://static.thenounproject.com/png/5733136-200.png"
            />
          </div>
        </>
      )}
    </>
  );
};

export default page;
