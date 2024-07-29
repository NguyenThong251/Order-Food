import {
  AiOutlineDelete,
  AiOutlineShoppingCart,
  Box,
  Button,
  Flex,
  Image,
  Modal,
  TbArrowsExchange,
  Text,
  TextInput,
  Title,
  useDisclosure,
  useEffect,
  useState,
} from "@repo/ui";
import {
  CartDB,
  CartItem,
  CartProduct,
  OrderChefData,
  OrderData,
  Products,
  Table,
} from "../../../../../interface";
import {
  useCartStore,
  useOrderStore,
  useTableStore,
  useUserStore,
} from "../../../../../store";
import request from "../../../../../utils/request";
import ModalDialogs from "../../../components/modal/modal-dialogs";
import CardOrderItem from "../../../components/ui/CardOrderItem";
import CardTable from "../../../components/ui/CardTable";

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
  const [
    openedChangeTable,
    { open: openChangeTable, close: closeChangeTable },
  ] = useDisclosure(false);
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
  };
  const { user } = useUserStore((state) => state);

  useEffect(() => {
    fetchDataProducts();
    fetchDataTable();
  }, [items]);
  useEffect(() => {
    setIsInputFilled(tableId !== "" && productData.length > 0);
  }, [items, phone, name, productData]);
  if (loading) {
    return <div>Loading...</div>;
  }

  const handleOpen = async () => {
    open();
  };

  // const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setPhone(event.target.value);
  // };
  // const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setName(event.target.value);
  // };

  const handleOrder = async () => {
    const orderchefData: OrderChefData = {
      products: items.map((item) => ({
        product_id: item.product_id,
        quantity: item.quantity,
      })),
      table_id: tableId,
      status: "pending",
      date: new Date(new Date().getTime() + 7 * 60 * 60 * 1000),
    };

    const orderData: OrderData = {
      user_id: user ? user._id : null,
      products: items.map((item) => ({
        product_id: item.product_id,
        quantity: item.quantity,
      })),
      table_id: tableId,
      sub_total: totalPrice,
    };
    try {
      await request.post("/orderchef", orderchefData);
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
          setOrderId(res.data._id);
        }
      }
      clearCart();
    } catch (err) {
      console.error("Error ordering:", err);
    }
  };
  const totalQty = items.reduce((sum, item) => sum + item.quantity, 0);

  const totalPrice = items.reduce((sum, item) => {
    const product = productData.flat().find((p) => p._id === item.product_id);
    return sum + (product ? product.price * item.quantity : 0);
  }, 0);

  return (
    <>
      <Modal
        opened={openedChangeTable}
        onClose={closeChangeTable}
        title="ChangeTable"
      >
        <div className="grid grid-cols-4 gap-4 mt-5">
          <CardTable closeChangeTable={closeChangeTable} />
        </div>
      </Modal>
      <ModalDialogs handleProps={clearCart} opened={opened} onClose={close} />

      <Box>
        <Box>
          <Flex justify="space-between">
            <div className="flex items-center gap-2">
              <Text className="text-lg font-medium">
                Table: {tableData?.name}
              </Text>
              <TbArrowsExchange
                onClick={openChangeTable}
                className="text-lg text-blue-500 cursor-pointer"
              />
            </div>

            <Flex align="center" gap={5}>
              {/* onClick={clearCart} */}
              <AiOutlineDelete
                onClick={handleOpen}
                fontSize={24}
                color="rgba(255, 0, 0, 1)"
              />
            </Flex>
          </Flex>
        </Box>
        <div className="h-[50vh] overflow-y-auto">
          <Flex gap={20} justify="center" direction="column" mt={10}>
            {productData.length === 0 ? (
              <div className="flex items-center justify-center ">
                <Image
                  className="mt-36"
                  w={180}
                  src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-7359557-6024626.png"
                  alt="Empty Cart"
                />
              </div>
            ) : (
              // user ? (
              //   productData.flat().map((product: Products) => {
              //     return (
              //       <CardOrderItem
              //         key={product._id}
              //         product={product}
              //         quantity={
              //           cartDB.find((item) => item.product_id === product._id)
              //             ?.quantity || 0
              //         }
              //         onRemove={removeItem}
              //         onUpdateQuantity={updateItemQuantity}
              //       />
              //     );
              //   })
              // ) : (
              items.map((item) => {
                const product = productData
                  .flat()
                  .find((p) => p._id === item.product_id);
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
        </div>
      </Box>
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
                <Text>{totalPrice.toLocaleString()} VNĐ</Text>
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
          rightSection={<AiOutlineShoppingCart size={18} fontWeight={700} />}
        >
          Order
        </Button>
      </Box>
    </>
  );
};

export default Order;
