"use client";
import {
  Button,
  Card,
  Image,
  Modal,
  Swal,
  TbBasketCheck,
  TbCopyPlus,
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
import { useOrderStore, useUserStore } from "../../../../store";
import CardVoucher from "../../../../components/client/components/ui/CardVoucher";
import Link from "next/link";

const page = () => {
  const { user } = useUserStore((state) => state);
  const [dataProduct, setDataProduct] = useState<
    (Products & { quantity: number })[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [opened, { open, close }] = useDisclosure(false);
  const [dataVoucher, setDataVoucher] = useState<Voucher[]>([]);
  const [voucher, setVoucher] = useState<Voucher | null>(null);
  const [dataArrayProduct, setArrayProducts] = useState<Products[]>([]);
  const { orderId, setOrderId } = useOrderStore((state) => state);
  // console.log(orderId);
  const fetchDataProductsCheckoutItem = async () => {
    try {
      const dataOrder = await request.get(`/order/${orderId}`);
      // const dataOrderItem = dataOrder.data.filter(
      //   (order: OrderData) => order.user_id === userId
      // );
      // console.log(dataOrder.data);

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
  const fetchDataVoucher = async () => {
    if (!user) return;
    try {
      const res = await request.get("/vouchers");
      const voucherFilter = res.data.filter(
        (voucher: Voucher) => voucher.users[0]?.user_id === user._id
      );
      setDataVoucher(voucherFilter);
    } catch (err) {
      console.error("Error fetching voucher:", err);
    }
  };

  const handleExchange = async (id: string) => {
    const voucher = dataVoucher.find((v) => v._id === id);
    setVoucher(voucher || null);
    if (voucher) {
      close();
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
        title: "Voucher redeemed successfully",
      });
    }
    // if (user && dataUser) {
    //   if (voucher) {
    //     const isVoucherUsed = voucher.users.some((u) => u.user_id === user._id);
    //     if (isVoucherUsed) {
    //       Swal.fire({
    //         icon: "info",
    //         title: "Voucher already redeemed",
    //         text: "You have already redeemed this voucher.",
    //       });
    //       return;
    //     }
    //     if (dataUser.point >= voucher.point) {
    //       const updatedUser = {
    //         ...dataUser,
    //         point: dataUser.point - voucher.point,
    //       };
    //       const updatedVoucher = {
    //         ...voucher,
    //         users: [...voucher.users, { user_id: user._id }],
    //       };
    //       try {
    //         await request.put(`users/${user._id}`, updatedUser);
    //         await request.put(`vouchers/${voucher._id}`, updatedVoucher);
    //         const Toast = Swal.mixin({
    //           toast: true,
    //           position: "top-end",
    //           showConfirmButton: false,
    //           timer: 3000,
    //           timerProgressBar: true,
    //           didOpen: (toast) => {
    //             toast.onmouseenter = Swal.stopTimer;
    //             toast.onmouseleave = Swal.resumeTimer;
    //           },
    //         });
    //         Toast.fire({
    //           icon: "success",
    //           title: "Voucher redeemed successfully",
    //         });
    //       } catch (error) {
    //         console.error("Error updating user data:", error);
    //         Swal.fire({
    //           icon: "error",
    //           title: "Oops...",
    //           text: "Something went wrong!",
    //         });
    //       }
    //     } else {
    //       Swal.fire({
    //         icon: "warning",
    //         title: "Insufficient points",
    //         text: `You need at least ${voucher.point} points to redeem this voucher.`,
    //       });
    //     }
    //   }
    // } else {
    //   Swal.fire({
    //     icon: "error",
    //     title: "Oops...",
    //     text: "Please login to redeem vouchers.",
    //   });
    //   return;
    // }
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
  const subTotal = calculateSubtotal();
  const discount = voucher ? voucher.discount : 0;
  const totalPrice = calculateTotal(subTotal, discount);
  useEffect(() => {
    // fetchProduct();
    fetchDataProductsCheckoutItem();
    fetchDataVoucher();
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Modal opened={opened} centered onClose={close} title="Your Voucher">
        {user ? (
          dataVoucher.length > 0 ? (
            dataVoucher.map((voucher) => (
              <div key={voucher._id} className="mt-5">
                <CardVoucher
                  id={voucher._id}
                  handleExchange={handleExchange}
                  point={voucher.point}
                  discount={voucher.discount}
                />
              </div>
            ))
          ) : (
            <Image
              src="https://cdn3d.iconscout.com/3d/premium/thumb/no-voucher-8703451-6995796.png?f=webp"
              alt="no voucher"
            />
          )
        ) : (
          <div className="">
            <div className="text-2xl font-bold text-center text-customOrange ">
              You need register/login to receive voucher
            </div>
            <div className="flex justify-between gap-3 mt-10">
              <Link className="w-full" href="/auth/signup">
                <Button className="w-full" variant="outline" color="red">
                  Register
                </Button>{" "}
              </Link>
              <Link className="w-full" href="/auth/login">
                <Button className="w-full" color="red">
                  {" "}
                  Login
                </Button>
              </Link>
            </div>
          </div>
        )}
      </Modal>
      <div className="flex flex-col gap-4 justify-between h-[92vh] p-6 md:flex-row ">
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
        <div className="w-full rounded-lg md:w-1/3 ">
          <div className="flex flex-col gap-3 p-4 bg-white rounded-md">
            <div className="">
              <Button
                onClick={open}
                className="flex items-center justify-center w-full gap-3 lg:w-1/3"
              >
                <TbCopyPlus className="text-lg me-3" /> Add Voucher
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-md ">Subtotal:</div>
              <div className="font-semibold text-md">
                {subTotal.toLocaleString()} VNĐ
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-md ">Offer:</div>
              <div className="font-semibold text-md">
                {voucher ? `${voucher.discount}%` : "0%"}
              </div>
            </div>
            <div className="flex items-center justify-between border-t-2">
              <div className="text-xl ">Total:</div>
              <div className="text-lg font-semibold">
                {totalPrice.toLocaleString()} VNĐ
              </div>
            </div>

            <Button className="flex justify-center w-full gap-3" color="red">
              Checkout <TbBasketCheck className="text-xl ms-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* <Order /> */}
    </>
  );
};

export default page;
