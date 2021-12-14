import React from 'react';
import { SignIn } from './Components'

function App() {

  // select css file
  document.getElementById('style-direction').href = '/css/signIn.css'
    
  // add body class
  document.getElementById('root').className = 'text-center';

  return <SignIn show={false} massage={''}/>

}

export default App;
