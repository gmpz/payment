const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  const event = req.body;
  console.log("webhook-event : ", event);
  
  if (event.key === "charge.complete") {
    const charge = event.data;
    
    if (charge.paid) {
      await prisma.order.updateMany({
        where: { chargeId: charge.id },
        data: { status: "paid" }
      });
    }
  }

});


module.exports = router;
