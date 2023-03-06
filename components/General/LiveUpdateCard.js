import { View, Text, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useState } from 'react'
import moment from 'moment';

import Amplify, { Auth, DataStore } from "aws-amplify";
import { LiveReports, ReportToUser } from '../../src/models';
import { isInteger } from 'formik';
import AsyncStorage from '@react-native-async-storage/async-storage';










const LiveUpdateCard = ({update}) => {
    const [clicked, setClicked] = useState(true)

    


    const [updates, setUpdates] = useState({});
    const [currentUser, setcurrentUser] = useState(null)
    const [currentUserSub, setcurrentUserSub] = useState('')



    const getReportCondition = async () => {

        try {
            setcurrentUserSub(update.user)
            console.log(update.id,update.user,'lionnns',currentUserSub)
            const newUpdates = await DataStore.query(ReportToUser,  (c) => c.and(c => [
                c.report_id.eq(update.id),
                c.user_id.eq(update.user)
            ]))
            newUpdates[0] ? setUpdates(newUpdates[0]) : ''
        } catch (e) {
            console.log(e);
        } finally {

            console.log(updates,'kjjoj')
            

        }

    }

    const getUser = async () => {
        try {     
            return await AsyncStorage.getItem('userid');
          } catch (error) {
            console.log(error)
          }
            
    }

    useEffect(() => {
            const userId = getUser();
            userId ? setcurrentUserSub(userId) : ''
            getReportCondition()
            console.log(updates)
            setClicked(false)
            console.log(currentUser)
     }
    , [])




    const endorseComment = async (id, alter= false, alter_id='') => {
        const original = await DataStore.query(LiveReports, id);
        if(alter){

            await DataStore.save(
                LiveReports.copyOf(original, updated => {
                    updated.endorsements = original.endorsements  == 1 ? 0 : original.endorsements - 1
              })
            );

            try{
                const modelToDelete = await DataStore.query(ReportToUser, alter_id);
                DataStore.delete(modelToDelete);
                Alert.alert('Successful', "You've Successfully unendorse this report")

            }catch(e){
                console.log(e)
            }
    
            


        }else{

            await DataStore.save(
                LiveReports.copyOf(original, updated => {
                updated.endorsements = original.endorsements + 1
              })
            );

            try{
                await DataStore.save(
                    new ReportToUser({
                        "report_id": id,
                        "user_id": currentUserSub,
                        "report_type": "endorsed"
                    })
                );
                Alert.alert('Successful', "You've Successfully Endorsed this report")

            }catch(e){
                console.log(e)

            }
            


        }
        setClicked(true)

}


const flagComment = async (id, alter= false, alter_id='') => {
    const original = await DataStore.query(LiveReports, id);

    if(alter){
        await DataStore.save(
            LiveReports.copyOf(original, updated => {
                updated.is_false = original.is_false  == 1 ? 0 : original.is_false - 1
          })
        );

        const modelToDelete = await DataStore.query(ReportToUser, alter_id);
        DataStore.delete(modelToDelete);
        Alert.alert('Successful', "You've Successfully unflagged this report")
    }else{

        await DataStore.save(
            LiveReports.copyOf(original, updated => {
                updated.is_false = original.is_false + 1
          })
        );
        await DataStore.save(
            new ReportToUser({
                "report_id": id,
                "user_id": currentUserSub,
                "report_type": "flagged"
            })
        );
    
        Alert.alert('Successful', "You've Successfully Flagged this report")

    }

    setClicked(true)

    

}




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
            <View className={`text-white p-[2px] mb-[5px] rounded-3xl border-[#009244] bg-[#6cdca0] ${updates?.report_type == 'flagged' ? 'border-2' : ''}`}>
                <TouchableOpacity onPress={() => {flagComment(update.id, updates?.report_type == 'flagged' ? true : false, updates?.id)}}>
                    <Text className="text-[#009244] px-[8px] font-bold"> 🚩 {update.is_false}  </Text>
                </TouchableOpacity>
            </View>
            <View className={`text-white p-[2px] mb-[5px] rounded-3xl border-[#009244] bg-[#6cdca0] ${updates?.report_type == 'endorsed' ? 'border-2' : ''}`}>
                <TouchableOpacity onPress={() => {endorseComment(update.id, updates?.report_type == 'endorsed'? true : false, updates?.id)}}>
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