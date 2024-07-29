import Link from "next/link";
import React from "react";
import { Card, Image, Title, rem } from "@repo/ui";
interface CardCategoryProps {
  title: string;
  image: string;
}
const CardCategory: React.FC<CardCategoryProps> = ({ title, image }) => {
  return (
    <>
      <Link href={title}>
        <div className="flex items-center justify-center gap-3 p-1 duration-300 ease-in-out bg-white rounded-md shadow-md hover:-translate-y-1 hover:shadow-lg sm:justify-start hover:shadow-customOrange">
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
      </Link>
    </>
  );
};

export default CardCategory;
