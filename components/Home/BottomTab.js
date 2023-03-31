import { View, Text, StyleSheet, Pressable, TouchableOpacity, Image } from 'react-native'
import React, {useState} from 'react'



export const bottomTabIcons = [
    {
        name: 'MainMenu',
        active: 'https://img.icons8.com/50/009244/home.png',
        inactive:
          'https://img.icons8.com/50/000000/home.png',
          goTo: 'MainMenu',
          text: 'Main Menu',
      },
    {
        name: 'HomeScreen',
        active: 'https://img.icons8.com/50/009244/user.png',
        inactive:
          'https://img.icons8.com/50/000000/user.png',
          goTo: 'HomeScreen',
          text: 'Aspirants Info',
      },
      {
        
        
        name: 'LiveUpdates',
        active: 'https://img.icons8.com/50/009244/youtube-live.png',
        inactive: 'https://img.icons8.com/50/000000/youtube-live.png',
        goTo: 'LiveUpdates',
        text: 'Polling Unit Updates',

      },
      {
        name: 'ElectionMonitor',
        active: 'https://img.icons8.com/50/009244/document.png',
        inactive: 'https://img.icons8.com/50/000000/document.png',
        goTo: 'ElectionMonitor',
        text: 'Polling Unit Results',

      },
    //   {
    //     name: 'Profile',
    //     active: 'https://img.icons8.com/50/009244/settings--v1.png',
    //     inactive: 'https://img.icons8.com/ios/500/000000/settings--v1.png',
    //     goTo : 'Profile',
    //     text: 'Setting',

    //   },
]





const BottomTab = ({icons, navigation, tabName}) => {
    const [activeTab, setactiveTab] = useState(tabName)

    const Icon = ({icon}) =>(
        <TouchableOpacity onPress={() =>{
            setactiveTab(icon.name)
            navigation.push(icon.goTo, {userDetail: true})

        }}>
            <View className="items-center">
                {/* {console.log(activeTab, icon.name)} */}
                <Image source={{uri: activeTab == icon.name ? icon.active : icon.inactive}} style={[
                    styles.icon,
                ]} className="items-center"/>
                <Text className={activeTab == icon.name ? 'text-[#008F43] text-center text-[8px] font-normal' : 'text-black text-center text-[8px] font-normal'} style={{fontFamily: 'Sora-Light'}}>{icon.text}</Text>
            </View>

        </TouchableOpacity> 
    )
  return (
    <View style={styles.wrapper} className="rounded-lg p-[10px] pt-[5px] absolute bottom-0 shadow-2xl">
        <View style={styles.container}>
            {icons.map((icon,index) => (
               <View key={`iconcont${index}`}>
                    <Icon key={index} icon={icon}/>
               </View>
            ))}
        </View>
    </View>
  )
}


const styles = StyleSheet.create({
    wrapper: {
        position:'absolute',
        width: '100%',
        bottom: '0%',
        backgroundColor: '#fff',
        shadowColor: 'black',
        shadowOffset: {width: 0, height: -8},
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 8,
        // marginTop: '100%'
    },
    container:{
        flexDirection:'row',
        justifyContent: 'space-around',
        height: 50,
        paddingTop: 10,
        marginBottom: 12
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
    icon:{
        width: 30,
        height: 30,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 3

    },
    profilePic: (activeTab = '') => (
        {
            borderRadius:50,
            borderColor: '#fff',
            borderWidth: activeTab == 'Profile' ? 2 : 0
        }
    )
})

export default BottomTab