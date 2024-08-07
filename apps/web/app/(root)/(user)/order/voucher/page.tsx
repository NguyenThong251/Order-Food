"use client";
import { useEffect, useState, Swal } from "@repo/ui";
import CardVoucher from "../../../../components/client/components/ui/CardVoucher";
import { User, UserVoucher, Voucher } from "../../../../interface";
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
  const generateVoucherCode = () => {
    return `KM${Math.floor(Math.random() * 1000000)
      .toString()
      .padStart(6, "0")}`;
  };

  // Hàm xử lý đổi voucher
  const handleExchange = async (id: string) => {
    if (user && dataUser) {
      const voucher = dataVoucher.find((v) => v._id === id);
      if (voucher) {
        // const isVoucherUsed = voucher.users.some((u) => u.user_id === user._id);
        // const isVoucherUsed = dataUser.vouchers.includes(voucher._id);
        const isVoucherUsed = dataUser.vouchers.some(
          (v) => v.voucher_id === id
        );
        if (isVoucherUsed) {
          Swal.fire({
            icon: "info",
            title: "Voucher already redeemed",
            text: "You have already redeemed this voucher.",
          });
          return;
        }
        if (dataUser.point >= voucher.point) {
          const newVoucherCode = generateVoucherCode();
          const newUserVoucher: UserVoucher = {
            voucher_id: voucher._id,
            code: newVoucherCode,
          };
          const updatedUser = {
            ...dataUser,
            point: dataUser.point - voucher.point,
            vouchers: [...dataUser.vouchers, newUserVoucher],
          };
          console.log(newUserVoucher);
          const updatedVoucher = {
            ...voucher,
            codeVoucher: [
              ...voucher.codeVoucher,
              {
                code: newVoucherCode,
                redeemedAt: new Date(),
                status: "unused",
              },
            ],
          };
          console.log(updatedVoucher);
          // console.log(...dataUser.vouchers, newVoucherCode);
          // const updatedVoucher = {
          //   ...voucher,
          //   users: [
          //     ...voucher.users,
          //     { user_id: user._id, redeemedAt: new Date() },
          //   ],
          // };
          try {
            await request.put(`users/${user._id}`, updatedUser);
            await request.put(`vouchers/${voucher._id}`, updatedVoucher);
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
            fetchDataUser();
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
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please login to redeem vouchers.",
      });

      return;
    }
  };

  // Gọi các hàm lấy dữ liệu trong useEffect
  useEffect(() => {
    fetchDataVoucher();
    fetchDataUser();
  }, []);

  return (
    <div className="h-[85vh] m-6 overflow-y-scroll sm:overflow-y-hidden  bg-white rounded-md shadow-sm">
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
