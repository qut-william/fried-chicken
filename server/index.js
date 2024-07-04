const express = require("express");
const cors = require("cors");
const morgan = require("morgan")

require("dotenv").config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(morgan("dev"));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

const searchRouter= require("./app/routes/search.js");
const chatsRouter = require("./app/routes/chat.js");
const errorHandler = require("./app/middleware/errorHandler.js");


app.use("/search", searchRouter);
app.use("/chat", chatsRouter);

app.use(async function (req, res) {
  return res.status(404).json({
    status: "error",
    message: "Page not found!",
  });
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});