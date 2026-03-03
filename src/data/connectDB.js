import mongoose from "mongoose";

export const connectDB = () => {
  mongoose
    .connect(process.env.MongoDbURL, { dbName: "Todo_Web" })
    .then((c) => {
      console.log(`Database Connected Successfully! ${c.connection.host}`);
    })
    .catch((e) => {
      console.log("Database Error:", e);
    });
};
