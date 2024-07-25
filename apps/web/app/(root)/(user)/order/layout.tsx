"use client";
import { Grid } from "@repo/ui";
import SideBar from "../../../components/client/pages/order/SideBar";
import Header from "../../../components/client/pages/order/Header";
export default function LayoutUserDashboard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="grid grid-cols-12 bg-[#eff1f5]">
        <div className="col-span-2">
          <SideBar />
        </div>
        <div className="col-span-10">
          <div className="w-full h-screen">
            <Header />
            <section>{children}</section>
          </div>
        </div>
      </div>
    </>
  );
}
