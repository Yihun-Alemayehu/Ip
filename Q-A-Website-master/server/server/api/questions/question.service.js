const pool = require("../../config/database");

module.exports = {
    addQuestion: (data, callback) => {
        pool.query(`INSERT INTO question(question,question_description,user_id,post_id)VALUES(?,?,?,?)`,
            [
                data.question,
                data.questionDescription,
                data.id,
                data.postId,
                // data.questionCodeBlock,
                // data.tags,
                
                
            ], (err, result) => {
                if (err) {
                    return callback(err);
                }
                return callback(null, result)
            }
        );
    },
    getAllQuestions : (callback) => {
        pool.query(`SELECT registration.user_name, question,question_id, question_description,question_code_block,tags,post_id FROM question JOIN registration ON question.user_id = registration.user_id  ORDER BY question_id DESC`, [], (err, result) => {
            if (err) {
                return callback(err);
            }
            return callback(null, result);
        })
    },
    questionById : (id, callback) => {
        pool.query(`SELECT * FROM question WHERE question_id = ?`, [id], (err, result) => {
            if (err) {
                return callback(err);
            }
            return callback(null, result);
        })
    }
}