const router = require("express").Router()
const User = require('../models/User.model')
const fileUploader = require('../config/cloudinary.config')

module.exports = router