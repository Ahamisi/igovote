import { View, Text, Image, TouchableOpacity, SafeAreaView } from 'react-native'
import React from 'react';

const BeforeAuth = ({navigation}) => {
  return (
            <View className="bg-[#eeeeee] pt-[20%] h-full">
                <View className=" bg-white rounded-[20px] mx-auto h-[400px] w-[80%] items-center">
                    <View className="">
                        <Image className="h-auto w-auto" source={require('../assets/app/i-go-vote-circle.png')} />
                    </View>
                </View>
                <View className="my-[30px]">
                    <Text className="text-[30px] text-[#000] font-extrabold text-center">Welcome to IGOVOTE</Text>
                    <Text className="text-center">enriching the voting experience !!!</Text>
                </View>
                <View className=" bg-[#eeeeee]">
                    <TouchableOpacity className="w-[70%] mx-auto my-[10px]" onPress={() => navigation.push('Login') }>
                        <View className="bg-[#009244] px-[32px] py-[15px] rounded-[25px] text-[#fff] shadow-2xl shadow-black-300">
                            <Text className="text-white text-center text-[18px] font-bold">Login</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity className="w-[70%] mx-auto my-[10px]" onPress={() => navigation.push('Signup') }>
                        <View className="bg-[#009244] px-[32px] py-[15px] rounded-[25px] text-[#fff] shadow-2xl">
                            <Text className="text-white text-center text-[18px] font-bold">Register</Text>
                        </View>
                    </TouchableOpacity>

                </View>
            </View>
    // </SafeAreaView>
  )
}

export default BeforeAuth