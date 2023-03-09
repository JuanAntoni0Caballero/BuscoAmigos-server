
const router = require("express").Router()
const { verifyToken } = require('../middlewares/verifyToken')
const Message = require('../models/Message.model')
const Conversation = require('../models/Conversation.model')




router.get("/getPlans", verifyToken, (req, res, next) => {

    Message.find()
        .populate('conversacion')
        .then(response => res.json(response))
        .catch(err => next(err))
})

router.get("/getConversacion", verifyToken, (req, res, next) => {

    Conversation
        .find()
        .then(response => res.json(response))
        .catch(err => next(err))
})



router.post("/savePlan", verifyToken, (req, res, next) => {

    const { title, origin, destination, date, duration, typePlan, description } = req.body
    const { _id: owner } = req.payload

    Message
        .create({ title, origin, destination, date, duration, typePlan, description, owner })
        .then(response => res.json(response))
        .catch(err => next(err))
})


router.delete('/deleteMessage/:message_id', (req, res, next) => {

    const { message_id: id } = req.params

    Message
        .findByIdAndDelete(id)
        .then(response => res.json({ msg: "Plan was deleted! :)" }))
        .catch(err => next(err))
})


module.exports = router