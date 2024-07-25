import {
  Avatar,
  Burger,
  Button,
  Drawer,
  IconMessageCircle,
  IconSettings,
  Image,
  Indicator,
  Menu,
  rem,
  TbFilterPlus,
  TbLogout,
  TbReceipt,
  TbShoppingCart,
  TbZoom,
  Text,
  TextInput,
  useDisclosure,
} from "@repo/ui";
import NavbarMobile from "./NavBarMobile";
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
const Header = () => {
  const [menuOpened, { toggle: toggleMenu, open: openMenu, close: closeMenu }] =
    useDisclosure();
  const [cartOpened, { open: openCart, close: closeCart }] = useDisclosure();
  const [filterOpened, { open: openFilter, close: closeFilter }] =
    useDisclosure();
  return (
    <>
      {/* MODAL NAV*/}
      <Drawer
        size="xs"
        opened={menuOpened}
        onClose={closeMenu}
        overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
      >
        <NavbarMobile dataNavbar={dataNavbar} />
      </Drawer>
      {/* MODAL END NAV*/}
      {/* MODAL CART */}
      <Drawer
        size="xs"
        position="right"
        opened={cartOpened}
        onClose={closeCart}
        overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
      ></Drawer>
      {/* MODAL END CART */}
      {/* MODAL CART */}
      <Drawer
        size="xs"
        position="top"
        opened={filterOpened}
        onClose={closeFilter}
        overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
      ></Drawer>
      {/* MODAL END CART */}
      <div className="w-full px-6 py-2 bg-white">
        <div className="flex flex-col-reverse justify-between gap-4 py-4 sm:flex-row">
          <div className="flex justify-between gap-4 sm:justify-start ">
            <div className="flex gap-4">
              <TextInput
                className="!active:border-red-500 w-48 sm:w-64"
                variant="filled"
                placeholder="Search food..."
              />
              <Button className="bg-customOrange hover:bg-[#e6570f]">
                <TbZoom className="text-lg" />
              </Button>{" "}
            </div>
            <Button
              onClick={openFilter}
              className="flex items-center  bg-customOrange hover:bg-[#e6570f]"
            >
              <Text className="hidden sm:block">Filter</Text>{" "}
              <TbFilterPlus className="text-lg lg:ms-3" />
            </Button>
          </div>
          <div className="flex items-center justify-between gap-4">
            <Burger
              className="block sm:hidden"
              opened={menuOpened}
              onClick={toggleMenu}
              aria-label="Toggle navigation"
            />
            <Image
              className="block sm:hidden"
              w={44}
              h={44}
              src="http://localhost:3000/_next/image?url=https%3A%2F%2Fpng.pngtree.com%2Fpng-vector%2F20220708%2Fourmid%2Fpngtree-fast-food-logo-png-image_5763171.png&w=64&q=75"
              alt=""
            />
            <div className="flex items-center gap-4">
              <Indicator
                className="block lg:hidden"
                inline
                label="11"
                color="red"
                size={16}
                onClick={openCart}
              >
                <TbShoppingCart size={30} />
              </Indicator>
              <Menu shadow="md" width={200}>
                <Menu.Target>
                  <Avatar
                    className="text-sm"
                    src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png"
                    alt="it's me"
                  />
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Item
                    leftSection={
                      <IconSettings
                        style={{ width: rem(14), height: rem(14) }}
                      />
                    }
                  >
                    Settings
                  </Menu.Item>
                  <Menu.Item
                    leftSection={
                      <TbReceipt style={{ width: rem(14), height: rem(14) }} />
                    }
                  >
                    Order
                  </Menu.Item>
                  <Menu.Divider />
                  <Menu.Item
                    leftSection={
                      <TbLogout style={{ width: rem(14), height: rem(14) }} />
                    }
                  >
                    Logout
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
