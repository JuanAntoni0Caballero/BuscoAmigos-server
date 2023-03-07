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
        description: {
            type: String,
            required: [true, 'La descripción es obligatoria.'],
            minlength: [20, 'La descripción debe tener min. 20 caracteres.']
        },
        // date: {
        //     type: String,
        //     required: [true, 'La fecha es obligatoria.'],
        // },
        typePlan: {
            ref: 'typePlan',
            type: Schema.Types.ObjectId,
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
