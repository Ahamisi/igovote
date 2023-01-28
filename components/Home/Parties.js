import { StyleSheet, Text, View, Image, Pressable, ScrollView } from 'react-native'
import React, { useEffect } from 'react';
import { PARTIES } from '../../assets/data/parties';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Parties = ({name, logo, selected,navigation}) => {

    const changeParty = async (party) => {
        console.log('party changed', party)
        await (
            AsyncStorage.setItem('selected_state', party)
        )
        navigation.navigate({
            name: 'HomeScreen',
            params: { selectedParty: party },
            merge: true,
          });

    };



  return (


    <View className=" bg-white py-[10px] rounded-t-[15px] shadow-2xl shadow-[#0000001a] mt-[-20px] pt-[10px]">
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {
            // PARTIES.map((party, index) => (
                <>
                
                
                
                
                {/* a party */}
                <Pressable key={1+'press'} onPress={()=> changeParty('A')}>
                        <View key={1} style={{alignItems:'center'}}>
                            <View className={`p-[2px] pl-[0px] ${selected == 'A' ? 'rounded-[9999px] border-[3px] border-[#009244]' : ''}`}>
                                <Image source={require('../../assets/party/a.png')} className={`p-[5px] w-[70px] h-[70px] rounded-[9999px] ml-[6px] shadow-2xl`}/>
                            </View>
                            <Text className="pt-[5px]">
                               Accord
                            </Text>
                        </View>
                </Pressable>

                {/* aa party */}
                <Pressable key={2+'press'} onPress={()=> changeParty('AA')}>
                        <View key={2} style={{alignItems:'center'}}>
                            <View className={`p-[2px] pl-[0px] ${selected == 'AA' ? 'rounded-[9999px] border-[3px] border-[#009244]' : ''}`}>
                                <Image source={require('../../assets/party/aa.png')} className={`p-[5px] w-[70px] h-[70px] rounded-[9999px] ml-[6px] shadow-2xl`}/>
                            </View>
                            <Text className="pt-[5px]">
                               AA
                            </Text>
                        </View>
                </Pressable>



                {/* aac party */}
                <Pressable key={3+'press'} onPress={()=> changeParty('AAC')}>
                        <View key={3} style={{alignItems:'center'}}>
                            <View className={`p-[2px] pl-[0px] ${selected == 'AAC' ? 'rounded-[9999px] border-[3px] border-[#009244]' : ''}`}>
                                <Image source={require('../../assets/party/aac.png')} className={`p-[5px] w-[70px] h-[70px] rounded-[9999px] ml-[6px] shadow-2xl`}/>
                            </View>
                            <Text className="pt-[5px]">
                               AAC
                            </Text>
                        </View>
                </Pressable>
                



                {/* adc party */}
                <Pressable key={4+'press'} onPress={()=> changeParty('ADC')}>
                        <View key={4} style={{alignItems:'center'}}>
                            <View className={`p-[2px] pl-[0px] ${selected == 'ADC' ? 'rounded-[9999px] border-[3px] border-[#009244]' : ''}`}>
                                <Image source={require('../../assets/party/adc.png')} className={`p-[5px] w-[70px] h-[70px] rounded-[9999px] ml-[6px] shadow-2xl`}/>
                            </View>
                            <Text className="pt-[5px]">
                               ADC
                            </Text>
                        </View>
                </Pressable>





                {/* adp party */}
                <Pressable key={5+'press'} onPress={()=> changeParty('ADP')}>
                        <View key={5} style={{alignItems:'center'}}>
                            <View className={`p-[2px] pl-[0px] ${selected == 'ADP' ? 'rounded-[9999px] border-[3px] border-[#009244]' : ''}`}>
                                <Image source={require('../../assets/party/adp.png')} className={`p-[5px] w-[70px] h-[70px] rounded-[9999px] ml-[6px] shadow-2xl`}/>
                            </View>
                            <Text className="pt-[5px]">
                               ADP
                            </Text>
                        </View>
                </Pressable>





                {/* apc party */}
                <Pressable key={6+'press'} onPress={()=> changeParty('APC')}>
                        <View key={6} style={{alignItems:'center'}}>
                            <View className={`p-[2px] pl-[0px] ${selected == 'APC' ? 'rounded-[9999px] border-[3px] border-[#009244]' : ''}`}>
                                <Image source={require('../../assets/party/apc.png')} className={`p-[5px] w-[70px] h-[70px] rounded-[9999px] ml-[6px] shadow-2xl`}/>
                            </View>
                            <Text className="pt-[5px]">
                               APC
                            </Text>
                        </View>
                </Pressable>






                 {/* apga party */}
                 <Pressable key={7+'press'} onPress={()=> changeParty('APGA')}>
                        <View key={7} style={{alignItems:'center'}}>
                            <View className={`p-[2px] pl-[0px] ${selected == 'APGA' ? 'rounded-[9999px] border-[3px] border-[#009244]' : ''}`}>
                                <Image source={require('../../assets/party/apga.png')} className={`p-[5px] w-[70px] h-[70px] rounded-[9999px] ml-[6px] shadow-2xl`}/>
                            </View>
                            <Text className="pt-[5px]">
                               APGA
                            </Text>
                        </View>
                </Pressable>



                  {/* apm party */}
                  <Pressable key={8+'press'} onPress={()=> changeParty('APM')}>
                        <View key={8} style={{alignItems:'center'}}>
                            <View className={`p-[2px] pl-[0px] ${selected == 'APM' ? 'rounded-[9999px] border-[3px] border-[#009244]' : ''}`}>
                                <Image source={require('../../assets/party/apm.png')} className={`p-[5px] w-[70px] h-[70px] rounded-[9999px] ml-[6px] shadow-2xl`}/>
                            </View>
                            <Text className="pt-[5px]">
                               APM
                            </Text>
                        </View>
                </Pressable>


                  {/* app party */}
                  <Pressable key={9+'press'} onPress={()=> changeParty('APP')}>
                        <View key={9} style={{alignItems:'center'}}>
                            <View className={`p-[2px] pl-[0px] ${selected == 'APP' ? 'rounded-[9999px] border-[3px] border-[#009244]' : ''}`}>
                                <Image source={require('../../assets/party/app.png')} className={`p-[5px] w-[70px] h-[70px] rounded-[9999px] ml-[6px] shadow-2xl`}/>
                            </View>
                            <Text className="pt-[5px]">
                               APP
                            </Text>
                        </View>
                </Pressable>

                  {/* bp party */}
                  <Pressable key={17+'press'} onPress={()=> changeParty('BP')}>
                        <View key={17} style={{alignItems:'center'}}>
                            <View className={`p-[2px] pl-[0px] ${selected == 'BP' ? 'rounded-[9999px] border-[3px] border-[#009244]' : ''}`}>
                                <Image source={require('../../assets/party/bp.png')} className={`p-[5px] w-[70px] h-[70px] rounded-[9999px] ml-[6px] shadow-2xl`}/>
                            </View>
                            <Text className="pt-[5px]">
                               Boot Party
                            </Text>
                        </View>
                </Pressable>





                  {/* lp party */}
                  <Pressable key={18+'press'} onPress={()=> changeParty('LP')}>
                        <View key={18} style={{alignItems:'center'}}>
                            <View className={`p-[2px] pl-[0px] ${selected == 'LP' ? 'rounded-[9999px] border-[3px] border-[#009244]' : ''}`}>
                                <Image source={require('../../assets/party/lp.png')} className={`p-[5px] w-[70px] h-[70px] rounded-[9999px] ml-[6px] shadow-2xl`}/>
                            </View>
                            <Text className="pt-[5px]">
                               Labour
                            </Text>
                        </View>
                </Pressable>



                  {/* apga party */}
                  <Pressable key={10+'press'} onPress={()=> changeParty('NNPP')}>
                        <View key={10} style={{alignItems:'center'}}>
                            <View className={`p-[2px] pl-[0px] ${selected == 'NNPP' ? 'rounded-[9999px] border-[3px] border-[#009244]' : ''}`}>
                                <Image source={require('../../assets/party/nnpp.png')} className={`p-[5px] w-[70px] h-[70px] rounded-[9999px] ml-[6px] shadow-2xl`}/>
                            </View>
                            <Text className="pt-[5px]">
                               NNPP
                            </Text>
                        </View>
                </Pressable>





                  {/* nrm party */}
                  <Pressable key={11+'press'} onPress={()=> changeParty('NRM')}>
                        <View key={11} style={{alignItems:'center'}}>
                            <View className={`p-[2px] pl-[0px] ${selected == 'NRM' ? 'rounded-[9999px] border-[3px] border-[#009244]' : ''}`}>
                                <Image source={require('../../assets/party/nrm.png')} className={`p-[5px] w-[70px] h-[70px] rounded-[9999px] ml-[6px] shadow-2xl`}/>
                            </View>
                            <Text className="pt-[5px]">
                               NRM
                            </Text>
                        </View>
                </Pressable>




                  {/* pdp party */}
                  <Pressable key={12+'press'} onPress={()=> changeParty('PDP')}>
                        <View key={12} style={{alignItems:'center'}}>
                            <View className={`p-[2px] pl-[0px] ${selected == 'PDP' ? 'rounded-[9999px] border-[3px] border-[#009244]' : ''}`}>
                                <Image source={require('../../assets/party/pdp.png')} className={`p-[5px] w-[70px] h-[70px] rounded-[9999px] ml-[6px] shadow-2xl`}/>
                            </View>
                            <Text className="pt-[5px]">
                               PDP
                            </Text>
                        </View>
                </Pressable>



                  {/* prp party */}
                  <Pressable key={13+'press'} onPress={()=> changeParty('PRP')}>
                        <View key={13} style={{alignItems:'center'}}>
                            <View className={`p-[2px] pl-[0px] ${selected == 'PRP' ? 'rounded-[9999px] border-[3px] border-[#009244]' : ''}`}>
                                <Image source={require('../../assets/party/prp.png')} className={`p-[5px] w-[70px] h-[70px] rounded-[9999px] ml-[6px] shadow-2xl`}/>
                            </View>
                            <Text className="pt-[5px]">
                               PRP
                            </Text>
                        </View>
                </Pressable>


                  {/* sdp party */}
                  <Pressable key={14+'press'} onPress={()=> changeParty('SDP')}>
                        <View key={14} style={{alignItems:'center'}}>
                            <View className={`p-[2px] pl-[0px] ${selected == 'SDP' ? 'rounded-[9999px] border-[3px] border-[#009244]' : ''}`}>
                                <Image source={require('../../assets/party/sdp.png')} className={`p-[5px] w-[70px] h-[70px] rounded-[9999px] ml-[6px] shadow-2xl`}/>
                            </View>
                            <Text className="pt-[5px]">
                               SDP
                            </Text>
                        </View>
                </Pressable>



                  {/* ypp party */}
                  <Pressable key={15+'press'} onPress={()=> changeParty('YPP')}>
                        <View key={15} style={{alignItems:'center'}}>
                            <View className={`p-[2px] pl-[0px] ${selected == 'YPP' ? 'rounded-[9999px] border-[3px] border-[#009244]' : ''}`}>
                                <Image source={require('../../assets/party/ypp.png')} className={`p-[5px] w-[70px] h-[70px] rounded-[9999px] ml-[6px] shadow-2xl`}/>
                            </View>
                            <Text className="pt-[5px]">
                               YPP
                            </Text>
                        </View>
                </Pressable>



                  {/* apga party */}
                  <Pressable key={16+'press'} onPress={()=> changeParty('ZLP')}>
                        <View key={16} style={{alignItems:'center'}}>
                            <View className={`p-[2px] pl-[0px] ${selected == 'ZLP' ? 'rounded-[9999px] border-[3px] border-[#009244]' : ''}`}>
                                <Image source={require('../../assets/party/zlp.png')} className={`p-[5px] w-[70px] h-[70px] rounded-[9999px] ml-[6px] shadow-2xl`}/>
                            </View>
                            <Text className="pt-[5px]">
                               ZLP
                            </Text>
                        </View>
                </Pressable>
                
                
                
    
                
                
                
                
                
                </>


                
                
            // ))
        }
    </ScrollView>
</View>

  )
}

export default Parties

const styles = StyleSheet.create({
    story:{
        width: 70,
        height: 70,
        borderRadius: 50,
        marginLeft: 6,
        borderWidth: 3,
        borderColor: '#009244',
        boxShadow: '17px 13px 8px #000000'
         

    }
})