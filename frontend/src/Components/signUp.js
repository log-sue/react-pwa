import React, { useState } from 'react';
import axios from 'axios';
import { SignIn } from './'
import { DefaultModal } from './modals'
 
function SignUp() {
    
    const [signIn, setSignIn] = useState(false)
    const [inputId, setInputId] = useState('')
    const [inputPw, setInputPw] = useState('')
    const [rePw, setRePw] = useState('')
    const [modalState, setModalState] = useState({show:false, massage:''})
 
    const handleInputId = (e) => {
        setInputId(e.target.value)
    }
 
    const handleInputPw = (e) => {
        setInputPw(e.target.value)
    }

    const handleRePw = (e) => {
        setRePw(e.target.value)
    }

    // modal handler
    const handleModal = () =>{
        setModalState({show:false, massage:''})
    }
 
    // id, passwd => msg, userId, sessionId
    // Success or failure errors are determined as msg, and the session ID and user ID are stored in the session storage, and used for user authentication.
    const onClickSignUp = () => {
        if(inputPw === rePw){
            axios.post('http://localhost:4000/user/signUp', 
            {
                // id is email
                'id': inputId,
                'pw': inputPw,
            }, 
            {
                withCredentials: true
            })
            .then(res => {
                if(res.data.msg === undefined){
                    // get response
                    setModalState({show:true, massage:'success sign up'})
                    setSignIn(true)
                } 
                else {
                    setModalState({show:true, massage:res.data.msg})
                }
            })
            .catch(err =>{
                // don't get response
                setModalState({show:true, massage:err.massage})
            })
        }
        else{
            setModalState({show:true, massage:'Passwords do not match'})
        }
    }

    const onClickGoSignUp = () => {
        setSignIn(true)
    }

    if(signIn){
        return <SignIn show={modalState.show} massage={modalState.massage} />
    }
    else{
        return(
            <main class="form-signin">
                <DefaultModal show={modalState.show} massage={modalState.massage} handleModal={handleModal}/> 
                <form>
                    <input hidden="hidden" />
                    <img class="mb-4" src="assets/login_logo.png" alt="" width="200" height="auto"/>
                    <h1 class="h3 mb-3 fw-normal">Sign Up</h1>
                    <div class="form-floating">
                    <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" name='input_id' value={inputId} onChange={handleInputId}/>
                    <label for="floatingInput">Email address</label>
                    </div>
                    <div class="form-floating">
                    <input type="password" class="form-control" id="floatingPassword" placeholder="Password" name='input_pw' value={inputPw} onChange={handleInputPw}/>
                    <label for="floatingPassword">Password</label>
                    </div>
                    <div class="form-floating">
                    <input type="password" class="form-control" id="floatingPassword" placeholder="RePassword" name='re_pw' value={rePw} onChange={handleRePw}/>
                    <label for="floatingPassword">Re-password</label>
                    </div>
                    <div class="checkbox mb-3">
                    <label>
                        <input type="checkbox" value="remember-me"/> Remember me
                    </label>
                    </div>
                    <button class="w-100 btn btn-lg btn-primary" type="button" onClick={onClickSignUp}>Sign Up</button>
                    
                    <p class="mt-3 text-muted" onClick={onClickGoSignUp}><u>Click here to sign in.</u></p>
    
                    <p class="mt-5 mb-3 text-muted">&copy; 2017–2021</p>
                </form>
            </main>
        )
    }
 
}
 
export default SignUp;