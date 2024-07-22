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
    Text,
    Title,
  } from "@repo/ui";
  import { Products } from "../../../../interface";
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
    const handleUpdateQuantity = (newQuantity: number) => {
      if (newQuantity < 1) {
        onRemove(product._id);
      } else {
        onUpdateQuantity(product._id, newQuantity);
      }
    };
    // console.log(product);
    return (
      <>
        <Grid>
          <Grid.Col span={4}>
            <div>
              <Image
                w={100}
                h={100}
                radius="md"
                src={
                  product.thumbnails[0] ||
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJRS-4chjWMRAmrtz7ivK53K_uygrgjzw9Uw&s"
                }
                alt={product.name}
              />
            </div>
          </Grid.Col>
          <Grid.Col span={6}>
            <Box>
              <Flex justify="space-between" align="center">
                <Title fz={16}>{product.name}</Title>
                <Text>{product.category.name}</Text>
              </Flex>
              <Text>Price:{product.price}VNĐ</Text>
              <Box>
                <Flex align="center">
                  <AiOutlineMinus
                    size={20}
                    style={{ cursor: "pointer" }}
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
                    size={20}
                    style={{ cursor: "pointer" }}
                    onClick={() => handleUpdateQuantity(quantity + 1)}
                  />
                </Flex>
              </Box>
            </Box>
          </Grid.Col>
          <Grid.Col span={2}>
            <Flex align="end" justify="end">
              <AiFillDelete
                style={{ cursor: "pointer" }}
                size={20}
                color="rgba(255, 0, 0, 1)"
                onClick={() => onRemove(product._id)}
              />
            </Flex>
          </Grid.Col>
        </Grid>
      </>
    );
  };
  
  export default CardOrderItem;
  