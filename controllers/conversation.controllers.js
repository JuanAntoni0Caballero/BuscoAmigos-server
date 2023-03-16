const Conversation = require('../models/Conversation.model')
const Plan = require('../models/Plan.model')
const Message = require('../models/Message.model')


const createConversation = (req, res, next) => {

    const { _id: sender } = req.payload
    const { plan_id } = req.params

    Plan
        .findById(plan_id)
        .then(plan => {
            const receiver = plan.owner

            Conversation
                .findOne({ $and: [{ members: sender }, { members: receiver }, { plan: plan_id }] })
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
}



const getAllConversations = (req, res, next) => {

    const { _id: user } = req.payload

    Conversation
        .find({ members: { $elemMatch: { $in: [user] } } })
        .populate("plan messages members")
        .then(response => res.json(response))
        .catch(err => next(err))
}



const getConversation = (req, res, next) => {

    const { conversation_id } = req.params
    const { _id: user_id } = req.payload

    Conversation
        .findById(conversation_id)
        .populate({
            path: "messages",
            select: "read",
            populate: {
                path: "owner",
                select: "username"
            }
        })
        .then(response => {

            if (!response) {
                res.status(400).json({ errorMessages: ["Conversación no encontrada."] })
                return
            }

            const promises = response.messages?.map(elm => {

                if (user_id != elm.owner._id && !elm.read) {
                    return Message.findByIdAndUpdate(elm._id, { read: true }, { new: true })
                } else {
                    return Message.findById(elm._id)
                }
            })

            return Promise.all(promises)

        })
        .then(() => Conversation.findById(conversation_id)
            .populate("members")
            .populate("plan")
            .populate({
                path: "messages",
                select: "content createdAt read",
                populate: {
                    path: "owner",
                    select: "username"
                }
            })
        )
        .then(response => res.status(200).json(response))
        .catch(err => next(err))
}


const deleteConversation = (req, res, next) => {

    const { conversation_id: id } = req.params

    Conversation
        .findByIdAndDelete(id)
        .then(response => res.json(response))
        .catch(err => next(err))
}

module.exports = {
    createConversation,
    getAllConversations,
    getConversation,
    deleteConversation
}