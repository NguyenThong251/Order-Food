"use client";
import { Button, Image, useEffect, useState } from "@repo/ui";
import Link from "next/link";
import { useUserStore } from "../../../../store";
import CardVoucher from "../../components/ui/CardVoucher";
import { Voucher } from "../../../../interface";
import request from "../../../../utils/request";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const Vouchers = () => {
  const route = useRouter();
  const { user } = useUserStore((state) => state);
  const [dataVoucher, setDataVoucher] = useState<Voucher[]>([]);

  const fetchDataVoucher = async () => {
    if (!user) return;
    try {
      const res = await request.get("/vouchers");
      const voucherFilter = res.data.filter((voucher: Voucher) =>
        voucher.users.some((u) => u.user_id === user._id)
      );
      setDataVoucher(voucherFilter);
    } catch (err) {
      console.error("Error fetching voucher:", err);
    }
  };

  const handleExchange = () => {
    route.push("/order/payment");
  };

  useEffect(() => {
    fetchDataVoucher();
  }, []);

  return (
    <div className="mt-5">
      {user ? (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {dataVoucher.length > 0 ? (
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
