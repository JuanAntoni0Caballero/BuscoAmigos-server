const { Schema, model } = require("mongoose")

const planSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, 'El nombre es obligatorio.'],
        },
        origin: {
            type: String,
            required: [true, 'El origen es obligatorio.'],
        },
        destination: {
            type: String,
            required: [true, 'El destino es obligatorio.'],
        },
        date: {
            type: String,
            required: [true, 'La fecha es obligatoria.'],
        },
        duration: {
            type: String,
            default: '0'
        },
        typePlan: {
            ref: 'typePlan',
            type: Schema.Types.ObjectId,
        },
        image: {
            type: String,
            default: 'https://res.cloudinary.com/dulqf7f1b/image/upload/v1678120897/BuscoAmigos/playa.jpg'
        },
        description: {
            type: String,
            required: [true, 'La descripción es obligatoria.'],
        },
        owner: {
            ref: 'user',
            type: Schema.Types.ObjectId
        }
    },
    {
        timestamps: true
    }
)

const Plan = model("plan", planSchema)

module.exports = Plan
