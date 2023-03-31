import { View, Text, SafeAreaView, StyleSheet, ScrollView, LogBox, TextInput, TouchableOpacity, Image } from 'react-native'
import React, {useEffect, useState, useRef} from 'react';
import Parties from '../components/Home/Parties';
import Positions from '../components/Home/Positions';

// components
import Header from '../components/Home/Header';
import CandidateGroup from '../components/Home/CandidateGroup';
import Achievements from '../components/Home/Achievements';
import { Modalize } from 'react-native-modalize';
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { FontAwesome } from "@expo/vector-icons";

import AsyncStorage from '@react-native-async-storage/async-storage';




import Amplify, { Auth, DataStore } from "aws-amplify";
import { UserProfile } from '../src/models';

import * as Updates from "expo-updates"

import '@azure/core-asynciterator-polyfill'







import BottomTab, {bottomTabIcons} from '../components/Home/BottomTab';
import Profile from './User/Profile';
import CandidateGroupGovernorship from '../components/Home/CandidateGroupGovernorship';
import CandidateGroupSenatorial from '../components/Home/CandidateGroupSenatorial';
import CandidateGroupHOR from '../components/Home/CandidateGroupHOR';
import CandidateGroupHOA from '../components/Home/CandidateGroupHOA';
import { color } from 'react-native-reanimated';



