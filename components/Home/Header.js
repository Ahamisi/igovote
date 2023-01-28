import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import React from 'react'


const handleSignOut = async () => {
    // try{
    //     await firebase.auth().signOut()
    //     console.log('sign out successfully !!!')
    // }catch(error){
    //     console.log(error)
    // }
}



const Header = ({selected}) => {
    const messages = ['Odogwu', 'Agba', 'Chairman', 'Chief']





  return (
    <View style={styles.superContainer} className="rounded-bl-[10px]">

        <View className="py-[20px] flex relative ">
            <View className="absolute right-0 top-0">
                <Image source={require('../../assets/app/ellipse.svg')}/>
            </View>
            <View className="mt-[20px]">
                <Text className="text-[24px] font-bold text-white">👋 {messages[Math.floor((Math.random()*messages.length))]}</Text>
            </View>
            <View className="w-[100%] mr-auto bg-white py-[10] px-[8px] rounded-[25px] items-left justify-center mt-[15px]">
                <Text className="text-[15px] font-bold text-gray-600" >Currently Viewing for: {selected}</Text>
            </View>
            <View>

            </View>
        </View>








{/* 
        <View style={styles.container}>
            <TouchableOpacity>
                <Image style={styles.logo} source={require('../../assets/igv-logo.png')}/>
                <Text className="text-white font-bold text-[30px]">Hi, Kelvin !</Text>
            </TouchableOpacity>
            <View style={styles.iconContainer}>
                <TouchableOpacity>
                    <Image style={styles.icon} source={{uri:'https://img.icons8.com/fluency-systems-regular/60/ffffff/appointment-reminders--v1.png'}} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image style={styles.icon} source={{uri:'https://img.icons8.com/fluency-systems-regular/60/ffffff/circled-menu.png'}} />
                </TouchableOpacity>

            </View>
        </View> */}


        <View>
            {/* badges */}
           {/* search component */}
    









        </View>




    </View>
  )
}

const styles= StyleSheet.create({
    container:{
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginVertical: 10,
        backgroundColor: '#009244',


    },
    superContainer:{
        paddingHorizontal: 10
        
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
        marginLeft: 10,
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
        color: '#009244',
        backgroundColor: '#ffffff',
        borderColor: '#fff',
        borderRadius: 10

      },

});

export default Header