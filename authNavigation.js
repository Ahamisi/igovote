import { View, Text } from 'react-native'
import React, {useEffect, useState} from 'react';
import { SignedInStack, SignedOutStack } from './navigation';

import { Auth } from 'aws-amplify';

const AuthNavigation = () => {

    const [currentUser, setcurrentUser] = useState(null)
    const userHandler = user => user ? setcurrentUser(user) : setcurrentUser(null)

 useEffect(() => {
    Auth.currentAuthenticatedUser({
        bypassCache: false // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
      })
        .then((user) => userHandler(user))
        .catch((err) => console.log(err));
 }
 
, [])
    


    return(

       <>
            { currentUser ? <SignedInStack/> : <SignedOutStack/> }

       </>
        
    )

}

export default AuthNavigation