import { StyleSheet, Text, View, Image, TouchableOpacity, Pressable } from 'react-native'
import React from 'react';
import Education from '../../../assets/icons/knowledge.png'
import Gender from '../../../assets/icons/gender.png'
import ImagePlaceholder from 'react-native-image-with-placeholder';


const CandidatePresidentOld = ({candidate,navigation,type, extraData, filterBy = 'party'}) => {



    const navigateToDetails = () =>{
        navigation.navigate({
            name: 'CandidateDetail',
            params: { candidateData: candidate, extraData: extraData,  more: true },
            merge: true,           
          });
    }



  return (
    <TouchableOpacity onPress={navigateToDetails} className="flex">



<View style={{marginBottom:5}} >
        <View className={`max-w-full ${filterBy === 'position' ? 'w-[50%] h-auto' : 'w-auto'} mr-4`}>
                <View className="relative flex flex-col min-w-0 break-words border-0 shadow-soft-xl rounded-2xl bg-clip-border">
                    <View className="relative">
                        <View className="block shadow-xl rounded-2xl w-[100%]">
                            
                            {
                                type == 'president' &&  candidate?.image?.S  ?
                                <ImagePlaceholder 
                                                style={{ flex: 1, height: 200, borderRadius: 40}}
                                                duration={1000}
                                                activityIndicatorProps={{
                                                    size: 'large',
                                                    color: 'green',
                                                }}
                                                useNativeDriver={true}
                                                src={candidate?.image?.S}
                                                placeholder={candidate?.image?.S}
                                />

                                // if(!candidate)
                                
                                // <Image className="h-[200px] shadow-soft-2xl rounded-2xl  w-[100%]" source={{uri: extraData?.image }} />
                                 : <Image className="h-[200px] shadow-soft-2xl rounded-2xl  w-[100%]" source={{uri: extraData?.image }} />

                            }                            
                        </View>
                    </View>
                    <View className="flex-auto mt-[0px] bg-slate py-[10px]">
                        <View className="flex mb-[0px]">
                            {/* gender */}
                            <View className="flex flex-row justify-between items-center gap-4">
                                {
                                    candidate && candidate?.candidate_name && candidate?.candidate_name?.S &&
                                        <Text className="font-bold text-slate-800 text-[16px] capitalize" style={{fontFamily: 'Sora-Bold'}}>{candidate.candidate_name.S.substring(0,20)} {candidate.candidate_name.S > 20 ? '...' : ''}</Text>

                                }
                                {
                                        candidate && candidate?.cadidate_name  && candidate?.cadidate_name?.S &&
                                             <Text className="font-bold text-slate-800 text-[16px] capitalize" style={{fontFamily: 'Sora-Bold'}}>{candidate.cadidate_name.S.substring(0,20)} {candidate.cadidate_name.S > 20 ? '...' : ''}</Text>

                                }
                                    <View className=" flex flex-row items-center justify-center gap-[3px] ">
                                        <View className="bg-[#d1fae5] shadow-2xl rounded-md flex items-center justify-center">
                                            <Text className="text-xs text-[#008F43] font-normal text-[12px] px-[10px] py-[5px]" style={{fontFamily: 'Sora-Bold'}} >{candidate?.gender?.S}</Text>
                                        </View>
                                        {
                                            filterBy == 'position' && 
                                            <View className="bg-[#008F43] rounded-lg p-[4px]">
                                                <Text className="text-white font-bold" style={{fontFamily: 'Sora-Light'}}>{candidate?.party?.S}</Text>
                                            </View>
                                        }
                                        
                                        {/* <Image className="ml-[5px] h-[30px] w-[30px]" source={require('../../assets/party/pdp.png')}/> */}

                                    </View>
                            </View>
                            {/* qualifications                             */}
                           <View className="flex flex-row">
                                {/* <View className=" flex flex-row items-center justify-center gap-[3px]">
                                    <Image className="h-[30px] w-[30px]" source={require('../../../assets/icons/knowledge.png')}/>
                                    <View className="bg-[#008F43] shadow-2xl rounded-md flex items-center justify-center">
                                        {
                                            candidate && candidate?.qualifications ? 
                                                <Text className="text-xs text-[#fff] font-bold text-[12px] px-[10px] py-[5px]">{candidate.qualifications.S.substring(0,20)} {candidate.qualifications.S > 20 ? '...' : ''}</Text>
                                            :
                                            <Text className="text-xs text-[#fff] font-bold text-[12px] px-[10px] py-[5px]">None</Text>

                                        }
                                        
                                    </View>
                                </View> */}


                    
                                    <View className="bg-[#008F43] shadow-2xl rounded-md flex items-center justify-center">

                                        {candidate && candidate?.position ?
                                                    <Text className="text-xs text-[#fff] font-bold text-[12px] px-[10px] py-[5px]" style={{fontFamily: 'Sora-Bold'}}>{candidate?.position?.S }&nbsp;</Text>  
                                        : '' } 
                                        </View>

                                        

                                


                                
                                            <View className="bg-[#008F43] shadow-2xl rounded-md flex items-center justify-center ml-[5px]">
                                                {candidate && candidate?.constituency ?

                                                    <Text className="text-xs text-[#fff] font-bold text-[12px] px-[10px] py-[5px]" style={{fontFamily: 'Sora-Bold'}}>{candidate?.constituency?.S }</Text>  
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

















export default CandidatePresidentOld

const styles = StyleSheet.create({
    icon: {
        width: 250,
        height: 200,
        marginLeft: 10,
        resizeMode: 'contain'
    },
})