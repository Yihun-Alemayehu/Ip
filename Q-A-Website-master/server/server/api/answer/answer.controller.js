const pool = require("../../config/database");
const {getAnswerByQuestionId, addAnswerToQuestion} = require("./answer.service");

module.exports = {
    postAnswer: (req, res) => {
        const {answer, user_id, question_id} = req.body;
        
        if (!answer || !user_id || !question_id)
            return res.status(400).json({msg: "Not all fields have been provided."});
        addAnswerToQuestion (req.body, (err, results) => {
            if (err){
                return res.status(500).json({msg: "Database connection error"});
            }
            return res.status(200).json({msg: "New answer was added successfully", data: results})
        })
    },
    findAnswerByQuestionId: (req, res) => {
        getAnswerByQuestionId (req.params.id, (err, results) => {
            if (err){
                return res.status(500).json({msg: "Database connection error"})
            }
            if (!results){
                return res.status(404).json({msg: "No answers have been provided yet."})
            }
            return res.status(200).json({msg: results});
        })
    }

}