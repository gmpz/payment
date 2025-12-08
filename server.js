const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/payment", require("./routes/createPayment"));
app.use("/webhook", require("./routes/webhook"));

app.listen(4000, () => console.log("Backend running on 4000"));
