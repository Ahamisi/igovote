import { View, Text, Image, TouchableOpacity, SafeAreaView, TextInput } from 'react-native'
import React, {useEffect, useState} from 'react';

const messages = ['Odogwu 🫶', 'Chairman 👊']
const Success = ({navigation,route}) => {

    const [Source, setSource] = useState('')


    useEffect(() => {
        if (route.params?.source) {
            setSource(route.params?.source)
          // Post updated, do something with `route.params.post`
          // For example, send the post to the server
        }
      }, [route.params?.source]);
    

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


                {
                    Source  == 'election-monitor' &&
                        <>

                        <View className="w-[100%] mb-[15px] flex justify-end">
                        <TouchableOpacity  onPress={() => navigation.push('MainMenu',{userDetail: 'user'}) } >
                                <View className="bg-[#008F43] px-[32px] py-[15px] rounded-[30px] text-[#fff] shadow-2xl">
                                    <Text className="text-white text-center text-[14px] font-bold" style={{fontFamily: 'Sora-Medium'}}>Go back home</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View className="w-[100%] mb-[15px] flex justify-end">
                            <TouchableOpacity  onPress={() => navigation.push('ElectionMonitor') } >
                                <View className="bg-[#008F43] px-[32px] py-[15px] rounded-[30px] text-[#fff] shadow-2xl">
                                    <Text className="text-white text-center text-[14px] font-bold" style={{fontFamily: 'Sora-Medium'}}>Add Another 😉</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        </>
                }

                {
                    Source  == 'live-updates' &&
                        <>

                        <View className="w-[100%] mb-[15px] flex justify-end">
                        <TouchableOpacity  onPress={() => navigation.push('HomeScreen',{userDetail: 'user'}) } >
                                <View className="bg-[#008F43] px-[32px] py-[15px] rounded-[30px] text-[#fff] shadow-2xl">
                                    <Text className="text-white text-center text-[14px] font-bold" style={{fontFamily: 'Sora-Medium'}}>Go back home</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View className="w-[100%] mb-[15px] flex justify-end">
                            <TouchableOpacity  onPress={() => navigation.push('LiveUpdates') } >
                                <View className="bg-[#008F43] px-[32px] py-[15px] rounded-[30px] text-[#fff] shadow-2xl">
                                    <Text className="text-white text-center text-[14px] font-bold" style={{fontFamily: 'Sora-Medium'}}>Check Updates</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        </>
                }











                {       
                    Source == '' &&
                    <View className="w-[100%] mb-[15px] flex justify-end">
                        <TouchableOpacity  onPress={() => navigation.push('MainMenu',{userDetail: 'user'}) } >
                            <View className="bg-[#008F43] px-[32px] py-[15px] rounded-[30px] text-[#fff] shadow-2xl">
                                <Text className="text-white text-center text-[14px] font-bold" style={{fontFamily: 'Sora-Medium'}}>Start using Igovote</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                }


                    





          

                </View>

            </View>
    // </SafeAreaView>
  )
}

export default Success