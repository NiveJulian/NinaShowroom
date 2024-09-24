const { Router } = require("express");
const router = Router();

const sheetsRouter = require("./sheetsRoutes");
const loginRoutes = require("./loginRoutes");
const userRoutes = require("./userRoutes");
const mpRoutes = require("./mpRoutes");
const emailRoutes = require("./emailRoutes");
const cuponRoutes = require("./cuponRoutes");

router.use("/sheets", sheetsRouter);
router.use("/login", loginRoutes);
router.use("/user", userRoutes);
router.use("/mp", mpRoutes);
router.use("/mails", emailRoutes);
router.use("/coupon", cuponRoutes);

module.exports = router;
