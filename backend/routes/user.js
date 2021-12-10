const express = require('express');
const db_config = require('../config/mysql2.js');
const pool = db_config.init();
const router = express.Router();

// isSignIn
router.post('/isSignIn', function(req, res, next) {
    let msg = 'validation failed'

    if(req.body.sessionId === req.session.id){
        msg = undefined
    } 

    res.send({msg: msg});
});

// signIn
router.post('/signIn', async function(req, res, next) {
    const connection = await pool.getConnection(async conn => conn);
    const sql = 'SELECT userPw FROM user WHERE userId = ?';
    const params = [req.body.id]

    let msg = undefined
    try {
        const [rows] = await connection.query(sql, params);
        if (rows[0] === undefined || req.body.pw !== rows[0].userPw){
            msg = 'Incorrect ID or password';
        } else {
            req.session.userId = req.body.id
        }
    } catch(err) {
        msg = 'DB error'
        console.log(err)
    } finally { 
        connection.release(); 
    }
    res.send({msg: msg, userId: req.session.userId, sessionId: req.session.id});
});

// signUp
router.post('/signUp', async function(req, res, next) {
    const connection = await pool.getConnection(async conn => conn);
    const sql = 'INSERT INTO user VALUES(?, ?)';
    const params = [req.body.id, req.body.pw]

    let msg = undefined
    try {
        const [results] = await connection.query(sql, params);
    } catch(err) {
        msg = 'DB error'
        console.log(err)
    } finally { 
        connection.release(); 
    }
    res.send({msg: msg, userId:req.body.id});
});

// contentSave
// router.post('/contentSave', async function(req, res, next) {
//     const connection = await pool.getConnection(async conn => conn);
//     const sql = 'INSERT INTO usercontents VALUES(?, ?, ?, ?, ?)';
//     const params = [, req.body.userId, req.body.content, req.body.subject, req.body.image]

//     console.log(req.body)

//     let msg = undefined
//     try {
//         const [results] = await connection.query(sql, params);
//     } catch(err) {
//         msg = 'DB error'
//         console.log(err)
//     } finally { 
//         connection.release(); 
//     }
//     res.send({msg: msg, userId:req.body.id});
// });

// logout
// router.get("/logout", function(req,res){
//     req.session.destroy(function(err) {
//         res.redirect('/');
//     })
// });


module.exports = router;