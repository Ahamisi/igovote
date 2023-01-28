import { StyleSheet, Text, View, Image, TouchableOpacity, Pressable } from 'react-native'
import React from 'react';

// import Education from '../../../assets/icons/knowledge.png';

// import Gender from '../../../assets/icons/gender.png';

import Education from '../../../assets/icons/knowledge.png'
import Gender from '../../../assets/icons/gender.png'


const Candidate = ({candidate,navigation,type}) => {



    const navigateToDetails = () =>{
        console.log(candidate,'press')
        navigation.navigate({
            name: 'CandidateDetail',
            params: { candidateData: candidate },
            merge: true,
          });
    }



  return (
    <TouchableOpacity onPress={navigateToDetails}>



<View style={{marginBottom:5}}>
        <View className="max-w-full w-auto mr-4">
                <View className="relative flex flex-col min-w-0 break-words border-0 shadow-soft-xl rounded-2xl bg-clip-border">
                    <View className="relative">
                        <View className="block shadow-xl rounded-2xl w-[100%]">
                            {
                                type == 'president' ? (candidate?.gender?.S.toLowerCase() == 'm' ? <Image className="h-[340px] shadow-soft-2xl rounded-2xl  w-[100%]" source={require('../../../assets/candidates/president-m.png')} /> : <Image className="h-[340px] shadow-soft-2xl rounded-2xl w-[100%]" source={require('../../../assets/candidates/president-f.png')} />  ): ''
                            }
                            {
                                type == 'governor' ? (candidate?.gender?.S.toLowerCase() == 'm' ? <Image className="h-[340px] shadow-soft-2xl rounded-2xl  w-[100%]" source={require('../../../assets/candidates/governor-m.png')} /> : <Image className="h-[340px] shadow-soft-2xl rounded-2xl w-[100%]" source={require('../../../assets/candidates/governor-f.png')} />  ): ''
                            }
                            {
                                type == 'senator' ? (candidate?.gender?.S.toLowerCase() == 'm' ? <Image className="h-[340px] shadow-soft-2xl rounded-2xl  w-[100%]" source={require('../../../assets/candidates/senator-m.png')} /> : <Image className="h-[340px] shadow-soft-2xl rounded-2xl w-[100%]" source={require('../../../assets/candidates/senator-f.png')} />  ): ''
                            }
                            {
                                type == 'hor' ? (candidate?.gender?.S.toLowerCase() == 'm' ? <Image className="h-[340px] shadow-soft-2xl rounded-2xl  w-[100%]" source={require('../../../assets/candidates/hor-m.png')} /> : <Image className="h-[340px] shadow-soft-2xl rounded-2xl w-[100%]" source={require('../../../assets/candidates/hor-f.png')} />  ): ''
                            }
                            {
                                type == 'hoa' ? (candidate?.gender?.S.toLowerCase() == 'm' ? <Image className="h-[340px] shadow-soft-2xl rounded-2xl  w-[100%]" source={require('../../../assets/candidates/hoa-m.png')} /> : <Image className="h-[340px] shadow-soft-2xl rounded-2xl w-[100%]" source={require('../../../assets/candidates/hoa-f.png')} />  ): ''
                            }
                            
                        </View>
                    </View>
                    <View className="flex-auto mt-[0px] bg-slate py-[10px]">
                        <View className="flex mb-[0px]">
                            {/* gender */}
                            <View className="flex flex-row justify-between items-center gap-4">
                                {
                                    candidate && candidate?.candidate_name && candidate?.candidate_name?.S &&
                                        <Text className="font-bold text-slate-800 text-[16px]">{candidate.candidate_name.S.substring(0,30)} {candidate.candidate_name.S > 30 ? '...' : ''}</Text>

                                }
                                {
                                        candidate && candidate?.cadidate_name  && candidate?.cadidate_name?.S &&
                                             <Text className="font-bold text-slate-800 text-[16px]">{candidate.cadidate_name.S.substring(0,30)} {candidate.cadidate_name.S > 30 ? '...' : ''}</Text>

                                }
                                    <View className=" flex flex-row items-center justify-center gap-[3px] ">
                                        <View className="bg-[#d1fae5] shadow-2xl rounded-md flex items-center justify-center">
                                            <Text className="text-xs text-[#009244] font-normal text-[12px] px-[10px] py-[5px]">{candidate?.gender?.S}</Text>
                                        </View>
                                        {/* <Image className="ml-[5px] h-[30px] w-[30px]" source={require('../../assets/party/pdp.png')}/> */}

                                    </View>
                            </View>
                            {/* qualifications                             */}
                           <View className="flex flex-row">
                                {/* <View className=" flex flex-row items-center justify-center gap-[3px]">
                                    <Image className="h-[30px] w-[30px]" source={require('../../../assets/icons/knowledge.png')}/>
                                    <View className="bg-[#009244] shadow-2xl rounded-md flex items-center justify-center">
                                        {
                                            candidate && candidate?.qualifications ? 
                                                <Text className="text-xs text-[#fff] font-bold text-[12px] px-[10px] py-[5px]">{candidate.qualifications.S.substring(0,20)} {candidate.qualifications.S > 20 ? '...' : ''}</Text>
                                            :
                                            <Text className="text-xs text-[#fff] font-bold text-[12px] px-[10px] py-[5px]">None</Text>

                                        }
                                        
                                    </View>
                                </View> */}


                    
                                    <View className="bg-[#009244] shadow-2xl rounded-md flex items-center justify-center">

                                        {candidate && candidate?.position ?
                                                    <Text className="text-xs text-[#fff] font-bold text-[12px] px-[10px] py-[5px]">{candidate?.position?.S }&nbsp;</Text>  
                                        : '' } 
                                        </View>

                                        

                                


                                
                                            <View className="bg-[#009244] shadow-2xl rounded-md flex items-center justify-center ml-[5px]">
                                                {candidate && candidate?.constituency ?

                                                    <Text className="text-xs text-[#fff] font-bold text-[12px] px-[10px] py-[5px]">{candidate?.constituency?.S }</Text>  
                                                    : '' } 
                                           
                                            </View>
                                    
                           </View>

                        </View>
                    </View>
                </View>
        </View>
    </View>






    </TouchableOpacity>
    
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