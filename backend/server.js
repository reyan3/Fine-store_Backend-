import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import authrouter from "./routes/authRoutes.js";
import productrouter from "./routes/productRoutes.js";
import cartrouter from "./routes/cartRoutes.js";
import addressrouter from "./routes/addressRoutes.js";
import orderrouter from "./routes/orderRoutes.js";
import favouriterouter from "./routes/favouriteRoutes.js";
import helprouter from "./routes/helpRoutes.js";
import forgotrouter from "./routes/forgotPassRoutes.js";
import getquickrouter from "./routes/getquickRoutes.js"
import aichatbotrouter from "./routes/aiChatbotRoutes.js"
import dotenv from "dotenv";

const app = express();
const port = process.env.PORT || 3000;

dotenv.config();
connectDB();

app.use(express.json());
app.use(cors());
app.use("/api/auth", authrouter);
app.use("/api/products", productrouter);
app.use("/api/cart", cartrouter);
app.use("/api/address", addressrouter);
app.use("/api/order", orderrouter);
app.use("/api/favourites", favouriterouter);
app.use("/api/help", helprouter);
app.use("/api/forgot", forgotrouter);
app.use("/api/quickStats" , getquickrouter)
// chatbot middleware
app.use("/api/openrouterapi", aichatbotrouter)

app.use(errorHandler);

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`),
);
