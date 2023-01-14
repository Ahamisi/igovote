import { View, Text, Image, TouchableOpacity, SafeAreaView, TextInput } from 'react-native'
import React from 'react';

const messages = ['Odogwu 🫶', 'Agba 🙌', 'Chairman 👊', 'Chop 👊 Agba !!!']
const Success = () => {

  return (
            <View className="bg-[#eeeeee] pt-[20%] h-full">

                <View className="mx-auto">
                    <Image className="h-auto w-auto" source={require('../assets/app/success.png')} />

                </View>

                <View className=" bg-white rounded-[20px] mx-auto h-[50%] my-auto  w-[90%] px-[20px] py-[40px] items-center">

                <View className="my-[30px]">
                    <Text className="text-[30px] text-[#000] font-extrabold text-center">{messages[Math.floor((Math.random()*messages.length))]}</Text>
                    <Text className="text-center mt-[7px]">Na you be the real gee !!!</Text>
                </View>



                    <View className="w-[100%] mb-[15px] flex justify-end">
                        <TouchableOpacity className="">
                            <View className="bg-[#009244] px-[32px] py-[15px] rounded-[25px] text-[#fff] shadow-2xl">
                                <Text className="text-white text-center text-[18px] font-bold">Go Back Home</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

          

                </View>

            </View>
    // </SafeAreaView>
  )
}

export default Success