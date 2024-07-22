"use client";
import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Text,
  Title,
  useDisclosure,
  useLocalStorage,
  useState,
  useEffect,
} from "@repo/ui";
type User = {
  username: string;
};
import { useRouter } from "next/navigation";
import Link from "next/link";
import React from "react";

const Header: React.FC = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  const [opened, { toggle }] = useDisclosure(false);
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    router.push("/auth/login");
  };
  return (
    <Container fluid h={50}>
      <Container size="xxl">
        <Grid justify="space-between" align="center">
          <Grid.Col span={4}>
            <Title>LOGO</Title>
          </Grid.Col>
          <Grid.Col span={4}>
            <Flex justify="center" gap="1rem">
              <Link href="/" passHref>
                <Text fw={700}>Home</Text>
              </Link>
              <Link href="/about" passHref>
                <Text fw={700}>About</Text>
              </Link>
              <Link href="/contact" passHref>
                <Text fw={700}>Contact</Text>
              </Link>
              <Link href="/products" passHref>
                <Text fw={700}>Products</Text>
              </Link>
            </Flex>
          </Grid.Col>
          <Grid.Col span={4} style={{ textAlign: "right" }}>
            <Box style={{ display: "inline-flex", gap: "1rem" }}>
              {!user ? (
                <>
                  <Button color="teal">
                    <Link href="/auth/login" passHref>
                      <Text>Login</Text>
                    </Link>
                  </Button>
                  <Button variant="outline" color="teal">
                    <Link href="/auth/signup" passHref>
                      <Text>SignUp</Text>
                    </Link>
                  </Button>
                </>
              ) : (
                <>
                  <Text>Welcome, {user.username}</Text>
                  <Button onClick={handleLogout} variant="outline" color="teal">
                    <Text>Logout</Text>
                  </Button>
                </>
              )}
            </Box>
            {/* <Burger
              opened={opened}
              onClick={toggle}
              aria-label="Toggle navigation"
            /> */}
          </Grid.Col>
        </Grid>
      </Container>
    </Container>
  );
};

export default Header;