const MainMenu = ({navigation,route}) => {

  const { userDetail } = route.params;


  const [newUser, setnewUser] = useState(true)
  const [savedUserProfile, setSavedUserProfile] = useState({})
  const [partySelected, setPartySelected] = useState('')
  const [positionSelected, setPositionSelected] = useState('')
  const [filterType, setFilterType] = useState('')
  const [filtering, setFiltering] = useState(false)
  const [sorting, setSorting] = useState(false)
  const [sortType, setSortType] = useState('age')
  const [searchKey, setSearchKey] = useState('')






  const [ScreenOrigin, setScreenOrigin] = useState('')


  const setUserSub = async (currentUser) => {
    AsyncStorage.setItem('usersub',currentUser)
}



  const Logout = async () => {
    try {
        await AsyncStorage.removeItem('@userProfile');
        await AsyncStorage.removeItem('@userData');
        await Auth.signOut();
        console.log('logged out')
    } catch (error) {
        console.log('error signing out: ', error);
    }
   
  
}


  useEffect(() => {
    if (route.params?.selectedParty) {
      if(filterType == 'party'){
        setPartySelected(route.params?.selectedParty)
        setPositionSelected('')
      }else{
        setPartySelected('')
        setPositionSelected(route.params?.selectedParty)
      }
      // Post updated, do something with `route.params.post`
      // For example, send the post to the server

    }
  }, [route.params?.selectedParty]);








  const checkUserProfile = async () =>{
      //  get user  from cognito
      const values = await AsyncStorage.getItem('@userData');
      const parsedValue = values ? JSON.parse(values) : {}
      let userId = ''
      if(parsedValue && parsedValue.length > 0){
         userId = parsedValue.attributes.sub;
      }else{
        const userInfo = await Auth.currentAuthenticatedUser();
        userId = userInfo.attributes.sub;
      }


      if (!userId) {
        return;
      }

      try {     
        await AsyncStorage.setItem('userid',`${userId}`);
      } catch (error) {
        console.log(error)
      }

      const user = (await DataStore.query(UserProfile)).find(UserProfile => UserProfile.sub == userId);
      console.log(user,'zombie',userId)


      setSavedUserProfile(user)
      setnewUser(false)


      if(typeof user == 'undefined'){
        setnewUser(true)
        // onOpen()
      }else{
        AsyncStorage.setItem('@userProfile', JSON.stringify(user));
        setSavedUserProfile(user)
        setnewUser(false)

      }
  }

  const checkIfNewUser = async () => {
    await checkUserProfile()

 
    console.log(userDetail,'onpoensss')

    if(!userDetail || userDetail == 'onpoen'){
      setnewUser(true)
      // onOpen()
    }else{
      setnewUser(false)
      await checkUserProfile()
    }



  }
  


  const getSelectedParty = async () => {
    try {
      const value = await AsyncStorage.getItem('selected_party')
      if(value !== null) {
        setPartySelected(value)
        // value previously stored
      }else{
        // setPartySelected('A')
        try {     
            await AsyncStorage.setItem('selected_party','A');
        }
        catch (error) {
          console.log(error)
        }

      }
    } catch(e) {
      console.log(e)
      // error reading value
    }
  }


  const getSelectedPosition = async () => {
    console.log('runner lambas')
    try {
      const value = await AsyncStorage.getItem('selected_position')
      if(value !== null) {
        setPositionSelected(value)
        // value previously stored
      }else{
        try {     
            await AsyncStorage.setItem('selected_position','presidential');
        }
        catch (error) {
          console.log(error)
        }

      }
    } catch(e) {
      console.log(e)
      // error reading value
    }
  }

  const getFilterBy = async () => {
    try{
      const value = await AsyncStorage.getItem('@appView')
      console.log(value,'japajapa')
      if(value == 'party'){
        setFilterType('party');
        // setPartySelected('A')
      }else{
        setFilterType('position'); 
        // setPositionSelected('presidential')
      }


    }catch(e) {
      console.log(e)
    }
  }




let typingTimer;

const doSearchUpdate = (text) => {
  // clearTimeout(typingTimer);
  setSearchKey(text)
  // console.log(searchKey,'bisoclombo')

  // typingTimer = setTimeout(() => {
  //   setSearchKey(text)
  //   console.log(searchKey,'bisoclombo')
  // }, '500');


}


  useEffect(() => {  
    reactToUpdates()
    checkIfNewUser();
    getSelectedParty();
    getSelectedPosition();
    getFilterBy();

    LogBox.ignoreLogs([
      'Non-serializable values were found in the navigation state',
    ]);

  },[])


  const reactToUpdates = async () => {

    Updates.addListener((event) => {
      if(event.type === Updates.UpdateEventType.UPDATE_AVAILABLE){
        // alert("An update is available. Restart your app to see it")
        Updates.reloadAsync()
      }
    })

  }





// filter by

const [current, setCurrent] = useState("position");

    const doCurrentChange = async (value) =>{
        setCurrent(value)
        await AsyncStorage.removeItem('@appView')
        await AsyncStorage.setItem('@appView', value)
        setAppView()
        getFilterBy()
        getSelectedPosition()
        getSelectedParty()
        navigation.navigate({
          name: 'HomeScreen',
          merge: true,
        });
        
    }


    const doSortChange = async (value) =>{
      await AsyncStorage.removeItem('@appSort')
      await AsyncStorage.setItem('@appSort', value)
      setSortType(value)
      getFilterBy()
      getSelectedPosition()
      getSelectedParty()
      navigation.navigate({
        name: 'HomeScreen',
        merge: true,
      });
      
  }

    


    const setAppView = async () => {
        const curItem = await AsyncStorage.getItem('@appView')
        console.log(curItem, 'indomiess')
        setCurrent(curItem)
    }


    useEffect(() => {
        setAppView()
    }, [current])
    








  return (

    <SafeAreaView style={styles.container} className="bg-[#008F43] text-white">

          <View style={{flexDirection: 'column',backgroundColor: '#ffffff'}}>
              <View className=" pb-[100%]">
                <Header selected={partySelected} selectedPos={positionSelected} forItem="menu" navigation={navigation} filterType={filterType}/>

                <TouchableOpacity onPress={() => navigation.push('HomeScreen',{userDetail: savedUserProfile})}>
                    <View className="m-[20px] border-[#E3E5E5] border rounded-[24px] mb-[10px] mt-[5px]">
                        <View className="flex flex-row justify-between p-[22px] gap-[22px] items-center">
                            <View className="">
                                <Image source={require('../assets/app/users.png')}/>
                            </View>
                            <View className="w-[70%]">
                                <View>
                                    <Text className="text-[16px] font-[700]" style={{fontFamily: 'Sora-Bold'}}>Aspirants Info</Text>
                                </View>
                                <View className=" flex flex-row mt-[6px]">
                                    <Text style={{fontFamily:'Sora-Light',flex: 1, flexWrap: 'wrap'}}>Learn about every candidate running for public office</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>


                <TouchableOpacity onPress={() => navigation.push('LiveUpdates',{userDetail: savedUserProfile})}>
                    <View className="m-[20px] border-[#E3E5E5] border rounded-[24px] mb-[10px]">
                        <View className="flex flex-row justify-between p-[22px] gap-[22px] items-center">
                            <View className="">
                                <Image source={require('../assets/app/radio.png')}/>
                            </View>
                            <View className="w-[70%]">
                                <View>
                                    <Text className="text-[16px] font-[700]" style={{fontFamily: 'Sora-Bold'}}>Polling unit updates</Text>
                                </View>
                                <View className=" flex flex-row mt-[6px]">
                                    <Text style={{fontFamily:'Sora-Light',flex: 1, flexWrap: 'wrap'}}>Post videos & pictures of events happening at your polling unit</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>


                <TouchableOpacity onPress={() => navigation.push('ElectionMonitor',{userDetail: savedUserProfile})}>
                    <View className="m-[20px] border-[#E3E5E5] border rounded-[24px] mb-[10px]">
                        <View className="flex flex-row justify-between p-[22px] gap-[22px] items-center">
                            <View className="">
                                <Image source={require('../assets/app/file-text.png')}/>
                            </View>
                            <View className="w-[70%]">
                                <View>
                                    <Text className="text-[16px] font-[700]" style={{fontFamily: 'Sora-Bold'}}>Post election results</Text>
                                </View>
                                <View className=" flex flex-row mt-[6px]">
                                    <Text style={{fontFamily:'Sora-Light',flex: 1, flexWrap: 'wrap'}}>Monitor voting results at your polling units & post the evidences</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.push('PuLocator',{userDetail: savedUserProfile})}>
                    <View className="m-[20px] border-[#E3E5E5] border rounded-[24px] mb-[10px]">
                        <View className="flex flex-row justify-between p-[22px] gap-[22px] items-center">
                            <View className="">
                                <Image source={require('../assets/app/placeholder.png')} className="h-[55px] w-[55px]"/>
                            </View>
                            <View className="w-[70%]">
                                <View>
                                    <Text className="text-[16px] font-[700]" style={{fontFamily: 'Sora-Bold'}}>Locate Polling Unit</Text>
                                </View>
                                <View className=" flex flex-row mt-[6px]">
                                    <Text style={{fontFamily:'Sora-Light',flex: 1, flexWrap: 'wrap'}}>Navigate to your polling area and vote on election day</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>










              </View>
             
          </View>
          <BottomTab icons={bottomTabIcons} navigation={navigation} tabName='MainMenu'/>
          

{/* 
      {
           newUser &&
              <Modalize ref={modalizeRef} closeOnOverlayTap={false} panGestureEnabled={false}>
                {
                  <Profile navigation={navigation}/>

                }
            </Modalize>
      }
      */}


      

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#008F43',
      flex: 1,
    },
    // input:{
    //   backgroundColor: '#fff',
    //   padding: 14,
    //   borderRadius: 30,
    //   shadowColor: 'black',
    //   shadowOpacity: 0.25,
    //   shadowOffset: { width: 0, height: 2},
    //   shadowRadius: 10,
    //   elevation: 2,
    //   backgroundColor: 'white'
      

    // },

    input:{
      shadowColor: "#00000033",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,

    elevation: 24,
    backgroundColor: '#fff',
    borderRadius: 30,
    padding: 15,
    fontFamily: 'Sora-Light',
      

    },
    
})

export default MainMenu
