const router = require("express").Router()
const { verifyToken } = require('../middlewares/verifyToken')

const {
    getMessages,
    createMessage,
    deleteMessage
} = require('../controllers/message.controllers')

router.get("/getMessages", verifyToken, getMessages)
router.post("/createMessage/:conversation_id", verifyToken, createMessage)
router.delete('/deleteMessage/:message_id', verifyToken, deleteMessage)

module.exports = router