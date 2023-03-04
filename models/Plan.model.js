const { Schema, model } = require("mongoose")

const planSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, 'El nombre es obligatorio.'],
        },
        description: {
            type: String,
            required: [true, 'La descripción es obligatoria.'],
            minlength: [20, 'La descripción debe tener min. 20 caracteres.']
        },
        origin: {
            type: String,
        },
        destination: {
            type: String,
            required: [true, 'El destino es obligatorio.'],
        },
        type: {
            type: String,
            enum: ['Cultural', 'Naturaleza', 'Fiesta', 'Rural', 'Sol y playa', 'Gastronomico'],
            required: [true, 'El tipo de viaje es obligatorio.'],
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    {
        timestamps: true
    }
)

const Plan = model("plan", planSchema)

module.exports = Plan
