import { Box } from "@repo/ui";

const page = () => {
  return (
    <>
      <div className="grid grid-cols-12 gap-4 p-6">
        {/* lg:w-8/12 w-full */}
        <div className="h-screen col-span-12 text-red-600 lg:col-span-8 ">
          <div className="bg-white ">1</div>
        </div>
        {/* l w-4/12 hidden */}
        <div className="hidden col-span-4 text-red-600 lg:block">
          <div className="relative flex flex-col justify-between h-[80vh] bg-white">
            <div className="">1</div>
            <div className="">1</div>
            <div className="">1</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
