import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';




import HomeScreen from "./screens/HomeScreen";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import BeforeAuth from "./screens/BeforeAuth";
import ForgotPasswordScreen from "./screens/ForgotPassword";
import Success from "./screens/Success";
import OTPVerification from "./screens/OTPVerification";


const Stack = createNativeStackNavigator();
const screenOptions = {
    headerShown: false
}


export const SignedInStack = () =>{
    return(
        <NavigationContainer>
                <Stack.Navigator initialRouteName='HomeScreen'  screenOptions={screenOptions}>
                    <Stack.Screen name='HomeScreen' component={HomeScreen}/>
                    <Stack.Screen name='Success' component={Success}/>

                    {/* <Stack.Screen name='NewPostScreen' key="post" component={NewPostScreen}/> */}
                </Stack.Navigator>
        </NavigationContainer>
    )
}

export const SignedOutStack = () => {
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName='BeforeAuth' screenOptions={screenOptions}>
                <Stack.Screen name='BeforeAuth' component={BeforeAuth}/>
                <Stack.Screen name='Login' component={Login}/>
                <Stack.Screen name='Signup' component={Signup}/>
                <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen}/>
                <Stack.Screen name="OnboardVerify" component={OTPVerification}/>

            </Stack.Navigator>
        </NavigationContainer>
    )
}

