"use client";
import { useEffect, useState, Swal } from "@repo/ui";
import CardVoucher from "../../../../components/client/components/ui/CardVoucher";
import { User, Voucher } from "../../../../interface";
import request from "../../../../utils/request";
import { useUserStore } from "../../../../store";

const Page = () => {
  const { user } = useUserStore((state) => state);
  const [dataVoucher, setDataVoucher] = useState<Voucher[]>([]);
  const [dataUser, setDataUser] = useState<User | null>(null);

  // Hàm lấy dữ liệu voucher
  const fetchDataVoucher = async () => {
    try {
      const res = await request.get("/vouchers");
      setDataVoucher(res.data);
    } catch (error) {
      console.error("Error fetching vouchers:", error);
    }
  };

  // Hàm lấy dữ liệu người dùng
  const fetchDataUser = async () => {
    if (user?._id) {
      try {
        const res = await request.get(`users/${user._id}`);
        setDataUser(res.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
  };

  // Hàm xử lý đổi voucher
  const handleExchange = async (id: string) => {
    if (user && dataUser) {
      const voucher = dataVoucher.find((v) => v._id === id);
      if (voucher) {
        if (dataUser.point >= voucher.point) {
          const updatedUser = {
            ...dataUser,
            point: dataUser.point - voucher.point,
          };
          try {
            await request.put(`users/${user._id}`, updatedUser);
            console.log("Update response:", updatedUser.point);
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
          } catch (error) {
            console.error("Error updating user data:", error);
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
            });
          }
        } else {
          Swal.fire({
            icon: "warning",
            title: "Insufficient points",
            text: `You need at least ${voucher.point} points to redeem this voucher.`,
          });
        }
      }
    }
  };

  // Gọi các hàm lấy dữ liệu trong useEffect
  useEffect(() => {
    fetchDataVoucher();
    fetchDataUser();
  }, []);

  return (
    <div className="h-screen m-6 overflow-y-scroll bg-white rounded-md shadow-sm">
      <div className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3">
        {dataVoucher.map((voucher) => (
          <div key={voucher._id}>
            <CardVoucher
              id={voucher._id}
              handleExchange={handleExchange}
              point={voucher.point}
              discount={voucher.discount}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
