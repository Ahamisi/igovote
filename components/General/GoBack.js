import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'

const GoBack = ({navigation,bg="", goTo='', mt='0px'}) => {
  return (
    <View className="absolute top-5 left-3">
        <TouchableOpacity  onPress={() => goTo ?  navigation.push(goTo) : navigation.goBack() }>
            <View className={`h-[40px] w-[40px] ${bg ? bg : 'bg-white'}  rounded-full flex items-center justify-center mx-[20px] my-[10px`}>
                <Image source={require('../../assets/app/arrow-left.png')}/>
            </View>
        </TouchableOpacity>
    </View>
  )
}

export default GoBack