const router = require("express").Router()

const Plan = require('./../models/Plan.model')

router.get("/getPlans", (req, res) => {

    Plan
        .find()
        // .sort({ title: 1 })
        // .select({ title: 1, imageUrl: 1, owner: 1 })
        .then(response => setTimeout(() => res.json(response), 1000))
        .catch(err => next(err))
})


router.get("/getOnePlan/:plan_id", (req, res, next) => {

    const { plan_id } = req.params

    Plan
        .findById(plan_id)
        .then(response => res.json(response))
        .catch(err => next(err))
})


router.post("/savePlan", (req, res, next) => {

    const { title, description, origin, destination, type } = req.body

    Coaster
        .create({ title, description, origin, destination, type })
        .then(response => res.json(response))
        .catch(err => next(err))
})

module.exports = router