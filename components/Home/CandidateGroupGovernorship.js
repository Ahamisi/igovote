import { ScrollView, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react';



import Candidate from './CandidateItemByPosition/Candidate';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {BASE_URL} from '@env'
import axios from 'axios';



// icons
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useState } from 'react';


const CandidateGroupGovernorship = ({groupHeading, groupKey,userProfile,partySelected,navigation}) => {


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
      if(groupKey == 'governorship'){
        handleCandidateFetch('get-governorship',partySelected, userProfile.state)
        console.log(userProfile)

      }
    }
  },[userProfile,partySelected])
  

  return (
    <View className="my-[2px] bg-white rounded-lg shadow-2xl shadow-[#0000001a] py-[20px] px-[26px] mb-[20px]">
      
        <View style={styles.container}>
            <View>
              <Text style={styles.groupHeading} className="font-[700]">{groupHeading}</Text>
            </View>
            <View>
              <TouchableOpacity>
                <Icon name="angle-right" size={20} color="#009244" />
              </TouchableOpacity>
            </View>
        </View>
        <View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {
                  DataSource ?
                      DataSource.length < 1 ? <Text className="text-blue">No Data Available !!!</Text>
                      :  DataSource.map((candidate, index) => (
                        <Candidate candidate={candidate } type="governor" key={index} navigation={navigation}/>
                    ))              
                  : <ActivityIndicator/>
                }
                
            </ScrollView>
        </View>
    </View>
  )
}

export default CandidateGroupGovernorship

const styles = StyleSheet.create({
    groupHeading: {
        textTransform: 'uppercase',
        color: '#000',
    },
    container: {
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      marginBottom: 20
    }
})