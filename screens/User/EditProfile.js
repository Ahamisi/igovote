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







const EditProfile = ({navigation}) => {


    const [Editting, setEditting] = useState(false)
    const [puDelimitation, setPuDelimitation] = useState(null);


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
                        await Auth.signOut();
                        navigation.push('BeforeAuth')
                    },
                }
            ])
            

        } catch (error) {
            console.log('error signing out: ', error);
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
    <SafeAreaView className="bg-[#009244]">

        <ScrollView className="bg-[#eeeeee] pt-[10%] h-full relative">



        <View className="bg-[#eeeeee] h-full relative">
            {/* <GoBack bg="bg-[#edefee]"/> */}
            <View style={{flexDirection: 'column',backgroundColor: '#ffffff'}} className="rounded-2xl">
                <View style={styles.container} className="px-[20px]">
                    <View className="pt-[20px]">
                    <Text style={styles.groupHeading}>Your Achievements</Text>
                    </View>
                    <View style={{}}>
                    <TouchableOpacity>
                        <Icon name="angle-right" size={20} color="#009244" />
                    </TouchableOpacity>
                    </View>
                </View>
                <View className="bg-[#edefee] m-0 py-[20px] rounded-2xl px-[20px]">
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
                </View>
            </View>


            {/* edit profile button */}
            <View style={{flexDirection: 'column',backgroundColor: '#ffffff'}} className="">
                <View style={styles.container} className="px-[20px] mt-[20px]">
                    <View>
                    <Text style={styles.groupHeading}>Edit your profile</Text>
                    </View>
                    <View style={{}}>
                    <TouchableOpacity>
                        <Icon name="angle-right" size={20} color="#009244" />
                    </TouchableOpacity>
                    </View>
                </View>
                <View className="bg-[#edefee] m-0 py-[20px] rounded-2xl px-[20px]">
                    <View className="flex flex-row justify-between mb-[20px]">
                        <Text className="text-left font-bold">
                            Email:
                        </Text>
                        <Text className="text-right font-bold">
                            {GlobalUser?.name}
                        </Text>
                    </View>

                    <View className="flex flex-row justify-between mb-[20px]">
                        <Text className="text-left font-bold">
                            Gender:
                        </Text>
                        <Text className="text-right font-bold">
                            {GlobalUser?.gender}

                        </Text>
                    </View>

                    <View className="flex flex-row justify-between mb-[20px]">
                        <Text className="text-left font-bold">
                            State:
                        </Text>
                        <Text className="text-right font-bold">
                        {GlobalUser?.state}

                        </Text>
                    </View>

                    <View className="flex flex-row justify-between mb-[20px]">
                        <Text className="text-left font-bold">
                            LGA:
                        </Text>
                        <Text className="text-right font-bold">
                        {GlobalUser?.lga}

                        </Text>
                    </View>
                    <View className="flex flex-row justify-between mb-[20px]">
                        <Text className="text-left font-bold">
                            Ward:
                        </Text>
                        <Text className="text-right font-bold">
                        {GlobalUser?.ward}

                        </Text>
                    </View>
                    <View className="flex flex-row justify-between mb-[20px]">
                        <Text className="text-left font-bold">
                            Polling Code:
                        </Text>
                        <Text className="text-right font-bold">
                        {GlobalUser?.pu}


                        </Text>
                    </View>
                    <TouchableOpacity className="bg-[#009244] flex text-white flex-row items-center justify-center px-[20px] py-[12px]" onPress={onOpen}>
                        <Text className="text-white font-bold text-lg">Edit Profile &nbsp;</Text>
                        <Icon name="pencil-alt" size={20} color="#fff" />
                    </TouchableOpacity>
                </View>
            </View>





               {/* edit profile button */}
            <View style={{flexDirection: 'column',backgroundColor: '#ffffff'}} className="block pb-[100px]">
                <View style={styles.container} className="px-[20px] mt-[20px]">
                    <View>
                    <Text style={styles.groupHeading}>App Actions</Text>
                    </View>
                    <View style={{}}>
                    <TouchableOpacity>
                        <Icon name="angle-right" size={20} color="#009244" />
                    </TouchableOpacity>
                    </View>
                </View>
                <View className="bg-[#edefee] m-0 py-[20px] rounded-2xl px-[20px]">


                <View className="flex flex-row justify-between mb-[20px]">
                        <Text className="text-left font-bold">
                            Love the Project ?
                        </Text>
                        <Text className="text-right font-bold">
                            <TouchableOpacity className="bg-[#009244] px-[14px] py-[10px] rounded-lg">
                                <Text className="text-white font-bold"><A href="https://igovote.org/donate">Donate</A></Text>
                            </TouchableOpacity>
                            
                        </Text>
                </View>








                    <View className="flex flex-row justify-between mb-[20px]">
                        <Text className="text-left font-bold">
                            Delete Account ?
                        </Text>
                        <Text className="text-right font-bold">
                            <TouchableOpacity onPress={() => handleSignOut(true)}>
                                <Text className="text-red-600">Delete</Text>
                            </TouchableOpacity>
                            
                        </Text>
                    </View>

                  

                   
                    <View className="">
                        <TouchableOpacity className="bg-[#009244] flex text-white flex-row items-center justify-center px-[20px] py-[12px]" onPress={handleSignOut}>
                            <Text className="text-white font-bold text-lg">Logout</Text>
                            {/* <Icon name="right-" size={20} color="#fff" /> */}
                        </TouchableOpacity>
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
    },
    container: {
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      marginBottom: 20
    }
})