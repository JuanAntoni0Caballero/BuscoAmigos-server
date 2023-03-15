const User = require('../models/User.model')
const Plan = require('../models/Plan.model')


const getUsers = (req, res, next) => {

    User
        .find()
        // .sort({ title: 1 })
        // .select({ title: 1, imageUrl: 1, owner: 1 })
        .then(response => res.json(response))
        .catch(err => next(err))
}

const getOneUser = (req, res, next) => {

    const { user_id } = req.params

    User
        .findById(user_id)
        .populate('plans')
        .then(response => res.json(response))
        .catch(err => next(err))
}


const profile = (req, res, next) => {

    const { _id: id } = req.payload

    User
        .findById(id)
        .then(response => res.json(response))
        .catch(err => next(err))
}



const editUser = (req, res, next) => {

    const { _id: id } = req.payload
    const { username, email, avatar } = req.body

    User
        .findByIdAndUpdate(id, { username, email, avatar }, { new: true })
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
}



const deleteUser = (req, res, next) => {


    const { _id: id } = req.payload

    User
        .findByIdAndDelete(id)
        .then(response => res.json({ msg: "User was deleted!" }))
        .catch(err => next(err))
}




module.exports = {
    getUsers,
    getOneUser,
    profile,
    editUser,
    deleteUser

}