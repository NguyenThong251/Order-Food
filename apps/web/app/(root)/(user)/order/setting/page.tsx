"use client";
import {
  IconCash,
  IconMessageCircle,
  IconPhoto,
  IconSettings,
  IconUser,
  Tabs,
} from "@repo/ui";
import Vouchers from "../../../../components/client/pages/setting/Voucher";
import UserPage from "../../../../components/client/pages/setting/User";

const page = () => {
  return (
    <>
      <div className="p-6">
        <div className="bg-white h-[85vh] rounded-lg">
          <Tabs
            className="p-2"
            color="#ee5733"
            variant="pills"
            defaultValue="user"
          >
            <Tabs.List>
              <Tabs.Tab value="user" leftSection={<IconUser />}>
                User
              </Tabs.Tab>
              <Tabs.Tab value="yourvoucher" leftSection={<IconCash />}>
                Voucher
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="user">
              <UserPage />
            </Tabs.Panel>

            <Tabs.Panel value="yourvoucher">
              <Vouchers />
            </Tabs.Panel>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default page;
