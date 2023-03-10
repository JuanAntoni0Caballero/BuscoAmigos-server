
const router = require("express").Router()
const { verifyToken } = require('../middlewares/verifyToken')
const Plan = require('./../models/Plan.model')
const TypePlan = require('./../models/TypePlan.model')


router.get("/getPlans", verifyToken, (req, res, next) => {

    const { origin, destination, date, duration, typePlan } = req.query

    let filter = {}

    if (origin) filter.origin = origin
    if (destination) filter.destination = destination
    if (date) filter.date = date
    if (duration) filter.duration = duration
    if (typePlan) filter.typePlan = typePlan

    Plan
        .find(filter)
        .populate('typePlan')
        .then(response => res.json(response))
        .catch(err => next(err))
})


router.get("/getOnePlan/:plan_id", verifyToken, (req, res, next) => {

    const { plan_id } = req.params

    Plan
        .findById(plan_id)
        .then(response => res.json(response))
        .catch(err => next(err))
})


router.get("/getOriginPlan", verifyToken, (req, res, next) => {

    let originArray = []

    Plan
        .find()
        .then(response => {
            response.map(elm => originArray.push(elm.origin))
            return originArray.filter(function (value, index, self) {
                return self.indexOf(value) === index
            })
        })
        .then(response => res.json(response))
        .catch(err => next(err))
})

router.get("/getDestinationPlan", verifyToken, (req, res, next) => {

    let destinationArray = []

    Plan
        .find()
        .then(response => {
            response.map(elm => destinationArray.push(elm.destination))
            return destinationArray.filter(function (value, index, self) {
                return self.indexOf(value) === index
            })
        })
        .then(response => res.json(response))
        .catch(err => next(err))
})


router.get("/getTypePlan", verifyToken, (req, res, next) => {

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


router.put("/editPlan/:plan_id", verifyToken, (req, res, next) => {

    const { title, origin, destination, date, duration, typePlan, description } = req.body
    const { plan_id: id } = req.params

    Plan
        .findByIdAndUpdate(id, { title, origin, destination, date, duration, typePlan, description })
        .then(response => res.json(response))
        .catch(err => next(err))
})


router.delete('/deletePlan/:plan_id', verifyToken, (req, res, next) => {


    const { plan_id: id } = req.params

    Plan
        .findByIdAndDelete(id)
        .then(() => res.json({ msg: "Plan was deleted! :)" }))
        .catch(err => next(err))
})


module.exports = router