import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'

const GoBack = ({navigation}) => {
  return (
    <View className="absolute">
        <TouchableOpacity  onPress={() => navigation.goBack()}>
            <View className="h-[40px] w-[40px] bg-white rounded-full flex items-center justify-center mx-[20px] my-[10px]">
                <Image source={require('../../assets/app/arrow-left.png')}/>
            </View>
        </TouchableOpacity>
    </View>
  )
}

export default GoBack