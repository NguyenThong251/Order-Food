// import mongoose from "mongoose";

//

// const connection: { isConnected?: number } = {};
// async function dbConnect() {
//   if (connection.isConnected) {
//     return;
//   }
//   const db = await mongoose.connect(process.env.MONGO_URI!);
//   connection.isConnected = db.connections[0].readyState;
// }
// export default dbConnect;

// CHATGPT
// const connection: { isConnected?: number } = {};

// async function dbConnect(): Promise<void> {
//   if (connection.isConnected) {
//     return;
//   }

//   const db = await mongoose.connect(process.env.MONGO_URI!, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     dbName: "order-food", // Specify the database name here
//   });

//   connection.isConnected = db.connections[0].readyState;
// }

// export default dbConnect;

// YTB
// /src/app/lib/db.ts

import mongoose, { Mongoose } from "mongoose";

const MONGODB_URI: string = process.env.MONGO_URI as string;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

interface MongooseCache {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

declare global {
  var mongoose: MongooseCache;
}

let cached: MongooseCache = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect(): Promise<Mongoose> {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log("Db connected");
      return mongoose;
    });
  }
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;
