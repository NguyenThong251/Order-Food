"use client";
import {
  AiOutlinePlus,
  Badge,
  Box,
  Button,
  Card,
  Flex,
  Group,
  Image,
  Text,
  rem,
  useDisclosure,
  useState,
  motion,
} from "@repo/ui";
import request from "../../../../utils/request";
import ProductModal from "../../modal/modal-product";
interface CardProductProps {
  image: String;
  name: string;
  price: string;
  description: string;
  seller: number;
  productId: string;
}
const CardProduct: React.FC<CardProductProps> = ({
  image,
  name,
  price,
  description,
  seller,
  productId,
}) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [product, setProduct] = useState<any>(null);
  const handleOpen = async () => {
    const response = await request.get(`/products/${productId}`);
    setProduct(response.data[0]);
    open();
  };
  return (
    <>
      <ProductModal opened={opened} onClose={close} product={product} />
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
            color="green"
          >
            Seller
          </Badge>
        )}
        <Card.Section component="a">
          <Image
            className="h-40"
            src={
              image !== ""
                ? image
                : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJRS-4chjWMRAmrtz7ivK53K_uygrgjzw9Uw&s"
            }
            alt={name}
          />
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
            <Flex justify="end" align="center">
              <motion.button whileTap={{ scale: 0.97 }}>
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
                  // onClick={open}
                  onClick={handleOpen}
                >
                  <AiOutlinePlus size={20} />
                </Button>
              </motion.button>
            </Flex>
          </Box>
        </Box>
      </Card>
    </>
  );
};
export default CardProduct;
