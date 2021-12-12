import React, { useState, useEffect } from 'react';
import { Main } from './';
import axios from 'axios';

function Content(props) {

    const [state, setState] = useState(undefined)
    const [contentId]=useState(props.contentId)
    const [imageUrl, setImageUrl]=useState(undefined)
    const [contentImage, setContentImage]=useState(undefined)
    const [subject, setSubject]=useState(undefined)
    const [content, setContent]=useState(undefined)


    useEffect(() => {
        if(contentId){
            loadContent(contentId)
        }
    },[contentId])


    const loadContent = (contentId) =>{
        axios.post('http://localhost:4000/contents/load',
        {
            'contentId': contentId,
            'sessionId': sessionStorage.getItem('sessionId')
        },
        {
            withCredentials: true
        })
        .then(res => {
            if(res.data.msg === undefined){
                // set useState
                setSubject(res.data.contentData.subject)
                setContent(res.data.contentData.content)
                setImageUrl('http://localhost:4000/contents/image/' + res.data.contentData.image + '?sessionId=' + sessionStorage.getItem('sessionId'))
                
                // set tag value
                document.getElementById('subject').value = res.data.contentData.subject
                document.getElementById('content').value = res.data.contentData.content
            } else {
                alert(res.data.msg)
            }
        })
        .catch()
    }

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

    const onClickGoMain = () =>{
        setState('main')
    }

    if(state === 'main'){
        return <Main />
    }
    else {
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
                            <input id = 'subject' class="form-control" type="text" onChange={handleInputSubject} placeholder="subject"/>
                            <div class="mb-3"></div>
                            <div class="mb-3"></div>
                            <div class="mb-3"></div>
                            <div class="mb-3"></div>
                        </form>
                    </div>
                </div>
                </div>
    
                <textarea id = 'content' class="form-control" rows="7" onChange={handleInputContent}></textarea>
                <button class="w-100 btn btn-lg btn-primary" type='button' onClick={onClickSave}> save </button>
                <button class="w-100 btn btn-lg btn-primary" type='button' onClick={onClickGoMain}> go main </button>
            </section>
        )
    }
}

export default Content;