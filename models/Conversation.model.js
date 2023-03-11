const { Schema, model } = require("mongoose")

const conversationSchema = new Schema(
    {
        messages: [{
            ref: 'message',
            type: Schema.Types.ObjectId,
        }],
        members: [
            {
                ref: 'user',
                type: Schema.Types.ObjectId,
            }, {
                ref: 'user',
                type: Schema.Types.ObjectId,
            }
        ],
        plan: {
            ref: 'plan',
            type: Schema.Types.ObjectId,
        }
    },
    {
        timestamps: true
    }
)

const Conversation = model("conversation", conversationSchema)

module.exports = Conversation
