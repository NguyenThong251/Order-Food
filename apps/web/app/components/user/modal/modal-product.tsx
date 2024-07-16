import React from "react";
import {
  Box,
  Button,
  Card,
  Image,
  Group,
  Text,
  Badge,
  SimpleGrid,
  Modal,
  Flex,
  rem,
  TextInput,
  AiOutlineMinus,
  AiOutlinePlus,
  motion,
  Carousel,
  useState,
} from "@repo/ui";
import "@mantine/carousel/styles.css";
import { AiOutlineClose } from "react-icons/ai";
import { useCartStore } from "../../../store";

interface ProductModalProps {
  opened: boolean;
  onClose: () => void;
  product: {
    name: string;
    price: number;
    description: string;
    seller: number;
    category: {
      name: string;
      image: string;
    };
    thumbnails: string[];
  } | null;
}
const modalVariants = {
  hidden: { opacity: 0, y: "-100%" },
  visible: {
    opacity: 1,
    y: "0%",
    transition: { type: "spring", stiffness: 150, damping: 24 },
  },
  exit: { opacity: 0, y: "-100%", transition: { duration: 0.2 } },
};
const ProductModal: React.FC<ProductModalProps> = ({
  opened,
  onClose,
  product,
}) => {
  if (!product) return null;
  const [currentIndex, setCurrentIndex] = useState(0);
  const { items, addItem, removeItem, clearCart } = useCartStore(
    (state) => state
  );
  const handleAddToCart = () => {};
  // const productItem = product
  return (
    <Modal
      padding={0}
      opened={opened}
      onClose={onClose}
      centered
      withCloseButton={false}
    >
      <motion.div
        initial="hidden"
        animate={opened ? "visible" : "hidden"}
        exit="exit"
        variants={modalVariants}
        style={{ overflow: "hidden", borderRadius: "10px" }}
      >
        <Card>
          <Card.Section style={{ position: "relative" }}>
            <Image
              src={product.thumbnails[currentIndex]}
              className="h-52"
              alt={product.name}
            />
            <Button
              onClick={onClose}
              variant="filled"
              color="rgba(255, 0, 0, 1)"
              style={{ position: "absolute", right: 10, top: 10 }}
            >
              <AiOutlineClose />
            </Button>
          </Card.Section>
          <Card.Section inheritPadding mt="sm" pb="md">
            <Carousel
              withIndicators
              height={80}
              slideSize={{
                base: "100%",
                sm: "50%",
                md: "33.333333%",
              }}
              slideGap={{ base: 0, sm: "md" }}
              loop
              align="start"
            >
              {product.thumbnails.map((image, index) => (
                <Carousel.Slide key={index}>
                  <Image
                    className="h-20 cursor-pointer"
                    src={image}
                    key={image}
                    radius="sm"
                    onClick={() => setCurrentIndex(index)}
                  />
                </Carousel.Slide>
              ))}
            </Carousel>
          </Card.Section>
          <Group justify="space-between" mt="md" mb="xs">
            <Text fw={500}>{product.name}</Text>

            {product.seller === 1 && <Badge color="pink">Seller</Badge>}
          </Group>
          <Text fw={500}>Price: {product.price}VNĐ</Text>
          <Text fw={400}>Category: {product.category.name}</Text>
          <Text mt={2} size="sm" c="dimmed">
            {product.description}
          </Text>
          <Flex mt={20} justify="center" align="center">
            <Box w={150}>
              <Flex justify="space-between" align="center">
                <Button
                  variant="outline"
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
                  variant="outline"
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
                  <AiOutlinePlus size={20} />
                </Button>
              </Flex>
            </Box>
          </Flex>
          <Button
            onClick={handleAddToCart}
            color="red"
            fullWidth
            mt="md"
            radius="md"
          >
            Add to cart - {product.price}VNĐ
          </Button>
        </Card>
      </motion.div>
    </Modal>
  );
};

export default ProductModal;
