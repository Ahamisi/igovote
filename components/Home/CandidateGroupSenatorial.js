import { ScrollView, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react';



import Candidate from './CandidateItemByPosition/Candidate';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {BASE_URL} from '@env'
import axios from 'axios';



// icons
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useState } from 'react';


const CandidateGroupSenatorial = ({groupHeading, groupKey,userProfile,partySelected,navigation}) => {


  const [DataSource, setDataSource] = useState([])


  const handleCandidateFetch =  (action,partySelected, state, lga) => {
    const url = `${BASE_URL}/${action}/${partySelected}/${state}`
    var config = {
        method: 'get',
        url: url,
      };
        axios(config)
          .then((response) => {
            if(response){
            //   console.log(response.data.result.Items,'state')
              setDataSource(response.data?.result?.Items)
            } 
          })
          .catch(function (error) {
            console.log(error);
          });
    };

useEffect(() => {
    if(partySelected){
      if(groupKey == 'senatorial'){
        // console.log('set presss')
        handleCandidateFetch('get-senatorial',partySelected, userProfile.state)
      }
    }
  },[userProfile,partySelected])





  return (
    <View className="my-[2px] bg-white rounded-lg py-[20px] px-[26px] mb-[20px]">
      
        <View style={styles.container}>
            <View>
              <Text style={styles.groupHeading} className="text-[#008F43]">{groupHeading} Aspirants in your Constituency</Text>
            </View>
            
        </View>
        <View>

        <ScrollView vertical showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
            {
              DataSource ?
                  DataSource.length < 1 ? <Text className="text-blue">No Data Available !!!</Text>
                  :  DataSource.map((candidate, index) => (
                    <Candidate candidate={candidate} type="senator"  key={index} navigation={navigation}/>
                ))              
              : <ActivityIndicator/>
            }
            
        </ScrollView>



        

        </View>
    </View>
  )
}

export default CandidateGroupSenatorial

const styles = StyleSheet.create({
    groupHeading: {
        textTransform: 'uppercase',
        fontWeight: '700',
        color: '#008F43',
    },
    container: {
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      marginBottom: 20
    }
})