import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import React, {useState, useEffect} from 'react'
import { AsyncStorage } from '@aws-amplify/core';




const handleSignOut = async () => {
    // try{
    //     await firebase.auth().signOut()
    //     console.log('sign out successfully !!!')
    // }catch(error){
    //     console.log(error)
    // }
}

const getGreeting = () => {
    const hour = new Date().getHours();
    const welcomeTypes = ["Good morning", "Good afternoon", "Good evening"];
    let welcomeText = "";

    if (hour < 12) welcomeText = welcomeTypes[0];
    else if (hour < 18) welcomeText = welcomeTypes[1];
    else welcomeText = welcomeTypes[2];
    return welcomeText
}



const Header = ({selected, navigation, filterType,selectedPos,forItem}) => {
    // const messages = ['Odogwu', 'Agba', 'Chairman', 'Chief']
    
  return (
    <View >

        <View className="flex relative">
           
            <View className="flex flex-row space-between justify-between bg-[#008F43] px-[20px] pb-[10px]" style={styles.containerShadow}>
                <View className="flex flex-row gap-[14px] items-center">
                    {
                        forItem !== 'menu' ? 
                        <TouchableOpacity onPress={() => navigation.navigate('MainMenu',{userDetail: ''})}>
                            <Image source={require('../../assets/app/back-icon.png')}/>
                        </TouchableOpacity> : ''
                    }
                    <Text className="text-[20px] font-bold text-white" style={{fontFamily: 'Sora-Bold'}}>{
                        forItem == 'menu' ? 'Home' : 'Aspirants Info'
                    }</Text>

                </View>
                <TouchableOpacity onPress={() => navigation.push('Profile')}>
                    <Image source={{uri: 'https://img.icons8.com/50/ffffff/user-male-circle.png'}} style={[
                        styles.icon,
                    ]} className="text-center justify-center"/>
                </TouchableOpacity>
            </View>
            <View className="shadow-3xl shadow-[#00000040] py-[20px] px-[15px]">
                <View className="flex flex-row items-center">
                    <Image source={require('../../assets/app/bye.png')}/>
                    <Text className="text-[24px] font-bold text-[#303437]" style={{fontFamily: 'Sora-Bold'}}> {getGreeting()}</Text>
                </View>
                    <Text className="text-[16px] text-[#404446]" style={{fontFamily: 'Sora-Light'}}>
                    {
                        forItem == 'menu' ? 'What would you like to do today?'  : 'Who would you like to read about today?'
                    }
                    
                </Text>

            </View>

            {/* <View className="w-[100%] mr-auto bg-white py-[8] px-[8px] rounded-[25px] items-left justify-center mt-[10px]">
                
                <Text className="text-[15px] font-bold text-gray-600" >Currently Viewing for: {
                    filterType == 'party' ? selected : selectedPos
                }</Text>
            </View> */}
            <View>

            </View>
        </View>





                




    </View>
  )
}

const styles= StyleSheet.create({
    container:{
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#008F43',


    },
   

    iconContainer:{
        flexDirection: 'row',
    },
    logo: {
        width: 100,
        height: 50,
        resizeMode: 'contain',

    },
    icon: {
        width: 30,
        height: 30,
        resizeMode: 'contain'
    },
    unreadBadge: {
        backgroundColor: '#ff3250',
        position:'absolute',
        left: 24,
        bottom: 30,
        width: 25,
        height: 18,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100
    },
    unreadBadgeText:{
        color: 'white',
        fontWeight: 'bolder',
    },
    input: {
        height: 40,
        marginVertical: 12,
        padding: 10,
        borderWidth: 1,
        color: '#008F43',
        backgroundColor: '#ffffff',
        borderColor: '#fff',
        borderRadius: 10

      },
      containerShadow:{
        // boxShadow: '9px 10px 10px #',
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 10},
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3,
        backgroundColor: '#008F43'

    },

});

export default Header