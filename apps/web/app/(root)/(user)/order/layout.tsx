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
      <div className="flex bg-[#eff1f5]" suppressHydrationWarning={true}>
        <SideBar />

        <div className="w-full">
          <div className="flex flex-col w-full h-screen overflow-y-hidden">
            <Header />
            <section>{children}</section>
          </div>
        </div>
      </div>
    </>
  );
}
