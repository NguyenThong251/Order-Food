import { AiOutlineGithub, AiFillTwitterCircle } from "@repo/ui";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="min-h-[100px] bg-beige mt-10 w-full px-5 md:px-20 flex items-center justify-between rounded-t-2xl rounded-r-2xl">
      <h4 className="text-sm sm:text-base">
        &copy;2023 This page is just a sample of Dynamic Island
      </h4>
      <div className="flex justify-between gap-4 ">
        <div className="p-2 text-white rounded-full bg-primary sca">
          <Link href={"https://twitter.com/spacecode_"} target="_blank">
            <AiFillTwitterCircle />
          </Link>
        </div>
        <div className="p-2 text-white rounded-full bg-primary">
          <Link href={"https://github.com/lucas-dash"} target="_blank">
            <AiOutlineGithub />
          </Link>
        </div>
      </div>
    </footer>
  );
};
