import {
  Box,
  Button,
  Image,
  Title,
  motion,
  AnimatePresence,
  TbLogin2,
} from "@repo/ui";
import React from "react";
import Navbar from "./NavBar";
import Link from "next/link";

const dataNavbar = {
  items: [
    {
      icons: "TbBowlChopsticks" as const,
      label: "Dashboard",
      href: "/order",
    },
    {
      icons: "TbArticle" as const,
      label: "Order Detail",
      href: "/order-detail",
    },
  ],
};
const SideBar: React.FC = () => {
  return (
    <>
      <div className="hidden sm:block w-80">
        <div className="relative flex flex-col justify-between w-full h-screen p-4 m-0 bg-white none ">
          <div>
            <Box className="flex items-center justify-center gap-3 lg:justify-start">
              <Image
                w={55}
                h={55}
                src="http://localhost:3000/_next/image?url=https%3A%2F%2Fpng.pngtree.com%2Fpng-vector%2F20220708%2Fourmid%2Fpngtree-fast-food-logo-png-image_5763171.png&w=64&q=75"
                alt=""
              />
              <p className="hidden lg:block text-[#ee5733] text-xl font-bold">
                ORDER FODD
              </p>
            </Box>
            <Navbar dataNavbar={dataNavbar} />
          </div>
          <div className="flex flex-col gap-4">
            <Link href="#">
              <ul className="duration-300 ease-in-out bg-white border-2 rounded-lg group hover:bg-customOrange border-customOrange hover:-translate-y-1 hover:shadow-lg hover:transition-all hover:text-customOrange">
                <li className="flex items-center justify-center gap-4 px-4 py-2 ">
                  <div className="">
                    <TbLogin2
                      className="text-customOrange group-hover:text-white"
                      size={25}
                    />
                  </div>
                  <div className="hidden text-lg font-medium lg:block group-hover:text-white text-customOrange">
                    Login
                  </div>
                </li>
              </ul>
            </Link>
            {/* <Button variant="outline" color="red">
              Signup
            </Button> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;
