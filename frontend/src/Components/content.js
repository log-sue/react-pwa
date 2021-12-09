import React, {useState} from 'react';
import { Main } from '.';
import axios from 'axios';

function Content() {

    const [imageUrl, setImageUrl]=useState('')
    const [contentImage, setContentImage]=useState('')
    const [subject, setSubject]=useState('')
    const [content, setContent]=useState('')

    const handleInputImage = (e) => {
        setContentImage(e.target.files[0])
        setImageUrl(URL.createObjectURL(contentImage))
    }

    const handleInputSubject = (e) =>{
        setSubject(e.target.value)
    }

    const handleInputContent = (e) =>{
        setContent(e.target.value)
    }

    const onClickSave = () =>{

        let formData = new FormData();

        const config = {
            header: {'content-type': 'multipart/form-data'},
            withCredentials: true
        }
        
        formData.append("userId", sessionStorage.getItem('userId'))
        formData.append("image", contentImage)
        formData.append("subject", subject)
        formData.append("content", content)

        axios.post('http://localhost:4000/user/contentSave', formData, config)
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