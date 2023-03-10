const { Schema, model } = require("mongoose");

const messageSchema = new Schema(
  {
    content: {
      type: String,
      required: [true, 'El mensaje es obligatorio.'],
      minlength: [20, 'El mensaje debe tener min. 20 caracteres.']
    },
    owner: {
      ref: 'user',
      type: Schema.Types.ObjectId,
    }
  },

  {
    timestamps: true
  }
);

const Message = model("message", messageSchema)

module.exports = Message
