import React, { useState, useEffect } from 'react';
import { Main } from '.';
import axios from 'axios';

function Content(props) {

    const [contentId, setContentId]=useState(undefined)
    const [imageUrl, setImageUrl]=useState('')
    const [contentImage, setContentImage]=useState('')
    const [subject, setSubject]=useState('')
    const [content, setContent]=useState('')

    aaaaaaaaaaaaaaa  to do this aaaaaaaaaaaaaaaaaa
    // useEffect(() => {
    //     axios.post('http://localhost:4000/contents/',
    //     {
    //         'contentId': props.contentId,
    //         'sessionId': sessionStorage.getItem('sessionId')
    //     },
    //     {
    //         withCredentials: true
    //     })
    //     .then(res => {
    //         if(res.data.msg === undefined){
    //             setContentId(res.data.contentId)
    //             setSubject(res.data.subject)
    //             setContent(res.data.content)
    //         } else {
    //             alert(res.data.msg)
    //         }
    //     })
    //     .catch()
    // },[])

    const handleInputImage = (e) => {
        // set url for image tag
        setImageUrl(URL.createObjectURL(e.target.files[0]))
        // set image binary data
        setContentImage(e.target.files[0])
    }

    const handleInputSubject = (e) =>{
        setSubject(e.target.value)
    }

    const handleInputContent = (e) =>{
        setContent(e.target.value)
    }

    const onClickSave = () =>{

        // multipart/form-data
        let formData = new FormData();

        // define config
        const config = {
            header: {'content-type': 'multipart/form-data'},
            withCredentials: true
        }
        
        formData.append("contentId", contentId)
        formData.append("userId", sessionStorage.getItem('userId'))
        formData.append("contentImage", contentImage)
        formData.append("subject", subject)
        formData.append("content", content)

        axios.post('http://localhost:4000/contents/save', formData, config)
        .then(res => {
            if(res.data.msg === undefined){
                alert('saved')
            } else {
                alert(res.data.msg)
            }
        })
        .catch()
    }

    return(
        <section>
            <div class="form-container align-self-center">
            <div class="row">
                <div class="col-sm-4">
                    <img src={imageUrl} class="img-thumbnail" id="contentImage"></img>
                </div>
                <div class="col-sm-8 align-self-center">
                    <form method="post">
                        <div class="mb-3"></div>
                        <input class="form-control" type="file" onChange={handleInputImage} />
                        <input class="form-control" type="text" onChange={handleInputSubject} placeholder="subject"/>
                        <div class="mb-3"></div>
                        <div class="mb-3"></div>
                        <div class="mb-3"></div>
                        <div class="mb-3"></div>
                    </form>
                </div>
            </div>
            </div>

            <textarea class="form-control" rows="7" onChange={handleInputContent}></textarea>
            <button class="w-100 btn btn-lg btn-primary" type='button' onClick={onClickSave}> save </button>
            <button class="w-100 btn btn-lg btn-primary" type='button'> go main </button>
        </section>
    )
}

export default Content;