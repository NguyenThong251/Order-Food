import {
  TbAlignBoxCenterStretch,
  TbBrandProducthunt,
  TbDashboard,
} from "@repo/ui";

const SideBar = () => {
  return (
    <>
      <div className="fixed top-0 left-0 w-[253] h-[100vh] border-t-2 z-10 bg-white mt-[70px] shadow-lg transition-all">
        <div className="ms-0">
          <ul className="relative px-3 h-[100vh - 70px] overflow-auto flex flex-col gap-2">
            <li className="relative flex items-center gap-5 p-0 px-2 py-4 font-medium rounded-md cursor-pointer ">
              <TbDashboard />
              Dashboard
            </li>
            <li className="relative p-0 py-4 text-2xl font-semibold">
              Overview
            </li>
            <li className="relative flex items-center gap-5 p-0 px-2 py-4 font-medium text-blue-700 rounded-md cursor-pointer bg-blue-50 ">
              <TbAlignBoxCenterStretch />
              All Invoices
            </li>
            <li className="relative flex items-center gap-5 p-0 px-2 py-4 font-medium rounded-md cursor-pointer ">
              <TbBrandProducthunt />
              All Products
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default SideBar;
