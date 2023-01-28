import { View, Text, Image, TouchableOpacity, SafeAreaView, TextInput, Alert, Pressable, StyleSheet, FlatList , Button} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Modalize } from 'react-native-modalize';
import BottomTab, {bottomTabIcons} from '../../components/Home/BottomTab';

import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';


import AsyncStorage from '@react-native-async-storage/async-storage';
import NewUpdate from './NewUpdate';
import LiveUpdateCard from '../../components/General/LiveUpdateCard';

import Amplify, { Auth, DataStore } from "aws-amplify";
import { LiveReports,UserProfile } from '../../src/models';
import { TouchableWithoutFeedback } from 'react-native';




const LiveUpdates = ({navigation}) => {


    const [updates, setUpdates] = useState([]);
    const [loading, setLoading] = useState(false);

    const [PuDelimitation, setPuDelimitation] = useState('');





  const fetchUpdates = async () => {
        setLoading(true);
        try {
              const currUpdates = await DataStore.query(LiveReports,  (c) => c.and(c => [
                c.report_status.eq('active'),
                c.polling_unit.eq(PuDelimitation)
              ]), {
                sort: s => s.is_false('ASCENDING').endorsements('DESCENDING').createdAt("DESCENDING"),
                limit: 5

              });
              setUpdates(currUpdates)
        } catch (e) {
        console.log(e);
        } finally {
        setLoading(false);
        }
    }




    const getPu = async (pu) => {

        try {
            setPuDelimitation(await AsyncStorage.getItem('pu'))
            if(!PuDelimitation){
                // get user  from cognito
                const userInfo = await Auth.currentAuthenticatedUser();
                if (!userInfo) {
                    return;
                }
                const userId = userInfo.attributes.sub;
                const user = (await DataStore.query(UserProfile)).find(userProfile => userProfile.sub === userId);
                setPuDelimitation(user.pu);
            }
          } catch (error) {
            // Error saving data
          }
      }



    const modalizeRef = useRef(null);
    const onOpen = () => {
        modalizeRef.current?.open();
    };
    

    useEffect(() =>{
        getPu()
        fetchUpdates(); 
    },[])




  return (
    <SafeAreaView className="bg-[#009244]">
        <View className="bg-[#eeeeee] h-full relative ">
            <View className="flex flex-row items-center justify-center bg-white py-[15px] shadow-lg gap-3 px-[15px]">
                <View className="max-w-[90%] w-[90%] text-left">
                    <Text className="font-bold">
                        Polling Unit : {PuDelimitation}
                    </Text>
                </View>
                <TouchableOpacity onPress={onOpen}>
                    <View className="bg-[#009244] h-[30px] w-[30px] rounded-full shadow-2xl flex items-center justify-center">
                        <Icon name="plus" size={20} color="#fff" />
                    </View>
                </TouchableOpacity>
            </View>
            

            <View style={styles.list}>
            <TouchableWithoutFeedback>
               <>
               
               <Text className="text-center mt-3">No Updates? pull to refresh</Text>
                
                <FlatList
                    data={updates}
                    renderItem={({item}) => <LiveUpdateCard update={item}/>}
                    keyExtractor={(item) => item.id}
                    refreshing={loading}
                    onRefresh={fetchUpdates}
                />
               
               
               
               </>

                


            </TouchableWithoutFeedback>
            </View>

            
            

            
        </View>


        <Modalize ref={modalizeRef} closeOnOverlayTap={true} panGestureEnabled={false}>
            <NewUpdate navigation={navigation} canGoBack={true}/>
        </Modalize>    

        <BottomTab icons={bottomTabIcons} navigation={navigation} tabName='LiveUpdates'/>
        
    </SafeAreaView>

  )
}


const styles = StyleSheet.create({
    list: {
        flex: 1,
        flexGrow : 1,
        marginBottom: 60
    }
})    

export default LiveUpdates