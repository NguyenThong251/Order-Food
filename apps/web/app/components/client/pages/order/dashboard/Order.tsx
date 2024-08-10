import {
  AiOutlineDelete,
  AiOutlineShoppingCart,
  Box,
  Button,
  Flex,
  Image,
  Modal,
  Swal,
  TbArrowsExchange,
  Text,
  Textarea,
  TextInput,
  Title,
  useDisclosure,
  useEffect,
  useForm,
  useState,
} from "@repo/ui";
import {
  CartDB,
  CartItem,
  CartProduct,
  OrderChefData,
  OrderData,
  OrderProduct,
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
  const [opendOrder, { open: openOrder, close: closeOrder }] =
    useDisclosure(false);
  const form = useForm({
    initialValues: {
      noteorder: "",
    },
  });
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

  const handleOrder = async () => {
    const orderchefData: OrderChefData = {
      products: items.map((item) => ({
        product_id: item.product_id,
        quantity: item.quantity,
      })),
      table_id: tableId,
      status: "pending",
      date: new Date(new Date().getTime() + 7 * 60 * 60 * 1000),
      note: form.values.noteorder,
    };
    const orderData = {
      user_id: user ? user._id : null,
      products: items.map((item) => ({
        product_id: item.product_id,
        quantity: item.quantity,
      })),
      table_id: tableId,
      sub_total: totalPrice,
      status: "Pending",
      date: new Date(new Date().getTime() + 7 * 60 * 60 * 1000),
    };
    try {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "success",
        title: "Order successfully",
      });
      await request.post("/orderchef", orderchefData);
      if (orderId) {
        const currentOrder = await request.get(`/order/${orderId}`);
        const updatedProducts = [
          ...currentOrder.data.products,
          ...orderData.products,
        ];
        const aggregatedUpdatedProducts = updatedProducts.reduce(
          (acc: OrderProduct[], item: OrderProduct) => {
            const existingItem = acc.find(
              (i: OrderProduct) => i.product_id === item.product_id
            );
            if (existingItem) {
              existingItem.quantity += item.quantity;
            } else {
              acc.push({ ...item });
            }
            return acc;
          },
          []
        );
        await request.put(`/order/${orderId}`, {
          ...currentOrder.data,
          products: aggregatedUpdatedProducts,
          sub_total: currentOrder.data.sub_total + totalPrice,
        });
      } else {
        const res = await request.post("/order", orderData);
        if (res.status === 201) {
          setOrderId(res.data._id);
        }
      }
      clearCart();
      closeOrder();
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
          // onClick={handleOrder}
          onClick={openOrder}
          variant="filled"
          color="red"
          fullWidth
          rightSection={<AiOutlineShoppingCart size={18} fontWeight={700} />}
        >
          Order
        </Button>
        <Modal
          opened={opendOrder}
          onClose={closeOrder}
          title="Note Order"
          centered
        >
          <Textarea
            key={form.key("noteorder")}
            {...form.getInputProps("noteorder")}
            className="mb-3"
            label="Note"
          />
          <Button
            onClick={handleOrder}
            variant="filled"
            color="red"
            fullWidth
            rightSection={<AiOutlineShoppingCart size={18} fontWeight={700} />}
          >
            Confirm Order
          </Button>
        </Modal>
      </Box>
    </>
  );
};

export default Order;
