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
        <Card
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
        </Card>
      </Link>
    </>
  );
};

export default CardCategory;
