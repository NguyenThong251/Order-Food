import {
  AiFillDelete,
  AiOutlineMinus,
  AiOutlinePlus,
  Box,
  Button,
  Center,
  Flex,
  Grid,
  Image,
  NumberInput,
  SimpleGrid,
  TbX,
  Text,
  Title,
} from "@repo/ui";
import { Products } from "../../../../interface";
import { useUserStore } from "../../../../store";
interface CardOrderItemProps {
  product: Products;
  quantity: number;
  onRemove: (productId: string) => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
}

const CardOrderItem: React.FC<CardOrderItemProps> = ({
  product,
  quantity,
  onRemove,
  onUpdateQuantity,
}) => {
  // const { user } = useUserStore((state) => state);
  const handleUpdateQuantity = (newQuantity: number) => {
    if (newQuantity < 1) {
      onRemove(product._id);
    } else {
      onUpdateQuantity(product._id, newQuantity);
    }
  };
  return (
    <>
      <div className="flex justify-between ">
        <div className="">
          <Image
            className="w-20 h-20 rounded-md"
            src={
              product.thumbnails[0] ||
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJRS-4chjWMRAmrtz7ivK53K_uygrgjzw9Uw&s"
            }
            alt={product.name}
          />
        </div>
        <div>
          <Flex justify="space-between" align="center">
            <h3 className="font-medium text-md">{product.name}</h3>
            <Text>{product.category.name}</Text>
          </Flex>
          <Text>{product.price.toLocaleString()} VNĐ</Text>
          <Box>
            <Flex align="center">
              <AiOutlineMinus
                className="p-1 text-gray-900 rounded-full cursor-pointer w-7 h-7 bg-slate-200"
                onClick={() => handleUpdateQuantity(quantity - 1)}
              />

              <NumberInput
                value={quantity}
                hideControls
                styles={{
                  input: {
                    border: "none",
                    textAlign: "center",
                    width: 60,
                  },
                }}
                onChange={(value) => handleUpdateQuantity(Number(value))}
              />
              <AiOutlinePlus
                className="p-1 text-gray-900 rounded-full cursor-pointer w-7 h-7 bg-slate-200"
                onClick={() => handleUpdateQuantity(quantity + 1)}
              />
            </Flex>
          </Box>
        </div>
        <div>
          <Flex align="end" justify="end">
            <TbX
              style={{ cursor: "pointer" }}
              size={20}
              color="rgba(255, 0, 0, 1)"
              onClick={() => onRemove(product._id)}
            />
          </Flex>
        </div>
      </div>
    </>
  );
};

export default CardOrderItem;
