const express = require("express");
const router = express.Router();
const omise = require("omise")({
  secretKey: "skey_test_65y2kttp2jgy6daqh1t"
});

// Fake DB ในที่นี้ (จริง ๆ ควรใช้ Redis/DB)
const orders = {};

router.post("/create", async (req, res) => {
  const { amount } = req.body;

  try {
    const charge = await omise.charges.create({
      amount: amount * 100, // THB → Satang
      currency: "thb",
      source: {
        type: "promptpay"
      }
    });

    orders[charge.id] = { status: "pending" };

    res.json({
      chargeId: charge.id,
      qr: charge.source.scannable_code.image.download_uri,
      amount: charge.source.amount/100,
        currency: charge.source.currency
    });

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/status/:id", (req, res) => {
  const { id } = req.params;
  res.json(orders[id] || { status: "unknown" });
});

module.exports = router;
