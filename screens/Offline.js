import { View, Text, Image, TouchableOpacity, SafeAreaView, StyleSheet } from 'react-native'
import React, {useState} from 'react';








const Offline = ({navigation}) => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [hasLoggedIn, setHasLoggedIn] = useState(false)





  return (
        <SafeAreaView className="bg-white">
            <View className="flex items-center  align-middle  justify-center mt-[40%]">
                <Image className="h-[80px] w-[80px]" source={require('../assets/app/disconnected.png')} />
                <Text className="font-extrabold mt-[10px]">Opps, connect to internet</Text>
            </View>
        </SafeAreaView>
  )
}



const styles = StyleSheet.create({
    wrapper:{
        marginTop: 80,
    },
    inputField:{
        marginBottom: 10,
        boxShadow: '2px 0px 1px #0000008a',
        shadowColor: '#0000008a',
        shadowOffset: {width: -1, height: 3},
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    button: isValid =>({
        backgroundColor: isValid ? '#009244' : '#b5e2cd',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 42,
        borderRadius: 4
    }),
    buttonText:{
        fontWeight: '600',
        color: '#fff',
        fontSize: 20
    },
    signupContainer:{
        flexDirection: 'row',
        width: '100%',
        marginTop: 50,
        justifyContent: 'center'
    }   
})

export default Offline