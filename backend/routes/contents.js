const express = require('express');
const db_config = require('../config/mysql2.js');
const pool = db_config.init();
const router = express.Router();

// for multipart
const multer  = require('multer')
// for loading image file
const fs = require('fs');



// list
router.post('/list', async function(req, res, next) {
    const connection = await pool.getConnection(async conn => conn);
    const sql = 'SELECT * FROM usercontents WHERE userId = ?';
    const params = [req.body.userId]

    let msg = undefined

    let contentsList = {}

    try {
        const [rows] = await connection.query(sql, params);

        // load user data 
        for (const row of rows){ 
            contentsList[row.contentId] = {
                subject: row.subject, 
                image: row.image
            }
        }

        // save contentsList in session
        req.session.contentsList = contentsList

        console.log(contentsList)
    } catch(err) {
        msg = 'DB error'
        console.log(err)
    } finally { 
        connection.release(); 
    }
    res.send({msg: msg, contentsList: contentsList});
});




const uploadImage = multer({ 
    dest: 'images/',
    limits: { fileSize: 5*1024*1024},
}).single('contentImage')


// content save Multipart
router.post('/save', async function(req, res, next) {

    // multer upload handler
    uploadImage(req, res, async function (err) {

        let msg = undefined

        if (err) {
            // An error occurred when uploading
            if(err.code === "LIMIT_FILE_SIZE"){
                msg = "The image file size is too large. the limit is 5mb."
            } else {
                msg = err.code
            }

        } else {
            // Upload was successful
            const connection = await pool.getConnection(async conn => conn);
            const sql = 'INSERT INTO usercontents VALUES(?, ?, ?, ?, ?)';
            const params = [, req.body.userId, req.body.content, req.body.subject, req.file.filename]

            try {
                const [results] = await connection.query(sql, params);
            } catch(err) {
                msg = 'DB error'
                console.log(err)
            } finally { 
                connection.release(); 
            }
        }

        res.send({msg: msg});

    })

});



// load image
router.get('/image/:id', function(req,res){
    const path = 'images/' + req.params.id
    
    if(req.query.sessionId !== req.session.id){
        // validate sessionId
        res.writeHead(404);
        res.end('not found');
    }
    else if(!(req.params.id in req.session.contentsList)){
        // validate image contents
        res.writeHead(404);
        res.end('not found');
    }
    else{
        // write image
        fs.readFile(path, function (err, data) {
            res.writeHead(200);
            res.write(data);
            res.end();
        });
    }

});

module.exports = router;