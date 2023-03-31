import { View, Text, Image, TouchableOpacity, SafeAreaView } from 'react-native'
import React, {useEffect, useState} from 'react';
import { Auth } from 'aws-amplify';
import { A } from '@expo/html-elements';








const BeforeAuth = ({navigation}) => {
const [currentUser, setcurrentUser] = useState(null)
const userHandler = user => user ? setcurrentUser(user) : setcurrentUser(null)

useEffect(() => {
Auth.currentAuthenticatedUser({
    bypassCache: false // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
  })
    .then((user) => {
        userHandler(user)
        user ?  navigation.push('MainMenu',{userDetail: user})
        : ''

    })
    .catch((err) => console.log(err));
    

}




, [])
  return (
    <SafeAreaView className="bg-[#008F43]">
        {/* <View className="bg-red-600 p-[10]">
            <Text className="text-white text-left ">
                Disclaimer, we're in no way affiliated with any government entity
            </Text>
        </View> */}
            <View className="bg-[#ffffff] pt-[10%] h-full relative">
                <View className=" bg-white rounded-[20px] mx-auto h-[40%] w-[80%] items-center">
                    <View className="items-center justify-center my-auto">
                        <Image className="h-[200px] w-[200px]" source={require('../assets/app/igv-power.png')} />
                    </View>
                </View>
                <View className="mb-[30px]">
                    <Text className="text-[30px] text-[#000] font-extrabold text-center" style={{fontFamily: 'Sora-Bold'}}>Welcome to IGOVOTE</Text>
                    <Text className="text-center" style={{fontFamily: 'Sora-Light'}}>enriching the voting experience !!!</Text>
                </View>
                <View className="">
                    <TouchableOpacity className="w-[70%] mx-auto my-[10px]" onPress={() => navigation.push('Login') }>
                        <View className="bg-[#008F43] px-[32px] py-[15px] rounded-[25px] text-[#fff] shadow-2xl shadow-black-300">
                            <Text className="text-white text-center text-[18px] font-bold" style={{fontFamily: 'Sora-Light'}}>Login</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity className="w-[70%] mx-auto my-[10px]" onPress={() => navigation.push('Signup') }>
                        <View className="bg-white border-[#008F43] px-[32px] py-[15px] rounded-[30px] text-[#fff] shadow-2xl">
                            <Text className="text-[#008F43] text-center text-[18px] font-bold" style={{fontFamily: 'Sora-Light'}}>Create Account</Text>
                        </View>
                    </TouchableOpacity>

                </View>



            <View className="flex-end absolute bottom-2 w-[100%] mx-auto items-center">
                    <View className="mb-[15px] mx-auto flex flex-row items-center justify-center w-[80%]">
                        <Text className="text-[#3c3b3b] text-center" style={{fontFamily: 'Sora-light'}}>By tapping create account and using Igovote you agree to our <Text className="text-[#008F43]"><A href='https://igovote.org/terms-of-service/'>Terms of Service</A></Text> and <Text className="text-[#008F43]"><A href='https://igovote.org/privacy-policy'>Privacy Policy</A></Text></Text>
                        {/* <Text className="font-bold text-[#008F43] text-center">Sign Up</Text> */}
                    </View>
            </View>












            </View>


           
    </SafeAreaView>
  )
}

export default BeforeAuth