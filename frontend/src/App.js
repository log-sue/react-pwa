import React, { useState, useEffect } from 'react';
import { SignIn } from './Components'
import { CheckWebModal } from './Components/modals';

function App() {

  // install modal state
  const [modalShow, setModalShow] = useState(false)

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (event) => {
      // If you access with a browser and it is not installed
      event.preventDefault();
      window.promptEvent = event;
      setModalShow(window.matchMedia('(display-mode: browser)').matches)
    });
  },[])

  // modal handler1 - show install prompt
  const handleModal1 = () =>{
    window.promptEvent.prompt();
    setModalShow(false)
  }

  // modal handler2
  const handleModal2 = () =>{
    setModalShow(false)
  }

  if (modalShow) {
    return(
      <CheckWebModal show={modalShow} handleModal1={handleModal1} handleModal2={handleModal2}/>
    )
  } 
  else{
    // select css file
    document.getElementById('style-direction').href = '/css/signIn.css'
      
    // add body class
    document.getElementById('root').className = 'text-center';

    return <SignIn show={false} massage={''}/>
  }

}

export default App;
