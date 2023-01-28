import { View, Text, TouchableOpacity, Alert } from 'react-native';
import React from 'react'
import moment from 'moment';

import Amplify, { Auth, DataStore } from "aws-amplify";
import { LiveReports } from '../../src/models';
import { isInteger } from 'formik';

const endorseComment = async (id) => {
        const original = await DataStore.query(LiveReports, id);
        await DataStore.save(
            LiveReports.copyOf(original, updated => {
            updated.endorsements = original.endorsements + 1
          })
        );
        Alert.alert('Successful', "You've Successfully Endorsed this report")

}


const flagComment = async (id) => {
    const original = await DataStore.query(LiveReports, id);
    await DataStore.save(
        LiveReports.copyOf(original, updated => {
            updated.is_false = original.is_false + 1
      })
    );

    Alert.alert('Successful', "You've Successfully Flagged this report")

}

const LiveUpdateCard = ({update}) => {
  return (
        <View className="bg-[#7cf6b6] px-[10px] py-[20px] relative rounded-2xl my-[7px] mx-[15px] shadow-2xl">
            <View className="absolute top-3 left-3 text-white bg-red-700 p-[3px] mb-[5px] rounded-3xl">
                <Text className="text-white px-[8px] font-bold">Live</Text>
            </View>
            <View className="py-[25px]">
                <Text className="font-bold text-[#1a4f33]">No of Voters on Queue : {update.no_on_queue}</Text>
                <Text className="font-bold text-[#1a4f33]">Whats happening Now? : {update.pu_current_state}</Text>

                <Text className="italic mt-[10px]">Hint, if you go now, in about <Text className="bg-red-700 text-white font-bold  rounded-3xl"> &nbsp; {update.no_on_queue * update.average_time_to_vote} Mins &nbsp; </Text> It'll be your turn to cast your vote</Text>
                <Text> </Text>
            </View>
            <View className="absolute bottom-3 left-3 flex flex-row gap-1">
                <View className=" text-white p-[2px] mb-[5px] rounded-3xl border-[#009244] bg-[#6cdca0]">
                    <TouchableOpacity onPress={() => {flagComment(update.id)}}>
                        <Text className="text-[#009244] px-[8px] font-bold"> 🚩 {update.is_false}  </Text>
                    </TouchableOpacity>
                </View>
                <View className=" text-white p-[2px] mb-[5px] rounded-3xl border-[#009244] bg-[#6cdca0]">
                    <TouchableOpacity onPress={() => {endorseComment(update.id)}}>
                        <Text className="px-[8px] font-bold text-[#009244]"> 👍 { update.endorsements }</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View className="absolute bottom-3 right-3 text-white bg-[#009244] p-[3px] mb-[5px] rounded-3xl">
                <Text className="text-white px-[8px] font-bold">Updated {moment(update.createdAt).fromNow()}
                </Text>
            </View>

        </View>
  )
}

export default LiveUpdateCard