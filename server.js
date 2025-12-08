const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/payment", require("./routes/createPayment"));
app.use("/webhook", require("./routes/webhook"));

const port = process.env.PORT || 4000;
app.listen(port, '0.0.0.0', () => {
  console.log(`Backend running on ${port}`);
});
