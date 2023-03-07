const router = require("express").Router()

const { response } = require("../app")
const { verifyToken } = require("../middlewares/verifyToken")
const User = require('../models/User.model')
const fileUploader = require('../config/cloudinary.config')


router.get("/getUsers", verifyToken, (req, res, next) => {

    User
        .find()
        // .sort({ title: 1 })
        // .select({ title: 1, imageUrl: 1, owner: 1 })
        .then(response => res.json(response))
        .catch(err => next(err))
})


router.get("/getOneUser/:user_id", verifyToken, (req, res, next) => {

    const { user_id } = req.params

    User
        .findById(user_id)
        .then(response => res.json(response))
        .catch(err => next(err))
})



router.get("/profile", verifyToken, (req, res, next) => {

    const { _id: id } = req.payload

    User
        .findById(id)
        .then(response => res.json(response))
        .catch(err => next(err))
})


// router.post('/editUser/:user_id', verifyToken, (req, res, next) => {

//     const { user_id } = req.params

//     User

//         .findByIdAndDelete()
//         .then(response => res.json(response))
//         .catch(err => next(err))
// })






module.exports = router