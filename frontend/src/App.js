import React, { useState, useEffect } from 'react';
import { SignIn, Main } from './Components'
import axios from 'axios';


function App() {

  const [isSignIn, setIsSignIn] = useState(false)

  // validate user & get image data
  useEffect(() => {
    if(sessionStorage.getItem('sessionId') != null){
      axios.post('http://localhost:4000/user/isSignIn',
      {
        'userId': sessionStorage.getItem('userId'), 
        'sessionId': sessionStorage.getItem('sessionId')
      },
      {
        withCredentials: true
      })
      .then(res => {
        if(res.data.msg === undefined){
          setIsSignIn(true)
        } else {
          alert(res.data.msg)
          sessionStorage.removeItem('id')
        }
      })
      .catch()
    }
  },[])


  if(isSignIn){

    // select css file
    document.getElementById('style-direction').href = '/css/main.css'

    return <Main />
  }
  else{

    // select css file
    document.getElementById('style-direction').href = '/css/signIn.css'
    
    // add body class
    document.getElementById('root').className = 'text-center';
    
    return <SignIn />
  }

}

export default App;
