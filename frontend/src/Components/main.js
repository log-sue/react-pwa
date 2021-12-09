import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Content } from './';

function Main() {

    const [state, setState] = useState(undefined)
    const [contentsList, setContentsList] = useState(undefined)

    useEffect(() => {
        axios.post('http://localhost:4000/user/contentsList',
        {
            'userId': sessionStorage.getItem('userId'), 
            'sessionId': sessionStorage.getItem('sessionId')
        },
        {
            withCredentials: true
        })
        .then(res => {
        if(res.data.msg === undefined){
            setContentsList(res.data.contentsList)
            console.log(res.data.contentsList)
        } else {
            alert(res.data.msg)
        }
        })
        .catch()
    },[])

    const onClickContent = () => {
        setState('content')
    }
    
    const onLogout = () => {
        sessionStorage.removeItem('sessionId');
        sessionStorage.removeItem('userId');
        document.location.href = '/';
    }

    if(state === 'content'){
        return <Content />
    }
    else{
        return(
            <div>
                <header>
                    <div class="collapse bg-dark" id="navbarHeader">
                        <div class="container">
                        <div class="row">
                            <div class="col-sm-8 col-md-7 py-4">
                            <h4 class="text-white">About</h4>
                            <p class="text-muted">Add some information about the album below, the author, or any other background context. Make it a few sentences long so folks can pick up some informative tidbits. Then, link them off to some social networking sites or contact information.</p>
                            </div>
                            <div class="col-sm-4 offset-md-1 py-4">
                            <h4 class="text-white">User info</h4>
                            <ul class="list-unstyled">
                                <li class="text-white" >text</li>
                                <li><a href="#" class="text-white">link</a></li>
                                <li><a href="#" onClick={onLogout} class="text-white">Logout</a></li>
                            </ul>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div class="navbar navbar-dark bg-dark shadow-sm">
                        <div class="container">
                        <a href="#" class="navbar-brand d-flex align-items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" aria-hidden="true" class="me-2" viewBox="0 0 24 24"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
                            <strong>Album</strong>
                        </a>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarHeader" aria-controls="navbarHeader" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        </div>
                    </div>
                </header>
    
    
    
    
                <main>
    
                    <section class="py-5 text-center container">
                        <div class="row py-lg-5">
                        <div class="col-lg-6 col-md-8 mx-auto">
                            <h1 class="fw-light">Album example</h1>
                            <p class="lead text-muted">Something short and leading about the collection below—its contents, the creator, etc. Make it short and sweet, but not too short so folks don’t simply skip over it entirely.</p>
                            <p>
                            <a href="#" class="btn btn-primary my-2" onClick={onClickContent}>Add content</a>
                            <a href="#" class="btn btn-secondary my-2">Secondary action</a>
                            </p>
                        </div>
                        </div>
                    </section>
    
                    <div class="album py-5 bg-light">
                        <div class="container">
                            



                            {/* card contents */}
                            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                                {contentsList && contentsList.map((subject) => (
                                    <div class="col">
                                    <div class="card shadow-sm">
                                        <svg class="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"/><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>
                        
                                        <div class="card-body">
                                        <p class="card-text">{subject}</p>
                                        <div class="d-flex justify-content-between align-items-center">
                                            <div class="btn-group">
                                            <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
                                            <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
                                            </div>
                                            <small class="text-muted">9 mins</small>
                                        </div>
                                        </div>
                                    </div>
                                    </div>
                                ))}
                            </div>





                        </div>
                    </div>
                </main>
    
    
    
    
                <footer class="text-muted py-5">
                    <div class="container">
                        <p class="float-end mb-1">
                        <a href="#">Back to top</a>
                        </p>
                        <p class="mb-1">Album example is &copy; Bootstrap, but please download and customize it for yourself!</p>
                        <p class="mb-0">New to Bootstrap? <a href="/">Visit the homepage</a> or read our <a href="../getting-started/introduction/">getting started guide</a>.</p>
                    </div>
                </footer>
    
            </div>
    
            // <div>
            //     <div>
            //         <h2>Home 페이지</h2>
            //     </div>
    
            //     <p>
            //         {imgFolder}
            //     </p>
                
            //     <div>
            //         <button type='button' onClick={onLogout}>Logout</button>
            //     </div>
            // </div>
    
        )

    }

    
}
 
export default Main;