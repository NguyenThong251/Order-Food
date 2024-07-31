import { Image } from "@repo/ui";
import { Products } from "../../../../interface";

const CardCheckout: React.FC<Products> = ({
  thumbnails = [],
  name,
  price,
  description,
  seller,
  quantity,
  category,
  _id,
}) => {
  return (
    <div>
      <div
        key={_id}
        className="overflow-hidden rounded-lg shadow-lg border-1 border-slate-200"
      >
        <div className="flex flex-row bg-white sm:flex-col">
          <div className="p-3 bg-slate-100 ">
            <Image
              className="h-20 rounded-lg sm:h-28 sm:w-full w-28"
              src={
                thumbnails[0] ||
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJRS-4chjWMRAmrtz7ivK53K_uygrgjzw9Uw&s"
              }
              alt=""
            />
          </div>
          <div className="w-full p-4">
            <div className="flex justify-between">
              <h3 className="font-medium text">{name}</h3>
              <p>{category.name}</p>
            </div>
            <h3 className="text-sm text-slate-500">Quantity: {quantity}</h3>
            <p className="font-medium text-orange-600">
              Price: {price.toLocaleString()} VNĐ
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardCheckout;
