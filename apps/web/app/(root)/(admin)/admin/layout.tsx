import Header from "../../../components/admin/pages/Header";
import SideBar from "../../../components/admin/pages/SideBar";

export default function AdminLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="relative block">
      <Header />

      <div className="page-body ms-[253px] bg-[#f9fafc]">
        <SideBar />
        <div className="min-h-[calc(100vh-136px)] bg-[#f9fafc] py-4 relative transition-all">
          {children}
        </div>
      </div>
    </main>
  );
}
