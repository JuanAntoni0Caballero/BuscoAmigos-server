const { Schema, model } = require("mongoose")

const planSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, 'El nombre es obligatorio.'],
        },
        origin: {
            type: String,
            default: 'Sin origen'
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
            required: [true, 'La duración del viaje es obligatoria.'],
        },
        typePlan: {
            ref: 'typePlan',
            type: Schema.Types.ObjectId,
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
