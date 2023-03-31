import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';




import HomeScreen from "./screens/HomeScreen";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import BeforeAuth from "./screens/BeforeAuth";
import ForgotPasswordScreen from "./screens/ForgotPassword";
import Success from "./screens/Success";
import OTPVerification from "./screens/OTPVerification";
import CandidateDetail from "./screens/CandidateDetailsScreen/CandidateDetail";
import EditProfile from "./screens/User/EditProfile";
import ElectionMonitors from "./screens/User/ElectionMonitor";
import LiveUpdates from "./screens/User/LiveUpdates";
import OfflineNotice from './components/General/OfflineNotice';
import CameraScreen from './screens/User/Camera';
import CreateVideo from './screens/User/RecordVideoScreen/CreateVideo';
import VoiceRecord from './screens/User/VoiceRecord.js';
import CreateRecording from './screens/User/RecordVideoScreen/CreateRecording';
import PresidentialResults from './screens/PresidentialResults';
import PuLocator from './screens/User/PuLocator';
import MainMenu from './screens/MainMenu';


const Stack = createNativeStackNavigator();
const screenOptions = {
    headerShown: false
}



export const SignedInStack = ({LoggedIn, currentUser}) =>{
    return(
        <>
            <OfflineNotice/>
            <NavigationContainer>
                {/* {console.log(currentUser,LoggedIn,'sidii')} */}
                {/* {
                    setUserSub(currentUser.attributes.sub)
                } */}
                    <Stack.Navigator initialRouteName={currentUser ? 'MainMenu' : 'BeforeAuth' }  screenOptions={screenOptions}>
                        <Stack.Screen name='MainMenu' component={MainMenu}/>
                        <Stack.Screen name='HomeScreen' component={HomeScreen}/>
                        <Stack.Screen name='Success' component={Success}/>
                        <Stack.Screen name='CandidateDetail' component={CandidateDetail}/>
                        <Stack.Screen name='Profile' component={EditProfile}/>
                        <Stack.Screen name='ElectionMonitor' component={ElectionMonitors}/>
                        <Stack.Screen name='LiveUpdates' component={LiveUpdates}/>
                        <Stack.Screen name='BeforeAuth' component={BeforeAuth}/>
                        <Stack.Screen name='Login' component={Login}/>
                        <Stack.Screen name='Signup' component={Signup}/>
                        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen}/>
                        <Stack.Screen name="OnboardVerify" component={OTPVerification}/>
                        <Stack.Screen name="Camera" component={CameraScreen}/>
                        <Stack.Screen name="CreateVideo" component={CreateVideo}/>
                        <Stack.Screen name="VoiceRecord" component={VoiceRecord}/>
                        <Stack.Screen name="CreateRecording" component={CreateRecording}/>
                        <Stack.Screen name="PresidentialResults" component={PresidentialResults}/>
                        <Stack.Screen name="PuLocator" component={PuLocator}/>






                    </Stack.Navigator>
            </NavigationContainer>
        </>
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

