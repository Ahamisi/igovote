import { View, Text } from 'react-native'
import React, {useEffect, useState} from 'react';
import { SignedInStack, SignedOutStack } from './navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Auth } from 'aws-amplify';

const AuthNavigation = ({LoggedIn}) => {

    const [currentUser, setcurrentUser] = useState(null)
    const userHandler = user => user ? setcurrentUser(user)  : setcurrentUser(null)

 useEffect(() => {
    Auth.currentAuthenticatedUser({
        bypassCache: false // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
      })
        .then((user) => {
          AsyncStorage.setItem('@userData', JSON.stringify(user));
          userHandler(user)
        }) 
        .catch((err) => console.log(err));
        
 }



 
, [])
    


    return(

       <>
            {/* { currentUser ? <SignedInStack/> : <SignedOutStack/> } */}
             <SignedInStack LoggedIn={LoggedIn} currentUser={currentUser}/> 

       </>
        
    )

}

export default AuthNavigation