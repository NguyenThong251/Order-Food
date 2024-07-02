// import dbConnect from "../../../app/lib/dbConnect";
// import Product from "../../../app/model/Product";
// import { NextResponse } from "next/server";

// export default async function GET() {
//   await dbConnect();
//   try {
//     const products = await Product.find({});
//     NextResponse.json(products);
//   } catch (err: any) {
//     NextResponse.json({ error: err.message });
//   }
// }

import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../app/lib/dbConnect";
import Product from "../../../app/model/Product";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  await dbConnect();

  if (req.method === "GET") {
    try {
      const products = await Product.find({});
      res.status(200).json(products);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
