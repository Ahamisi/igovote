import { View, Text, SafeAreaView,ScrollView, Image, StyleSheet, TouchableOpacity , Button, Alert} from 'react-native'
import React, {useEffect, useState, useRef} from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5';
import GoBack from '../../components/General/GoBack';

import BottomTab, {bottomTabIcons} from '../../components/Home/BottomTab';

import { Auth } from 'aws-amplify';
import { DataStore } from '@aws-amplify/datastore';
import { UserProfile } from '../../src/models';

import Profile from './Profile';
import { Modalize } from 'react-native-modalize';

import { A } from '@expo/html-elements';
import * as Linking from 'expo-linking';

import {BASE_URL} from '@env'
import axios from 'axios';


import AsyncStorage from '@react-native-async-storage/async-storage';




const EditProfile = ({navigation}) => {


    const [Editting, setEditting] = useState(false)
    const [puDelimitation, setPuDelimitation] = useState(null);
    const [requestToken, setRequestToken] = useState('');




    const handleSignOut = async (toDelete = false) => {
        try {
            Alert.alert('Bigger Person', toDelete ? `We dont want to let you go... We will review this request and delete you profile from all our records` : `Are you sure you want to log out?`,[
                {
                    text: 'Stay',
                    onPress : () => {console.log('ok')},
                    style: 'cancel'
                },
                {
                    text : 'No, I get Coconut Head ',
                    onPress: async() => {

                        await AsyncStorage.removeItem('@userProfile');
                        await AsyncStorage.removeItem('@userData');
                        await Auth.signOut();
                        navigation.push('BeforeAuth')
                    },
                }
            ])
            

        } catch (error) {
            console.log('error signing out: ', error);
        }

    }



    const fetchToken =  async (email,name, id) => {
        const url = `${BASE_URL}/get-token/${email}/${name}/${id}`
        var config = {
            method: 'get',
            url: url,
          };
            axios(config)
              .then((response) => {
                if(response){
                    setRequestToken(response.data?.jtoken);
                    return;
                } 
              })
              .catch(function (error) {
                console.log(error);
              });
    };






    const handleToken = async (GlobalUser) => {
        try{
            await fetchToken(GlobalUser.name,GlobalUser.name,GlobalUser.sub)
            if(requestToken){
                Linking.openURL(`https://webview.canny.io?boardToken=2a783bc6-279a-615b-8f20-428177d0c441&ssoToken=${requestToken}`);
            }
        }catch{

        }
    }






    const getPu = async (pu) => {
        try {
          setPuDelimitation(await AsyncStorage.getItem('pu'))
        } catch (error) {
          // Error saving data
        }
      }




  const modalizeRef = useRef(null);
  const onOpen = () => {
    modalizeRef.current?.open();
  };
    


    const Logout = async () => {
            try {
                await Auth.signOut();
            } catch (error) {
                console.log('error signing out: ', error);
            }
           
          
    }


    const [GlobalUser, setGlobalUser] = useState(null)
    const checkIfNewUser = async () => {
        // get user  from cognito
        const userInfo = await Auth.currentAuthenticatedUser();
    
        if (!userInfo) {
          return;
        }
        const userId = userInfo.attributes.sub;
    
        const user = (await DataStore.query(UserProfile)).find(UserProfile => UserProfile.sub === userId);
    
        user ? setGlobalUser(user) : ''
        console.log(user,'sii')
    
    
      }



useEffect(() =>{
    !GlobalUser ? checkIfNewUser() : ''
    getPu()   
},[])


const goToEdit = () => {
    setEditting(true);
    onOpen()
    
}





  return (
    <SafeAreaView className="bg-[#008F43]">

        <ScrollView className="bg-[#fff] h-full relative">



        <View className="bg-[#ffffff] h-full relative">
        <View className="bg-[#008F43] flex flex-row gap-[14px] items-center pl-[12px]">
                        <TouchableOpacity onPress={() => navigation.push('MainMenu',{userDetail: ''})}>
                                <Image source={require('../../assets/app/back-icon.png')}/>
                            </TouchableOpacity>
                        <Text className="text-white font-bold text-[20px]  pt-[15px] pb-[15px] mx-auto  w-[90%]">Your Profile</Text>
         </View>







           <View className="p-[20px]">

                 {/* <GoBack bg="bg-[#F2F4F5]"/> */}
            <View style={{flexDirection: 'column',backgroundColor: '#ffffff'}} className="bg-[#F2F4F5] rounded-xl shadow-xl">
                <View style={styles.container} className="px-[20px]">
                    <View className="pt-[20px]">
                    <Text style={styles.groupHeading}>Your Achievements</Text>
                    </View>
                    <View style={{}}>
                    {/* <TouchableOpacity>
                        <Icon name="angle-right" size={20} color="#008F43" />
                    </TouchableOpacity> */}
                    </View>
                </View>
                <View className="bg-[#fff] m-0 py-[20px] rounded-b-2xl px-[20px] shadow-xl">
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <View className="mr-[10px]">
                            <Image  className="h-[80px] w-[55px]" source={require('../../assets/badges/news-user.png')} />
                        </View>
                        <View className="mr-[10px]">
                            <Image  className="h-[80px] w-[55px]" source={require('../../assets/badges/registered-voter.png')} />
                        </View>
                        {
                            GlobalUser?.pu &&
                            <View className="mr-[10px]">
                                <Image  className="h-[80px] w-[55px]" source={require('../../assets/badges/got-pvc.png')} />
                            </View>
                        }

                        
                        

                    </ScrollView>

                    {/* {
                        GlobalUser?.pu &&  <TouchableOpacity className="bg-[#008F43] flex text-white flex-row items-center justify-center px-[20px] py-[9px] mt-[10px]" onPress={onOpen}>
                        <Text className="text-white font-bold text-lg">Redeem</Text>
                    </TouchableOpacity>
                    } */}
                   
                </View>

               
            </View>


            {/* edit profile button */}
            <View style={{flexDirection: 'column',backgroundColor: '#F2F4F5'}} className="mt-[20px] bg-[#F2F4F5] rounded-xl shadow-xl">
                <View style={styles.container} className="px-[20px]">
                    <View className="pt-[20px]">
                    <Text style={styles.groupHeading}>Edit your profile</Text>
                    </View>
                    
                </View>
                <View className="bg-[#ffffff] m-0 py-[20px]  rounded-b-xl shadow-xl px-[20px]">
                    <View className="flex flex-row justify-between mb-[20px]">
                        <Text className="text-left font-bold" style={{fontFamily: 'Sora-Medium'}}>
                            Email:
                        </Text>
                        <Text className="text-right font-bold" style={{fontFamily: 'Sora-Medium'}}>
                            {GlobalUser?.name}
                        </Text>
                    </View>

                    <View className="flex flex-row justify-between mb-[20px]">
                        <Text className="text-left font-bold" style={{fontFamily: 'Sora-Medium'}}>
                            Gender:
                        </Text>
                        <Text className="text-right font-bold" style={{fontFamily: 'Sora-Medium'}}>
                            {GlobalUser?.gender}

                        </Text>
                    </View>

                    <View className="flex flex-row justify-between mb-[20px]">
                        <Text className="text-left font-bold" style={{fontFamily: 'Sora-Medium'}}>
                            State:
                        </Text>
                        <Text className="text-right font-bold" style={{fontFamily: 'Sora-Medium'}}>
                        {GlobalUser?.state}

                        </Text>
                    </View>

                    <View className="flex flex-row justify-between mb-[20px]">
                        <Text className="text-left font-bold" style={{fontFamily: 'Sora-Medium'}}>
                            LGA:
                        </Text>
                        <Text className="text-right font-bold" style={{fontFamily: 'Sora-Medium'}}>
                        {GlobalUser?.lga}

                        </Text>
                    </View>
                    <View className="flex flex-row justify-between mb-[20px]">
                        <Text className="text-left font-bold" style={{fontFamily: 'Sora-Medium'}}>
                            Ward:
                        </Text>
                        <Text className="text-right font-bold" style={{fontFamily: 'Sora-Medium'}}>
                        {GlobalUser?.ward}

                        </Text>
                    </View>
                    <View className="flex flex-row justify-between mb-[20px]">
                        <Text className="text-left font-bold" style={{fontFamily: 'Sora-Medium'}}>
                            Polling Code:
                        </Text>
                        <Text className="text-right font-bold" style={{fontFamily: 'Sora-Medium'}}>
                        {GlobalUser?.pu}


                        </Text>
                    </View>
                    <TouchableOpacity className="bg-[#008F43] rounded-[30px] flex text-white flex-row items-center justify-center px-[20px] py-[12px]" onPress={onOpen}>
                        <Text className="text-white font-bold text-lg" style={{fontFamily: 'Sora-Medium'}}>Edit Profile &nbsp;</Text>
                        <Icon name="pencil-alt" size={20} color="#fff" />
                    </TouchableOpacity>
                </View>
            </View>





               {/* edit profile button */}
            <View style={{flexDirection: 'column'}} className="block mt-[20px] bg-[#F2F4F5] rounded-t-xl shadow-xl">
                <View style={styles.container} className="px-[20px] mt-[20px]">
                    <View>
                    <Text style={styles.groupHeading}>App Actions</Text>
                    </View>
                    <View style={{}}>
                    {/* <TouchableOpacity>
                        <Icon name="angle-right" size={20} color="#008F43" />
                    </TouchableOpacity> */}
                    </View>
                </View>
                <View className="bg-[#fff] m-0 py-[20px] rounded-b-xl shadow-xl px-[20px]">

{/* 
                <View className="flex flex-row justify-between mb-[20px]">
                        <Text className="text-left font-bold">
                            Love the Project ?
                        </Text>
                        <Text className="text-right font-bold">
                            <TouchableOpacity className="bg-[#008F43] px-[14px] py-[10px] rounded-lg">
                                <Text className="text-white font-bold"><A href="https://linktr.ee/igovote">Donate</A></Text>
                            </TouchableOpacity>
                            
                        </Text>
                </View> */}


                <View className="flex flex-row justify-between mb-[20px]">
                        <Text className="text-left font-bold" style={{fontFamily: 'Sora-Bold'}}>
                            Request a feature ?
                        </Text>
                        <Text className="text-right font-bold" style={{fontFamily: 'Sora-Medium'}}>
                            <TouchableOpacity className="bg-[#008F43] px-[14px] py-[10px] rounded-lg" onPress={() => handleToken(GlobalUser)}>
                                <Text className="text-white font-bold" style={{fontFamily: 'Sora-Medium'}}>Give feedback</Text>
                            </TouchableOpacity>
                            
                        </Text>
                </View>







                    <View className="flex flex-row justify-between mb-[20px]">
                        <Text className="text-left font-bold" style={{fontFamily: 'Sora-Bold'}}>
                            Delete Account ?
                        </Text>
                        <Text className="text-right font-bold">
                            <TouchableOpacity onPress={() => handleSignOut(true)}>
                                <Text className="text-red-600" style={{fontFamily: 'Sora-Medium'}}>Delete</Text>
                            </TouchableOpacity>
                            
                        </Text>
                    </View>

                  

                   
                    <View className="">
                        <TouchableOpacity className="bg-[#008F43] rounded-[30px] flex text-white flex-row items-center justify-center px-[20px] py-[12px]" onPress={handleSignOut}>
                            <Text className="text-white font-bold text-lg" style={{fontFamily: 'Sora-Medium'}}>Logout</Text>
                            {/* <Icon name="right-" size={20} color="#fff" /> */}
                        </TouchableOpacity>
                    </View>
                   
                </View>
            </View>











           </View>


        </View>













        </ScrollView>
        
        <BottomTab icons={bottomTabIcons} navigation={navigation} tabName='Profile'/>
        {/* { Editting &&  */}
            <Modalize ref={modalizeRef} closeOnOverlayTap={true} panGestureEnabled={false}>
                <Profile navigation={navigation} type="edit" editing={true} canGoBack={true}/>
            </Modalize>    

        {/* } */}
    </SafeAreaView>
  )
}

export default EditProfile

const styles = StyleSheet.create({
    groupHeading: {
        textTransform: 'uppercase',
        fontWeight: '700',
        color: '#000',
        fontFamily: 'Sora-Bold'
    },
    container: {
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      marginBottom: 20
    }
})