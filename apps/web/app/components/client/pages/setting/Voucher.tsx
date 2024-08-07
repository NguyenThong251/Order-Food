"use client";
import { Button, Image, TbTag, useEffect, useState } from "@repo/ui";
import Link from "next/link";
import { useUserStore } from "../../../../store";
import CardVoucher from "../../components/ui/CardVoucher";
import { User } from "../../../../interface";
import request from "../../../../utils/request";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
export interface Voucher {
  _id: string;
  voucher_id: string;
  code: string;
  point: number;
  discount: number;
}
const Vouchers = () => {
  const route = useRouter();
  const { user } = useUserStore((state) => state);
  const [dataVoucher, setDataVoucher] = useState<Voucher[]>([]);

  // const fetchDataVoucher = async () => {
  //   if (!user) return;
  //   try {
  //     const res = await request.get("/vouchers");
  //     const voucherFilter = res.data.filter((voucher: Voucher) =>
  //       voucher.users.some((u) => u.user_id === user._id)
  //     );
  //     setDataVoucher(voucherFilter);
  //   } catch (err) {
  //     console.error("Error fetching voucher:", err);
  //   }
  // };
  const fetchVoucherUser = async () => {
    if (!user) return;
    try {
      const res = await request.get(`/users/${user._id}`);
      const userVouchers = res.data.vouchers || [];
      const detailedVouchers = await Promise.all(
        userVouchers.map(async (voucher: Voucher) => {
          const voucherRes = await request.get(
            `/vouchers/${voucher.voucher_id}`
          );
          const data = voucherRes.data;
          return { discount: data.discount, code: voucher.code };
        })
      );
      setDataVoucher(detailedVouchers);
    } catch (error) {
      console.error("Error fetching vouchers:", error);
    }
  };
  const handleExchange = () => {
    route.push("/order/payment");
  };

  useEffect(() => {
    // fetchDataVoucher();
    fetchVoucherUser();
  }, []);

  return (
    <div className="mt-5">
      {user ? (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {dataVoucher.length > 0 ? (
            dataVoucher.map((voucher) => (
              <div className="mt-5">
                <div className="flex  items-center gap-3 p-3 mx-auto overflow-hidden bg-white border border-l-4 rounded-lg shadow-lg border-l-[#ee5733]">
                  <div className="w-1/4">
                    <TbTag className="text-3xl" />
                  </div>
                  <div className="">
                    <h2 className="mb-2 text-lg font-bold">
                      Discount {voucher.discount}%
                    </h2>
                    <p className="hidden mb-4 text-gray-700 lg:block">
                      Use discount code to receive {voucher.discount}% off your
                      order.
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p> Code: {voucher.code}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <Image
              className="w-80"
              src="https://cdn3d.iconscout.com/3d/premium/thumb/no-voucher-8703451-6995796.png?f=webp"
              alt="no voucher"
            />
          )}
        </div>
      ) : (
        <div>
          <div className="text-2xl font-bold text-center text-customOrange">
            You need to register/login to receive a voucher
          </div>
          <div className="flex justify-between gap-3 mt-10">
            <Link className="w-full" href="/auth/signup">
              <Button className="w-full" variant="outline" color="red">
                Register
              </Button>
            </Link>
            <Link className="w-full" href="/auth/login">
              <Button className="w-full" color="red">
                Login
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default dynamic(() => Promise.resolve(Vouchers), { ssr: false });
