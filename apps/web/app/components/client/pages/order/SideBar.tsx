import { Box, Image, Title } from "@repo/ui";
import React from "react";
import Navbar from "./NavBar";

const SideBar = () => {
  return (
    <>
      <div className="relative w-full h-screen p-4 m-0 bg-white ">
        <Box className="flex items-center gap-3">
          <Image
            w={55}
            h={55}
            src="http://localhost:3000/_next/image?url=https%3A%2F%2Fpng.pngtree.com%2Fpng-vector%2F20220708%2Fourmid%2Fpngtree-fast-food-logo-png-image_5763171.png&w=64&q=75"
            alt=""
          />
          <p className="text-[#ee5733] text-xl font-bold">ORDER FODD</p>
        </Box>
        <Navbar />
      </div>
    </>
  );
};

export default SideBar;
