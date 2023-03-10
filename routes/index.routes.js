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

const uploadRoutes = require("./upload.routes")
router.use("/upload", uploadRoutes)

const messageRoutes = require('./message.routes')
router.use('/messages', messageRoutes)

const conversationRoutes = require('./conversation.routes')
router.use('/conversation', conversationRoutes)

module.exports = router

