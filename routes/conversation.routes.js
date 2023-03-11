
const router = require("express").Router()
const { verifyToken } = require('../middlewares/verifyToken')
const Conversation = require('../models/Conversation.model')



router.post("/createConversation/:receiver", verifyToken, (req, res, next) => {

    const { _id: sender } = req.payload
    const { receiver } = req.params
    //const { plan_id } = req.body

    Conversation
        .findOne({ $and: [{ members: sender }, { members: receiver }] })
        .then(conversation => {
            if (conversation) {
                res.json(conversation)
            } else {
                Conversation
                    .create({ members: [sender, receiver] })
                    .then(newConversation => res.json(newConversation))
                    .catch(err => next(err))
            }
        })
        .catch(err => next(err))
})



router.get("/getConversation/:conversation_id", (req, res, next) => {

    const { conversation_id: id } = req.params
    const { plan_id } = req.params


    Conversation
        .findById(id)
        .populate({
            path: "members",
            select: "username"
        })
        .populate({
            path: "plan",
            select: "plan"
        })
        .populate({
            path: "messages",
            select: "content createdAt",
            populate: {
                path: "owner",
                select: "username"
            }
        })
        .then(response => res.json(response))
        .catch(err => next(err))
})


// router.post("/createConversation", (req, res, next) => {

//     const { message, owner, to } = req.body
//     // const { _id: owner } = req.payload

//     Conversation
//         .create({ message, owner, to })
//         .then(response => res.json(response))
//         .catch(err => next(err))
// })


router.delete('/deleteConversation/:conversation_id', verifyToken, (req, res, next) => {

    const { conversation_id: id } = req.params

    Conversation
        .findByIdAndDelete(id)
        .then(response => res.json(response))
        .catch(err => next(err))
})


module.exports = router