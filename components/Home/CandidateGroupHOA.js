import { ScrollView, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react';



import Candidate from './CandidateItemByPosition/Candidate';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {BASE_URL} from '@env'
import axios from 'axios';



// icons
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useState } from 'react';


const CandidateGroupHOA = ({groupHeading, groupKey,userProfile,partySelected, navigation}) => {


  const [DataSource, setDataSource] = useState([])


  const handleCandidateFetch =  (action,partySelected, state, lga) => {
    const url = `${BASE_URL}/${action}/${partySelected}/${state}/${lga}`
    console.log(url)
    var config = {
        method: 'get',
        url: url,
      };
        axios(config)
          .then((response) => {
            if(response){
                console.log(url)
              console.log(response.data.result.Items,'hoa')
              setDataSource(response.data?.result?.Items)
            } 
          })
          .catch(function (error) {
            console.log(error);
          });
    };

useEffect(() => {
    if(partySelected){
      if(groupKey == 'hoa'){
        // console.log('set presss')
        handleCandidateFetch('get-hoa',partySelected, userProfile.state,userProfile.lga)
      }
    }
  },[userProfile,partySelected])


  return (
    <View className="my-[2px] bg-white rounded-lg shadow-2xl shadow-[#0000001a] py-[20px] px-[26px] mb-[120px]">
      
        <View style={styles.container}>
            <View>
              <Text style={styles.groupHeading}>{groupHeading}</Text>
            </View>
            <View style={{}}>
              <TouchableOpacity>
                <Icon name="angle-right" size={20} color="#009244" />
              </TouchableOpacity>
            </View>
        </View>
        <View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-[250px]">
            {
              DataSource ?
                  DataSource.length < 1 ? <Text className="text-blue mb-[200px]">No Data Available !!!</Text>
                  :  DataSource.sort((a, b) => parseInt(b?.id?.N) < parseInt(a?.id?.N) ).map((candidate, index) => (
                    <Candidate candidate={candidate} type="hoa" key={index} navigation={navigation}/>
                ))              
              : <ActivityIndicator/>
            }
            <View className="bg-white h-[900px]">
            </View>
            
        </ScrollView>



        

        </View>
    </View>
  )
}

export default CandidateGroupHOA

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