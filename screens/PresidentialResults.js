import { View, Text, SafeAreaView,ScrollView, Image, StyleSheet, TouchableOpacity , Button, Alert} from 'react-native'
import React, {useEffect, useState, useRef} from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5';

import BottomTab, {bottomTabIcons} from '../components/Home/BottomTab';



import { WebView } from 'react-native-webview';


import AsyncStorage from '@react-native-async-storage/async-storage';

import GoBack from '../components/General/GoBack';



const PresidentialResults = ({navigation}) => {







  return (

        <View style={{flex: 1, margin: 20}} className="mt-[50px]">
            <WebView
                    style={{flex: 1, marginTop: 20}}
                    originWhitelist={['*']}
                    javaScriptEnabled={true}
                    source={{html: `<iframe width="100%" height="70%" src="https://igovote.retool.com/embedded/public/3cee2bd8-f901-4c61-a10f-7ad55fad443c" frameborder="0"></iframe>`
                    }}
            />

             <View className="flex flex-row justify-between">
                 <View className="mt-5 px-[15px]">
                <TouchableOpacity onPress={() => navigation.navigate('HomeScreen',{userDetail: 'user'})} className="bg-[#009244] px-[14px] py-[10px] rounded-lg">
                        <Text className="font-bold text-white">Go Back</Text>
                    </TouchableOpacity>
               </View>
               <View className="mt-5 px-[15px]">
                <TouchableOpacity onPress={() => navigation.navigate('ElectionMonitor')} className="bg-[#009244] px-[14px] py-[10px] rounded-lg">
                        <Text className="font-bold text-white">Add Result</Text>
                    </TouchableOpacity>
               </View>

            </View>
        </View>
        

       
        
        
  )
}

export default PresidentialResults

const styles = StyleSheet.create({
    groupHeading: {
        textTransform: 'uppercase',
        fontWeight: '700',
        color: '#000',
    },
    container: {
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      marginBottom: 20
    }
})