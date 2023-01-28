import { StatusBar } from 'expo-status-bar';
import {StyleSheet } from 'react-native';
import { useState, useEffect } from 'react'
import * as React from 'react';
// import Amplify from 'aws-amplify';
import Amplify from "@aws-amplify/core"
// import { Authenticator } from '@aws-amplify/ui-react';
//  import { SignIn, withAuthenticator } from 'aws-amplify-react-native';

import config from './src/aws-exports';




import AuthNavigation from './authNavigation';
import { Auth } from 'aws-amplify';
import '@azure/core-asynciterator-polyfill'




Amplify.configure(config);


function App() {

  const [LoggedIn, setLoggedIn] = useState(false);

  const accessLoggedInState = () =>{
    Auth.currentAuthenticatedUser()
      .then(
        sess => {
          console.log('logged ins')
          setLoggedIn(true)
        }
      )
      .catch(() => {
        console.log('not logged in')
        setLoggedIn(false)
      })
  }


  useEffect(() => {
    console.log('Im always running')
    accessLoggedInState()
  }, [])

  return (
      <AuthNavigation LoggedIn={LoggedIn}/>   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eeeeee',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 0,
    padding: 0
  },
});


// export default withAuthenticator(App)
export default App

