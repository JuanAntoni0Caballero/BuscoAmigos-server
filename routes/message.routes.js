const router = require("express").Router()
const { verifyToken } = require('../middlewares/verifyToken')
const Message = require('../models/Message.model')



router.get("/getMessages", verifyToken, (req, res, next) => {

    Message
        .find()
        .then(response => res.json(response))
        .catch(err => next(err))
})


router.post("/saveMessage", (req, res, next) => {

    const { message, conversation } = req.body
    // const { _id: owner } = req.payload

    Message
        .create({ message, conversation })
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