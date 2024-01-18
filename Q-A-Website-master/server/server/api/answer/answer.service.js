const pool = require('../../config/database');

module.exports = {
    addAnswerToQuestion: async (data, callback) => {
        pool.query(`INSERT INTO answer(answer,question_id,user_id)VALUES(?,?,?)`,
            [
                data.answer,
                data.question_id,
                data.user_id
            ], (err, result) => {
                if (err) {
                    return callback(err);
                }
                return callback(null, result);
            }
        );
    },
    getAnswerByQuestionId: (id, callback) => {
        pool.query(`SELECT answer_id, answer, question_id, registration.user_id, registration.user_name FROM answer LEFT JOIN registration ON answer.user_id = registration.user_id WHERE answer.question_id = ?`, [id], (err, result) => {
            if (err) {
                return callback(err);
            }
            return callback(null, result);
        })
    }
}