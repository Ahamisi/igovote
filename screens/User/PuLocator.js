import { View, Text, Image, TouchableOpacity, SafeAreaView, TextInput, Alert, Pressable, StyleSheet, ScrollView , Button} from 'react-native'
import React, {useState, useEffect} from 'react';
import GoBack from '../../components/General/GoBack';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import { A } from '@expo/html-elements';
import * as Linking from 'expo-linking';



import AsyncStorage from '@react-native-async-storage/async-storage';




import { Formik } from 'formik';
import * as Yup from 'yup';
import  Validator  from 'email-validator';
import { Auth,Storage,API } from 'aws-amplify';
import { UserProfile } from '../../src/models';

import BottomTab, {bottomTabIcons} from '../../components/Home/BottomTab';
import {Dropdown} from 'react-native-element-dropdown';

import { DataStore } from '@aws-amplify/datastore';
import { ElectionMonitor, EMPresidential, EMGovernorship, EMSenatorial, EMHor, EMHoa } from '../../src/models';


import uuid from 'react-native-uuid';




const PuLocator = ({navigation}) => {


    const [isFocus, setisFocus] = useState(false)
    const [uploadedImage, setUploadedImage] = useState(null);
    const [ElectionType, setElectionType] = useState(null);
    const [UserId, setUserId] = useState('');
    const [PuDelimitation, setPuDelimitation] = useState('');
    const [StateId, setStateId] = useState('');
    const [LgaId, setLgaId] = useState('');
    const [WardId, setWardId] = useState('');
    const [LgaUnique, setLgaUnique] = useState('');
    const [puInfo, setPuInfo] = useState({});
    const [gps_lat, setgpslat] = useState('');
    const [gps_lon, setgpslon] = useState('');





    const [isSubmitting, setIsSubmitting] = useState(false)






    const getUser = async () => {
        // get user  from cognito
        const userInfo = await Auth.currentAuthenticatedUser();
    
        if (!userInfo) {
          return;
        }
        const userId = userInfo.attributes.sub;
    
        setUserId(userId)

        return userId;
    
    
      }



      const handlePuFetch =  (PuDelimitation) => {
        const url = `https://gotomypu.com/polling-unit?code=${PuDelimitation}`
        var config = {
            method: 'get',
            url: url,
          };
            axios(config)
              .then((response) => {
                if(response){
                    setPuInfo(response.data)
                    setgpslat(response.data.gps_lat)
                    setgpslon(response.data.gps_lon)
                //   console.log(response.data.result.Items,'state')
                //   setDataSource(response.data?.result?.Items)
                } 
              })
              .catch(function (error) {
                console.log(error);
              });
        };


      const getPu = async (pu) => {

        try {
            const values = await AsyncStorage.getItem('@userProfile');
            const parsedValue = values ? JSON.parse(values) : {}
            if(!parsedValue){
                // get user  from cognito
                const userInfo = await Auth.currentAuthenticatedUser();
                if (!userInfo) {
                    return;
                }
                const userId = userInfo.attributes.sub;
                const user = (await DataStore.query(UserProfile)).find(userProfile => userProfile.sub === userId);
                setPuDelimitation(user.pu);
                setStateId(user.state_id)
                setLgaId(user.lga_abbreviation)
                setWardId(user.ward_abbreviation)
                setLgaUnique(user.lga_id)

            }else{
                setStateId(parsedValue.state_id)
                setLgaId(parsedValue.lga_abbreviation)
                setWardId(parsedValue.ward_abbreviation)
                setPuDelimitation(parsedValue.pu_id)
                setLgaUnique(parsedValue.lga_id)
            }
          } catch (error) {
            // Error saving data
          } finally{

          }
      }










    useEffect(() =>{
        getPu()
        getPu()
    },[])





    const onSubmit = async (pu,a,aa,aac,adc,adp,apc,apga,apm,app,bp,lp,nnpp,nrm,pdp,prp,sdp,ypp,zlp,electionType) =>{
        if(PuDelimitation){
            try{
                console.log('jagaban')
                handlePuFetch(PuDelimitation)
                // setIsSubmitting(true)
                // let fname = ''

    
    
            }catch(error){
                console.log(error)
                Alert.alert('Omo e don choke !!!', `Please try again`)
            }finally{
                setIsSubmitting(false)
    
            }
        }else{
            Alert.alert('Polling Unit is Empty', `Enter your polling unit, or complete your profile`)

        }
    }





  return (
        <SafeAreaView className="bg-[#008F43] text-white">











            
            <View className="bg-[#ffffff] h-full relative">



            <View className="flex flex-row space-between justify-between bg-[#008F43] px-[20px] pb-[10px]" style={styles.containerShadow}>
                <View className="flex flex-row gap-[14px] items-center">
                
                        <TouchableOpacity onPress={() => navigation.navigate('MainMenu',{userDetail: ''})}>
                            <Image source={require('../../assets/app/back-icon.png')}/>
                        </TouchableOpacity>
                    
                    <Text className="text-[20px] font-bold text-white" style={{fontFamily: 'Sora-Bold'}}>
                    Polling unit Locator
                    </Text>

                </View>
                <TouchableOpacity onPress={() => navigation.push('Profile')}>
                    <Image source={{uri: 'https://img.icons8.com/50/ffffff/user-male-circle.png'}} style={[
                        styles.icon,
                    ]} className="text-center justify-center h-[20px] w-[20px]"/>
                </TouchableOpacity>
            </View>














                {/* <View className="flex flex-row justify-between">
                    <View className="bg-[#008F43] flex flex-row gap-[14px] items-center pl-[20px]">
                        <TouchableOpacity onPress={() => navigation.push('MainMenu',{userDetail: ''})}>
                                <Image source={require('../../assets/app/back-icon.png')}/>
                            </TouchableOpacity>
                        <Text className="text-white font-bold text-[20px]  pt-[15px] pb-[15px] mx-auto  w-[90%]">Polling unit results</Text>
                    </View>
                    <View className="bg-yellow-300 flex flex-row">
                        <TouchableOpacity onPress={() => navigation.push('Profile')}>
                            <Image source={{uri: 'https://img.icons8.com/50/ffffff/user-male-circle.png'}} style={[
                                styles.icon,
                            ]} className="text-center justify-center"/>
                                <Text>Super</Text>

                        </TouchableOpacity>

                    </View>
                </View>
                 */}
              




            <Formik 
                initialValues={{pu:`${PuDelimitation ? PuDelimitation : '' }`}}
                onSubmit={(values) => {
                    onSubmit(
                        values.pu,
                    
                    )
                }}
                validateOnMount={true}
            >

                {({handleChange, handleBlur, handleSubmit, values, isValid}) =>(

                    <ScrollView>




                        <View className=" bg-white rounded-[20px] pb-[5px] items-left">
                             
                                <View className="mx-auto w-[100%] mb-[10px] bg-[#EDF2F9] p-[20px]">
                                    <View className="mb-[16px]">
                                        <Text className="text-[#303437] font-bold text-[20px]">Polling Unit Locator</Text>
                                    </View>
                                   
                                    <View className="mb-[10px] flex flex-row flex-wrap">
                                        <Text className="text-[14px] font-bold" style={{fontFamily: 'Sora-Bold'}}>Note:</Text>
                                        <Text className="text-[14px]" style={{fontFamily: 'Sora-Medium'}}>
                                        In order to find your polling unit, please have your Delimitation Code details ready.

                                        </Text>
                                    </View>
                                    <View className="mb-[10px] flex flex-row flex-wrap">
                                        <Text className="text-[14px] font-bold" style={{fontFamily: 'Sora-Bold'}}>Your polling unit:</Text>
                                        <Text className="text-[14px]" style={{fontFamily: 'Sora-Medium'}}>&nbsp;
                                        {PuDelimitation ? PuDelimitation : values.pu}
                                        </Text>
                                    </View>
                                    {/* <Image className="h-[200px] w-[300px]" source={require('../../assets/app/pvc.png')} /> */}

                                </View>


                            <View className="px-[20px] pb-[20px]">


                            {/* <View className={`w-[100%] mb-[15px] p-[] `} style={styles.inputField}
                        >
                            <TextInput 
                                placeholder='Enter Polling Unit Eg. 04-01-01-010'
                                autoCapitalize='none'
                                keyboardType='text'
                                textContentType='text'
                                autoFocus={false}
                                onChangeText={handleChange('pu')}
                                onBlur={handleBlur('pu')}
                                value={PuDelimitation ? PuDelimitation : values.pu}
                                className="bg-[#eeeeee]  px-[20px] py-[18px] "/>
                        </View> */}


                                    <View className="mb-[16px] flex flex-row flex-wrap">
                                        <Text className="text-[14px] font-bold" style={{fontFamily: 'Sora-Bold'}}>Enter Delimitation</Text>
                                    </View>

                        <View className="w-[100%] mb-[15px]">
                                <TextInput 
                                    placeholder='Enter Polling Unit Eg. 04-01-01-010'
                                    autoCapitalize='none'
                                    keyboardType='text'
                                    textContentType='text'
                                    autoFocus={false}
                                    onChangeText={handleChange('pu')}
                                    onBlur={handleBlur('pu')}
                                    value={PuDelimitation ? PuDelimitation : values.pu}
                                    className="bg-[#eeeeee]  px-[20px] py-[18px] "/>
                                
                            </View>





                            {
                                puInfo?.pname && 
                                <View className="flex flex-col rounded-[24px] my-[20px] border-dashed">
                                    <View className="bg-[#F2F4F5] p-[10px] py-[20px] text-center">
                                        <View className="py-[5px] text-center justify-center items-center flex gap-[4px]">
                                            <Image source={require('../../assets/app/navigation.png')} className="h-[60px] w-[60px]"/>
                                            <Text className="text-center" style={{fontFamily: 'Sora-Bold'}}>{puInfo?.pname}</Text>
                                            <Text className="text-center" style={{fontFamily: 'Sora-Medium'}}>{puInfo?.ward} {puInfo?.lga} {puInfo?.state}</Text>
                                        </View>
                                            <TouchableOpacity className="bg-[#4482c3] flex justify-center items-center" onPress={() => { Linking.openURL(`https://maps.google.com/maps?saddr=current+location&daddr=${gps_lat},${gps_lon}`);}}>
                                                <View className="px-[32px] py-[15px] rounded-[40px] text-[#fff] shadow-2xl"  >
                                                    <Text className="text-white text-center text-[12px] font-bold" style={{fontFamily: 'Sora-Bold'}}>
                                                    {
                                                        'Get Directions'
                                                    }
                                                    </Text>
                                                </View>
                                            </TouchableOpacity>
                                    </View>
                               
                            </View>  
                            }

                          
                    
               


                        <View className="w-[100%] mb-[20px] pb-[20px] flex justify-end">
                        {/* disabled={(isSubmitting ? true : (PuDelimitation?.length ? true : isValid ))} */}
                            <TouchableOpacity style={isSubmitting ? styles.button(false) : styles.button(isValid)} onPress={handleSubmit} disabled={!isValid || isSubmitting || !PuDelimitation?.length}>
                                <View className="px-[32px] py-[15px] rounded-[40px] text-[#fff] shadow-2xl"  >
                                    <Text className="text-white text-center text-[12px] font-bold" style={{fontFamily: 'Sora-Bold'}}>
                                    {
                                        isSubmitting ? 'Checking...' : 'Find Center'
                                    }
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
















                            </View>

                        


                        </View>








                    </ScrollView>
                )}



            </Formik>




                



                
            </View>


            <BottomTab icons={bottomTabIcons} navigation={navigation} tabName='ElectionMonitor'/>

        </SafeAreaView>
  )
}



