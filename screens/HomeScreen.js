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



const HomeScreen = ({navigation,route}) => {

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







  const modalizeRef = useRef(null);
  const onOpen = () => {
    modalizeRef.current?.open();
  };

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
      if(typeof user == 'undefined'){
        setnewUser(true)
        onOpen()
      }else{
        AsyncStorage.setItem('@userProfile', JSON.stringify(user));
        setSavedUserProfile(user)
        setnewUser(false)

      }
  }

  const checkIfNewUser = async () => {
    await checkUserProfile()

 
    // console.log(userDetail,'onpoensss')

    // if(!userDetail || userDetail == 'onpoen'){
    //   setnewUser(true)
    //   onOpen()
    // }else{
    //   setnewUser(false)
    //   await checkUserProfile()
    // }



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

    <SafeAreaView style={styles.container} className="bg-[#009244] text-white">
     {
      !newUser &&
          <>
          
          <View style={{flexDirection: 'column',backgroundColor: '#ffffff'}}>
              <View className=" pb-[40px]">
                <Header selected={partySelected} selectedPos={positionSelected}  navigation={navigation} filterType={filterType}/>
                <View className="flex flex-row items-center justify-between ml-[20px]">
                  <View className="w-[75%]">
                    <TextInput
                      style={styles.input}
                      placeholder="Search Candidate by keyword"
                      keyboardType="text"
                      onChangeText={(text) => {doSearchUpdate(text)}}
                      
                    />
                  </View>
                  {/* <i class="fa-light fa-arrow-up-wide-short"></i> */}
                  <View className="w-[25%] flex flex-row justify-end gap-[5px] mr-[28px]">
                   
                    <View className="items-center">
                       <TouchableOpacity onPress={() => setSorting(previousValue => !previousValue) } className="items-center">
                        {
                          sorting  ? <Image source={require('../assets/app/sort-active.png')} className={`w-[20px] h-[20px] rounded-[9999px]`}/> : <Image source={require('../assets/app/sort-inactive.png')} className={` w-[20px] h-[20px] rounded-[9999px] `}/>
                        }
                        <View className="mt-[3px] items-center">
                          <Text className="text-[8px]" style={{fontFamily: 'Sora-Medium'}}> Sort:</Text>
                          <Text className="text-[#008F43] text-[8px]" style={{fontFamily: 'Sora-Medium'}}>{sortType}</Text>
                        </View>
                       </TouchableOpacity>
                    </View>


                    <View className="items-center pr-[18px]">
                       <TouchableOpacity onPress={() => setFiltering(previousValue => !previousValue) } className="items-center">
                        {
                          filtering  ? <Image source={require('../assets/app/filter-active.png')} className={`w-[20px] h-[20px] rounded-[9999px]`}/> : <Image source={require('../assets/app/filter-inactive.png')} className={` w-[20px] h-[20px] rounded-[9999px] `}/>
                        }
                        <View className="mt-[3px] items-center">
                          <Text className="text-[8px]" style={{fontFamily: 'Sora-Medium'}}>Filter:</Text>
                          <Text className="text-[#008F43] text-[8px]" style={{fontFamily: 'Sora-Medium'}}>{filterType}</Text>
                        </View>
                       </TouchableOpacity>
                    </View>
                  </View>
                </View>
                

              {/* filter options */}
              <View className={`${ filtering ? 'flex' : 'hidden'} flex-row items-center justify-between ml-[20px] mt-[23px]`}>

                    <View className="flex flex-row border-[#008F43] border-2 rounded-[16px] p-[12px] pt-[10px] gap-[8px] items-center">
                      <View className="flex flex-row">
                        <TouchableOpacity className="flex flex-row items-center gap-[10px]" onPress={() => doCurrentChange('position')}>
                          {
                            filterType == 'position' ? <Image source={require('../assets/app/checked.png')} className={`p-[5px] w-[20px] h-[20px] rounded-[9999px] ml-[6px] shadow-2xl`}/> : <Image source={require('../assets/app/unchecked.png')} className={`p-[5px] w-[20px] h-[20px] rounded-[9999px] ml-[6px] shadow-2xl`}/>
                          }
                          <Text className="text-[12px] text-[#008F43] leading-[15px]">Position</Text>
                          </TouchableOpacity>
                      </View>

                      <View className="flex flex-row">
                        <TouchableOpacity className="flex flex-row items-center gap-[10px]" onPress={() => doCurrentChange('party')}>
                          {
                            filterType == 'party' ? <Image source={require('../assets/app/checked.png')} className={`p-[5px] w-[20px] h-[20px] rounded-[9999px] ml-[6px] shadow-2xl`}/> : <Image source={require('../assets/app/unchecked.png')} className={`p-[5px] w-[20px] h-[20px] rounded-[9999px] ml-[6px] shadow-2xl`}/>
                          }
                          <Text className="text-[12px] text-[#008F43] leading-[15px]">Party</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                 
              </View>



               {/* filter options */}
               <View className={`${ sorting ? 'flex' : 'hidden'} flex-row items-center justify-between ml-[20px] mt-[23px]`}>

                <View className="flex flex-row border-[#008F43] border-2 rounded-[16px] p-[12px] pt-[10px] gap-[8px] items-center">
                  <View className="flex flex-row">
                    <TouchableOpacity className="flex flex-row items-center gap-[10px]" onPress={() => doSortChange('age')}>
                      {
                        sortType == 'age' ? <Image source={require('../assets/app/checked.png')} className={`p-[5px] w-[20px] h-[20px] rounded-[9999px] ml-[6px] shadow-2xl`}/> : <Image source={require('../assets/app/unchecked.png')} className={`p-[5px] w-[20px] h-[20px] rounded-[9999px] ml-[6px] shadow-2xl`}/>
                      }
                      <Text className="text-[12px] text-[#008F43] leading-[15px]">Age</Text>
                      </TouchableOpacity>
                  </View>

                  <View className="flex flex-row">
                    <TouchableOpacity className="flex flex-row items-center gap-[10px]" onPress={() => doSortChange('name')}>
                      {
                        sortType == 'name' ? <Image source={require('../assets/app/checked.png')} className={`p-[5px] w-[20px] h-[20px] rounded-[9999px] ml-[6px] shadow-2xl`}/> : <Image source={require('../assets/app/unchecked.png')} className={`p-[5px] w-[20px] h-[20px] rounded-[9999px] ml-[6px] shadow-2xl`}/>
                      }
                      <Text className="text-[12px] text-[#008F43] leading-[15px]">Name</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                </View>













                {/* old filter */}
                {/* <View className="flex justify-end text-right flex-row mr-[7px]">
                    <Text className="text-white font-bold text-center justify-center text-[17px]">Filter by:&nbsp;</Text>
                    <View className="flex flex-row">
                    <RadioButtonGroup
                            containerStyle={{ marginBottom: 10,diplay:'flex', flexDirection:'row', textAlign:'center'}}
                            selected={filterType}
                            onSelected={(value) => doCurrentChange(value)}
                            radioBackground="white"
                            style={{diplay: 'flex', flexDirection:'row'}}
                        >
                            <RadioButtonItem value="party" label={
                                <Text className="text-white font-bold">Party&nbsp;&nbsp;</Text>
                            } />
                            <RadioButtonItem
                            value="position"
                            label={
                                <Text className="text-white font-bold">Position</Text>
                            }
                            />
                        </RadioButtonGroup>
                    </View>
                </View> */}











              </View>
              {/* <Achievements/> */}
                <View className="rounded-t-[200px]">
                  {
                    console.log(filterType)
                  }

                  {
                    ((filterType  == 'party' ) && (partySelected)) && <Parties selected={partySelected} partySelected={partySelected} navigation={navigation}/>
                  }
                  {
                    console.log(positionSelected,'akpabio')
                  }



                  {
                    ((filterType  == 'position') && (positionSelected))  && <Positions selected={positionSelected} partySelected={positionSelected} navigation={navigation}/>
                  }


                  



                    <View style={{ marginVertical: 8}} className="flex mb-[20px]">
                      {savedUserProfile && (partySelected || positionSelected) &&
                          <>
                          {
                            filterType  &&  

                                <>
                                
                                {
                                  filterType == 'position' && positionSelected ? 
                                   <CandidateGroup groupHeading={`${positionSelected.toUpperCase()}`} groupKey={`${positionSelected.toUpperCase()}`}  userState={newUser} userProfile={savedUserProfile} partySelected={partySelected} navigation={navigation} filterBy={filterType} positionSelected={positionSelected} sortType={sortType} searchKey={searchKey} />
                                  : 
                                  <>
                                       <ScrollView className="mb-[100px]"  showsVerticalScrollIndicator={true}>
                                          <CandidateGroup groupHeading='Presidential' groupKey='presidential' userState={newUser} userProfile={savedUserProfile} partySelected={partySelected} navigation={navigation} filterBy={current} positionSelected={positionSelected} />
                                          <CandidateGroupGovernorship groupHeading='Governorship' groupKey='governorship' userState={newUser} userProfile={savedUserProfile} partySelected={partySelected} navigation={navigation} filterBy={current}/>
                                          <CandidateGroupSenatorial groupHeading='Senatorial' groupKey='senatorial' userState={newUser} userProfile={savedUserProfile} partySelected={partySelected} navigation={navigation} filterBy={current}/>
                                          <CandidateGroupHOR groupHeading='House of Representatives' groupKey='hor' userState={newUser} userProfile={savedUserProfile} partySelected={partySelected} navigation={navigation} filterBy={current}/>
                                          <CandidateGroupHOA groupHeading='House of Assembly' groupKey='hoa' userState={newUser} userProfile={savedUserProfile} partySelected={partySelected} navigation={navigation} filterBy={current}/>
                                      </ScrollView>

                                  </>

                                }

                                                        
                            
                              <View className="mb-[250px]">

                              </View>
                              </>
                          }
                          
                          
        
                          
                          
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

export default HomeScreen
