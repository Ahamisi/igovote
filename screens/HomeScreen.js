import { View, Text, SafeAreaView, StyleSheet, ScrollView } from 'react-native'
import React, {useEffect, useState, useRef} from 'react';
import Parties from '../components/Home/Parties';

// components
import Header from '../components/Home/Header';
import CandidateGroup from '../components/Home/CandidateGroup';
import Achievements from '../components/Home/Achievements';
import { Modalize } from 'react-native-modalize';

import AsyncStorage from '@react-native-async-storage/async-storage';


import Amplify, { Auth, DataStore } from "aws-amplify";
import { UserProfile } from '../src/models';

import '@azure/core-asynciterator-polyfill'





import BottomTab, {bottomTabIcons} from '../components/Home/BottomTab';
import Profile from './User/Profile';
import CandidateGroupGovernorship from '../components/Home/CandidateGroupGovernorship';
import CandidateGroupSenatorial from '../components/Home/CandidateGroupSenatorial';
import CandidateGroupHOR from '../components/Home/CandidateGroupHOR';
import CandidateGroupHOA from '../components/Home/CandidateGroupHOA';



const HomeScreen = ({navigation,route}) => {

  const [newUser, setnewUser] = useState(true)
  const [savedUserProfile, setSavedUserProfile] = useState({})
  const [partySelected, setPartySelected] = useState('')
  const [ScreenOrigin, setScreenOrigin] = useState('')


  const Logout = async () => {
    try {
        await Auth.signOut();
        console.log('logged out')
    } catch (error) {
        console.log('error signing out: ', error);
    }
   
  
}


  useEffect(() => {
    if (route.params?.selectedParty) {
      setPartySelected(route.params?.selectedParty)
      // Post updated, do something with `route.params.post`
      // For example, send the post to the server

    }
  }, [route.params?.selectedParty]);








  const modalizeRef = useRef(null);
  const onOpen = () => {
    modalizeRef.current?.open();
  };

  const checkIfNewUser = async () => {
    // get user  from cognito
    const userInfo = await Auth.currentAuthenticatedUser();

    if (!userInfo) {
      return;
    }
    const userId = userInfo.attributes.sub;

    const user = (await DataStore.query(UserProfile)).find(UserProfile => UserProfile.sub === userId);



    if(typeof user == 'undefined'){
      setnewUser(true)
      onOpen()


    }else{
      setnewUser(false)
      setSavedUserProfile(user)
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


  useEffect(() => {  
  
    checkIfNewUser();
    getSelectedParty();

  },[])


  return (

    <SafeAreaView style={styles.container}>
     {
      !newUser &&
          <>
          
          <View style={{flexDirection: 'column',backgroundColor: '#edefee'}}>
              <View className="bg-[#009244] pb-[40px]">
                <Header selected={partySelected}/>
              </View>
              {/* <Achievements/> */}
                <View className="rounded-t-[200px]">

                  <Parties selected={partySelected} partySelected={partySelected} navigation={navigation}/>
                    <View style={{ marginVertical: 8}} className="flex mb-[20px]">
                      {savedUserProfile && partySelected &&
                          <>
                          
                          <ScrollView className="mb-[100px]"  showsVerticalScrollIndicator={true}>
                            <CandidateGroup groupHeading='Presidential' groupKey='presidential' userState={newUser} userProfile={savedUserProfile} partySelected={partySelected} navigation={navigation} />
                            <CandidateGroupGovernorship groupHeading='Governorship' groupKey='governorship' userState={newUser} userProfile={savedUserProfile} partySelected={partySelected} navigation={navigation}/>
                            <CandidateGroupSenatorial groupHeading='Senatorial' groupKey='senatorial' userState={newUser} userProfile={savedUserProfile} partySelected={partySelected} navigation={navigation}/>
                            <CandidateGroupHOR groupHeading='House of Representatives' groupKey='hor' userState={newUser} userProfile={savedUserProfile} partySelected={partySelected} navigation={navigation}/>
                            <CandidateGroupHOA groupHeading='House of Assembly' groupKey='hoa' userState={newUser} userProfile={savedUserProfile} partySelected={partySelected} navigation={navigation}/>
                            <View className="mb-[250px]">

                            </View>
                          
                          </ScrollView>
        
                          
                          
                          </>
                      }
                      
                    </View>

                </View>
            </View>
            <BottomTab icons={bottomTabIcons} navigation={navigation} tabName='Home'/>
          
          
          </>
     }


      {
           newUser &&
              <Modalize ref={modalizeRef} closeOnOverlayTap={false} panGestureEnabled={false}>
                {
                  <Profile navigation={navigation}/>

                }
            </Modalize>
      }
     


      

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#009244',
      flex: 1
    }
})

export default HomeScreen
