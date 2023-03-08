
const router = require("express").Router()
const { verifyToken } = require('../middlewares/verifyToken')
const Plan = require('./../models/Plan.model')
const TypePlan = require('./../models/TypePlan.model')


router.get("/getPlans", (req, res, next) => {

    Plan
        .find()
        .populate('typePlan')
        .then(response => res.json(response))
        .catch(err => next(err))
})


router.get("/getOnePlan/:plan_id", (req, res, next) => {

    const { plan_id } = req.params

    Plan
        .findById(plan_id)
        .then(response => res.json(response))
        .catch(err => next(err))
})


router.get("/getTypePlan", (req, res, next) => {

    TypePlan
        .find()
        .then(response => res.json(response))
        .catch(err => next(err))
})


router.post("/savePlan", verifyToken, (req, res, next) => {

    const { title, origin, destination, date, duration, typePlan, description } = req.body
    const { _id: owner } = req.payload

    Plan
        .create({ title, origin, destination, date, duration, typePlan, description, owner })
        .then(response => res.json(response))
        .catch(err => next(err))
})





router.post("/editPlan/:plan_id", (req, res, next) => {

    const { title, origin, destination, date, duration, typePlan, description } = req.body
    const { plan_id: id } = req.params

    Plan
        .findByIdAndUpdate(id, { title, origin, destination, date, duration, typePlan, description })
        .then(response => res.json(response))
        .catch(err => next(err))
})


module.exports = router