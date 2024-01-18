const router = require("express").Router();
const {getQuestions, getQuestionById, createQueston} = require("./question.controller");

router.post("/", createQueston);
router.get("/", getQuestions);
router.get("/:id", getQuestionById)

module.exports = router;