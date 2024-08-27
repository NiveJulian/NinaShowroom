const { Router } = require("express");
const router = Router();

const sheetsRouter = require("./sheetsRoutes");
const loginRoutes = require("./loginRoutes");
const userRoutes = require("./userRoutes");
const mpRoutes = require("./mpRoutes");

router.use("/sheets", sheetsRouter);
router.use("/login", loginRoutes);
router.use("/user", userRoutes);
router.use("/mp", mpRoutes);

module.exports = router;
