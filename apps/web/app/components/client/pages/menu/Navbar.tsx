"use client";
import {
  useState,
  Center,
  Tooltip,
  UnstyledButton,
  Stack,
  rem,
  Image,
  Box,
  Button,
  Text,
  AiOutlineCoffee,
  AiOutlineFile,
  IconLogout,
  Flex,
  useEffect,
} from "@repo/ui";

import classes from "./navbar.module.css";
import { useUserStore } from "../../../../store";

interface NavbarLinkProps {
  icon: typeof AiOutlineCoffee;
  label: string;
  active?: boolean;
  onClick?(): void;
}

function NavbarLink({ icon: Icon, label, active, onClick }: NavbarLinkProps) {
  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <UnstyledButton
        onClick={onClick}
        className={`${classes.link} ${active ? classes.active : ""}`}
      >
        <Center style={{ flexDirection: "column" }}>
          <Icon style={{ width: rem(30), height: rem(30) }} />
          <Text size="lg" fw={500} mt={4}>
            {label}
          </Text>
        </Center>
      </UnstyledButton>
    </Tooltip>
  );
}

const mockdata = [
  { icon: AiOutlineCoffee, label: "Menu" },
  { icon: AiOutlineFile, label: "Order" },
];

export function Navbar() {
  const [isClient, setIsClient] = useState(false);
  const [active, setActive] = useState(0);
  const { user, clearUser } = useUserStore((state) => state);
  useEffect(() => {
    setIsClient(true);
  }, []);
  const handleLogout = () => {
    clearUser();
  };
  const links = mockdata.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={index === active}
      onClick={() => setActive(index)}
    />
  ));
  if (!isClient) {
    return null;
  }
  return (
    <Box style={{ height: "100vh", padding: "20px" }}>
      <Flex
        direction="column"
        justify="space-between"
        style={{ height: "100%" }}
      >
        <Center>
          <Box>
            <Image
              width={60}
              height={60}
              src="https://hoangthong.asia/wp-content/uploads/2024/05/Vector-2-70x69.png"
              alt="logo"
            />
          </Box>
        </Center>

        <Box className={classes.navbarMain}>
          <Stack justify="center" gap={0}>
            {links}
          </Stack>
        </Box>

        <Stack justify="center" gap={10} className={classes.bottomSection}>
          {user ? (
            <>
              <Text size="lg">{user.username}</Text>
              <Button variant="outline" color="red" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button variant="filled" color="red">
                Login
              </Button>
              <Button variant="outline" color="red">
                Signup
              </Button>
            </>
          )}
        </Stack>
      </Flex>
    </Box>
  );
}
