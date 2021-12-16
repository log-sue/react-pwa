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
    let imageList = {}

    try {
        const [rows] = await connection.query(sql, params);

        // load user data 
        for (const row of rows){ 
            contentsList[row.contentId] = {
                subject: row.subject, 
                image: row.image
            }
            imageList[row.image] = row.contentId
        }

        // save contentsList in session for main
        req.session.contentsList = contentsList

        // save user image list for content
        req.session.imageList = imageList

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

            // select sql
            const sqlSelector = function(){
                let sql = ''
                let params = ''
                if(req.body.contentId !== 'undefined'){
                    if(req.body.contentImage !== 'undefined'){
                        sql = 'UPDATE usercontents SET userId = ?, content = ?, subject = ?, author = ?, star = ?, image = ? WHERE contentId = ?';
                        params = [req.body.userId, req.body.content, req.body.subject, req.body.author, req.body.star, req.file.filename, req.body.contentId ]
                    }
                    else{
                        sql = 'UPDATE usercontents SET userId = ?, content = ?, subject = ?, author = ?, star = ? WHERE contentId = ?';
                        params = [req.body.userId, req.body.content, req.body.subject, req.body.author, req.body.star, req.body.contentId]
                    }
                }
                else{
                    if(req.body.contentImage !== 'undefined'){
                        sql = 'INSERT INTO usercontents VALUES(?, ?, ?, ?, ?, ?, ?)';
                        params = [, req.body.userId, req.body.content, req.body.subject, req.file.filename, req.body.author, req.body.star]
                    }
                    else{
                        sql = 'INSERT INTO usercontents VALUES(?, ?, ?, ?, ?, ?, ?)';
                        params = [, req.body.userId, req.body.content, req.body.subject, '', req.body.author, req.body.star]
                    }
                }
                return [sql, params]
            }
            
            const [sql, params] = sqlSelector()
            
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


// content load
router.post('/load', async function(req, res, next) {
    const connection = await pool.getConnection(async conn => conn);
    const sql = 'SELECT * FROM usercontents WHERE contentId = ?';
    const params = [req.body.contentId]

    let msg = undefined

    let contentData = {}

    try {
        const [rows] = await connection.query(sql, params);

        contentData['contentId'] = rows[0].contentId
        contentData['subject'] = rows[0].subject
        contentData['author'] = rows[0].author
        contentData['star'] = rows[0].star
        contentData['content'] = rows[0].content
        contentData['image'] = rows[0].image

        console.log(contentData)
    } catch(err) {
        msg = 'DB error'
        console.log(err)
    } finally { 
        connection.release(); 
    }
    res.send({msg: msg, contentData: contentData});
});



// load image
router.get('/image/:id', function(req,res){
    const path = 'images/' + req.params.id

    // console.log(req.params.id)
    // console.log(req.query.sessionId)
    // console.log(req.session.id)
    // console.log(req.session.imageList)

    if(req.query.sessionId !== req.session.id){
        // validate sessionId
        res.writeHead(404);
        res.end('not found');
    }
    else if(!(req.params.id in req.session.imageList)){
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