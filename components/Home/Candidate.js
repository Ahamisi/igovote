import { StyleSheet, Text, View, Image, TouchableOpacity, Pressable } from 'react-native'
import React from 'react';
const imageUrl = "https://images.unsplash.com/photo-1526045612212-70caf35c14df";

import Education from '../../assets/icons/knowledge.png';
import Gender from '../../assets/icons/gender.png';





const Candidate = ({candidate}) => {
  return (
    <View style={{marginBottom:5}}>
        <View className="max-w-full w-auto mr-4">
                <View className="relative flex flex-col min-w-0 break-words border-0 shadow-soft-xl rounded-2xl bg-clip-border">
                    <View className="relative">
                        <View className="block shadow-xl rounded-2xl w-[100%]">
                            <Image className="max-w-full shadow-soft-2xl rounded-2xl h-auto w-[100%]" source={require('../../assets/candidates/peter-obi.jpg')} />
                        </View>
                    </View>
                    <View className="flex-auto mt-[0px] bg-slate py-[10px]">
                        <View className="flex mb-[0px]">
                            {/* gender */}
                            <View className="flex flex-row justify-between">
                                    <Text className="font-bold text-slate-800 text-[16px]">{candidate.candidate_name}</Text>
                                    <View className=" flex flex-row items-center justify-center gap-[3px]">
                                        <View className="bg-[#d1fae5] shadow-2xl rounded-md flex items-center justify-center">
                                            <Text className="text-xs text-[#009244] font-normal text-[12px] px-[10px] py-[5px]">{candidate.gender}</Text>
                                        </View>
                                        <Image className="ml-[5px] h-[30px] w-[30px]" source={require('../../assets/party/pdp.png')}/>

                                    </View>
                            </View>
                            {/* qualifications                             */}
                           <View className="flex flex-row">
                                <View className=" flex flex-row items-center justify-center gap-[3px]">
                                    <Image className="h-[30px] w-[30px]" source={require('../../assets/icons/knowledge.png')}/>
                                    <View className="bg-[#009244] shadow-2xl rounded-md flex items-center justify-center">
                                        <Text className="text-xs text-[#fff] font-bold text-[12px] px-[10px] py-[5px]">{candidate.qualifications}</Text>
                                    </View>
                                </View>
                           </View>

                        </View>
                    </View>
                </View>
        </View>
    </View>
    
  )
}

















export default Candidate

const styles = StyleSheet.create({
    icon: {
        width: 250,
        height: 200,
        marginLeft: 10,
        resizeMode: 'contain'
    },
})