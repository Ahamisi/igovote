import { StyleSheet, Text, View, Image, TouchableOpacity, Pressable } from 'react-native'
import React from 'react';
import Education from '../../../assets/icons/knowledge.png'
import Gender from '../../../assets/icons/gender.png'
import ImagePlaceholder from 'react-native-image-with-placeholder';


const CandidateByPosition = ({candidate,navigation,type, extraData, filterBy = 'party'}) => {



    const navigateToDetails = () =>{
        navigation.navigate({
            name: 'CandidateDetail',
            params: { candidateData: candidate, extraData: extraData,  more: true },
            merge: true,           
          });
    }



  return (
    <TouchableOpacity onPress={navigateToDetails} className="flex">



        <View style={{marginBottom:10}} >
                <View className={`max-w-full ${filterBy === 'position' ? 'w-[100%] h-auto' : 'w-auto'}`}>
                        <View className="flex flex-row gap-[18px]">
                            {/* image */}
                            <View className="h-[120px]">
                            {
                                        type == 'president' &&  candidate?.image?.S  ?
                                        <ImagePlaceholder 
                                                        style={{ flex: 1, height: 120, width: 120, borderRadius: 1000}}
                                                        duration={1000}
                                                        className="rounded-full"
                                                        activityIndicatorProps={{
                                                            size: 'large',
                                                            color: 'green',
                                                        }}
                                                        imageStyle={{borderRadius: 1000}}
                                                        useNativeDriver={true}
                                                        src={candidate?.image?.S}
                                                        placeholder={candidate?.image?.S}
                                        />
                                        : <>
                                        
                                        {

                                            candidate?.image?.S &&
                                            <ImagePlaceholder 
                                                style={{ flex: 1, height: 120, width: 120, borderRadius: 1000}}
                                                duration={1000}
                                                activityIndicatorProps={{
                                                    size: 'large',
                                                    color: 'green',
                                                }}
                                                imageStyle={{borderRadius: 1000}}

                                                useNativeDriver={true}
                                                src={candidate?.image?.S}
                                                placeholder={candidate?.image?.S}
                                                />
                                            }
                                            {
                                            type == 'president' && !candidate?.image?.S  ? (candidate?.gender?.S.toLowerCase() == 'm' ? <Image className="h-[120px] w-[120px] rounded-full  shadow-soft-2xl " source={require('../../../assets/candidates/president-m.png')} /> : <Image className="h-[120px] w-[120px] rounded-full  shadow-soft-2xl  " source={require('../../../assets/candidates/president-f.png')} />  ): ''
                                            }
                                            {
                                            type == 'governor' && !candidate?.image?.S  ? (candidate?.gender?.S.toLowerCase() == 'm' ? <Image className="h-[120px] w-[120px] rounded-full  shadow-soft-2xl  " source={require('../../../assets/candidates/governor-m.png')} /> : <Image className="h-[120px] w-[120px] rounded-full  shadow-soft-2xl  " source={require('../../../assets/candidates/governor-f.png')} />  ): ''
                                            }
                                            {
                                            type == 'senator' && !candidate?.image?.S ? (candidate?.gender?.S.toLowerCase() == 'm' ? <Image className="h-[120px] w-[120px] rounded-full  shadow-soft-2xl " source={require('../../../assets/candidates/senator-m.png')} /> : <Image className="h-[120px] w-[120px] rounded-full  shadow-soft-2xl  " source={require('../../../assets/candidates/senator-f.png')} />  ): ''
                                            }
                                            {
                                            type == 'hor' && !candidate?.image?.S ? (candidate?.gender?.S.toLowerCase() == 'm' ? <Image className="h-[120px] w-[120px] rounded-full  shadow-soft-2xl   " source={require('../../../assets/candidates/hor-m.png')} /> : <Image className="h-[120px] w-[120px] rounded-full  shadow-soft-2xl  " source={require('../../../assets/candidates/hor-f.png')} />  ): ''
                                            }
                                            {
                                            type == 'hoa' && !candidate?.image?.S ? (candidate?.gender?.S.toLowerCase() == 'm' ? <Image className="h-[120px] w-[120px] rounded-full  shadow-soft-2xl  " source={require('../../../assets/candidates/hoa-m.png')} /> : <Image className="h-[120px] w-[120px] rounded-full  shadow-soft-2xl " source={require('../../../assets/candidates/hoa-f.png')} />  ): ''
                                            }
                                        </>

                                    }            
                            </View>

                            {/* text */}

                            <View className=" mt-[0px] bg-slate py-[10px]">
                                <View className="flex mb-[0px]">
                                    {/* nae */}
                                    <View className="flex flex-row justify-between items-center gap-4 mb-[2px]">
                                        {
                                            candidate && candidate?.candidate_name && candidate?.candidate_name?.S &&
                                                <Text style={{fontFamily: 'Sora-Bold'}} className="font-bold text-[#303437] text-[18px]">{candidate.candidate_name.S.substring(0,30)} {candidate.candidate_name.S > 30 ? '...' : ''}</Text>

                                        }
                                        {
                                                candidate && candidate?.cadidate_name  && candidate?.cadidate_name?.S &&
                                                    <Text style={{fontFamily: 'Sora-Bold'}} className="font-bold text-[#303437] text-[18px] pb-[2px]">{candidate.cadidate_name.S.substring(0,30)} {candidate.cadidate_name.S > 30 ? '...' : ''}</Text>

                                        }
                                            
                                    </View>

                                    {
                                        candidate && candidate?.position && candidate?.position?.S &&
                                        <View className="flex flex-row justify-between items-center gap-4 mb-[2px]">
                                            <Text style={{fontFamily: 'Sora-Light'}} className="font-normal leading-[20px] text-[16px] text-[#008F43]">{candidate.position.S.substring(0,30)} {candidate.position.S > 30 ? '...' : ''}Candidate</Text>

                                        </View>


                                    }

                                    
                                    
                                

                                    <View className=" flex flex-row items-center space-between mb-[2px]">
                                            
                                        
                                        
                                        { candidate.party.S == 'A' ? <Image className="h-[20px] w-[20px]" source={require('../../../assets/party/a.png')}/> :'' } 
                                            { candidate.party.S == 'AA' ? <Image className="h-[20px] w-[20px]" source={require('../../../assets/party/aa.png')}/> :'' }
                                            { candidate.party.S == 'AAC' ? <Image className="h-[20px] w-[20px]" source={require('../../../assets/party/aac.png')}/> :'' }
                                            { candidate.party.S == 'ADC' ? <Image className="h-[20px] w-[20px]" source={require('../../../assets/party/adc.png')}/> :'' }
                                            { candidate.party.S == 'ADP' ? <Image className="h-[20px] w-[20px]" source={require('../../../assets/party/adp.png')}/> :'' }
                                            { candidate.party.S == 'APC' ? <Image className="h-[20px] w-[20px]" source={require('../../../assets/party/apc.png')}/> :'' }
                                            { candidate.party.S == 'APGA' ? <Image className="h-[20px] w-[20px]" source={require('../../../assets/party/apga.png')}/> :'' }
                                            { candidate.party.S == 'APM' ? <Image className="h-[20px] w-[20px]" source={require('../../../assets/party/apm.png')}/> :'' }
                                            { candidate.party.S == 'APP' ? <Image className="h-[20px] w-[20px]" source={require('../../../assets/party/app.png')}/> :'' }
                                            { candidate.party.S == 'BP' ? <Image className="h-[20px] w-[20px]" source={require('../../../assets/party/bp.png')}/> :'' }
                                            { candidate.party.S == 'LP' ? <Image className="h-[20px] w-[20px]" source={require('../../../assets/party/lp.png')}/> :'' }
                                            { candidate.party.S == 'NNPP' ? <Image className="h-[20px] w-[20px]" source={require('../../../assets/party/nnpp.png')}/> :'' }
                                            { candidate.party.S == 'NRM' ? <Image className="h-[20px] w-[20px]" source={require('../../../assets/party/nrm.png')}/> :'' }
                                            { candidate.party.S == 'PDP' ? <Image className="h-[20px] w-[20px]" source={require('../../../assets/party/pdp.png')}/> :'' }
                                            { candidate.party.S == 'PRP' ? <Image className="h-[20px] w-[20px]" source={require('../../../assets/party/prp.png')}/> :'' }
                                            { candidate.party.S == 'SDP' ? <Image className="h-[20px] w-[20px]" source={require('../../../assets/party/sdp.png')}/> :'' }
                                            { candidate.party.S == 'YPP' ? <Image className="h-[20px] w-[20px]" source={require('../../../assets/party/ypp.png')}/> :'' }
                                            { candidate.party.S == 'ZLP' ? <Image className="h-[20px] w-[20px]" source={require('../../../assets/party/zlp.png')}/> :'' }
                                            <View className="p-[4px]">
                                            <Text className="text-[#404446] text-[16px] font-normal" style={{fontFamily: 'Sora-Light'}}>{candidate?.party?.S}</Text>
                                            </View>


                                            {
                                            candidate && candidate?.constituency &&

                                            <View className="rounded-[16px] py-[5px] px-[10px] border-[#008F43] border-[2px] shadow-2xl mb-[5px] ">
                                                <Text className="text-xs text-[#404446] text-[12px] leading-[15px] font-bold" style={{fontFamily: 'Sora-Light'}}>{candidate?.constituency?.S }</Text>
                                            </View>
                                            }
                                        
                                        
                                        

                                    </View>



                                    <View className=" flex flex-row items-center gap-[10px] mb-[2px]">
                                            
                                        <View className="rounded-[16px] py-[5px] px-[10px] border-[#008F43] border-[2px] shadow-2xl ">
                                            <Text className="text-xs text-[#404446] text-[12px] leading-[15px] font-bold" style={{fontFamily: 'Sora-Light'}}>{candidate?.gender?.S == 'M' ? 'Male' : 'Female'}</Text>
                                        </View>

                                        <View className="rounded-[16px] py-[5px] px-[10px] border-[#008F43] border-[2px] shadow-2xl">
                                            <Text className="text-xs text-[#404446] text-[12px] leading-[15px] font-bold" style={{fontFamily: 'Sora-Light'}}>{candidate?.age?.S } Years</Text>
                                        </View>


                                

                                    </View>

                                    {/* {
                                        candidate && candidate?.constituency ?
                                        <View className=" flex flex-row items-center gap-[10px] mb-[2px]">
                                            
                                                <View className="rounded-[16px] py-[5px] px-[10px] border-[#008F43] border-[2px] shadow-2xl ">
                                                    <Text className="text-xs text-[#404446] text-[12px] leading-[15px] font-bold">{candidate?.constituency?.S }</Text>
                                                </View>

                                            


                                

                                        </View>

                                            : ''
                                    }                       */}

                                            

                                </View>
                            </View>
                        </View>
                </View>
        </View>






    </TouchableOpacity>
    
  )
}

















export default CandidateByPosition

const styles = StyleSheet.create({
    icon: {
        width: 250,
        height: 200,
        marginLeft: 10,
        resizeMode: 'contain'
    },
})