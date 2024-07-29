// components/filters/ProductFilter.tsx
import React from "react";
import { Box, Button, Flex, NumberInput, Select, TextInput } from "@repo/ui";
import { Category } from "../../../../interface";

interface ProductFilterProps {
  categories: Category[];
  searchQuery: string;
  selectedCategory: string | null;
  fromPrice: number | undefined;
  toPrice: number | undefined;
  onSearchQueryChange: (query: string) => void;
  onCategoryChange: (category: string | null) => void;
  onFromPriceChange: (price: number | undefined) => void;
  onToPriceChange: (price: number | undefined) => void;
  onFilter: () => void;
  onReset: () => void;
  closeFilter: () => void;
}

const ProductFilter: React.FC<ProductFilterProps> = ({
  categories,
  searchQuery,
  selectedCategory,
  fromPrice,
  toPrice,
  onSearchQueryChange,
  onCategoryChange,
  onFromPriceChange,
  onToPriceChange,
  onFilter,
  onReset,
  closeFilter,
}) => {
  const handleFilterClick = () => {
    onFilter();
    closeFilter();
  };

  const handleResetClick = () => {
    onReset();
    closeFilter();
  };
  return (
    <Box>
      <Select
        checkIconPosition="right"
        data={[
          { label: "All Products", value: "" },
          ...categories.map((category) => ({
            label: category.name,
            value: category._id,
          })),
        ]}
        value={selectedCategory}
        onChange={(value) => onCategoryChange(value)}
        label="Category"
        placeholder="Select a category"
      />
      <div>
        <div className="flex justify-between">
          <NumberInput
            className="w-50"
            value={fromPrice}
            onChange={(value) => onFromPriceChange(value as number)}
            label="From Price"
          />
          <NumberInput
            className="w-50"
            value={toPrice}
            onChange={(value) => onToPriceChange(value as number)}
            label="To Price"
          />
        </div>
        <div className="flex justify-between gap-3 mt-3 ">
          <Button
            className="w-full"
            onClick={handleResetClick}
            variant="outline"
            color="red"
          >
            Reset
          </Button>
          <Button
            className="w-full"
            onClick={handleFilterClick}
            variant="filled"
            color="red"
          >
            Filter
          </Button>
        </div>
      </div>
    </Box>
  );
};

export default ProductFilter;
