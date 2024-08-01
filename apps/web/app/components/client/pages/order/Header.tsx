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
  Modal,
  rem,
  TbFilterPlus,
  TbLogin,
  TbLogout,
  TbReceipt,
  TbShoppingCart,
  TbUser,
  TbUserPlus,
  TbZoom,
  Text,
  TextInput,
  useDisclosure,
  useEffect,
  useState,
} from "@repo/ui";
import NavbarMobile from "./NavBarMobile";
import Order from "./dashboard/Order";
import ProductFilter from "../../components/modal/modal-filter";
import { Category } from "../../../../interface";
import request from "../../../../utils/request";
import { useCartStore, useUserStore } from "../../../../store";
import Link from "next/link";
import { useRouter } from "next/navigation";

const dataNavbar = {
  items: [
    {
      icons: "TbBowlChopsticks" as const,
      label: "Dashboard",
      href: "/order/dashboard",
    },
    {
      icons: "TbArticle" as const,
      label: "Order History",
      href: "/order/history",
    },

    {
      icons: "TbClipboardCheck" as const,
      label: "Voucher",
      href: "/order/voucher",
    },
    {
      icons: "TbCashBanknote" as const,
      label: "Payment",
      href: "/order/payment",
    },
  ],
};
const Header = () => {
  const router = useRouter()
  const { user, clearUser } = useUserStore((state) => state);
  const [menuOpened, { toggle: toggleMenu, open: openMenu, close: closeMenu }] =
    useDisclosure();
  const [cartOpened, { open: openCart, close: closeCart }] = useDisclosure();
  const [filterOpened, { open: openFilter, close: closeFilter }] =
    useDisclosure();
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [fromPrice, setFromPrice] = useState<number | undefined>(undefined);
  const [toPrice, setToPrice] = useState<number | undefined>(undefined);

  const { items } = useCartStore((state) => state);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await request.get("/categories");
        setCategories(res.data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    fetchCategories();
  }, []);
  const totalQty = items.reduce((sum, item) => sum + item.quantity, 0);
const handleLogout = () => {
  router.push('/order/dashboard')
  clearUser()
}
  return (
    <>
      {/* MODAL NAV*/}
      <Drawer
        size="xs"
        opened={menuOpened}
        onClose={closeMenu}
        overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
      >
        <NavbarMobile close={closeMenu} dataNavbar={dataNavbar} />
      </Drawer>
      {/* MODAL END NAV*/}
      {/* MODAL CART */}
      <Drawer
        size="xs"
        position="right"
        opened={cartOpened}
        onClose={closeCart}
        overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
      >
        <div className="flex flex-col justify-between ">
          <Order />
        </div>
      </Drawer>
      {/* MODAL END CART */}
      {/* MODAL FILTER */}
      <Modal
        size="md"
        opened={filterOpened}
        onClose={closeFilter}
        title="Fillter Product"
        overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
      ></Modal>
      {/* MODAL END FILTER */}
      <div className="w-full px-6 bg-white">
        <div className="flex flex-col-reverse justify-between gap-4 py-2 pt-4 sm:flex-row">
          <div className="flex justify-between gap-4 sm:justify-start "></div>
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
                className="block xl:hidden"
                inline
                label={isClient ? totalQty : "0"}
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
                {user ? (
                  <Menu.Dropdown>
                    <Menu.Item
                      leftSection={
                        <TbUser style={{ width: rem(14), height: rem(14) }} />
                      }
                    >
                      {user?.username}
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
                    <Menu.Item
                      leftSection={
                        <TbReceipt
                          style={{ width: rem(14), height: rem(14) }}
                        />
                      }
                    >
                      Order
                    </Menu.Item>
                    <Menu.Divider />
                    <Menu.Item
                      onClick={handleLogout}
                      leftSection={
                        <TbLogin style={{ width: rem(14), height: rem(14) }} />
                      }
                    >
                      Logout
                    </Menu.Item>
                  </Menu.Dropdown>
                ) : (
                  <Menu.Dropdown>
                    <Link href="/auth/login">
                      <Menu.Item
                        className="flex items-center"
                        leftSection={
                          <TbLogout
                            style={{ width: rem(14), height: rem(14) }}
                          />
                        }
                      >
                        Login
                      </Menu.Item>
                    </Link>
                    <Link href="/auth/signup">
                      <Menu.Item
                        className="flex items-center"
                        leftSection={
                          <TbUserPlus
                            style={{ width: rem(14), height: rem(14) }}
                          />
                        }
                      >
                        Register
                      </Menu.Item>
                    </Link>
                  </Menu.Dropdown>
                )}
              </Menu>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
