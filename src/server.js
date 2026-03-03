import { app } from "./app.js";
import { connectDB } from "./data/connectDB.js";

connectDB();

app.listen(process.env.PORT, () => {
  console.log(
    `Server is Working... on Post ${process.env.PORT} in ${process.env.NODE_ENV} mode`
  );
});
