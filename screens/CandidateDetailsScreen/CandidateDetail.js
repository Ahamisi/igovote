import { StyleSheet, Text, View, Image, TouchableOpacity, Pressable, SafeAreaView, ScrollView, ActivityIndicator} from 'react-native'

import React, {useEffect, useState} from 'react'
import GoBack from '../../components/General/GoBack'
import ImagePlaceholder from 'react-native-image-with-placeholder';
import BottomTab, {bottomTabIcons} from '../../components/Home/BottomTab';


const CandidateDetail = ({navigation,route,candidate}) => {

    const [candidateD, setcandidateD] = useState('')
    const [extraData, setextraData] = useState('')
    const [activeTab, setactiveTab] = useState('bio')

    




    useEffect(() => {
        if (route.params?.candidateData) {
            setcandidateD(route.params?.candidateData)
            route.params?.extraData ? setextraData(route.params?.extraData) : ''
            console.log(extraData.readMore)
        }
      }, [route.params?.candidateData]);
    

  return (
    <SafeAreaView className="bg-[#008F43]">
        <View style={{marginBottom:5}} className="bg-[#ffffff] h-full relative">
        
        <View className="flex flex-row space-between justify-between bg-[#008F43] px-[20px] pb-[10px]" style={styles.containerShadow}>
                <View className="flex flex-row gap-[14px] items-center">
                
                        <TouchableOpacity onPress={() => navigation.navigate('HomeScreen',{userDetail: ''})}>
                            <Image source={require('../../assets/app/back-icon.png')}/>
                        </TouchableOpacity>
                    
                    <Text className="text-[20px] font-bold text-white" style={{fontFamily: 'Sora-Bold'}}>
                    Aspirants Info
                    </Text>

                </View>
                <TouchableOpacity onPress={() => navigation.push('Profile')}>
                    <Image source={{uri: 'https://img.icons8.com/50/ffffff/user-male-circle.png'}} style={[
                        styles.icon,
                    ]} className="text-center justify-center h-[20px] w-[20px]"/>
                </TouchableOpacity>
            </View>


            <ScrollView>
            <View className="w-[100%] py-[20px] rounded-xl px-[20px] mr-4 bg-white">
                            <View className="relative flex flex-col min-w-0 break-words border-0 shadow-soft-xl rounded-2xl bg-clip-border">
                                <View className="relative">
                                    <View>
                                                {
                                                candidateD && candidateD?.candidate_name && candidateD?.candidate_name?.S &&
                                                    <Text style={{fontFamily: 'Sora-Bold'}} className="font-normal leading-[20px] text-[14px] text-[#008F43] capitalize">{candidateD.candidate_name.S}</Text>

                                            }
                                            {
                                                    candidateD && candidateD?.cadidate_name  && candidateD?.cadidate_name?.S &&
                                                    <Text style={{fontFamily: 'Sora-Bold'}} className="font-normal leading-[20px] text-[14px] text-[#008F43] capitalize">{candidateD.cadidate_name.S}</Text>
   

                                            }
                                        <Text style={{fontFamily: 'Sora-Medium'}} className="font-normal leading-[20px] text-[14px] text-[#008F43]">{candidateD?.position?.S} Candidate</Text>

                                        <View className="flex flex-row ">
                                                { candidateD?.party?.S == 'A' ? <Image className="h-[20px] w-[20px]" source={require('../../assets/party/a.png')}/> :'' } 
                                                { candidateD?.party?.S == 'AA' ? <Image className="h-[20px] w-[20px]" source={require('../../assets/party/aa.png')}/> :'' }
                                                { candidateD?.party?.S == 'AAC' ? <Image className="h-[20px] w-[20px]" source={require('../../assets/party/aac.png')}/> :'' }
                                                { candidateD?.party?.S == 'ADC' ? <Image className="h-[20px] w-[20px]" source={require('../../assets/party/adc.png')}/> :'' }
                                                { candidateD?.party?.S == 'ADP' ? <Image className="h-[20px] w-[20px]" source={require('../../assets/party/adp.png')}/> :'' }
                                                { candidateD?.party?.S == 'APC' ? <Image className="h-[20px] w-[20px]" source={require('../../assets/party/apc.png')}/> :'' }
                                                { candidateD?.party?.S == 'APGA' ? <Image className="h-[20px] w-[20px]" source={require('../../assets/party/apga.png')}/> :'' }
                                                { candidateD?.party?.S == 'APM' ? <Image className="h-[20px] w-[20px]" source={require('../../assets/party/apm.png')}/> :'' }
                                                { candidateD?.party?.S == 'APP' ? <Image className="h-[20px] w-[20px]" source={require('../../assets/party/app.png')}/> :'' }
                                                { candidateD?.party?.S == 'BP' ? <Image className="h-[20px] w-[20px]" source={require('../../assets/party/bp.png')}/> :'' }
                                                { candidateD?.party?.S == 'LP' ? <Image className="h-[20px] w-[20px]" source={require('../../assets/party/lp.png')}/> :'' }
                                                { candidateD?.party?.S == 'NNPP' ? <Image className="h-[20px] w-[20px]" source={require('../../assets/party/nnpp.png')}/> :'' }
                                                { candidateD?.party?.S == 'NRM' ? <Image className="h-[20px] w-[20px]" source={require('../../assets/party/nrm.png')}/> :'' }
                                                { candidateD?.party?.S == 'PDP' ? <Image className="h-[20px] w-[20px]" source={require('../../assets/party/pdp.png')}/> :'' }
                                                { candidateD?.party?.S == 'PRP' ? <Image className="h-[20px] w-[20px]" source={require('../../assets/party/prp.png')}/> :'' }
                                                { candidateD?.party?.S == 'SDP' ? <Image className="h-[20px] w-[20px]" source={require('../../assets/party/sdp.png')}/> :'' }
                                                { candidateD?.party?.S == 'YPP' ? <Image className="h-[20px] w-[20px]" source={require('../../assets/party/ypp.png')}/> :'' }
                                                { candidateD?.party?.S == 'ZLP' ? <Image className="h-[20px] w-[20px]" source={require('../../assets/party/zlp.png')}/> :'' }
                                                <View className="p-[4px] mt-[-2px]">
                                                    <Text className="text-[#008F43] text-[14px] font-normal" style={{fontFamily: 'Sora-Medium'}}>{candidateD?.party?.S}
                                                    { candidateD?.party?.S == 'A' ? ' - Accord Party' :'' } 
                                                    { candidateD?.party?.S == 'AA' ? ' - Action Alliance' :'' }
                                                    { candidateD?.party?.S == 'AAC' ? ' - African Action Congress' :'' }
                                                    { candidateD?.party?.S == 'ADC' ? ' - African Democratic Congress' :'' }
                                                    { candidateD?.party?.S == 'ADP' ? ' - Action Democratic Party' :'' }
                                                    { candidateD?.party?.S == 'APC' ? ' - All Progressives Congress' :'' }
                                                    { candidateD?.party?.S == 'APGA' ? ' - All Progressives Grand Alliance' :'' }
                                                    { candidateD?.party?.S == 'APM' ? ' - Allied Peoples Movement' :'' }
                                                    { candidateD?.party?.S == 'APP' ? ' - All Peoples Party' :'' }
                                                    { candidateD?.party?.S == 'BP' ? ' - Boot Party' :'' }
                                                    { candidateD?.party?.S == 'LP' ? ' - Labour Party' :'' }
                                                    { candidateD?.party?.S == 'NNPP' ? ' - New Nigerias People Party' :'' }
                                                    { candidateD?.party?.S == 'NRM' ? ' - National Rescue Movement' :'' }
                                                    { candidateD?.party?.S == 'PDP' ? ' - Peoples Democratic Party' :'' }
                                                    { candidateD?.party?.S == 'PRP' ? ' - Peoples Redemption Party' :'' }
                                                    { candidateD?.party?.S == 'SDP' ? ' - Social Democratic Party' :'' }
                                                    { candidateD?.party?.S == 'YPP' ? ' - Young Progressives Party' :'' }
                                                    { candidateD?.party?.S == 'ZLP' ? ' - Zenith Labour Party' :'' }

                                                    </Text>
                                                </View>
                                            </View>


                                            

                                    </View>
                                    <View className=" shadow-xl rounded-2xl w-[100%] flex items-center mt-[5px]">
                                        {
                                            extraData ? 
                                            <ImagePlaceholder 
                                                style={{ flex: 1, height: 220, borderRadius: 40, width: 'auto' }}
                                                duration={1000}
                                                activityIndicatorProps={{
                                                    size: 'large',
                                                    color: 'green',
                                                }}
                                                imageStyle={{borderRadius: 10}}
                                                useNativeDriver={true}
                                                src={extraData?.image}
                                                placeholder={extraData?.image}
                                                />
                                            //  <Image className="h-[340px] shadow-soft-2xl rounded-2xl  w-[100%]" source={{uri: extraData?.image }}   PlaceholderContent={<ActivityIndicator />}/> 
                                             :
                                            (candidateD?.image?.S  ? 
                                                <ImagePlaceholder 
                                                style={{ flex: 1, height: 260, borderRadius:40, width: 'auto' }}
                                                duration={1000}
                                                activityIndicatorProps={{
                                                    size: 'large',
                                                    color: 'green',
                                                }}
                                                imageStyle={{borderRadius: 10}}
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
                                        <View>
                                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                                {/* <TouchableOpacity onPress={() => setactiveTab('toc')}>
                                                    <View className={`rounded-[16px] ${activeTab == 'toc' ? 'bg-[#008F43] border-[#008F43]' : 'bg-[#F2F4F5] border-[#F2F4F5]'} py-[8px] px-[16px]  border-[1px] mr-[8px]`}>
                                                        <Text className={`text-xs ${activeTab == 'toc' ? 'text-[#ffffff]' : 'text-[#303437]'} text-[12px] leading-[15px] font-bold`} style={{fontFamily: 'Sora-Bold'}}>Table of Content</Text>
                                                    </View>
                                                </TouchableOpacity> */}

                                               <TouchableOpacity onPress={() => setactiveTab('bio')}>
                                                <View className={`rounded-[16px] ${activeTab == 'bio' ? 'bg-[#008F43] border-[#008F43]' : 'bg-[#F2F4F5] border-[#F2F4F5]'} py-[8px] px-[16px]  border-[1px] mr-[8px]`}>
                                                        <Text className={`text-xs ${activeTab == 'bio' ? 'text-[#ffffff]' : 'text-[#303437]'} text-[12px] leading-[15px] font-bold`} style={{fontFamily: 'Sora-Bold'}}>Bio</Text>
                                                    </View>
                                               </TouchableOpacity>

                                                <TouchableOpacity onPress={() => setactiveTab('edu')}>
                                                    <View className={`rounded-[16px] ${activeTab == 'edu' ? 'bg-[#008F43] border-[#008F43]' : 'bg-[#F2F4F5] border-[#F2F4F5]'} py-[8px] px-[16px]  border-[1px] mr-[8px]`}>
                                                        <Text className={`text-xs ${activeTab == 'edu' ? 'text-[#ffffff]' : 'text-[#303437]'} text-[12px] leading-[15px] font-bold`} style={{fontFamily: 'Sora-Bold'}}>Education</Text>
                                                    </View>
                                                </TouchableOpacity>

                                                <TouchableOpacity onPress={() => setactiveTab('manifesto')}>
                                                    <View className={`rounded-[16px] ${activeTab == 'manifesto' ? 'bg-[#008F43] border-[#008F43]' : 'bg-[#F2F4F5] border-[#F2F4F5]'} py-[8px] px-[16px]  border-[1px] mr-[8px]`}>
                                                        <Text className={`text-xs ${activeTab == 'manifesto' ? 'text-[#ffffff]' : 'text-[#303437]'} text-[12px] leading-[15px] font-bold`} style={{fontFamily: 'Sora-Bold'}}>Manifesto Summary</Text>
                                                    </View>
                                                </TouchableOpacity>

                                                <TouchableOpacity onPress={() => setactiveTab('poffices')}>
                                                    <View className={`rounded-[16px] ${activeTab == 'poffices' ? 'bg-[#008F43] border-[#008F43]' : 'bg-[#F2F4F5] border-[#F2F4F5]'} py-[8px] px-[16px]  border-[1px] mr-[8px]`}>
                                                        <Text className={`text-xs ${activeTab == 'poffices' ? 'text-[#ffffff]' : 'text-[#303437]'} text-[12px] leading-[15px] font-bold`} style={{fontFamily: 'Sora-Bold'}}>Past offices</Text>
                                                    </View>
                                                </TouchableOpacity>


                                                <TouchableOpacity onPress={() => setactiveTab('criminal')}>
                                                    <View className={`rounded-[16px] ${activeTab == 'criminal' ? 'bg-[#008F43] border-[#008F43]' : 'bg-[#F2F4F5] border-[#F2F4F5]'} py-[8px] px-[16px]  border-[1px] mr-[8px]`}>
                                                        <Text className={`text-xs ${activeTab == 'criminal' ? 'text-[#ffffff]' : 'text-[#303437]'} text-[12px] leading-[15px] font-bold`} style={{fontFamily: 'Sora-Bold'}}>Criminal Records</Text>
                                                    </View>
                                                </TouchableOpacity>









                                            </ScrollView>
                                        </View>
                                    
                                        {/* qualifications                             */}
                                    <View className="">
                                            <View className=" flex flex-col items-left justify-left gap-[3px] mt-[0px]">
                                            {
                                                activeTab == 'bio' &&
                                                <View className=" flex flex-wrap flex-row gap-[4px]">

                                                {
                                                    candidateD && candidateD?.constituency &&

                                                    <View className="rounded-[16px] py-[4px] px-[8px] border-[#008F43] border-[1px] shadow-2xl w-auto">
                                                        <Text className="text-xs text-[#008F43] text-[10px] leading-[15px] font-bold" style={{fontFamily: 'Sora-Medium'}}>{candidateD?.constituency?.S }</Text>
                                                    </View>

                                                    }
                                                    
                                                <View className="rounded-[16px] py-[4px] px-[8px] border-[#008F43] border-[1px] shadow-2xl">
                                                    <Text className="text-xs text-[#008F43] text-[10px] leading-[15px] font-bold" style={{fontFamily: 'Sora-Medium'}}>{candidateD?.gender?.S == 'M' ? 'Male' : 'Female'}</Text>
                                                </View>

                                                <View className="rounded-[16px] py-[4px] px-[8px] border-[#008F43] border-[1px] shadow-2xl">
                                                    <Text className="text-xs text-[#008F43] text-[10px] leading-[15px] font-bold" style={{fontFamily: 'Sora-Medium'}}>{candidateD?.age?.S } Years</Text>
                                                </View>

                                                {
                                                    candidateD && candidateD?.qualifications ? 
                                                    <View className="rounded-[16px] py-[4px] px-[8px] border-[#008F43] border-[1px] shadow-2xl">
                                                        <Text className="text-xs text-[#008F43] text-[10px] leading-[15px] font-bold" style={{fontFamily: 'Sora-Medium'}}>{candidateD?.qualifications?.S}</Text>
                                                    </View>
                                                    : ''

                                                }
                                                
                                                <View className="rounded-[16px] py-[4px] px-[8px] border-[#008F43] border-[1px] shadow-2xl">
                                                    <Text className="text-xs text-[#008F43] text-[10px] leading-[15px] font-bold" style={{fontFamily: 'Sora-Medium'}}>Disability: {candidateD?.pwd?.S}</Text>
                                                </View>
                                                {
                                                    candidateD && candidateD?.remarks ? 
                                                    <View className="rounded-[16px] py-[4px] px-[8px] border-[#008F43] border-[1px] shadow-2xl">
                                                        <Text className="text-xs text-[#008F43] text-[10px] leading-[15px] font-bold" style={{fontFamily: 'Sora-Medium'}}>Remarks: {candidateD?.remarks?.S}</Text>
                                                    </View>
                                                    : ''

                                                }
                                                



                                            </View>
                                            }
                                  




                                                
                                            </View>

                                            {/* {console.log(candidateD.bio.L[0].S, 'indomie')} */}
                                            {/* show bio */}
                                            {
                                                (candidateD?.bio?.L && activeTab == 'bio') &&
                                                    <View className="mt-[10px]">
                                                        {candidateD.bio.L.map((aboutData, index) => {
                                                            return <Text className="text-[#008F43] mb-[10px] font-medium" key={`about${index}`} style={{fontFamily: 'Sora-Light'}} >
                                                                {aboutData?.S}
                                                            </Text>
                                                        })}
                                                    </View>
                                            }


                                             {/* show education */}
                                             {
                                                (candidateD?.education?.L && activeTab == 'edu') &&
                                                    <View className="mt-[10px]">
                                                        {candidateD.education.L.map((aboutData, index) => {
                                                            return <Text className="text-[#008F43] mb-[10px] font-medium" key={`about${index}`} style={{fontFamily: 'Sora-Light'}} >
                                                                {index+1}.&nbsp;{aboutData?.S}
                                                            </Text>
                                                        })}
                                                    </View>
                                            }

                                            {/* manifesto summary */}
                                            {
                                                (candidateD?.manifesto?.L && activeTab == 'manifesto') &&
                                                    <View className="mt-[10px]">
                                                        {candidateD.manifesto.L.map((aboutData, index) => {
                                                            return <Text className="text-[#008F43] mb-[10px] font-medium" key={`about${index}`} style={{fontFamily: 'Sora-Light'}} >
                                                                {index+1}.&nbsp;{aboutData?.S}
                                                            </Text>
                                                        })}
                                                    </View>
                                            }

                                             {/* past offices  */}
                                             {
                                                (candidateD?.poffices?.L && activeTab == 'poffices') &&
                                                    <View className="mt-[10px]">
                                                        {candidateD.poffices.L.map((aboutData, index) => {
                                                            return <Text className="text-[#008F43] mb-[10px] font-medium" key={`about${index}`} style={{fontFamily: 'Sora-Light'}} >
                                                                {index+1}.&nbsp;{aboutData?.S}
                                                            </Text>
                                                        })}
                                                    </View>
                                            }

                                            {/* past offices  */}
                                            {
                                                (candidateD?.criminal?.L && activeTab == 'criminal') &&
                                                    <View className="mt-[10px]">
                                                        {candidateD.criminal.L.map((aboutData, index) => {
                                                            return <Text className="text-[#008F43] mb-[10px] font-medium" key={`about${index}`} style={{fontFamily: 'Sora-Light'}} >
                                                                {index+1}.&nbsp;{aboutData?.S}
                                                            </Text>
                                                        })}
                                                    </View>
                                            }
                                            





                                        {
                                            // console.log(extraData.about[0])
                                            extraData && 
                                                <>
                                                
                                                
                                                <View className="mt-[10px]">
                                                    {extraData.about.map((aboutData, index) => {
                                                        return <Text className="text-[#008F43] mb-[10px] font-medium" key={`about${index}`} style={{fontFamily: 'Sora-Light'}} >
                                                            {aboutData}
                                                        </Text>
                                                    })}
                                                </View>

                                                <View>  
                                                    {
                                                        <>
                                                            <Text className="font-bold text-[#008F43] text-[24px]" style={{fontFamily: 'Sora-Bold'}}>Promises</Text>
                                                            
                                                            {/* education */}
                                                            <View className="p-[10px] shadow-2xl w-[100%] mx-auto bg-white rounded-lg my-[10px]">
                                                                <Text className="font-bold text-[#008F43] mb-[6px]" style={{fontFamily: 'Sora-Bold'}}>On Education</Text>
                                                                {extraData.manifesto?.education?.map((aboutData, index) => {
                                                                    return <Text className="text-[#008F43] mb-[10px] pl-[10px]" style={{fontFamily: 'Sora-Light'}} key={`about${index}`} >
                                                                        &bull; {aboutData}
                                                                    </Text>
                                                                })}
                                                            </View>

                                                             {/* health */}
                                                             <View className="p-[10px] shadow-2xl w-[100%] mx-auto bg-white rounded-lg my-[10px]">
                                                                <Text className="font-bold text-[#008F43] mb-[6px]" style={{fontFamily: 'Sora-Bold'}}>On Health</Text>
                                                                {extraData.manifesto?.health?.map((aboutData, index) => {
                                                                    return <Text className="text-[#008F43] mb-[10px] pl-[10px]" style={{fontFamily: 'Sora-Light'}} key={`about${index}`} >
                                                                        &bull; {aboutData}
                                                                    </Text>
                                                                })}
                                                            </View>

                                                             {/* infrastructure */}
                                                             <View className="p-[10px] shadow-2xl w-[100%] mx-auto bg-white rounded-lg my-[10px]">
                                                                <Text className="font-bold text-[#008F43] mb-[6px]" style={{fontFamily: 'Sora-Bold'}}>On Infrastructure</Text>
                                                                {extraData.manifesto?.infrastructure?.map((aboutData, index) => {
                                                                    return <Text className="text-[#008F43] mb-[10px] pl-[10px]" style={{fontFamily: 'Sora-Light'}} key={`about${index}`} >
                                                                        &bull; {aboutData}
                                                                    </Text>
                                                                })}
                                                            </View>

                                                             {/* security */}
                                                             <View className="p-[10px] shadow-2xl w-[100%] mx-auto bg-white rounded-lg my-[10px]">
                                                                <Text className="font-bold text-[#008F43] mb-[6px]" style={{fontFamily: 'Sora-Bold'}}>On Security</Text>
                                                                {extraData.manifesto?.security?.map((aboutData, index) => {
                                                                    return <Text className="text-[#008F43] mb-[10px] pl-[10px]" style={{fontFamily: 'Sora-Light'}} key={`about${index}`} >
                                                                        &bull; {aboutData}
                                                                    </Text>
                                                                })}
                                                            </View>


                                                             {/* agriculture */}
                                                             <View className="p-[10px] shadow-2xl w-[100%] mx-auto bg-white rounded-lg my-[10px]">
                                                                <Text className="font-bold text-[#008F43] mb-[6px]" style={{fontFamily: 'Sora-Bold'}}>On Agriculture</Text>
                                                                {extraData.manifesto?.agriculture?.map((aboutData, index) => {
                                                                    return <Text className="text-[#008F43] mb-[10px] pl-[10px]" style={{fontFamily: 'Sora-Light'}} key={`about${index}`} >
                                                                        &bull; {aboutData}
                                                                    </Text>
                                                                })}
                                                            </View>

                                                             {/* economy */}
                                                             <View className="p-[10px] shadow-2xl w-[100%] mx-auto bg-white rounded-lg my-[10px]">
                                                                <Text className="font-bold text-[#008F43] mb-[6px]" style={{fontFamily: 'Sora-Bold'}}>On Economy</Text>
                                                                {extraData.manifesto?.economy?.map((aboutData, index) => {
                                                                    return <Text className="text-[#008F43] mb-[10px] pl-[10px]" style={{fontFamily: 'Sora-Light'}} key={`about${index}`} >
                                                                        &bull; {aboutData}
                                                                    </Text>
                                                                })}
                                                            </View>

                                                             {/* hcd */}
                                                             <View className="p-[10px] shadow-2xl w-[100%] mx-auto bg-white rounded-lg my-[10px]">
                                                                <Text className="font-bold text-[#008F43] mb-[6px]" style={{fontFamily: 'Sora-Bold'}}>On Human Capital Development</Text>
                                                                {extraData.manifesto?.hcd?.map((aboutData, index) => {
                                                                    return <Text className="text-[#008F43] mb-[10px] pl-[10px]" style={{fontFamily: 'Sora-Light'}} key={`about${index}`} >
                                                                        &bull; {aboutData}
                                                                    </Text>
                                                                })}
                                                            </View>


                                                            {/* justice */}
                                                            <View className="p-[10px] shadow-2xl w-[100%] mx-auto bg-white rounded-lg my-[10px]">
                                                                <Text className="font-bold text-[#008F43] mb-[6px]" style={{fontFamily: 'Sora-Bold'}}>On Justice</Text>
                                                                {extraData.manifesto?.justice?.map((aboutData, index) => {
                                                                    return <Text className="text-[#008F43] mb-[10px] pl-[10px]" style={{fontFamily: 'Sora-Light'}} key={`about${index}`} >
                                                                        &bull; {aboutData}
                                                                    </Text>
                                                                })}
                                                            </View>


                                                            {/* hcd */}
                                                            <View className="p-[10px] shadow-2xl w-[100%] mx-auto bg-white rounded-lg my-[10px]">
                                                                <Text className="font-bold text-[#008F43] mb-[6px]" style={{fontFamily: 'Sora-Bold'}}>On Corruption</Text>
                                                                {extraData.manifesto?.corruption?.map((aboutData, index) => {
                                                                    return <Text className="text-[#008F43] mb-[10px] pl-[10px]" style={{fontFamily: 'Sora-Light'}} key={`about${index}`} >
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
        <BottomTab icons={bottomTabIcons} navigation={navigation} tabName='HomeScreen'/>

    </SafeAreaView>
  )
}

export default CandidateDetail


const styles = StyleSheet.create({
    icon: {
        width: 30,
        height: 30,
        marginLeft: 10,
        resizeMode: 'contain'
    },
})