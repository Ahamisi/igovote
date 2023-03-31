import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text } from 'react-native';
import { useState, useEffect } from 'react'
import * as React from 'react';
// import Amplify from 'aws-amplify';
import Amplify from "@aws-amplify/core"
// import { Authenticator } from '@aws-amplify/ui-react';
//  import { SignIn, withAuthenticator } from 'aws-amplify-react-native';

import config from './src/aws-exports';

import { useIsConnected } from 'react-native-offline';
import {NetworkConsumer} from 'react-native-offline';
import { NetworkProvider } from 'react-native-offline';





import AuthNavigation from './authNavigation';
import { Auth } from 'aws-amplify';
import '@azure/core-asynciterator-polyfill'
import Offline from './screens/Offline';



// all we need for fonts
import { useCallback } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';






Amplify.configure(config);


function App() {

  const [fontsLoaded] = useFonts({
    'Sora-Medium': require('./assets/fonts/sora/Sora-Regular.ttf'),
    'Sora-Bold': require('./assets/fonts/sora/Sora-Bold.ttf'),
    'Sora-Light': require('./assets/fonts/sora/Sora-Light.ttf'),


  });
  
  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  if (!fontsLoaded) {
    // return null;
  } 
  else {
    SplashScreen.hideAsync();
  }

  const [LoggedIn, setLoggedIn] = useState(false);

  const accessLoggedInState = () =>{
    Auth.currentAuthenticatedUser()
      .then(
        sess => {
          setLoggedIn(true)
        }
      )
      .catch(() => {
        setLoggedIn(false)
      })
  }


  useEffect(() => {
    accessLoggedInState()
  }, [])

  return (
    <AuthNavigation LoggedIn={LoggedIn}/>   

  //  <NetworkProvider>
  //    <NetworkConsumer>
  //   {({ isConnected }) =>
  //     isConnected ? (
  //       <AuthNavigation LoggedIn={LoggedIn}/>   
  //       ) : (
  //         <Offline/>
  //         )
  //   }
  // </NetworkConsumer>
  //  </NetworkProvider>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 0,
    padding: 0
  },
});


// export default withAuthenticator(App)
export default App

