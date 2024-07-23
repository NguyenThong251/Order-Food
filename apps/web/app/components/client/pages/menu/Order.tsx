import {
  AiOutlineDelete,
  AiOutlineShoppingCart,
  Box,
  Button,
  Flex,
  Image,
  Text,
  TextInput,
  Title,
  useDisclosure,
  useEffect,
  useState,
} from "@repo/ui";
import { OrderData, Products, Table } from "../../../../interface";
import { useCartStore, useOrderStore, useTableStore } from "../../../../store";
import request from "../../../../utils/request";
import ModalDialogs from "../../components/modal/modal-dialogs";
import CardOrderItem from "../../components/ui/CardOrderItem";

// interface OrderItem {
//   product_id: number;
//   quantity: number;
// }

interface User {
  id: number;
  name: string;
  phone: string;
}
const Order: React.FC = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const { items, clearCart, removeItem, updateItemQuantity } = useCartStore(
    (state) => state
  );
  const { orderId, setOrderId } = useOrderStore((state) => state);
  const [loading, setLoading] = useState(true);
  const [productData, setProductData] = useState<Products[]>([]);
  const [phone, setPhone] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [isInputFilled, setIsInputFilled] = useState(false);
  const [tableData, setTableData] = useState<Table | null>(null);
  const tableId = useTableStore((state) => state._id);
  const [user, setUser] = useState<User | null>(null);
  const fetchDataProducts = async () => {
    try {
      const res = await Promise.all(
        items.map((item) => request.get(`products/${item.product_id}`))
      );
      setProductData(res.map((res) => res.data));
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };
  const fetchDataTable = async () => {
    const res = await request.get(`table/${tableId}`);
    setTableData(res.data);
    // console.log(res.data);
  };
  useEffect(() => {
    fetchDataTable();
    fetchDataProducts();
  }, [items]);
  useEffect(() => {
    // fetchDataProducts();
    setIsInputFilled(
      // phone.length >= 9 && name.trim() !== "" &&
      tableId !== "" && productData.length > 0
    );
  }, [items, phone, name, productData]);
  if (loading) {
    return <div>Loading...</div>;
  }

  const handleOpen = async () => {
    open();
  };

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(event.target.value);
  };
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleOrder = async () => {
    // Xử lý khi nhấn Order, có thể đặt logic lưu đơn hàng và các thao tác cần thiết ở đây
    // phone,
    //   name,
    const orderData: OrderData = {
      user_id: user ? user?.id : null,
      products: items.map((item) => ({
        product_id: item.product_id,
        quantity: item.quantity,
      })),
      // productData: [],
      table_id: tableId,
      sub_total: totalPrice,
    };
    try {
      if (orderId) {
        const currentOrder = await request.get(`/order/${orderId}`);
        const updatedProducts = [
          ...currentOrder.data.products,
          ...orderData.products,
        ];
        await request.put(`/order/${orderId}`, {
          ...currentOrder.data,
          products: updatedProducts,
          sub_total: currentOrder.data.sub_total + totalPrice,
        });
      } else {
        const res = await request.post("/order", orderData);
        if (res.status === 201) {
          if (!user) {
            setOrderId(res.data._id);
          }
        }
      }
      clearCart();
    } catch (err) {
      console.error("Error ordering:", err);
    }
  };
  // xử lý tổng quantity
  const totalQty = items.reduce((sum, item) => sum + item.quantity, 0);
  // xử lý tổng price
  const totalPrice = items.reduce((sum, item) => {
    const product = productData.flat().find((p) => p._id === item.product_id);
    // console.log(product);
    return sum + (product ? product.price * item.quantity : 0);
  }, 0);
  return (
    <>
      <ModalDialogs handleProps={clearCart} opened={opened} onClose={close} />
      <Box style={{ height: "100vh" }}>
        <Flex
          direction="column"
          justify="space-between"
          style={{ height: "100%", padding: "20px" }}
        >
          <Box>
            <Box>
              <Flex justify="space-between">
                <Title fz={18}> Table:</Title>
                <Flex align="center" gap={5}>
                  <Text>{tableData?.name}</Text>
                  {/* onClick={clearCart} */}
                  <AiOutlineDelete
                    onClick={handleOpen}
                    fontSize={24}
                    color="rgba(255, 0, 0, 1)"
                  />
                </Flex>
              </Flex>
              <Flex gap={5}>
                <TextInput
                  label="Phone"
                  placeholder="Number Phone"
                  value={phone}
                  onChange={handlePhoneChange}
                  inputWrapperOrder={["label", "input", "error"]}
                />
                {/* error={phone.length! <= 9 ? "Please enter your phone" : ""} */}
                <TextInput
                  label="Your name"
                  placeholder="Your name"
                  value={name}
                  inputWrapperOrder={["label", "input", "error"]}
                  onChange={handleNameChange}
                />
                {/* error={name.trim() === "" ? "Please enter your name" : ""} */}
              </Flex>
            </Box>
          </Box>

          <Flex gap={20} align="center" justify="center" direction="column">
            {productData.length === 0 ? (
              <Image
                w={180}
                src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-7359557-6024626.png"
                alt="Empty Cart"
              />
            ) : (
              items.map((item, index) => {
                const product = productData
                  .flat()
                  .find((p) => p._id === item.product_id);
                // console.log(productData.forEach((item) => item._id));

                return product ? (
                  <CardOrderItem
                    key={item.product_id}
                    product={product}
                    quantity={item.quantity}
                    onRemove={removeItem}
                    onUpdateQuantity={updateItemQuantity}
                  />
                ) : null;
              })
            )}
          </Flex>
          <Box>
            <Box className="py-5">
              <Flex justify="space-between">
                <Box>
                  <Flex direction="column">
                    <Title size="sm">Qty</Title>
                    <Text>{totalQty}</Text>
                  </Flex>
                </Box>
                <Box>
                  <Flex direction="column">
                    <Title size="sm">Total Price</Title>
                    <Text>{totalPrice} VNĐ</Text>
                  </Flex>
                </Box>
              </Flex>
            </Box>
            <Button
              disabled={!isInputFilled}
              onClick={handleOrder}
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
