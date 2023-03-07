const { Schema, model } = require("mongoose")

const typePlanSchema = new Schema(
  {
    type: {
      type: String,
      required: [true, 'El tipo de plan es obligatorio'],
    },
    picture: {
      type: String,
    },
  },
  {
    timestamps: true
  }
)

const TypePlan = model("typePlan", typePlanSchema)

module.exports = TypePlan
