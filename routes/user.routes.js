const router = require("express").Router()
const jwt = require('jsonwebtoken')

const { response } = require("../app")
const { verifyToken } = require("../middlewares/verifyToken")


const {
    getUsers,
    getOneUser,
    profile,
    editUser,
    deleteUser,

} = require('../controllers/user.controllers')


router.get("/getUsers", verifyToken, getUsers)
router.get("/getOneUser/:user_id", verifyToken, getOneUser)
router.get("/profile", verifyToken, profile)
router.put('/editUser', verifyToken, editUser)



router.delete('/deleteUser', verifyToken, deleteUser)

module.exports = router
