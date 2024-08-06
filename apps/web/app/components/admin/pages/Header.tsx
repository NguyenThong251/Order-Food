"use client";
import {
  Avatar,
  IconMessageCircle,
  IconPhoto,
  IconSearch,
  IconSettings,
  Indicator,
  Menu,
  rem,
  TbBell,
  TbLogin,
  TbSearch,
  TbUser,
  Text,
} from "@repo/ui";
import React from "react";
import CardNoti from "../components/ui/CardNoti";

const Header = () => {
  return (
    <>
      <header className="flex flex-wrap w-full m-0 shadow-lg ">
        <div className="logo w-[253px] justify-between px-[15px] py-[16px] bg-white flex items-center col-auto">
          <a href="">LOGO</a>
        </div>
        <div className="bg-whtie flex justify-between px-[15px] py-[16px] flex-1">
          <div className="xl:block none">
            <form className="mb-0 ralative">
              <div className="w-[530px] bg-[#f4f5f8] relative rounded-md flex flex-wrap items-center">
                <div className="bg-[#f4f5f8] px-4">
                  <TbSearch />
                </div>
                <input
                  type="text"
                  className="bg-[#f4f5f8] font-medium p-2 w-[1%] flex-grow-[1] focus:border-none "
                />
              </div>
            </form>
          </div>
          <div className="nav-right ">
            <ul className="flex items-center p-0 m-0 header-right">
              <Menu shadow="md" width={200}>
                <Menu.Target>
                  <Indicator inline label="2" size={16}>
                    <li className="w-10 h-10 bg-[#f4f5f8] ms-3 flex items-center justify-center relative">
                      <TbBell className="text-2xl" />
                    </li>
                  </Indicator>
                </Menu.Target>
                <Menu.Dropdown className="w-80">
                  <Menu.Label>Notifications</Menu.Label>
                  <Menu.Item>
                    <CardNoti />
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
              <Menu shadow="md" width={200}>
                <Menu.Target>
                  <li className="relative flex items-center justify-center w-10 h-10 ms-3">
                    <Avatar
                      component="a"
                      target="_blank"
                      src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-7.png"
                      alt="it's me"
                    />
                  </li>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item
                    leftSection={
                      <TbUser style={{ width: rem(14), height: rem(14) }} />
                    }
                  >
                    {/* {user?.username} */}
                  </Menu.Item>

                  <Menu.Item
                    leftSection={
                      <IconSettings
                        style={{ width: rem(14), height: rem(14) }}
                      />
                    }
                  >
                    Settings
                  </Menu.Item>

                  <Menu.Divider />
                  <Menu.Item
                    leftSection={
                      <TbLogin style={{ width: rem(14), height: rem(14) }} />
                    }
                  >
                    Logout
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </ul>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
