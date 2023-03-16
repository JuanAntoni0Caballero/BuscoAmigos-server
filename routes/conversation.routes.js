const router = require("express").Router()
const { verifyToken } = require('../middlewares/verifyToken')

const { response, resource } = require("../app")

const {
    createConversation,
    getAllConversations,
    getConversation,
    deleteConversation
} = require('../controllers/conversation.controllers')


router.post("/createConversation/:plan_id", verifyToken, createConversation)
router.get("/getAllConversations", verifyToken, getAllConversations)
router.get("/getConversation/:conversation_id", verifyToken, getConversation)
router.delete('/deleteConversation/:conversation_id', verifyToken, deleteConversation)


module.exports = router

