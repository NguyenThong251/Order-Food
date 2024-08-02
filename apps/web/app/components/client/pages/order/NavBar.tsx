import Link from "next/link";
import React from "react";
import {
  Box,
  TbArticle,
  TbBowlChopsticks,
  TbCashBanknote,
  TbClipboardCheck,
  TbSettings,
} from "@repo/ui";
import { useRouter, usePathname } from "next/navigation";
const iconComponents = {
  TbBowlChopsticks: TbBowlChopsticks,
  TbArticle: TbArticle,
  TbClipboardCheck: TbClipboardCheck,
  TbCashBanknote: TbCashBanknote,
  TbSettings: TbSettings,
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
