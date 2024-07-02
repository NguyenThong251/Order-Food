// "use client";
// import { useEffect, useState } from "react";
// const page = async () => {
//   const fetchProduct = async () => {
//     const response = await fetch("/api/products");
//     const products = await response.json();
//     return products;
//   };
//   const products = await fetchProduct();
//   //   const [products, setProducts] = useState([]);
//   //   useEffect(() => {
//   //     fetchProduct().then((products) => setProducts(products));
//   //   }, []);
//   return (
//     <div>
//       <h1>Product</h1>
//       {products.map((product: any) => (
//         <div key={product._id}>
//           <h2>{product.name}</h2>
//           <p>{product.price}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default page;
"use client";
import { useEffect, useState } from "react";

interface IProduct {
  _id: string;
  name: string;
  price: number;
}

const Page: React.FC = () => {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("/api/products");
      const data = await response.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Products</h1>
      {products.map((product) => (
        <div key={product._id}>
          <h2>{product.name}</h2>
          <p>{product.price}</p>
        </div>
      ))}
    </div>
  );
};

export default Page;
