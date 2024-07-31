"use client";
import { useEffect, useState } from "@repo/ui";
import request from "../../../../../utils/request";
import { Category } from "../../../../../interface";
import CardCategory from "../../../components/ui/CardCategory";
interface CategoriesProps {
  onCategoryClick: (categoryId: string) => void;
  selectedCategory: string | null;
}
const Categories = ({ onCategoryClick, selectedCategory }: CategoriesProps) => {
  const [data, setData] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const fetchData = async () => {
    try {
      const res = await request.get("/categories");
      setData(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      {data.map((item) => (
        <div key={item._id}>
          <CardCategory
            key={item._id}
            id={item._id}
            image={item.image}
            title={item.name}
            onCategoryClick={onCategoryClick}
            isActive={selectedCategory === item._id}
          />
        </div>
      ))}
    </>
  );
};

export default Categories;
