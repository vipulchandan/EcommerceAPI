import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

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

app.use("/", (req, res) => {
    res.send("Welcome to Ecommerce API with NodeJS and MongoDB!");
});

const PORT = 5000 || process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is flying on PORT ${PORT}`);
});