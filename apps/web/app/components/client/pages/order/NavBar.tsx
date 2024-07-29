import Link from "next/link";
import React from "react";
import {
  Box,
  TbArticle,
  TbBowlChopsticks,
  TbCashBanknote,
  TbClipboardCheck,
} from "@repo/ui";
import { useRouter, usePathname } from "next/navigation";
const iconComponents = {
  TbBowlChopsticks: TbBowlChopsticks,
  TbArticle: TbArticle,
  TbClipboardCheck: TbClipboardCheck,
  TbCashBanknote: TbCashBanknote,
};

type IconType = keyof typeof iconComponents;
type NavbarItem = {
  icons: IconType;
  label: string;
  href: string;
};
type NavbarData = {
  items: NavbarItem[];
};

type NavbarProps = {
  dataNavbar: NavbarData;
};

const Navbar: React.FC<NavbarProps> = ({ dataNavbar }) => {
  const router = usePathname();

  return (
    <>
      {/* <Box className="flex flex-col gap-5 mt-10">
        <Link href="#">
          <ul className="border-2 rounded-lg border-customOrange bg-[#fdeeeb]">
            <li className="flex items-center justify-center gap-4 px-4 py-2 lg:justify-start">
              <div className="">
                <TbBowlChopsticks className="text-customOrange" size={25} />
              </div>
              <div className="hidden text-lg font-medium lg:block text-customOrange">
                Dashboard
              </div>
            </li>
          </ul>
        </Link>
        <Link href="#">
          <ul className="bg-white border-2 border-gray-400 rounded-lg group hover:border-customOrange ease-in-out hover:-translate-y-1 duration-300 hover:shadow-lg hover:transition-all hover:bg-[#fdeeeb] hover:text-customOrange">
            <li className="flex items-center justify-center gap-4 px-4 py-2 lg:justify-start">
              <div className="">
                <TbArticle
                  className="text-gray-400 group-hover:text-customOrange"
                  size={25}
                />
              </div>
              <div className="hidden text-lg font-medium text-gray-400 lg:block group-hover:text-customOrange">
                Order Detail
              </div>
            </li>
          </ul>
        </Link>
      </Box> */}
      <Box className="flex flex-col gap-5 mt-10">
        {dataNavbar.items.map((item, index) => {
          const IconComponent = iconComponents[item.icons];
          const isActive = router === item.href;
          return (
            <Link href={item.href} key={index}>
              <ul
                className={`border-2 rounded-lg ${
                  isActive
                    ? "border-customOrange bg-[#fdeeeb]"
                    : "bg-white border-gray-400 group hover:border-customOrange ease-in-out hover:-translate-y-1 duration-300 hover:shadow-lg hover:transition-all hover:bg-[#fdeeeb] hover:text-customOrange"
                }`}
              >
                <li className="flex items-center justify-center gap-4 px-4 py-2 lg:justify-start">
                  <div className="">
                    <IconComponent
                      className={`${
                        isActive
                          ? "text-customOrange"
                          : "text-gray-400 group-hover:text-customOrange"
                      }`}
                      size={25}
                    />
                  </div>
                  <div
                    className={`hidden text-lg font-medium lg:block ${
                      isActive
                        ? "text-customOrange"
                        : "text-gray-400 group-hover:text-customOrange"
                    }`}
                  >
                    {item.label}
                  </div>
                </li>
              </ul>
            </Link>
          );
        })}
      </Box>
    </>
  );
};

export default Navbar;
