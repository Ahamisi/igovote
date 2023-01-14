import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5';

const Achievements = () => {
  return (
    <View className="my-[2px] bg-white rounded-lg shadow-2xl shadow-[#0000001a] py-[20px] px-[26px] mb-[20px]">
      
        <View style={styles.container}>
            <View>
              <Text style={styles.groupHeading}>Your Achievements</Text>
            </View>
            <View style={{}}>
              <TouchableOpacity>
                <Icon name="angle-right" size='20' color="#009244" />
              </TouchableOpacity>
            </View>
        </View>
        <View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View className="flex flex-row gap-[20px]">

                {/* <Image className="h-[90px] w-[70px]" source={require('../../assets/achievements/d-register-circle.png')}/> */}

                    <TouchableOpacity>
                        <View key={'hello1'} className="flex items-center justify-center">
                            <View className="">
                                <Image className="h-[80px] w-[80px]" source={require('../../assets/achievements/d-register-circle.png')}/>
                            </View>
                            <Text className="text-[16px] font-semibold">
                                Registered Voter
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View key={'hello2'} className="">
                            <Image className="h-[80px] w-[80px]" source={require('../../assets/achievements/proof-counted.png')}/>
                            <Text className="text-[16px] font-semibold">
                                Picked PVC
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View key={'hell3o'} className="">
                            <Image className="h-[80px] w-[80px]" source={require('../../assets/achievements/VOTE.png')}/>
                            <Text className="text-[16px] font-semibold">
                                Naija Star
                            </Text>
                        </View>
                    </TouchableOpacity>



                </View>
          {/* {HOACANDIDATE.map((candidate, 'hello') => (
              <Candidate candidate={candidate} key={'hello'}/>
          ))} */}
        </ScrollView>


        

        </View>
    </View>
  )
}

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

export default Achievements