const pool = require("../../config/database");
const { v4: uuidv4 } = require('uuid');
const {getAllQuestions, questionById, addQuestion} = require("./question.service")

module.exports = {
    createQueston: (req, res) => {
        const {question, questionDescription, id} = req.body;
        req.body.postId = uuidv4();
    
        if(!question || !questionDescription || !id)
            return res.status(400).json({msg: "Not all fields have been provided!"});
        
        addQuestion (req.body, (err, results) => {
            if(err){
                return res.status(500).json({msg: "Database connection err"})
            }
            return res.status(200).json({
                msg: "New question was created successfully",
                data: results
            })
        })
    },

    getQuestions: (req, res) => {
        getAllQuestions((err, results) => {
            if (err) {
                console.log(err);
                return res
                    .status(500)
                    .json({ msg: "database connection err" });
            }
            return res.status(200).json({ data: results });
        })
    },

    getQuestionById: (req, res) => {
        questionById (req.params.id, (err, results) => {
            if(err){
                return res.status(500).json({msg: "Database connection err"})
            }
            if (!results) {
                return res.status(404).json({msg: "Question is not found"})
            }
            return res.status(200).json({msg: results})
        })
    }
}