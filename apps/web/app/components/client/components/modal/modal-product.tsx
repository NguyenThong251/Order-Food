import "@mantine/carousel/styles.css";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  Badge,
  Box,
  Button,
  Card,
  Carousel,
  Flex,
  Group,
  Image,
  Modal,
  Text,
  TextInput,
  motion,
  rem,
  useState,
} from "@repo/ui";
import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { CartDB, CartItem, Products } from "../../../../interface";
import { useCartStore, useUserStore } from "../../../../store";
import request from "../../../../utils/request";

interface ProductModalProps {
  opened: boolean;
  onClose: () => void;
  product: Products | null;
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
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCartStore((state) => state);
  const { user } = useUserStore((state) => state);
  const handleAddToCart = async () => {
    const newItem: CartItem = {
      product_id: product._id,
      quantity,
    };

    addItem(newItem);
    // }

    onClose();
  };
  // xử lý price button
  const totalPrice = product.price * quantity;
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
        className="overflow-hidden rounded-md"
      >
        <Card>
          <Card.Section className="relative">
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
                  onClick={() => {
                    if (quantity > 0) setQuantity(quantity - 1);
                  }}
                >
                  <AiOutlineMinus size={20} />
                </Button>
                <TextInput
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    if (!isNaN(value)) {
                      setQuantity(value);
                    }
                  }}
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
                  value={quantity}
                  min={0}
                  max={99}
                  step={1}
                  className="w-20 border-0 outline-none "
                />
                <Button
                  onClick={() => {
                    if (quantity < 99) setQuantity(quantity + 1);
                  }}
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
            onClick={quantity === 0 ? onClose : handleAddToCart}
            color="red"
            fullWidth
            mt="md"
            radius="md"
          >
            {quantity !== 0
              ? `Add to cart - ${totalPrice.toLocaleString()} VNĐ`
              : "Quay lại trang chủ"}
          </Button>
        </Card>
      </motion.div>
    </Modal>
  );
};

export default ProductModal;