const styles = StyleSheet.create({
    wrapper:{
        marginTop: 80,
    },
    inputField:{
        marginBottom: 10,
        // boxShadow: '2px 0px 1px #0000008a',
        // shadowColor: '#0000008a',
        // shadowOffset: {width: -1, height: 3},
        // shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    button: isValid =>({
        backgroundColor: isValid ? '#008F43' : '#b5e2cd',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 42,
        borderRadius: 30
    }),
    buttonText:{
        fontWeight: 600,
        color: '#fff',
        fontSize: 20
    },
    signupContainer:{
        flexDirection: 'row',
        width: '100%',
        marginTop: 50,
        justifyContent: 'center'
    },
    dropdown: {
        height: 50,
        borderColor: '#CDCFD0',
        borderWidth: 0.5,
        borderRadius: 24,
        paddingHorizontal: 8,
        marginBottom: 10,
      },
      icon: {
        width: 30,
        height: 30,
        resizeMode: 'contain'
      },
      label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
      },
      placeholderStyle: {
        fontSize: 16,
      },
      selectedTextStyle: {
        fontSize: 16,
      },
      iconStyle: {
        width: 20,
        height: 20,
      },
      inputSearchStyle: {
        height: 40,
        fontSize: 16,
      }, 
})

export default PuLocator