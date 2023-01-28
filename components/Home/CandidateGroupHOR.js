import { ScrollView, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react';



import Candidate from './CandidateItemByPosition/Candidate';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {BASE_URL} from '@env'
import axios from 'axios';



// icons
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useState } from 'react';


const CandidateGroupHOR = ({groupHeading, groupKey,userProfile,partySelected,navigation}) => {


  const [DataSource, setDataSource] = useState([])
  const [LGA, setLGA] = useState('')



  const handleCandidateFetch =  (action,partySelected, state, lga) => {
    setLGA(lga)
    const url = `${BASE_URL}/${action}/${partySelected}/${state}/${lga}`
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
      if(groupKey == 'hor'){
        // console.log('set presss')
        handleCandidateFetch('get-hor',partySelected, userProfile.state,userProfile.lga)
      }
    }
  },[userProfile,partySelected])
  



  return (
    <View className="my-[2px] bg-white rounded-lg shadow-2xl shadow-[#0000001a] py-[20px] px-[26px] mb-[20px]">
      
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

        <ScrollView horizontal showsHorizontalScrollIndicator={false} >
            {
              DataSource ?
                  DataSource.length < 1 ? <Text className="text-blue mb-[200px">No Data Available !!!</Text>
                  :  DataSource.map((candidate, index) => {
                    // console.log(LGA,candidate?.constituency?.S,'puff puff',candidate?.constituency?.S.includes(LGA.toLowerCase()))

                    // if(candidate?.constituency?.S.match(/mushin/g).length > 0 ){
                      return <Candidate candidate={candidate} key={index}  type="hor" navigation={navigation}/>

                    // }
                  })              
              : <ActivityIndicator/>
            }
            
        </ScrollView>



        

        </View>
    </View>
  )
}

export default CandidateGroupHOR

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