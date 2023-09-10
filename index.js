import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import UserRoutes from "./routes/UserRoutes.js";
import CategoryRoutes from "./routes/CategoryRoutes.js";
import ProductRoutes from "./routes/ProductRoutes.js";
import CartRoutes from "./routes/CartRoutes.js";
import OrderRoutes from "./routes/OrderRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log(err);
});

app.get("/", (req, res) => {
    res.send("Welcome to Ecommerce API with NodeJS and MongoDB!");
})

app.use("/api/auth", UserRoutes);
app.use("/api/category", CategoryRoutes);
app.use("/api/products", ProductRoutes);
app.use("/api", CartRoutes);
app.use("/api", OrderRoutes);

// app.use("/", (req, res) => {
//     res.send("Welcome to Ecommerce API with NodeJS and MongoDB!");
// });


const PORT = 5000 || process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is flying on PORT ${PORT}`);
});