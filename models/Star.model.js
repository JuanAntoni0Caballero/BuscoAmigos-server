const { Schema, model } = require("mongoose")

const starSchema = new Schema(
  {
    stars: {
      type: String,
      enum: ['1', '2', '3', '4', '5'],
    },
    owner: {
      ref: 'user',
      type: Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true
  }
)

const Star = model("star", starSchema)

module.exports = Star
