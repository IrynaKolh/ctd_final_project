require('dotenv').config();
require('express-async-errors');
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");
const express = require("express");
const connectDb = require("./db/connect");
const productsRouter = require("./routes/products");
const authRouter = require("./routes/auth");
const storeRouter = require("./routes/store");
const authMiddleware = require("./middlewares/authentication");
const notFoundMiddleware = require("./middlewares/not-found");
const errorHandlerMiddleware = require("./middlewares/error-handler");

const app = express();
app.use(express.json());
app.set("trust proxy", 1);

app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  })
);
app.use(helmet());
// app.use(cors());
app.use(cors({
  origin: 'http://localhost:5173'
}));
app.use(xss());


// routes
app.get("/", (req, res) => {
  res.send("products api");
});
app.use("/auth", authRouter);
app.use("/products", productsRouter);
app.use('/store', storeRouter)

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT ? process.env.PORT : 3000;

const start = async () => {
  try {
    await connectDb(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
