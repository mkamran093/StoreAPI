const express = require("express");
const connectDB = require("./db/connect");
const productsRoute = require("./routes/products");
require("dotenv").config();
require("express-async-errors");

const errorMiddleWare = require("./middleware/error-handler");
const notFoundMiddleWare = require("./middleware/not-found");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send('<h1>Store</h1><a href="api/v1/products">Products</a>');
});

app.use("/api/v1/products", productsRoute);

app.use(errorMiddleWare);
app.use(notFoundMiddleWare);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Server listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
