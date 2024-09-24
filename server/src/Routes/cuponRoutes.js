const { Router } = require("express");
const {
  createCoupon,
  toggleCouponStatus,
  getAllCoupons,
  validateCouponAndCalculateTotal,
} = require("../Controllers/coupon/CouponController");
const { authorize } = require("../Controllers/sheets/sheetsController");
const cuponRoutes = Router();

cuponRoutes.post("/coupons", createCoupon);
cuponRoutes.post("/validate-coupon", async (req, res) => {
  try {
    const { productos, codigoDescuento } = req.body;

    // Autorizar y validar el cupón
    const auth = await authorize();
    const result = await validateCouponAndCalculateTotal(auth, {
      productos,
      codigoDescuento,
    });

    return res.status(200).json(result);
  } catch (error) {
    console.error("Error al validar el cupón:", error);
    return res.status(500).json({ message: "Error al validar el cupón" });
  }
});

cuponRoutes.get("/coupons", getAllCoupons);
cuponRoutes.patch("/coupons/:id/toggle", toggleCouponStatus);

module.exports = cuponRoutes;
