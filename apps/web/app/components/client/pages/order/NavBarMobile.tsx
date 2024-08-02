import {
  Box,
  TbArticle,
  TbBowlChopsticks,
  TbCashBanknote,
  TbClipboardCheck,
  TbSettings,
} from "@repo/ui";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
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
  close: () => void;
};
const NavbarMobile: React.FC<NavbarProps> = ({ close, dataNavbar }) => {
  const router = usePathname();

  const handleClick = () => {
    close();
  };
  return (
    <>
      <Box className="flex flex-col gap-5 mt-10">
        {dataNavbar.items.map((item, index) => {
          const IconComponent = iconComponents[item.icons];
          const isActive = router === item.href;
          return (
            <Link onClick={handleClick} href={item.href} key={index}>
              <ul
                className={`border-2 rounded-lg ${
                  isActive
                    ? "border-customOrange bg-[#fdeeeb]"
                    : "bg-white border-gray-400 group hover:border-customOrange ease-in-out hover:-translate-y-1 duration-300 hover:shadow-lg hover:transition-all hover:bg-[#fdeeeb] hover:text-customOrange"
                }`}
              >
                <li className="flex items-center justify-start gap-4 px-4 py-2">
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
                    className={` text-lg font-medium  ${
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

export default NavbarMobile;
