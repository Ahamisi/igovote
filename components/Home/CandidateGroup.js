import { ScrollView, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator, FlatList, Alert, SafeAreaView } from 'react-native'
import React, { useEffect } from 'react';



import Candidate from './CandidateItemByPosition/Candidate';
import CandidatePresident from './CandidateItemByPosition/CandidatePres';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {BASE_URL} from '@env'
import axios from 'axios';

import { A } from '@expo/html-elements';
import * as Linking from 'expo-linking';






// icons
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useState } from 'react';

const Groups = ['presidential','governorship', 'senate', 'hor', 'hoa'];
import { PRESCANDIDATE } from '../../assets/data/candidatepresidential';
import CandidateByPosition from './CandidateItemByPosition/CandidateByPosition';

const CandidateGroup = ({groupHeading, groupKey,userProfile,partySelected,navigation,filterBy, positionSelected,sortType, searchKey}) => {


  const [DataSource, setDataSource] = useState([])
  const d = PRESCANDIDATE[0];







  const handleCandidateFetch =  (action,partySelected, state, lga) => {
    console.log(filterBy,'softboy')
    const url = `${BASE_URL}/${action}/${partySelected}`
    state ? url + `/${state}` :  '';
    lga ? url + `/${state}/${lga}` :  '';
    var config = {
        method: 'get',
        url: url,
      };
        axios(config)
          .then((response) => {
            if(response){
              // console.log(response.data.result.Items,'duhi')
              setDataSource(response.data?.result?.Items)
            } 
          })
          .catch(function (error) {
            console.log(error);
          });
    };


    const handleCandidateFetchPosition =  (state, lga, table) => {
      // console.log(filterBy,'softboy2',state,lga.replace('/',' '))
      const url = `${BASE_URL}/get-position/${state}/${lga.replace('/',' ')}/${table}`

      var config = {
          method: 'get',
          url: url,
        };
          axios(config)
            .then((response) => {
              if(response){
                // console.log(response.data.result.Items,'duhi','hordatafuck')
                setDataSource(response.data?.result?.Items)
              } 
            })
            .catch(function (error) {
              console.log(error);
            });
      };


      // handleCandidateFetchPosition( userProfile.state,userProfile.lga,'igv_presidential')



useEffect(() => {
  if(partySelected){
    if(groupKey == 'presidential'){
      if(filterBy == 'party'){
        handleCandidateFetch('get-presidential',partySelected)
        positionSelected ? positionSelected = 'presidential' : ''
        console.log('i ran by party')

      }
          
    }
  }


if(filterBy == 'position'){
  if(positionSelected){
    if(positionSelected == 'presidential'){
      handleCandidateFetchPosition(userProfile.state,userProfile.lga,'igv_presonly')
    }
    else if(positionSelected == 'governorship'){
      handleCandidateFetchPosition(userProfile.state,userProfile.lga,'igv_governorshiponly')
    }
    else if(positionSelected == 'senatorial'){
      handleCandidateFetchPosition(userProfile.state,userProfile.lga,'igv_senatorial')
    }
    else if(positionSelected == 'hor'){
      handleCandidateFetchPosition(userProfile.state,userProfile.lga,'igv_hor')
    }
    else if(positionSelected == 'hoa'){
      handleCandidateFetchPosition(userProfile.state,userProfile.lga,'igv_hoa')
    }
    console.log('i ran by position',userProfile)

  }else{
    positionSelected= 'presidential';
    handleCandidateFetchPosition(userProfile.state,userProfile.lga,'igv_presonly')
  }
} 

{console.log(positionSelected,'lamba')}






},[userProfile,partySelected,positionSelected,filterBy])





  return (
    <>
    
        {
        filterBy && 
        <View className="my-[2px] bg-[#ffffff] rounded-lg  py-[20px] px-[26px] mb-[20px]">
      
        {/* <View style={styles.container}>
            <View>
              <Text style={styles.groupHeading}>{groupHeading}</Text>
            </View>
            <View style={{}}>
              {
                positionSelected == 'presidential' ?
                // <TouchableOpacity onPress={() => navigation.navigate('PresidentialResults')} className="bg-[#008F43] px-[14px] py-[10px] rounded-lg">
                //     <Text className="font-bold text-white">See Results</Text>
                // </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('PresidentialResults')} className="bg-[#008F43] px-[14px] py-[10px] rounded-lg">
                  <Text className="text-white font-bold"><A href="https://igovote.retool.com/embedded/public/3cee2bd8-f901-4c61-a10f-7ad55fad443c">See Results</A></Text>
                </TouchableOpacity>
                

            
                :
                <TouchableOpacity>
                  <Icon name="angle-right" size={20} color="#008F43" />
                </TouchableOpacity>
              }
              
            </View>
        </View> */}
        <View>
          

      {

        
        filterBy == 'position' ?

        <View  className="flex flex-wrap flex-col mb-[900px]">
          
          <ScrollView showsVerticalScrollIndicator={false} style={{ flexDirection: 'column'}} >
          <View style={styles.container}>
            <View>
              <Text style={styles.groupHeading} className="text-[#008F43] capitalize">{positionSelected} Aspirants</Text>
            </View>
            
           </View>
            {
              DataSource ?
              DataSource.length < 1 ? <Text className="text-blue">Loading...</Text>
              // sortType == 'name'
              // :   DataSource.sort((a, b) => (b?.candidate_name?.S) < (a?.candidate_name?.S) ).map((candidate, index) => {

              :   DataSource.sort((a, b) => (sortType == 'name' ? (b?.candidate_name?.S)  : parseInt(b?.age?.S))  <  ( sortType == 'name' ? a?.candidate_name?.S : parseInt(a?.age?.S) ) ).map((candidate, index) => {
                if(positionSelected == 'hor'){
                  if(candidate?.constituency?.S?.toLowerCase()?.includes(userProfile?.lga?.toLowerCase())){
                    if(searchKey !== '' && searchKey?.length > 1){
                      if(candidate?.candidate_name?.S?.toLowerCase().includes(searchKey.toLowerCase())){
                        return (<CandidateByPosition candidate={candidate} key={`${index}`} type="president"  extraData={candidate?.position?.S == 'Presidential' ? d[`${candidate?.id?.S}`] : ''} navigation={navigation} filterBy={filterBy}/>)
                      }else{
                        return 
                      }

                    }else{

                      return (<CandidateByPosition candidate={candidate} key={`${index}`} type="president"  extraData={candidate?.position?.S == 'Presidential' ? d[`${candidate?.id?.S}`] : ''} navigation={navigation} filterBy={filterBy}/>)

                    }
                  }else{
                    console.log(candidate?.constituency?.S?.toLowerCase(), userProfile.lga.toLowerCase())
                    return
                  }

                }else{
                  if(searchKey !== '' && searchKey?.length > 1){
                    if(candidate?.candidate_name?.S?.toLowerCase().includes(searchKey.toLowerCase())){
                      return (<CandidateByPosition candidate={candidate} key={`${index}`} type="president"  extraData={candidate?.position?.S == 'Presidential' ? d[`${candidate?.id?.S}`] : ''} navigation={navigation} filterBy={filterBy}/>)
                    }else{
                      return 
                    }

                  }else{
                    return (<CandidateByPosition candidate={candidate} key={`${index}`} type="president"  extraData={candidate?.position?.S == 'Presidential' ? d[`${candidate?.id?.S}`] : ''} navigation={navigation} filterBy={filterBy}/>)

                  }
                }
               
              })             
          : <ActivityIndicator/>
            }
            <View className="bg-white h-[900px]">
            </View>
          </ScrollView>
            {/* <FlatList
            className="flex flex-wrap"
            data={DataSource}
            scrollEnabled={false}
            renderItem={({item}) => 
              <CandidateByPosition candidate={item} key={item?.id?.S} type="president"  extraData={item?.position?.S == 'Presidential' ? d[`${item?.id?.S}`] : ''} navigation={navigation} filterBy={filterBy}/>
            }

            keyExtractor={item => item?.id?.S}
          /> */}

        </View>
    
        
        :
        <>
            <View style={styles.container}>
            <View>
              <Text style={styles.groupHeading} className="text-[#008F43]">Presidential Aspirants</Text>
            </View>
            
        </View>
      <ScrollView vertical showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
        {
          DataSource ?
              DataSource.length < 1 ? <Text className="text-blue">No Data Available !!!</Text>
              :   DataSource.sort((a, b) => (a?.position?.S) > (b?.position?.S) ).map((candidate, index) => {
                return (
                  candidate?.position?.S == 'Presidential' ? <CandidatePresident candidate={candidate} type="president" key={candidate?.unique_id?.N} extraData={candidate?.position?.S == 'Presidential' ? d[`${candidate?.id?.S}`] : ''} navigation={navigation} filterBy={filterBy}/> 
                  : <Candidate candidate={candidate} type="president" key={candidate?.unique_id?.N}  navigation={navigation} filterBy={filterBy}/>
                )
              })             
          : <ActivityIndicator/>
        }
        
        
    </ScrollView>
        
        </>

      }    

       



        

        </View>
    </View>
        }
    </>
  )
}

export default CandidateGroup

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