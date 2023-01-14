import { View, Text, SafeAreaView, StyleSheet, ScrollView } from 'react-native'
import React, {useEffect} from 'react';
import Parties from '../components/Home/Parties';

// components
import Header from '../components/Home/Header';
import CandidateGroup from '../components/Home/CandidateGroup';
import Achievements from '../components/Home/Achievements';



import BottomTab, {bottomTabIcons} from '../components/Home/BottomTab';



const HomeScreen = ({navigation}) => {

  useEffect(() => {

  },[])












  

  return (
    <SafeAreaView style={styles.container}>
      <View style={{flexDirection: 'column',backgroundColor: '#edefee'}}>
        <View className="bg-[#009244] pb-[40px]">
          <Header/>
        </View>
        {/* <Achievements/> */}
          <View className="rounded-t-[200px]">

            <Parties/>
              <View style={{ marginVertical: 8}}>
                <ScrollView>
                  <CandidateGroup groupHeading='Presidential' groupKey='presidential' />
                  <CandidateGroup groupHeading='Governorship' groupKey='governorship'/>
                  <CandidateGroup groupHeading='Senatorial' groupKey='senatorial'/>
                  <CandidateGroup groupHeading='House of Representatives' groupKey='hor'/>
                  <CandidateGroup groupHeading='House of Assembly' groupKey='hoa'/>
                  <CandidateGroup groupHeading='' groupKey='hoa'/>

                </ScrollView>
              </View>

          </View>
      </View>
      <BottomTab icons={bottomTabIcons}/>


      {/* <ScrollView>
        {POSTS.map((post, index) => (
          <Post post={post} key={index}/>
        ))}
      </ScrollView> */}
      {/* <BottomTabs icons={bottomTabIcons}/> */}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'black',
      flex: '1'
    }
})

export default HomeScreen