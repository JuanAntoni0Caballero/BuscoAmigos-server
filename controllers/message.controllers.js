const Message = require('../models/Message.model')
const Conversation = require('../models/Conversation.model')


const getMessages = (req, res, next) => {

    Message
        .find()
        .then(response => res.json(response))
        .catch(err => next(err))
}


const createMessage = (req, res, next) => {

    const { content } = req.body
    const { _id: owner } = req.payload
    const { conversation_id } = req.params

    Message
        .create({ content, owner })
        .then(response => Conversation.findByIdAndUpdate(conversation_id, { $push: { messages: response._id } }, { new: true }))
        .then(response => res.json(response))
        .catch(err => next(err))
}

const deleteMessage = (req, res, next) => {

    const { message_id: id } = req.params

    Message
        .findByIdAndDelete(id)
        .then(response => res.json(response))
        .catch(err => next(err))
}


module.exports = {
    getMessages,
    createMessage,
    deleteMessage
}