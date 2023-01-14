import { StyleSheet, Text, View, Image, Pressable, ScrollView } from 'react-native'
import React from 'react';
import { PARTIES } from '../../assets/data/parties';
const Parties = ({name, logo}) => {
  return (


    <View className=" bg-white py-[10px] rounded-t-[15px] shadow-2xl shadow-[#0000001a] mt-[-20px] pt-[10px]">
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {
            PARTIES.map((party, index) => (
                <Pressable key={index+'press'}>
                        <View key={index} style={{alignItems:'center'}}>
                            <Image source={{uri: party.logo}} className="w-[70px] h-[70px] rounded-[50%] ml-[6px] shadow-2xl border-3 border-[#009244]"/>
                            <Text className="pt-[5px]">
                                {
                                    party.abbreviation
                                }
                            </Text>
                        </View>
                </Pressable>
                
            ))
        }
    </ScrollView>
</View>


// story:{
//     width: 70,
//     height: 70,
//     borderRadius: 50,
//     marginLeft: 6,
//     borderWidth: 3,
//     borderColor: '#009244',
//     boxShadow: '17px 13px 8px #000000'
     

// }










    // <View>
    //      <FlatList
    //         data={parties.items}
    //         renderItem={({item}) => (
    //             <Pressable>
    //                 <Image source={{uri:item.logo}}/>
    //                 <Text>{item.name}</Text>
    //             </Pressable>
    //         )}
    //     />
    
    // </View>
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