import { StyleSheet, Text, View, Image, TouchableOpacity, Pressable, SafeAreaView } from 'react-native'
import React, {useEffect, useState} from 'react'
import GoBack from '../../components/General/GoBack'
const CandidateDetail = ({navigation,route,candidate}) => {

    const [candidateD, setcandidateD] = useState('')



    useEffect(() => {
        if (route.params?.candidateData) {
            setcandidateD(route.params?.candidateData)
        }
      }, [route.params?.candidateData]);
    

  return (
    <SafeAreaView className="bg-[#009244]">
        <View style={{marginBottom:5}} className="bg-[#eeeeee] pt-[20%] h-full relative">
        <GoBack navigation={navigation}/>

                    <View className="w-[90%] mx-auto mr-4">
                            <View className="relative flex flex-col min-w-0 break-words border-0 shadow-soft-xl rounded-2xl bg-clip-border">
                                <View className="relative">
                                    <View className=" shadow-xl rounded-2xl w-[100%] flex items-center">
                                        <Image className="max-w-full shadow-soft-2xl rounded-2xl h-auto w-auto" source={require('../../assets/candidates/hoa-m.png')} />
                                    </View>
                                </View>
                                <View className="flex-auto mt-[0px] bg-slate py-[10px]">
                                    <View className="flex mb-[0px]">
                                        {/* gender */}
                                        <View className="flex flex-row max-w-[100%] justify-between items-center gap-4">
                                            {
                                                candidateD && candidateD?.candidate_name && candidateD?.candidate_name?.S &&
                                                    <Text className="font-bold text-slate-800 text-[16px]">{candidateD.candidate_name.S}</Text>

                                            }
                                            {
                                                    candidateD && candidateD?.cadidate_name  && candidateD?.cadidate_name?.S &&
                                                        <Text className="font-bold text-slate-800 text-[16px]">{candidateD.cadidate_name.S}</Text>

                                            }


                                                <View className=" flex flex-row items-center justify-center gap-[3px] ">
                                                    <View className="bg-[#d1fae5] shadow-2xl rounded-md flex items-center justify-center">

                                                        <Text className="text-xs text-[#009244] font-normal text-[12px] px-[10px] py-[5px]">Gender: {candidateD?.gender?.S}</Text>
                                                    </View>
                                                    {/* <Image className="ml-[5px] h-[30px] w-[30px]" source={require('../../assets/party/pdp.png')}/> */}

                                                </View>
                                        </View>
                                        {/* qualifications                             */}
                                    <View className="">
                                            <View className=" flex flex-col items-left justify-left gap-[3px] mt-[14px]">
                                                <View className="bg-[#009244] shadow-2xl rounded-md flex flex-row items-left justify-left">
                                                    <View className="flex items-center justify-center ml-[2px]">
                                                        <Image className="h-[20px] w-[20px]" source={require('../../assets/icons/knowledge-white.png')}/>
                                                    </View>

                                                    {
                                                        candidateD && candidateD?.qualifications ? 
                                                            <Text className="text-xs text-[#fff] font-bold text-[12px] px-[10px] py-[5px]">{candidateD.qualifications.S} </Text>
                                                        : ''

                                                    }

                                                    
                                                </View>


                                                <View className="bg-[#009244] shadow-2xl rounded-md flex items-left justify-left">
                                            
                                                    <Text className="text-xs text-[#fff] font-bold text-[12px] px-[10px] py-[5px]">Position: {candidateD?.position?.S}</Text>

                                                    
                                                </View>
                                                <View className="bg-[#009244] shadow-2xl rounded-md flex items-left justify-left">
                                            
                                                    <Text className="text-xs text-[#fff] font-bold text-[12px] px-[10px] py-[5px]">Age: {candidateD?.age?.S} Years</Text>

                                                    
                                                </View>
                                                {
                                                    candidateD?.constituency &&
                                                    <View className="bg-[#009244] shadow-2xl rounded-md flex items-left justify-left">
                                                        <Text className="text-xs text-[#fff] font-bold text-[12px] px-[10px] py-[5px]">Constituency: {candidateD?.constituency?.S}</Text>
                                                        
                                                    </View>
                                                }
                                                <View className="bg-[#009244] shadow-2xl rounded-md flex items-left justify-left">
                                            
                                                    <Text className="text-xs text-[#fff] font-bold text-[12px] px-[10px] py-[5px]">Disability: {candidateD?.pwd?.S}</Text>

                                                    
                                                </View>

                                                <View className="bg-red-700 shadow-2xl rounded-md flex items-left justify-left">
                                            
                                                    <Text className="text-xs text-[#fff] font-bold text-[12px] px-[10px] py-[5px]">Remarks: {candidateD?.remarks?.S}</Text>

                                                    
                                                </View>
                                            </View>
                                    </View>

                                    </View>
                                </View>
                            </View>
                    </View>
        </View>

    </SafeAreaView>
  )
}

export default CandidateDetail


const styles = StyleSheet.create({
    icon: {
        width: 250,
        height: 200,
        marginLeft: 10,
        resizeMode: 'contain'
    },
})