const { Schema, model } = require("mongoose");

const messageSchema = new Schema(
  {
    message: {
      type: String,
      required: [true, 'El mensaje es obligatorio.'],
      minlength: [20, 'El mensaje debe tener min. 20 caracteres.']
    },
    conversation: {
      ref: 'conversation',
      type: Schema.Types.ObjectId,
    }
  },

  {
    timestamps: true
  }
);

const Message = model("message", messageSchema)

module.exports = Message
