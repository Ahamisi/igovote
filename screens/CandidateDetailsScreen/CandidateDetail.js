import { StyleSheet, Text, View, Image, TouchableOpacity, Pressable, SafeAreaView, ScrollView, ActivityIndicator} from 'react-native'

import React, {useEffect, useState} from 'react'
import GoBack from '../../components/General/GoBack'
import ImagePlaceholder from 'react-native-image-with-placeholder'

const CandidateDetail = ({navigation,route,candidate}) => {

    const [candidateD, setcandidateD] = useState('')
    const [extraData, setextraData] = useState('')




    useEffect(() => {
        if (route.params?.candidateData) {
            setcandidateD(route.params?.candidateData)
            route.params?.extraData ? setextraData(route.params?.extraData) : ''
            console.log(extraData.readMore)
        }
      }, [route.params?.candidateData]);
    

  return (
    <SafeAreaView className="bg-[#009244]">
        <View style={{marginBottom:5}} className="bg-[#eeeeee] pt-[18%] h-full relative">
        <GoBack navigation={navigation}/>

            <ScrollView>
            <View className="w-[100%] py-[20px] rounded-xl px-[20px] mr-4 bg-white">
                            <View className="relative flex flex-col min-w-0 break-words border-0 shadow-soft-xl rounded-2xl bg-clip-border">
                                <View className="relative">
                                    <View className=" shadow-xl rounded-2xl w-[100%] flex items-center">
                                        {
                                            extraData ? 
                                            <ImagePlaceholder 
                                                style={{ flex: 1, height: 340, borderRadius: 40, width: 'auto' }}
                                                duration={1000}
                                                activityIndicatorProps={{
                                                    size: 'large',
                                                    color: 'green',
                                                }}
                                                useNativeDriver={true}
                                                src={extraData?.image}
                                                placeholder={extraData?.image}
                                                />
                                            //  <Image className="h-[340px] shadow-soft-2xl rounded-2xl  w-[100%]" source={{uri: extraData?.image }}   PlaceholderContent={<ActivityIndicator />}/> 
                                             :
                                            (candidateD?.image?.S  ? 
                                                <ImagePlaceholder 
                                                style={{ flex: 1, height: 340, borderRadius:40, width: 'auto' }}
                                                duration={1000}
                                                activityIndicatorProps={{
                                                    size: 'large',
                                                    color: 'green',
                                                }}
                                                useNativeDriver={true}
                                                src={candidateD?.image?.S}
                                                placeholder={candidateD?.image?.S}
                                                />
                                            // <Image className="h-[340px] shadow-soft-2xl rounded-2xl  w-[100%]" source={{uri: candidateD?.image?.S }}   PlaceholderContent={<ActivityIndicator />}/>
                                            
                                            : <Image className="max-w-full shadow-soft-2xl rounded-2xl h-auto w-auto" source={require('../../assets/candidates/hoa-m.png')} />)
                                            
                                        }
                                    </View>
                                </View>
                                <View className="flex-auto mt-[0px] bg-slate py-[10px]">
                                    <View className="flex mb-[0px]">
                                        {/* gender */}
                                        <View className="flex flex-row max-w-[100%] justify-between items-center gap-4">
                                            {
                                                candidateD && candidateD?.candidate_name && candidateD?.candidate_name?.S &&
                                                    <Text className="font-bold text-slate-800 text-[16px]" style={{fontFamily: 'Sora-Bold'}}>{candidateD.candidate_name.S}</Text>

                                            }
                                            {
                                                    candidateD && candidateD?.cadidate_name  && candidateD?.cadidate_name?.S &&
                                                        <Text className="font-bold text-slate-800 text-[16px]" style={{fontFamily: 'Sora-Bold'}}>{candidateD.cadidate_name.S}</Text>

                                            }


                                                <View className=" flex flex-row items-center justify-center gap-[3px] ">
                                                    <View className="bg-[#d1fae5] shadow-2xl rounded-md flex items-center justify-center">

                                                        <Text className="text-xs text-[#009244] font-normal text-[12px] px-[10px] py-[5px]" style={{fontFamily: 'Sora-Bold'}}>Gender: {candidateD?.gender?.S}</Text>
                                                    </View>
                                                    {/* <Image className="ml-[5px] h-[30px] w-[30px]" source={require('../../assets/party/pdp.png')}/> */}

                                                </View>
                                        </View>
                                        {/* qualifications                             */}
                                    <View className="">
                                            <View className=" flex flex-col items-left justify-left gap-[3px] mt-[14px]">
                                                <View className="bg-[#009244] shadow-2xl rounded-md flex items-left justify-left">
                                                    <Text className="text-xs text-[#fff] font-bold text-[12px] px-[10px] py-[5px]" style={{fontFamily: 'Sora-Bold'}}> Party: {candidateD?.party?.S} </Text>
                                                </View>
                                                <View className="bg-[#009244] shadow-2xl rounded-md flex flex-row items-left justify-left">
                                                    <View className="flex items-center justify-center ml-[2px]">
                                                        <Image className="h-[20px] w-[20px]" source={require('../../assets/icons/knowledge-white.png')}/>
                                                    </View>

                                                    {
                                                        candidateD && candidateD?.qualifications ? 
                                                            <Text className="text-xs text-[#fff] font-bold text-[12px] px-[10px] py-[5px]" style={{fontFamily: 'Sora-Bold'}}>{candidateD.qualifications.S} </Text>
                                                        : ''

                                                    }

                                                    
                                                </View>


                                               {!extraData && <View className="bg-[#009244] shadow-2xl rounded-md flex items-left justify-left">
                                            
                                                    <Text className="text-xs text-[#fff] font-bold text-[12px] px-[10px] py-[5px]" style={{fontFamily: 'Sora-Bold'}}>Position: {candidateD?.position?.S}</Text>

                                                    
                                                </View>}
                                                <View className="bg-[#009244] shadow-2xl rounded-md flex items-left justify-left">
                                            
                                                    <Text className="text-xs text-[#fff] font-bold text-[12px] px-[10px] py-[5px]" style={{fontFamily: 'Sora-Bold'}}>Age: {candidateD?.age?.S} Years</Text>

                                                    
                                                </View>
                                                {
                                                    candidateD?.constituency &&
                                                    <View className="bg-[#009244] shadow-2xl rounded-md flex items-left justify-left">
                                                        <Text className="text-xs text-[#fff] font-bold text-[12px] px-[10px] py-[5px]" style={{fontFamily: 'Sora-Bold'}}>Constituency: {candidateD?.constituency?.S}</Text>
                                                        
                                                    </View>
                                                }
                                                <View className="bg-[#009244] shadow-2xl rounded-md flex items-left justify-left">
                                            
                                                    <Text className="text-xs text-[#fff] font-bold text-[12px] px-[10px] py-[5px]" style={{fontFamily: 'Sora-Bold'}}>Disability: {candidateD?.pwd?.S}</Text>

                                                    
                                                </View>

                                                { !extraData && <View className="bg-red-700 shadow-2xl rounded-md flex items-left justify-left">
                                            
                                                    <Text className="text-xs text-[#fff] font-bold text-[12px] px-[10px] py-[5px]" style={{fontFamily: 'Sora-Bold'}}>Remarks: {candidateD?.remarks?.S}</Text>

                                                    
                                                </View>}
                                                
                                            </View>
                                        {
                                            // console.log(extraData.about[0])
                                            extraData && 
                                                <>
                                                
                                                
                                                <View className="mt-[10px]">
                                                    {extraData.about.map((aboutData, index) => {
                                                        return <Text className="text-black mb-[10px] font-medium" key={`about${index}`} style={{fontFamily: 'Sora-Light'}} >
                                                            {aboutData}
                                                        </Text>
                                                    })}
                                                </View>

                                                <View>  
                                                    {
                                                        <>
                                                            <Text className="font-bold text-[#009244] text-[24px]" style={{fontFamily: 'Sora-Bold'}}>Promises</Text>
                                                            
                                                            {/* education */}
                                                            <View className="p-[10px] shadow-2xl w-[100%] mx-auto bg-white rounded-lg my-[10px]">
                                                                <Text className="font-bold text-[#009244] mb-[6px]" style={{fontFamily: 'Sora-Bold'}}>On Education</Text>
                                                                {extraData.manifesto?.education?.map((aboutData, index) => {
                                                                    return <Text className="text-black mb-[10px] pl-[10px]" style={{fontFamily: 'Sora-Light'}} key={`about${index}`} >
                                                                        &bull; {aboutData}
                                                                    </Text>
                                                                })}
                                                            </View>

                                                             {/* health */}
                                                             <View className="p-[10px] shadow-2xl w-[100%] mx-auto bg-white rounded-lg my-[10px]">
                                                                <Text className="font-bold text-[#009244] mb-[6px]" style={{fontFamily: 'Sora-Bold'}}>On Health</Text>
                                                                {extraData.manifesto?.health?.map((aboutData, index) => {
                                                                    return <Text className="text-black mb-[10px] pl-[10px]" style={{fontFamily: 'Sora-Light'}} key={`about${index}`} >
                                                                        &bull; {aboutData}
                                                                    </Text>
                                                                })}
                                                            </View>

                                                             {/* infrastructure */}
                                                             <View className="p-[10px] shadow-2xl w-[100%] mx-auto bg-white rounded-lg my-[10px]">
                                                                <Text className="font-bold text-[#009244] mb-[6px]" style={{fontFamily: 'Sora-Bold'}}>On Infrastructure</Text>
                                                                {extraData.manifesto?.infrastructure?.map((aboutData, index) => {
                                                                    return <Text className="text-black mb-[10px] pl-[10px]" style={{fontFamily: 'Sora-Light'}} key={`about${index}`} >
                                                                        &bull; {aboutData}
                                                                    </Text>
                                                                })}
                                                            </View>

                                                             {/* security */}
                                                             <View className="p-[10px] shadow-2xl w-[100%] mx-auto bg-white rounded-lg my-[10px]">
                                                                <Text className="font-bold text-[#009244] mb-[6px]" style={{fontFamily: 'Sora-Bold'}}>On Security</Text>
                                                                {extraData.manifesto?.security?.map((aboutData, index) => {
                                                                    return <Text className="text-black mb-[10px] pl-[10px]" style={{fontFamily: 'Sora-Light'}} key={`about${index}`} >
                                                                        &bull; {aboutData}
                                                                    </Text>
                                                                })}
                                                            </View>


                                                             {/* agriculture */}
                                                             <View className="p-[10px] shadow-2xl w-[100%] mx-auto bg-white rounded-lg my-[10px]">
                                                                <Text className="font-bold text-[#009244] mb-[6px]" style={{fontFamily: 'Sora-Bold'}}>On Agriculture</Text>
                                                                {extraData.manifesto?.agriculture?.map((aboutData, index) => {
                                                                    return <Text className="text-black mb-[10px] pl-[10px]" style={{fontFamily: 'Sora-Light'}} key={`about${index}`} >
                                                                        &bull; {aboutData}
                                                                    </Text>
                                                                })}
                                                            </View>

                                                             {/* economy */}
                                                             <View className="p-[10px] shadow-2xl w-[100%] mx-auto bg-white rounded-lg my-[10px]">
                                                                <Text className="font-bold text-[#009244] mb-[6px]" style={{fontFamily: 'Sora-Bold'}}>On Economy</Text>
                                                                {extraData.manifesto?.economy?.map((aboutData, index) => {
                                                                    return <Text className="text-black mb-[10px] pl-[10px]" style={{fontFamily: 'Sora-Light'}} key={`about${index}`} >
                                                                        &bull; {aboutData}
                                                                    </Text>
                                                                })}
                                                            </View>

                                                             {/* hcd */}
                                                             <View className="p-[10px] shadow-2xl w-[100%] mx-auto bg-white rounded-lg my-[10px]">
                                                                <Text className="font-bold text-[#009244] mb-[6px]" style={{fontFamily: 'Sora-Bold'}}>On Human Capital Development</Text>
                                                                {extraData.manifesto?.hcd?.map((aboutData, index) => {
                                                                    return <Text className="text-black mb-[10px] pl-[10px]" style={{fontFamily: 'Sora-Light'}} key={`about${index}`} >
                                                                        &bull; {aboutData}
                                                                    </Text>
                                                                })}
                                                            </View>


                                                            {/* justice */}
                                                            <View className="p-[10px] shadow-2xl w-[100%] mx-auto bg-white rounded-lg my-[10px]">
                                                                <Text className="font-bold text-[#009244] mb-[6px]" style={{fontFamily: 'Sora-Bold'}}>On Justice</Text>
                                                                {extraData.manifesto?.justice?.map((aboutData, index) => {
                                                                    return <Text className="text-black mb-[10px] pl-[10px]" style={{fontFamily: 'Sora-Light'}} key={`about${index}`} >
                                                                        &bull; {aboutData}
                                                                    </Text>
                                                                })}
                                                            </View>


                                                            {/* hcd */}
                                                            <View className="p-[10px] shadow-2xl w-[100%] mx-auto bg-white rounded-lg my-[10px]">
                                                                <Text className="font-bold text-[#009244] mb-[6px]" style={{fontFamily: 'Sora-Bold'}}>On Corruption</Text>
                                                                {extraData.manifesto?.corruption?.map((aboutData, index) => {
                                                                    return <Text className="text-black mb-[10px] pl-[10px]" style={{fontFamily: 'Sora-Light'}} key={`about${index}`} >
                                                                        &bull; {aboutData}
                                                                    </Text>
                                                                })}
                                                            </View>

                                                        </>
                                                    }
                                                    


                                                </View>
                                                
                                                
                                                
                                                
                                                
                                                </>


                                        }
                                            
                                    </View>

                                    </View>
                                </View>
                            </View>
                    </View>
            </ScrollView>
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