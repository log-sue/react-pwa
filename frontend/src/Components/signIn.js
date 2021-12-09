import React, { useState } from 'react';
import axios from 'axios';
import { SignUp } from './'
 
function SignIn() {
    
    const [signUp, setSignUp] = useState(false)
    const [inputId, setInputId] = useState('')
    const [inputPw, setInputPw] = useState('')
 
    const handleInputId = (e) => {
        setInputId(e.target.value)
    }
 
    const handleInputPw = (e) => {
        setInputPw(e.target.value)
    }
 
    // id, passwd => msg, userId, sessionId
    // Success or failure errors are determined as msg, and the session ID and user ID are stored in the session storage, and used for user authentication.
    const onClickSignIn = () => {
        axios.post('http://localhost:4000/user/signIn', 
        {
            'id': inputId,
            'pw': inputPw
        }, 
        {
            withCredentials: true
        })
        .then(res => {
            if(res.data.msg === undefined){
                alert(res.data.userId)
                sessionStorage.setItem('userId', res.data.userId)
                sessionStorage.setItem('sessionId', res.data.sessionId)
            } else {
                alert(res.data.msg)
            }
            document.location.href = '/'
        })
        .catch()
    }

    const onClickGoSignUp = () => {
        setSignUp(true)
    }

    if(signUp){
        return <SignUp />
    }
    else{
        return(
            <main class="form-signin">
                <form>
                    <input hidden="hidden" />
                    <img class="mb-4" src="assets/login_logo.png" alt="" width="200" height="auto"/>
                    <h1 class="h3 mb-3 fw-normal">Sign In</h1>
                    <div class="form-floating">
                    <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" name='input_id' value={inputId} onChange={handleInputId}/>
                    <label for="floatingInput">Email address</label>
                    </div>
                    <div class="form-floating">
                    <input type="password" class="form-control" id="floatingPassword" placeholder="Password" name='input_pw' value={inputPw} onChange={handleInputPw}/>
                    <label for="floatingPassword">Password</label>
                    </div>
                    <div class="checkbox mb-3">
                    <label>
                        <input type="checkbox" value="remember-me"/> Remember me
                    </label>
                    </div>
                    <button class="w-100 btn btn-lg btn-primary" type="button" onClick={onClickSignIn}>Sign In</button>
                    
                    <p class="mt-3 text-muted" onClick={onClickGoSignUp}><u>Click here to sign up.</u></p>
    
                    <p class="mt-5 mb-3 text-muted">&copy; 2017–2021</p>
                </form>
            </main>
        )
    }
 
}
 
export default SignIn;