import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react';
import Candidate from './Candidate';

import { HOACANDIDATE } from '../../assets/data/candidateHOA';
import { REPSCANDIDATE } from '../../assets/data/candiateReps';
import { GOVCANDIDATE } from '../../assets/data/candidategovernorship';
import { PRESCANDIDATE } from '../../assets/data/candidatepresidential';
import { SENCANDIDATE } from '../../assets/data/candidatesenate';


// icons
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useState } from 'react';

const Groups = ['presidential','governorship', 'senate', 'hor', 'hoa'];
let DataSource = [];

const CandidateGroup = ({groupHeading, groupKey}) => {
  // const [DataSource, setDataSource] = useState([])

  if(groupKey == 'presidential'){
    DataSource = PRESCANDIDATE
  }else if(groupKey == 'senatorial'){
    DataSource = SENCANDIDATE
  }else if(groupKey == 'governorship'){
    DataSource = GOVCANDIDATE
  }else if(groupKey == 'hor'){
    DataSource = REPSCANDIDATE
  }
  else{
    DataSource = HOACANDIDATE
  }
  return (
    <View className="my-[2px] bg-white rounded-lg shadow-2xl shadow-[#0000001a] py-[20px] px-[26px] mb-[20px]">
      
        <View style={styles.container}>
            <View>
              <Text style={styles.groupHeading}>{groupHeading}</Text>
            </View>
            <View style={{}}>
              <TouchableOpacity>
                <Icon name="angle-right" size='20' color="#009244" />
              </TouchableOpacity>
            </View>
        </View>
        <View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {DataSource.map((candidate, index) => (
              <Candidate candidate={candidate} key={index}/>
          ))}
        </ScrollView>


        

        </View>
    </View>
  )
}

export default CandidateGroup

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