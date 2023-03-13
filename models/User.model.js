const { Schema, model } = require("mongoose")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


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
      required: [true, 'La contraseña de usuario es obligatoria'],
      minlength: [4, 'La contraseña debe tener 4 o más caracteres']
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
    message: [{
      ref: 'message',
      type: Schema.Types.ObjectId,
    }],
    conversation: {
      ref: 'conversation',
      type: Schema.Types.ObjectId,
    },
    plan: {
      ref: 'plan',
      type: Schema.Types.ObjectId,
    }

  },
  {
    timestamps: true
  }
)

userSchema.pre('save', function (next) {

  const saltRounds = 10
  const salt = bcrypt.genSaltSync(saltRounds)
  const hashedPassword = bcrypt.hashSync(this.password, salt)
  this.password = hashedPassword

  next()
})

userSchema.methods.signToken = function () {
  const { _id, username, email, avatar, role, assessment } = this
  const payload = { _id, username, email, avatar, role, assessment }

  const authToken = jwt.sign(
    payload,
    process.env.TOKEN_SECRET,
    { algorithm: 'HS256', expiresIn: "6h" }
  )

  return authToken
}

userSchema.methods.validatePassword = function (candidatePassword) {
  return bcrypt.compareSync(candidatePassword, this.password)
}

const User = model("user", userSchema)

module.exports = User


