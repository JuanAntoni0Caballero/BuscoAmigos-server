const router = require("express").Router()
const User = require('../models/User.model')
const { verifyToken } = require("../middlewares/verifyToken")
const fileUploader = require('../config/cloudinary.config')

module.exports = router