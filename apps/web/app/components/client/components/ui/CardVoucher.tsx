import { Button, TbTag } from "@repo/ui";
interface CardVoucherProps {
  id: string;
  point: number;
  discount: number;
  handleExchange: (id: string) => void;
}
const CardVoucher: React.FC<CardVoucherProps> = ({
  id,
  point,
  discount,
  handleExchange,
}) => {
  return (
    <>
      <div className="flex  items-center gap-3 p-3 mx-auto overflow-hidden bg-white border border-l-4 rounded-lg shadow-lg border-l-[#ee5733]">
        <div className="w-1/4">
          <TbTag className="text-3xl" />
        </div>
        <div className="">
          <h2 className="mb-2 text-lg font-bold">Discount {discount}%</h2>
          <p className="hidden mb-4 text-gray-700 lg:block">
            Use discount code to receive {discount}% off your order.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <p>Point: {point}</p>
          <Button
            onClick={() => handleExchange(id)}
            className="  bg-orange-600 transition-all  hover:shadow-sm hover:transition-all hover:shadow-orange-700 hover:bg-[#ee5733]"
          >
            Exchange
          </Button>
        </div>
      </div>
    </>
  );
};

export default CardVoucher;
