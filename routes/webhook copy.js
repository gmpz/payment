const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  const event = req.body;

  console.log("event : ", event);
  

  // if (event.data && event.data.object && event.data.object.id) {
  //   const chargeId = event.data.object.id;

  //   if (event.key === "charge.complete" &&
  //       event.data.object.status === "successful") {

  //     // อัพเดท Fake DB
  //     orders[chargeId] = { status: "paid" };
  //   }
  // }

  // res.json({ received: true });
});

module.exports = router;
