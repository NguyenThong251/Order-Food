"use client";
import {
  Box,
  Button,
  Flex,
  Image,
  Modal,
  NumberInput,
  Pagination,
  Select,
  TbChefHat,
  TbFilterPlus,
  TbZoom,
  Text,
  TextInput,
  useDisclosure,
  useEffect,
  useState,
} from "@repo/ui";
import Categories from "../../../../components/client/pages/order/dashboard/Categories";
import { Category, Products } from "../../../../interface";
import request from "../../../../utils/request";
import CardProduct from "../../../../components/client/components/ui/CardProduct";
import Order from "../../../../components/client/pages/order/dashboard/Order";
import ProductFilter from "../../../../components/client/components/modal/modal-filter";
function chunk<T>(array: T[], size: number): T[][] {
  if (!array.length) {
    return [];
  }
  const head = array.slice(0, size);
  const tail = array.slice(size);
  return [head, ...chunk(tail, size)];
}
const page = () => {
  const [data, setData] = useState<Products[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState<Products[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<string | null>(null);
  const [fromPrice, setFromPrice] = useState<number | undefined>(undefined);
  const [toPrice, setToPrice] = useState<number | undefined>(undefined);
  const [activePage, setPage] = useState(1);
  const [filterOpened, { open: openFilter, close: closeFilter }] =
    useDisclosure();
  const fetchData = async () => {
    try {
      const res = await request.get("/products");
      setData(res.data);
      setFilteredData(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await request.get("/categories");
      setCategories(res.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  const handleFilter = () => {
    let filtered: Products[] = data;

    if (fromPrice !== undefined && toPrice !== undefined) {
      filtered = filtered.filter(
        (product) => product.price >= fromPrice && product.price <= toPrice
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(
        (product) => product.category._id === selectedCategory
      );
    }
    setFilteredData(filtered);
  };

  const handleReset = () => {
    setSearchQuery("");
    setSelectedCategory(null);
    setFromPrice(0);
    setToPrice(0);
    setSortOption(null);
    setFilteredData(data);
  };

  useEffect(() => {
    fetchData();
    fetchCategories();
  }, []);
  // useEffect(() => {
  //   setFilteredData(
  //     data.filter((product) =>
  //       product.name.toLowerCase().includes(searchQuery.toLowerCase())
  //     )
  //   );
  // }, [searchQuery]);
  const handleSearch = () => {
    // Thực hiện tìm kiếm với giá trị trong searchQuery
    const filtered = data.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filtered);
  };
  const handleCategoryClick = (categoryId: string) => {
    if (categoryId === "") {
      setSelectedCategory(null);
      setFilteredData(data);
      return;
    }
    setSelectedCategory(categoryId);
    setFilteredData(
      data.filter((product) => product.category._id === categoryId)
    );
  };
  const productsPerPage = 5;
  const pages = chunk(filteredData, productsPerPage);
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      {/* MODAL FILTER */}
      <Modal
        size="md"
        opened={filterOpened}
        onClose={closeFilter}
        title="Fillter Product"
        overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
      >
        <ProductFilter
          categories={categories}
          searchQuery={searchQuery}
          selectedCategory={selectedCategory}
          fromPrice={fromPrice}
          toPrice={toPrice}
          onSearchQueryChange={setSearchQuery}
          onCategoryChange={setSelectedCategory}
          onFromPriceChange={setFromPrice}
          onToPriceChange={setToPrice}
          onFilter={handleFilter}
          onReset={handleReset}
          closeFilter={closeFilter}
        />
      </Modal>
      {/* MODAL END FILTER */}
      <div className="p-6">
        <div className="w-full ">
          <div className="flex justify-between gap-4 sm:justify-start ">
            <div className="flex gap-4">
              <TextInput
                className="w-48 sm:w-64"
                placeholder="Search food..."
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.currentTarget.value)}
              />
              <Button
                onClick={handleSearch}
                className="bg-customOrange hover:bg-[#e6570f]"
              >
                <TbZoom className="text-lg" />
              </Button>
            </div>
            <Button
              onClick={openFilter}
              className="flex items-center  bg-customOrange hover:bg-[#e6570f]"
            >
              <Text className="hidden sm:block">Filter</Text>{" "}
              <TbFilterPlus className="text-lg lg:ms-3" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4 mt-3">
          {/* lg:w-8/12 w-full */}
          <div className="overflow-y-auto  h-[80vh] col-span-12  xl:col-span-9 rounded-md">
            {/* CATEGORY */}
            <section>
              <h3 className="text-lg font-medium">Explore Categories</h3>
              <div className="grid grid-cols-5 gap-4 mt-3">
                <div
                  onClick={() => handleCategoryClick("")}
                  className={`flex items-center justify-center gap-3  p-1  rounded-md shadow-lg sm:justify-start ${
                    selectedCategory === null
                      ? "bg-customOrange text-white"
                      : " duration-300 ease-in-out bg-white shadow-md hover:-translate-y-1 hover:shadow-lg  hover:shadow-customOrange"
                  }`}
                >
                  <div className="p-2 bg-gray-100 rounded-md 2/4">
                    <TbChefHat className="w-8 h-8 rounded-md text-gray-950" />
                  </div>
                  <h2 className="hidden font-medium lg:block"> All </h2>
                </div>
                <Categories
                  selectedCategory={selectedCategory}
                  onCategoryClick={handleCategoryClick}
                />
              </div>
            </section>
            {/* PRODUCT */}
            <section className="mt-3">
              <h3 className="text-lg font-medium">Explore Products</h3>
              <div className="">
                {filteredData.length === 0 ? (
                  <Box className="flex items-center justify-center">
                    <Image
                      src="https://www.tamirapharmacy.com/assets/img/No_Product_Found.png"
                      alt="No products found"
                      className="w-96 h-96 "
                    />
                  </Box>
                ) : (
                  <>
                    <div className="grid grid-cols-2 gap-4 mt-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                      {pages[activePage - 1]?.map((item) => (
                        <CardProduct
                          key={item._id}
                          image={
                            item.thumbnails[0] ||
                            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJRS-4chjWMRAmrtz7ivK53K_uygrgjzw9Uw&s"
                          }
                          name={item.name}
                          price={item.price}
                          description={item.description}
                          seller={item.seller}
                          productId={item._id}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </section>
            <section className="flex justify-center mt-5">
              <Pagination
                color="red"
                total={pages.length}
                value={activePage}
                onChange={setPage}
                mt="sm"
              />
            </section>
          </div>
          {/* l w-4/12 hidden */}
          <div className="hidden col-span-3 xl:block">
            <div className="relative flex flex-col justify-between h-[78vh] rounded-md shadow-lg bg-white p-2">
              <Order />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
