const router = require("express").Router();
const {findAnswerByQuestionId, postAnswer} = require("./answer.controller")

router.post("/", postAnswer);
router.get("/:id", findAnswerByQuestionId);

module.exports = router;