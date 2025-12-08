const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const express = require("express");
const router = express.Router();
const omise = require("omise")({
  secretKey: "skey_test_65y2kttp2jgy6daqh1t"
});

// Fake DB ในที่นี้ (จริง ๆ ควรใช้ Redis/DB)
const orders = {};

router.post("/create", async (req, res) => {
  
  const { userId, packageId } = req.body;
  
  try {
    // ดึงราคา Package
    const pack = await prisma.package.findFirst({
      where: { id: packageId }
    });
    

    if (!pack) return res.status(404).json({ error: "Package not found" });

    // สร้าง Omise Charge
    const charge = await omise.charges.create({
      amount: pack.price * 100,
      currency: "thb",
      source: { type: "promptpay" }
    });

    console.log("charge-id :", charge.id);
    

    // บันทึก Order ลง DB
    const order = await prisma.order.create({
      data: {
        userId: userId,
        packageId: packageId,
        amount: pack.price,
        chargeId: charge.id,
        status: "pending"
      }
    });

    return res.json({
      orderId: order.id,
      chargeId: charge.id,
      qr: charge.source.scannable_code.image.download_uri,
      amount: pack.price,
      currency: "thb"
    });

  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});


router.get("/status/:orderId", async (req, res) => {
  const { orderId } = req.params;

  const order = await prisma.order.findUnique({
    where: { id: orderId }
  });

  if (!order) return res.json({ status: "unknown" });

  return res.json({ status: order.status });
});


module.exports = router;
