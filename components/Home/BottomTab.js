import { View, Text, StyleSheet, Pressable, TouchableOpacity, Image } from 'react-native'
import React, {useState} from 'react'



export const bottomTabIcons = [
    {
        name: 'Home',
        active: 'https://img.icons8.com/fluency-systems-filled/144/009244/home.png',
        inactive:
          'https://img.icons8.com/fluency-systems-regular/48/000000/home.png',
          goTo: 'HomeScreen'
      },
      {
        name: 'ElectionMonitor',
        active: 'https://img.icons8.com/ios-filled/50/009244/binoculars.png',
        inactive: 'https://img.icons8.com/ios-filled/50/000000/binoculars.png',
        goTo: 'ElectionMonitor'
      },
      {
        
        name: 'LiveUpdates',
        active: 'https://img.icons8.com/ios-filled/50/009244/documentary.png',
        inactive: 'https://img.icons8.com/ios-filled/50/000000/documentary.png',
        goTo: 'LiveUpdates'
      },
      {
        name: 'Profile',
        active: 'https://img.icons8.com/ios-filled/50/009244/settings--v1.png',
        inactive: 'https://img.icons8.com/ios/500/000000/settings--v1.png',
        goTo : 'Profile'
      },
]

// vote-yea.png"





const BottomTab = ({icons, navigation, tabName}) => {
    const [activeTab, setactiveTab] = useState(tabName)

    const Icon = ({icon}) =>(
        <TouchableOpacity onPress={() =>{
            setactiveTab(icon.name)
            navigation.push(icon.goTo)
        }}>
            <Image source={{uri: activeTab == icon.name ? icon.active : icon.inactive}} style={[
                styles.icon,
            ]}/>
        </TouchableOpacity> 
    )

  return (
    <View style={styles.wrapper} className="rounded-lg p-[10px] absolute bottom-0">
        <View style={styles.container}>
            {icons.map((icon,index) => (
                <Icon key={index} icon={icon}/>
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
    },
    icon:{
        width: 30,
        height: 30
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