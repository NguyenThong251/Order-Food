"use client";

import ModalAddProduct from "../../../../components/admin/modal/modal-product-add";
import { TableProduct } from "../../../../components/admin/table/table-product";
import Notification from "../../../../components/ui/Notification";
import { useState } from "@repo/ui";
const page = () => {
  return (
    <>
      <ModalAddProduct />
      {/* <Button
        leftSection={
          <AiOutlinePlus style={{ width: rem(16), height: rem(16) }} />
        }
      >
        Add Products
      </Button> */}
      <TableProduct />
    </>
  );
};

export default page;
