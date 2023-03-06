import { View, Text, Image, TouchableOpacity, SafeAreaView, TextInput, Alert, Pressable, StyleSheet, FlatList , Button} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Modalize } from 'react-native-modalize';
import BottomTab, {bottomTabIcons} from '../../components/Home/BottomTab';

import { FontAwesome } from "@expo/vector-icons";



import AsyncStorage from '@react-native-async-storage/async-storage';
import NewUpdate from './NewUpdate';
import LiveUpdateCard from '../../components/General/LiveUpdateCard';

import Amplify, { Auth, DataStore } from "aws-amplify";
import { LiveReports,UserProfile, ElectionPosts } from '../../src/models';
import { TouchableWithoutFeedback } from 'react-native';


import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';

import VoiceRecord from './VoiceRecord.js';
import LiveFeedCard from '../../components/General/LiveFeedCard';




const LiveUpdates = ({navigation, route}) => {


    const [updates, setUpdates] = useState([]);
    const [feeds, setFeeds] = useState([]);

    const [loading, setLoading] = useState(false);

    let puid = '';


    (async function fetchPu(){
        const values =  await AsyncStorage.getItem('@userProfile');
        const parsedValue = values ? JSON.parse(values) : {}
        puid =  parsedValue ?  `${parsedValue.pu_id}` : ''
    })()


   

    const [PuDelimitation, setPuDelimitation] = useState(puid);

    const [toggleAction, setToggleAction] = useState('updates');

    const [Spinner, setSpinner] = useState(false);


    const [isOpen, setIsOpen] = useState(false);
    const bottomSheetModalRef = useRef(null);

    const snapPoints = ["25%", "40%", "75%"];

    const handleClosePress = () => bottomSheetModalRef.current.close()



    function handlePresentModal() {
        if(isOpen){
            handleClosePress()
            setIsOpen(false)
        }else{
            bottomSheetModalRef.current?.present();
            setTimeout(() => {
              setIsOpen(true);
            }, 100);
        }
        
      }

      function doToggle(action){
        setToggleAction(action)
      }




  const fetchUpdates = async () => {
    console.log(PuDelimitation,'shaba')
        setSpinner(true);
        try {
              const currUpdates = await DataStore.query(LiveReports,  (c) => c.and(c => [
                c.report_status.eq('active'),
                c.polling_unit.eq(PuDelimitation),
                c.report_status.eq('active')

              ]), {
                sort: s => s.is_false('ASCENDING').endorsements('DESCENDING').createdAt("DESCENDING"),
                limit: 5

              });
              setUpdates(currUpdates)
        } catch (e) {
            console.log(e);
        } finally {
            console.log(updates,'sksk')
            setLoading(false);
            updates ? setSpinner(false) : '' 
            
        }
    }


    const fetchFeeds = async () => {
        console.log(PuDelimitation,'shaba')
            setSpinner(true);
            try {
                  const currUpdates = await DataStore.query(ElectionPosts,  (c) => c.and(c => [
                    c.status.eq('active'),
                    // c.polling_unit.eq(PuDelimitation),
                    c.type.eq('video'),
                    c.flagged.lt(3),
                  ]), {
                    sort: s => s.flagged('ASCENDING').endorsed('DESCENDING').createdAt("DESCENDING"),
                    limit: 10
    
                  });
                  setFeeds(currUpdates)
            } catch (e) {
                console.log(e);
            } finally {
                console.log(updates,'sksk')
                setLoading(false);
                updates ? setSpinner(false) : '' 
                
            }
        }



    const getPu = async (pu) => {

        try {
            const values = await AsyncStorage.getItem('@userProfile');
            const parsedValue = values ? JSON.parse(values) : {}
            if(!parsedValue){
                // get user  from cognito
                const userInfo = await Auth.currentAuthenticatedUser();
                if (!userInfo) {
                    return;
                }
                const userId = userInfo.attributes.sub;
                const user = (await DataStore.query(UserProfile)).find(userProfile => userProfile.sub === userId);
                setPuDelimitation(user.pu);
            }else{
                setPuDelimitation(parsedValue.pu_id)
            }
          } catch (error) {
            // Error saving data
          } finally{

          }
      }



    const modalizeRef = useRef(null);
    const onOpen = () => {
        modalizeRef.current?.open();
    };
    

    useEffect(() =>{
        getPu()
        fetchUpdates(); 
        console.log(route.params)
        if(route.params?.hideModal){
            handleClosePress()
            setIsOpen(false)
        }
    },[])




  return (
    <BottomSheetModalProvider>

        <SafeAreaView className="bg-[#009244]">
            <View className="bg-[#eeeeee] h-full relative" >
                <View className="bg-[#009244]">
                            <Text className="text-white font-bold text-[20px] pt-[15px]  pb-[30px] mx-auto  w-[95%]">Polling Unit Updates</Text>
                </View>
                <View className="flex flex-row items-center justify-between bg-white py-[8px] shadow-lg gap-3 px-[15px]">
                    <View className=" text-left">
                        
                        <Text className="font-bold">
                            Polling Unit : {PuDelimitation}
                        </Text>
                    </View>

                    <View className="flex flex-row gap-1">


                    {/* {PuDelimitation &&  */}
                                <>
                                
                                    <TouchableOpacity onPress={onOpen}>
                                        <View className="bg-[#009244] h-[30px] w-[30px] rounded-full shadow-2xl flex items-center justify-center">
                                            <Icon name="pen" size={15} color="#fff" />
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => navigation.navigate('Camera')}>
                                        <View className="bg-[#009244] h-[30px] w-[30px] rounded-full shadow-2xl flex items-center justify-center">
                                            <Icon name="camera" size={15} color="#fff" />
                                        </View>
                                    </TouchableOpacity>
                                    {/* <TouchableOpacity onPress={handlePresentModal}>
                                        <View className="bg-[#009244] h-[30px] w-[30px] rounded-full shadow-2xl flex items-center justify-center">
                                            <Icon name="microphone" size={15} color="#fff" />
                                        </View>
                                    </TouchableOpacity> */}
                                
                                </>
                        
                        {/* } */}
                        
                    </View>
                </View>
                

                <View style={styles.list}>
                <TouchableWithoutFeedback>
                <>
                
                <Text className="text-center mt-3">No Updates? pull to refresh</Text>
                <View className="flex flex-row text-center justify-center my-[10px]">
                    <TouchableOpacity onPress={() => doToggle('updates')}>
                        <View className={`px-[12px] py-[7px] border-[#009244] border-2 ${toggleAction == 'updates' ? 'bg-[#009244]' : 'bg-white'}`}>
                            <Text className={`${toggleAction == 'updates' ? 'text-white' : 'text-[#009244]'} font-bold`}>Updates</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => doToggle('feed')}>
                        <View className={`px-[12px] py-[7px] border-[#009244] border-2 ${toggleAction == 'feed' ? 'bg-[#009244]' : 'bg-white'}`}>
                            <Text className={`${toggleAction == 'feed' ? 'text-white' : 'text-[#009244]'} font-bold`}>Feeds</Text>
                        </View>
                    </TouchableOpacity>
                </View>



                {
                    toggleAction == 'updates' ?
                    
                        <FlatList
                            data={updates}
                            renderItem={({item}) => <LiveUpdateCard update={item}/>}
                            keyExtractor={(item) => item.id}
                            refreshing={loading}
                            onRefresh={fetchUpdates}
                        />
                    : 
                    <FlatList
                        data={feeds}
                        renderItem={({item}) => <LiveFeedCard update={item}/>}
                        keyExtractor={(item) => item.id}
                        refreshing={loading}
                        onRefresh={fetchFeeds}
                    />
                }
                
                    
                    
                
                
                
                </>

                    


                </TouchableWithoutFeedback>
                </View>

                
                

                
            </View>


            <Modalize ref={modalizeRef} closeOnOverlayTap={true} panGestureEnabled={false}>
                <NewUpdate navigation={navigation} canGoBack={true}/>
            </Modalize>    

            <BottomSheetModal
                ref={bottomSheetModalRef}
                index={1}
                snapPoints={snapPoints}
                backgroundStyle={{ borderRadius: 50 }}
                onDismiss={() => setIsOpen(false)}
                >
                <View style={styles.contentContainer}>
                    <View className="flex flex-row relative h-[50px] w-full justify-center items-center ">
                        <Text className="text-black font-bold text-[12px]">Hit Mic to start recording</Text>
                        <TouchableOpacity onPress={handleClosePress} className="h-[30px] w-[30px] bg-red-800 rounded-full justify-center flex items-center absolute right-0">
                            <FontAwesome name={`remove`} size={10} color={"white"} className="font-bold"/>
                        </TouchableOpacity>

                    </View>
                    <VoiceRecord/>
                </View>
            </BottomSheetModal>

            <BottomTab icons={bottomTabIcons} navigation={navigation} tabName='LiveUpdates'/>
            
        </SafeAreaView>


    </BottomSheetModalProvider>

  )
}


const styles = StyleSheet.create({
    list: {
        flex: 1,
        flexGrow : 1,
        marginBottom: 60
    },
    contentContainer: {
        flex: 1,
        alignItems: "center",
        paddingHorizontal: 15,
      },
      row: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 10,
      },
})    

export default LiveUpdates