import React, { useState, useEffect } from 'react';
import { Main } from './';
import { DefaultModal } from './modals'
import axios from 'axios';

function Content(props) {

    const [state, setState] = useState(undefined)
    const [contentId]=useState(props.contentId)
    const [imageUrl, setImageUrl]=useState(undefined)
    const [contentImage, setContentImage]=useState(undefined)
    const [subject, setSubject]=useState(undefined)
    const [author, setAuthor]=useState(undefined)
    const [star, setStar]=useState(undefined)
    const [content, setContent]=useState(undefined)
    const [modalState, setModalState] = useState({show:false, massage:''})
    const [date, setDate] = useState(props.date)

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
                setAuthor(res.data.contentData.author)
                setStar(res.data.contentData.star)
                setContent(res.data.contentData.content)
                setImageUrl('http://localhost:4000/contents/image/' + res.data.contentData.image + '?sessionId=' + sessionStorage.getItem('sessionId'))

                setDate( 
                    {   year : res.data.contentData.year, 
                        month : res.data.contentData.month, 
                        day : res.data.contentData.day
                    } 
                )
                
                
                // set tag value
                document.getElementById('subject').value = res.data.contentData.subject
                document.getElementById('author').value = res.data.contentData.author
                document.getElementById('star').value = res.data.contentData.star
                document.getElementById('content').value = res.data.contentData.content
            } else {
                alert(res.data.msg)
            }
        })
        .catch()
    }

    // modal handler
    const handleModal = () =>{
        setModalState({show:false, massage:''})
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

    const handleInputAuthor = (e) =>{
        //값을 받아서 변수에 저장
        setAuthor(e.target.value)
    }

    const handleInputStar = (e) =>{
        //값을 받아서 변수에 저장
        setStar(e.target.value)
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
        formData.append("author", author)
        formData.append("star", star)
        formData.append("year", date.year)
        formData.append("month", date.month)
        formData.append("day", date.day)
        formData.append("content", content)

        axios.post('http://localhost:4000/contents/save', formData, config)
        .then(res => {
            // get response
            if(res.data.msg === undefined){
                setModalState({show:true,massage:'saved'})
            } else {
                setModalState({show:true,massage:res.data.msg})
            }
        })
        .catch(err =>{
            // don't get response
            setModalState({show:true,massage:err.massage})
        })
    }

    const onClickDelete = () =>{
        axios.post('http://localhost:4000/contents/delete', {
            contentId : contentId
        },
        {
            withCredentials: true
        })
        .then(res => {
            // get response
            if(res.data.msg === undefined){
                setModalState({show:true,massage:'delete'})
            } else {
                setModalState({show:true,massage:res.data.msg})
            }
        })
        .catch(err =>{
            // don't get response
            setModalState({show:true,massage:err.massage})
        })
        .finally(() => {
            setState('main')
        })
    }

    const onClickGoMain = () =>{
        setState('main')
    }


    // view = json = {year:2021, month:12, ...}

    if(state === 'main'){
        return <Main view={date} modalState={modalState}/>
    }
    else {
        return(
            <section>
                <DefaultModal show={modalState.show} massage={modalState.massage} handleModal={handleModal}/> 
                <div class="form-container align-self-center">
                <div class="row">
                    <div class="col-sm-4">
                        <img src={imageUrl} class="img-thumbnail" id="contentImage"></img>
                    </div>
                    <div class="col-sm-8 align-self-center">
                        <form method="post">
                            <div class="mb-3"></div>
                            <input class="form-control" type="file" onChange={handleInputImage} />
                            <input id = 'subject' class="form-control" type="text" onChange={handleInputSubject} placeholder="제목"/>
                            <input id = 'author' class="form-control" type="text" onChange={handleInputAuthor} placeholder="작가"/>
                            <input id = 'star' class="form-control" type="text" onChange={handleInputStar} placeholder="평가"/>
                            <div class="mb-3"></div>
                            <div class="mb-3"></div>
                            <div class="mb-3"></div>
                            <div class="mb-3"></div>
                        </form>
                    </div>
                </div>
                </div>
    
                <textarea id = 'content' class="form-control" rows="7" onChange={handleInputContent}></textarea>
                <button class="w-100 btn btn-lg btn-primary" type='button' onClick={onClickSave}> 저장 </button>
                <button class="w-100 btn btn-lg btn-primary" type='button' onClick={onClickDelete}> 삭제 </button>
                <button class="w-100 btn btn-lg btn-primary" type='button' onClick={onClickGoMain}> 메인으로 </button>
            </section>
        )
    }
}

export default Content;