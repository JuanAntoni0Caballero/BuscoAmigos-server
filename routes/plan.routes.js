const router = require("express").Router()

const { verifyToken } = require('../middlewares/verifyToken')


const {
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
} = require("../controllers/plan.controllers")

router.get("/getRandomPlans", getRandomPlans)
router.get("/getPlans", getPlans)
router.get("/getMyPlans", verifyToken, getMyPlans)
router.get("/getOnePlan/:plan_id", getOnePlan)
router.get("/getOriginPlan", getOriginPlan)
router.get("/getDestinationPlan", getDestinationPlan)
router.get("/getTypePlan", getTypePlan)
router.post("/createPlan", verifyToken, createPlan)
router.put("/editPlan/:plan_id", verifyToken, editPlan)
router.delete('/deletePlan/:plan_id', verifyToken, deletePlan)

module.exports = router