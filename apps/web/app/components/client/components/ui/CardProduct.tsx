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
import ProductModal from "../modal/modal-product";
interface CardProductProps {
  image: String;
  name: string;
  price: number;
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
    // console.log(response.data[0]);
    open();
  };
  return (
    <>
      <ProductModal opened={opened} onClose={close} product={product} />
      <Card className="relative p-0 rounded-md">
        {seller === 1 && (
          <Badge className="absolute z-10 bg-green-600 top-2 right-2">
            Seller
          </Badge>
        )}
        <div>
          <div className="h-28">
            <Image
              className="h-full"
              src={
                image !== ""
                  ? image
                  : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJRS-4chjWMRAmrtz7ivK53K_uygrgjzw9Uw&s"
              }
              alt={name}
            />
          </div>
        </div>
        <Box className="flex items-center justify-between p-2">
          <div>
            <Text className="text-xs font-medium">{name}</Text>
            <Text className="text-xs font-medium">
              Price: {price.toLocaleString()} VNĐ
            </Text>
          </div>
          {/* <Text size="sm" color="dimmed">
          {description}
        </Text> */}
          <Box>
            <motion.button whileTap={{ scale: 0.97 }}>
              <div className="">
                <AiOutlinePlus
                  className="w-6 h-6 text-white rounded-full bg-customOrange "
                  onClick={handleOpen}
                />
              </div>
            </motion.button>
          </Box>
        </Box>
      </Card>
    </>
  );
};
export default CardProduct;
