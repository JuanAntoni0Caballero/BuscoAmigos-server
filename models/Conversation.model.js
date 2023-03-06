const { Schema, model } = require("mongoose");

const conversationSchema = new Schema(
    {
        message: [{
            ref: 'message',
            type: Schema.Types.ObjectId,
        }],
        owner: {
            ref: 'user',
            type: Schema.Types.ObjectId,
            required: true,
        },
        to: {
            ref: 'user',
            type: Schema.Types.ObjectId,
            required: true,
        }
    },

    {
        timestamps: true
    }
);

const Conversation = model("conversation", conversationSchema)

module.exports = Conversation
