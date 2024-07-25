import Link from "next/link";
import React from "react";
import { Box } from "@repo/ui";
const Navbar = () => {
  return (
    <>
      <div className="mt-5">
        <Link href="#">
          <ul>
            <li>
              <div className=""></div>
              <div className="">Dashboard</div>
            </li>
          </ul>
        </Link>
      </div>
    </>
  );
};

export default Navbar;
