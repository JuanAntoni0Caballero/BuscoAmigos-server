const router = require("express").Router()
const jwt = require('jsonwebtoken')

const { response } = require("../app")
const { verifyToken } = require("../middlewares/verifyToken")
const User = require('../models/User.model')
// const fileUploader = require('../config/cloudinary.config')


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
    const { _id: id } = req.payload


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


router.put('/editUser', verifyToken, (req, res, next) => {

    const { _id: id } = req.payload
    const { username, email } = req.body
    console.log(req.payload)
    console.log(req.body)

    // User

    //     .findOne({ email })
    //     .then((foundUser) => {
    //         console.log(foundUser)
    //         if (foundUser) {
    //             res.status(400).json({ message: 'Email already exists' })
    //             return
    //         }
    //         return User.findByIdAndUpdate(id, { username, email }, { new: true })
    //     })
    User.findByIdAndUpdate(id, { username, email }, { new: true })
        .then((user) => {
            const { username, email, role, avatar, assessment, _id } = user
            const payload = { username, email, role, avatar, assessment, _id }

            const authToken = jwt.sign(
                payload,
                process.env.TOKEN_SECRET,
                { algorithm: 'HS256', expiresIn: "6h" }
            )

            res.status(200).json({ authToken })

        })
        .then(response => res.json(response))
        .catch(err => next(err))
})






module.exports = router