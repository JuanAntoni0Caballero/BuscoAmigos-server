const { Schema, model } = require("mongoose")

const typePlanSchema = new Schema(
  {
    picture: {
      type: String
    },
    typePlan: {
      type: String
    },
  },
  {
    timestamps: true
  }
)

const TypePlan = model("typePlan", typePlanSchema)

module.exports = TypePlan
