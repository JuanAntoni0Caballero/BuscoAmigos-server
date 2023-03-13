
const router = require("express").Router()
const { verifyToken } = require('../middlewares/verifyToken')
const Conversation = require('../models/Conversation.model')
const Plan = require('../models/Plan.model')
const Message = require('../models/Message.model')

router.post("/createConversation/:plan_id", verifyToken, (req, res, next) => {

    const { _id: sender } = req.payload
    const { plan_id } = req.params

    Plan
        .findById(plan_id)
        .then(plan => {
            const receiver = plan.owner

            Conversation
                .findOne({ $and: [{ members: sender }, { members: receiver }] })
                .then(conversation => {
                    if (conversation) {
                        res.json(conversation)
                    } else {
                        Conversation
                            .create({ members: [sender, receiver], plan: plan_id })
                            .then(newConversation => res.json(newConversation))
                            .catch(err => next(err))
                    }
                })
                .catch(err => next(err))
        })
        .catch(err => next(err))
})


router.get("/getAllConversations", verifyToken, (req, res, next) => {

    const { _id: user } = req.payload

    Conversation
        .find({ members: { $elemMatch: { $in: [user] } } })
        .populate("plan")
        .then(response => res.json(response))
        .catch(err => next(err))
})


router.get("/getConversation/:conversation_id", verifyToken, (req, res, next) => {

    const { conversation_id: id } = req.params
    const { _id: user_id } = req.payload


    Conversation
        .findById(id)
        .populate({
            path: "members",
            select: "username"
        })
        .populate("plan")
        .populate({
            path: "messages",
            select: "content read createdAt",
            populate: {
                path: "owner",
                select: "username"
            }
        })
        .then(response => {
            response.messages.map(elm => {
                if (user_id != elm.owner._id && !elm.read) {
                    Message.findByIdAndUpdate(elm._id, { $set: { read: true } }, { new: true })
                }
                res.json(response)
            })
        })
        .catch(err => next(err))
})


router.delete('/deleteConversation/:conversation_id', verifyToken, (req, res, next) => {

    const { conversation_id: id } = req.params

    Conversation
        .findByIdAndDelete(id)
        .then(response => res.json(response))
        .catch(err => next(err))
})


module.exports = router