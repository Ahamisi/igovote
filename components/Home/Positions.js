import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Positions = ({name, logo, selected,navigation}) => {

    const changeParty = async (position) => {
        console.log('position changed changed', position)
        await (
            AsyncStorage.setItem('selected_position', position)
        )
        navigation.navigate({
            name: 'HomeScreen',
            params: { selectedParty: position },
            merge: true,
          });

    };



  return (


    <View className=" py-[10px] rounded-t-[15px] shadow-2xl shadow-[#0000001a] mt-[-33px] pt-[10px]">
    <View className="flex flex-row">
        {
            // PARTIES.map((party, index) => (
                <>
                
                
                
                {/* a party */}
                <TouchableOpacity key={1+'press'} onPress={()=> changeParty('presidential')}>
                        <View key={1} style={{alignItems:'center'}} className="w-[100%]">
                            <View>
                                {
                                    selected == 'presidential' ? <Image source={require('../../assets/app/checked.png')} className={` w-[20px] h-[20px] rounded-[9999px]  shadow-2xl`}/> : <Image source={require('../../assets/app/unchecked.png')} className={` w-[20px] h-[20px] rounded-[9999px] shadow-2xl`}/>
                                }
                            </View>
                            
                            {/* <View className={`p-[2px] pl-[0px] ${selected == 'presidential' ? 'rounded-[9999px] border-[3px] border-[#008F43]' : ''}`}>
                                <Image source={require('../../assets/party/president.png')} className={`p-[5px] w-[70px] h-[70px] rounded-[9999px] ml-[6px] shadow-2xl`}/>
                            </View> */}
                            <View className="w-[75%]">
                                <Text className="pt-[5px] text-[8px] text-[#000000] text-center" style={{fontFamily: 'Sora-Light'}}>
                                Presidential Aspirants
                                </Text>
                            </View>
                        </View>
                </TouchableOpacity>

                {/* aa party */}
                <TouchableOpacity key={2+'press'} onPress={()=> changeParty('governorship')}>
                        <View key={2} style={{alignItems:'center'}}>
                            <View>
                                {
                                    selected == 'governorship' ? <Image source={require('../../assets/app/checked.png')} className={` w-[20px] h-[20px] rounded-[9999px]  shadow-2xl`}/> : <Image source={require('../../assets/app/unchecked.png')} className={` w-[20px] h-[20px] rounded-[9999px] shadow-2xl`}/>
                                }
                            </View>
                            {/* <View className={`p-[2px] pl-[0px] ${selected == 'governorship' ? 'rounded-[9999px] border-[3px] border-[#008F43]' : ''}`}>
                                <Image source={require('../../assets/party/hoa.png')} className={`p-[5px] w-[70px] h-[70px] rounded-[9999px] ml-[6px] shadow-2xl`}/>
                            </View> */}
                            <View className="w-[75%]">
                                <Text className="pt-[5px] text-[8px] text-[#000000] text-center" style={{fontFamily: 'Sora-Light'}}>
                                Governorship Aspirants
                                </Text>
                            </View>
                        </View>
                </TouchableOpacity>



                {/* aac party */}
                <TouchableOpacity key={3+'press'} onPress={()=> changeParty('senatorial')}>
                        <View key={3} style={{alignItems:'center'}}>
                            <View>
                                {
                                    selected == 'senatorial' ? <Image source={require('../../assets/app/checked.png')} className={` w-[20px] h-[20px] rounded-[9999px]  shadow-2xl`}/> : <Image source={require('../../assets/app/unchecked.png')} className={` w-[20px] h-[20px] rounded-[9999px] shadow-2xl`}/>
                                }
                            </View>
                            {/* <View className={`p-[2px] pl-[0px] ${selected == 'senatorial' ? 'rounded-[9999px] border-[3px] border-[#008F43]' : ''}`}>
                                <Image source={require('../../assets/party/senate.png')} className={`p-[5px] w-[70px] h-[70px] rounded-[9999px] ml-[6px] shadow-2xl`}/>
                            </View> */}
                            <View className="w-[75%]">
                                <Text className="pt-[5px] text-[8px] text-[#000000] text-center" style={{fontFamily: 'Sora-Light'}}>
                                Senate Aspirants
                                </Text>
                            </View>
                        </View>
                </TouchableOpacity>
                



                {/* adc party */}
                <TouchableOpacity key={4+'press'} onPress={()=> changeParty('hor')}>
                        <View key={4} style={{alignItems:'center'}} className="items-center text-center">
                            <View className="items-center text-center">
                                {
                                    selected == 'hor' ? <Image source={require('../../assets/app/checked.png')} className={` w-[20px] h-[20px] rounded-[9999px]  shadow-2xl`}/> : <Image source={require('../../assets/app/unchecked.png')} className={` w-[20px] h-[20px] rounded-[9999px] shadow-2xl`}/>
                                }
                            </View>
                            {/* <View className={`p-[2px] pl-[0px] ${selected == 'hor' ? 'rounded-[9999px] border-[3px] border-[#008F43]' : ''}`}>
                                <Image source={require('../../assets/party/hor.png')} className={`p-[5px] w-[70px] h-[70px] rounded-[9999px] ml-[6px] shadow-2xl`}/>
                            </View> */}
                            <View className="w-[75%] items-center">
                                <Text className="pt-[5px] text-[8px] text-[#000000] items-center text-center" style={{fontFamily: 'Sora-Light'}}>
                                HOR Aspirants
                                </Text>
                            </View>
                        </View>
                </TouchableOpacity>





                {/* adp party */}
                <TouchableOpacity key={5+'press'} onPress={()=> changeParty('hoa')}>
                        <View key={5} style={{alignItems:'center'}}>
                            <View>
                                {
                                    selected == 'hoa' ? <Image source={require('../../assets/app/checked.png')} className={` w-[20px] h-[20px] rounded-[9999px]  shadow-2xl`}/> : <Image source={require('../../assets/app/unchecked.png')} className={` w-[20px] h-[20px] rounded-[9999px] shadow-2xl`}/>
                                }
                            </View>
                            {/* <View className={`p-[2px] pl-[0px] ${selected == 'hoa' ? 'rounded-[9999px] border-[3px] border-[#008F43]' : ''}`}>
                                <Image source={require('../../assets/party/hoa.png')} className={`p-[5px] w-[70px] h-[70px] rounded-[9999px] ml-[6px] shadow-2xl`}/>
                            </View> */}
                            <View className="w-[75%]">
                                <Text className="pt-[5px] text-[8px] text-[#000000] text-center" style={{fontFamily: 'Sora-Light'}}>
                                HOA Aspirants
                                </Text>
                            </View>
                        </View>
                </TouchableOpacity>





                
                
                

                
                
                </>


                
                
            // ))
        }
    </View>
</View>

  )
}

export default Positions

const styles = StyleSheet.create({
    story:{
        width: 70,
        height: 70,
        borderRadius: 50,
        marginLeft: 6,
        borderWidth: 3,
        borderColor: '#008F43',
        boxShadow: '17px 13px 8px #000000'
         

    }
})