import {
  AiOutlineDelete,
  AiOutlineShoppingCart,
  Box,
  Button,
  Flex,
  Image,
  NumberInput,
  Text,
  TextInput,
  Title,
} from "@repo/ui";
import classes from "./order.module.css";
import CardOrderItem from "../components/card/CardOrderItem";
const Order = () => {
  return (
    <>
      <Box style={{ height: "100vh" }}>
        <Flex
          direction="column"
          justify="space-between"
          style={{ height: "100%", padding: "20px" }}
        >
          <Box>
            <Box>
              <Flex justify="space-between">
                <Title fz={18}> Order No:</Title>
                <Flex align="center" gap={5}>
                  <Text>#000230</Text>
                  <AiOutlineDelete fontSize={24} color="rgba(255, 0, 0, 1)" />
                </Flex>
              </Flex>
              <Flex gap={5}>
                <NumberInput label="Phone" placeholder="Number Phone" />
                <TextInput label="Your name" placeholder="Your name" />
              </Flex>
            </Box>
          </Box>
          <Flex gap={20} align="center" justify="center" direction="column">
            {/* <Image
              w={180}
              src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-7359557-6024626.png"
              alt="cart null"
            ></Image> */}
            <CardOrderItem />
            <CardOrderItem />
          </Flex>
          <Box>
            <Button
              disabled
              variant="filled"
              color="red"
              fullWidth
              rightSection={
                <AiOutlineShoppingCart size={18} fontWeight={700} />
              }
            >
              Order
            </Button>
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default Order;
