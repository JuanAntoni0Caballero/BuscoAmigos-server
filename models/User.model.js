const { Schema, model } = require("mongoose")

const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: [true, 'El nombre de usuario es obligatorio']
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      required: [true, 'El email de usuario es obligatorio']
    },
    password: {
      type: String,
      required: [true, 'La contraseña de usuario es obligatoria']
    },
    avatar: {
      type: String,
      default: 'https://res.cloudinary.com/dulqf7f1b/image/upload/v1678120993/BuscoAmigos/default.jpg'
    },
    role: {
      type: String,
      enum: ['ADMIN', 'USER'],
      default: 'USER'
    },
    assessment: [{
      ref: 'stars',
      type: Schema.Types.ObjectId,
    }],

  },
  {
    timestamps: true
  }
)

const User = model("user", userSchema)

module.exports = User


