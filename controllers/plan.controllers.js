const Plan = require('./../models/Plan.model')
const TypePlan = require('./../models/TypePlan.model')
const User = require('./../models/User.model')
const GetDateToFilter = require('./../utils/GetDate')
const getDate = require('./../utils/GetDate')


const getRandomPlans = (req, res, next) => {

    const dateFilter = GetDateToFilter()

    Plan
        .aggregate([{ $sample: { size: 12 } }
            ,
        {
            $match: {
                date: { $gte: dateFilter }
            }
        },
        ])
        .then(response => {
            const promises = response.map(elm =>
                Plan
                    .findById(elm._id)
                    .populate('typePlan owner'))
            Promise
                .all(promises)
                .then((plans) => res.json(plans))
                .catch(err => next(err))
        })
        .catch(err => next(err))
}


const getPlans = (req, res, next) => {

    const { origin, destination, date, duration, typePlan, sortOrigin, sortDestination, sortDate, sortDuration } = req.query

    const dateFilter = GetDateToFilter()

    let filter = {}

    if (origin) filter.origin = origin
    if (destination) filter.destination = destination
    if (duration) filter.duration = duration
    if (typePlan) filter.typePlan = typePlan
    if (date) {
        filter.date = date
    } else {
        filter.date = { $gte: dateFilter }
    }

    let sort = {}

    if (sortOrigin) sort.origin = sortOrigin
    if (sortDestination) sort.destination = sortDestination
    if (sortDate) sort.date = sortDate
    if (sortDuration) sort.duration = sortDuration

    Plan
        .find(filter)
        .sort(sort)
        .populate('typePlan owner')
        .then(response => res.json(response))
        .catch(err => next(err))
}


const getMyPlans = (req, res, next) => {

    const { _id: owner_id } = req.payload

    Plan
        .find({ owner: owner_id })
        .populate('typePlan')
        .then(response => res.json(response))
        .catch(err => next(err))
}


const getOnePlan = (req, res, next) => {

    const { plan_id } = req.params

    Plan
        .findById(plan_id)
        .populate('typePlan')
        .then(response => res.json(response))
        .catch(err => next(err))
}



const getOriginPlan = (req, res, next) => {

    let originArray = []

    const dateFilter = GetDateToFilter()
    let filter = {}
    filter.date = { $gte: dateFilter }

    Plan
        .find(filter)
        .sort({ origin: 1 })
        .then(response => {
            response.map(elm => originArray.push(elm.origin))
            return originArray.filter(function (value, index, self) {
                return self.indexOf(value) === index
            })
        })
        .then(response => res.json(response))
        .catch(err => next(err))
}


const getDestinationPlan = (req, res, next) => {

    let destinationArray = []

    const dateFilter = GetDateToFilter()
    let filter = {}
    filter.date = { $gte: dateFilter }

    Plan
        .find(filter)
        .sort({ destination: 1 })
        .then(response => {
            response.map(elm => destinationArray.push(elm.destination))
            return destinationArray.filter(function (value, index, self) {
                return self.indexOf(value) === index
            })
        })
        .then(response => res.json(response))
        .catch(err => next(err))
}


const getTypePlan = (req, res, next) => {

    TypePlan
        .find()
        .then(response => res.json(response))
        .catch(err => next(err))
}


const createPlan = (req, res, next) => {

    const { title, origin, destination, date, duration, typePlan, image, description } = req.body
    const { _id: owner } = req.payload

    Plan
        .create({ title, origin, destination, date, duration, typePlan, image, description, owner })
        .then(response => res.json(response))
        .then(response => User.findByIdAndUpdate(owner, { $push: { plan: response._id } }, { new: true }))
        .catch(err => next(err))
}


const editPlan = (req, res, next) => {

    const { title, origin, destination, date, duration, typePlan, image, description } = req.body
    const { plan_id: id } = req.params

    Plan
        .findByIdAndUpdate(id, { title, origin, destination, date, duration, typePlan, image, description })
        .then(response => res.json(response))
        .catch(err => next(err))
}


const deletePlan = (req, res, next) => {

    const { plan_id: id } = req.params

    Plan
        .findByIdAndDelete(id)
        .then(() => res.json({ msg: "Plan was deleted!" }))
        .catch(err => next(err))
}

module.exports = {
    getRandomPlans,
    getPlans,
    getMyPlans,
    getOnePlan,
    getOriginPlan,
    getDestinationPlan,
    getTypePlan,
    createPlan,
    editPlan,
    deletePlan
}