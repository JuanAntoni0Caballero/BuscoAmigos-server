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
        imgURL: {
            type: String,
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
            enum: ['cultural', 'rural', 'fiesta', 'sol y playa', 'gastronomico', 'quedada de coches'],
            required: [true, 'El tipo de viaje es obligatorio.'],
        },
        owner: {
            ref: 'User',
            type: Schema.Types.ObjectId
        }
    },
    {
        timestamps: true
    }
)

const Plan = model("plan", planSchema)

module.exports = Plan
