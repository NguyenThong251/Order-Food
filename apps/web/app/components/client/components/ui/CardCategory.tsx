import Link from "next/link";
import React from "react";
import { Card, Image, Title, rem } from "@repo/ui";
interface CardCategoryProps {
  id: string;
  title: string;
  image: string;
  onCategoryClick: (categoryId: string) => void;
  isActive: boolean;
}
const CardCategory: React.FC<CardCategoryProps> = ({
  id,
  title,
  image,
  onCategoryClick,
  isActive,
}) => {
  return (
    <>
      <div
        onClick={() => onCategoryClick(id)}
        className={`flex items-center justify-center gap-3  p-1  rounded-md shadow-lg sm:justify-start ${
          isActive
            ? "bg-customOrange text-white"
            : " duration-300 ease-in-out bg-white shadow-md hover:-translate-y-1 hover:shadow-lg  hover:shadow-customOrange"
        }`}
      >
        <div className="p-2 bg-gray-100 rounded-md 2/4">
          <Image className="w-8 h-8 rounded-md" src={image} alt={title} />
        </div>
        <h2 className="hidden font-medium lg:block"> {title}</h2>
      </div>
      {/* <Card
          shadow="sm"
          radius="md"
          withBorder
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <Image style={{ borderRadius: rem(8) }} src={image} alt={title} />
          <Title order={4} mt="md">
            {title}
          </Title>
        </Card> */}
    </>
  );
};

export default CardCategory;
