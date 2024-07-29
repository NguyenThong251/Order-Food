import { Button, TbTag } from "@repo/ui";

const CardVoucher = () => {
  return (
    <>
      <div className="flex  items-center gap-3 p-3 mx-auto overflow-hidden bg-white border border-l-4 rounded-lg shadow-lg border-l-[#ee5733]">
        <div className="w-1/4">
          <TbTag className="text-3xl" />
        </div>
        <div className="">
          <h2 className="mb-2 text-lg font-bold">Discount 10%</h2>
          <p className="mb-4 text-gray-700">
            Use discount code to receive 10% off your order.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <p>Point: 1000</p>
          <Button className="transition duration-100 ease-in-out delay-150 bg-orange-600 hover:-translate-y-1 hover:scale-110 hover:bg-[#ee5733]">
            Exchange
          </Button>
        </div>
      </div>
    </>
  );
};

export default CardVoucher;
