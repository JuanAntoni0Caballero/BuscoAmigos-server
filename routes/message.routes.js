
const router = require("express").Router()
const { verifyToken } = require('../middlewares/verifyToken')
const Message = require('../models/Message.model')
const Conversation = require('../models/Conversation.model')


router.get("/getConversation", verifyToken, (req, res, next) => {

    Conversation
        .find()
        .populate('menssage')
        .then(response => res.json(response))
        .catch(err => next(err))
})


router.get("/getMenssages", verifyToken, (req, res, next) => {

    Message
        .find()
        .then(response => res.json(response))
        .catch(err => next(err))
})


router.post("/saveMenssage", verifyToken, (req, res, next) => {

    const { menssage, conversation } = req.body
    const { _id: owner } = req.payload

    Message
        .create({ menssage, conversation, owner })
        .then(response => res.json(response))
        .catch(err => next(err))
})


router.delete('/deleteMessage/:message_id', (req, res, next) => {

    const { message_id: id } = req.params

    Message
        .findByIdAndDelete(id)
        .then(response => res.json(response))
        .catch(err => next(err))
})


module.exports = router