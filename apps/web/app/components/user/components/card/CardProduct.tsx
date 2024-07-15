"use client";
import {
  Badge,
  Button,
  Card,
  Container,
  Grid,
  Group,
  Image,
  Text,
  NumberInput,
  useEffect,
  useState,
  AiOutlineMinus,
  AiOutlinePlus,
  Box,
  Flex,
  rem,
  TextInput,
  useDisclosure,
  Modal,
  AiOutlineClose,
  SimpleGrid,
} from "@repo/ui";
import ProductModal from "../../modal/modal-product";
const images = [
  "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-1.png",
  "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-2.png",
  "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-3.png",
];
interface CardProductProps {
  image: String;
  name: string;
  price: string;
  description: string;
  seller: number;
}
const CardProduct: React.FC<CardProductProps> = ({
  image,
  name,
  price,
  description,
  seller,
}) => {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <ProductModal opened={opened} onClose={close} />
      <Card
        padding={0}
        shadow="sm"
        radius="md"
        withBorder
        style={{ position: "relative" }}
      >
        {seller === 1 && (
          <Badge
            style={{
              position: "absolute",
              top: rem(8),
              right: rem(8),
              zIndex: 1,
            }}
            color="red"
          >
            Seller
          </Badge>
        )}
        <Card.Section component="a" href="https://mantine.dev/">
          <Image src={image} height={160} alt="Norway" />
        </Card.Section>
        <Box p="xs">
          <Group justify="space-between" mb="xs">
            <Text fw={500}>{name}</Text>
          </Group>
          {/* <Text size="sm" color="dimmed">
          {description}
        </Text> */}
          <Text size="sm" fw={500}>
            Price: {price} VNĐ
          </Text>
          <Box mt="md">
            {/* <Flex justify="space-between" align="center">
              <Button
                color="red"
                style={{
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: rem(40),
                  height: rem(40),
                }}
              >
                <AiOutlineMinus size={20} />
              </Button>
              <TextInput
                value={1}
                min={0}
                max={99}
                step={1}
                styles={{
                  input: {
                    width: rem(60),
                    textAlign: "center",
                    border: "none",
                    outline: "none",
                    boxShadow: "none",
                    fontSize: rem(16),
                  },
                }}
              />
              <Button
                color="red"
                style={{
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: rem(40),
                  height: rem(40),
                }}
              >
                <AiOutlinePlus size={10} />
              </Button>
            </Flex> */}
            <Flex justify="end" align="center">
              <Button
                color="red"
                style={{
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: rem(40),
                  height: rem(40),
                }}
                onClick={open}
              >
                <AiOutlinePlus size={20} />
              </Button>
            </Flex>
          </Box>
        </Box>
      </Card>
    </>
  );
};
export default CardProduct;
