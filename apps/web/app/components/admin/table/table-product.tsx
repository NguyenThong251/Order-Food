import cx from "clsx";
import {
  Table,
  ScrollArea,
  useState,
  Tooltip,
  Text,
  IconTrash,
  IconEdit,
  useEffect,
  Image,
  Pagination,
  usePagination,
  Box,
} from "@repo/ui";
import classes from "./TableScrollArea.module.css";
import request from "../../../utils/request";
import ModalDeleteProduct from "../components/modal/modal-product-delete";
import ModalUpdateProduct from "../components/modal/modal-product-edit";

interface Product {
  id: number;
  name: string;
  thumbnail: string;
  price: number;
  price_old: number;
  description: string;
  category_id: number;
}

export function TableProduct() {
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 5;
  const [page, setPage] = useState(1);
  const pagination = usePagination({
    total: totalPages,
    page,
    onChange: setPage,
  });

  const fetchData = async () => {
    try {
      const response = await request.get("/products");
      setData(response.data);
      setTotalPages(Math.ceil(response.data.length / itemsPerPage));
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = () => {
    fetchData(); // Refresh the product list after deletion
  };
  const handleUpdate = () => {
    fetchData();
  };
  const displayedData = data.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const rows = displayedData.map((item) => (
    <Table.Tr key={item.id}>
      <Table.Td>{item.name}</Table.Td>
      <Table.Td>
        <Image width={50} height={100} src={item.thumbnail} alt="img" />
      </Table.Td>
      <Table.Td>{item.category_id}</Table.Td>
      <Table.Td>{item.price}</Table.Td>
      <Table.Td>{item.price_old}</Table.Td>
      <Table.Td>
        <Tooltip label={item.description} withArrow>
          <Text w={300} truncate>
            {item.description}
          </Text>
        </Tooltip>
      </Table.Td>
      <Table.Td>
        <Box>
          <ModalDeleteProduct productId={item.id} onDelete={handleDelete} />

          <ModalUpdateProduct productId={item.id} onUpdate={handleUpdate} />
        </Box>
      </Table.Td>
    </Table.Tr>
  ));

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <ScrollArea>
        <Table miw={700} mt={50}>
          <Table.Thead className={cx(classes.header)}>
            <Table.Tr>
              <Table.Th>Name</Table.Th>
              <Table.Th>Image</Table.Th>
              <Table.Th>Category</Table.Th>
              <Table.Th>Price</Table.Th>
              <Table.Th>Price Old</Table.Th>
              <Table.Th>Description</Table.Th>
              <Table.Th>Action</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </ScrollArea>
      <Pagination total={totalPages} value={page} onChange={setPage} mt="md" />
    </>
  );
}
