const router = require("express").Router()

router.get("/", (req, res, next) => {
  res.json("All good in here")
})

const authRoutes = require("./auth.routes")
router.use("/auth", authRoutes)

const userRoutes = require("./user.routes")
router.use("/user", userRoutes)

const planRoutes = require("./plan.routes")
router.use("/plan", planRoutes)

module.exports = router
