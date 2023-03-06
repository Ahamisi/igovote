import { View, Text, StyleSheet, Pressable, TouchableOpacity, Image } from 'react-native'
import React, {useState} from 'react'



export const bottomTabIcons = [
    {
        name: 'Home',
        active: 'https://img.icons8.com/fluency-systems-filled/144/009244/home.png',
        inactive:
          'https://img.icons8.com/fluency-systems-regular/48/000000/home.png',
          goTo: 'HomeScreen',
          text: 'Home',
      },
      {
        name: 'ElectionMonitor',
        active: 'https://img.icons8.com/50/009244/document.png',
        inactive: 'https://img.icons8.com/50/000000/document.png',
        goTo: 'ElectionMonitor',
        text: 'Upload Result',

      },
      {
        
        
        name: 'LiveUpdates',
        active: 'https://img.icons8.com/50/009244/youtube-live.png',
        inactive: 'https://img.icons8.com/50/000000/youtube-live.png',
        goTo: 'LiveUpdates',
        text: 'Live Updates',

      },
      {
        name: 'Profile',
        active: 'https://img.icons8.com/50/009244/settings--v1.png',
        inactive: 'https://img.icons8.com/ios/500/000000/settings--v1.png',
        goTo : 'Profile',
        text: 'Setting',

      },
]





const BottomTab = ({icons, navigation, tabName}) => {
    const [activeTab, setactiveTab] = useState(tabName)

    const Icon = ({icon}) =>(
        <TouchableOpacity onPress={() =>{
            setactiveTab(icon.name)
            navigation.push(icon.goTo, {userDetail: true})

        }}>
            <View>
                <Image source={{uri: activeTab == icon.name ? icon.active : icon.inactive}} style={[
                    styles.icon,
                ]} className="text-center justify-center"/>
                <Text className={activeTab == icon.name ? 'text-[#009244] text-center text-[8px] font-normal' : 'text-black text-center text-[8px] font-normal'} style={{fontFamily: 'Sora-Light'}}>{icon.text}</Text>
            </View>

        </TouchableOpacity> 
    )
  return (
    <View style={styles.wrapper} className="rounded-lg p-[10px] absolute bottom-0">
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
        zIndex: 999,
        backgroundColor: '#fff',
        // marginTop: '100%'
    },
    container:{
        flexDirection:'row',
        justifyContent: 'space-around',
        height: 50,
        paddingTop: 10,
        marginBottom: 12
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