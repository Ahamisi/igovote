import { View, Text, TouchableOpacity, Alert, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react'
import moment from 'moment';

import Amplify, { Auth, DataStore } from "aws-amplify";
import { ElectionPosts, ReportToUser } from '../../src/models';
import { isInteger } from 'formik';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign, FontAwesome } from "@expo/vector-icons";


// import Video from 'react-native-video'

import {Storage} from 'aws-amplify';
import VideoHolder from './Video';
import AudioHolder from './AudioHolder';











const LiveFeedCard = ({update}) => {
    const [clicked, setClicked] = useState(true)




    // const [post, setPost] = useState(props.post);
    const [isLiked, setIsLiked] = useState(false);



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
        const original = await DataStore.query(ElectionPosts, id);
        if(alter){

            await DataStore.save(
                ElectionPosts.copyOf(original, updated => {
                    updated.endorsed = original.endorsed  == 1 ? 0 : original.endorsed - 1
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
                ElectionPosts.copyOf(original, updated => {
                updated.endorsed = original.endorsed + 1
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
    const original = await DataStore.query(ElectionPosts, id);

    if(alter){
        await DataStore.save(
            ElectionPosts.copyOf(original, updated => {
                updated.flagged = original.flagged  == 1 ? 0 : original.flagged - 1
          })
        );

        const modelToDelete = await DataStore.query(ReportToUser, alter_id);
        DataStore.delete(modelToDelete);
        Alert.alert('Successful', "You've Successfully unflagged this report")
    }else{

        await DataStore.save(
            ElectionPosts.copyOf(original, updated => {
                updated.flagged = original.flagged + 1
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
        
        <View className="flex flex-col m-[20px] rounded-[24px]">
        <View className="bg-[#F2F4F5] p-[10px] rounded-t-[24px]">
            <View className="py-[5px]">
            {
                    update.type == 'video' &&
                        <VideoHolder update={update}/>

                }

                {
                    update.type == 'audio' &&
                        <View>
                            <AudioHolder update={update}/>
                        </View>
                }

            </View>
        </View>
        <View className="bg-white flex flex-row justify-between px-[20px] py-[15px] rounded-b-[24px] shadow-lg">
            <View className="flex flex-row gap-[8px]">
                <View className={`text-white p-[2px] mb-[5px] rounded-3xl border-[#008F43] bg-[#6cdca0] ${updates?.report_type == 'flagged' ? 'border-2' : ''}`}>
                <TouchableOpacity onPress={() => {flagComment(update.id, updates?.report_type == 'flagged' ? true : false, updates?.id)}}>
                        <Text className="text-[#008F43] px-[8px] font-bold"> 🚩 {update.flagged}  </Text>
                    </TouchableOpacity>
                </View>
                <View className={`text-white p-[2px] mb-[5px] rounded-3xl border-[#008F43] bg-[#6cdca0] ${updates?.report_type == 'endorsed' ? 'border-2' : ''}`}>
                <TouchableOpacity onPress={() => {endorseComment(update.id, updates?.report_type == 'endorsed'? true : false, updates?.id)}}>
                        <Text className="px-[8px] font-bold text-[#008F43]"> 👍 { update.endorsed }</Text>
                    </TouchableOpacity>
                </View>

            </View>
            <View className="flex flex-row items-center gap-[8px]">
                <View className="bg-[#D3180C] h-[20px] w-[37px] items-center justify-center rounded-[16px]">
                    <Text className="text-[8px] text-white">Live</Text>
                </View>
                <Text className="text-[8px] ">{moment(update.createdAt).fromNow()}</Text>
            </View>
        </View>
    </View>    



// {

//     <View className="bg-[#7cf6b6] px-[10px] py-[20px] relative rounded-2xl my-[7px] mx-[15px] shadow-2xl">
//     <View className="absolute top-3 left-3 text-white bg-red-700 p-[3px] mb-[5px] rounded-3xl">
//         <Text className="text-white px-[8px] font-bold">
//             {
//                 update.type == 'video' ?
//                     <FontAwesome name="video-camera" size={15} color={"white"} className="font-bold"/>
//                 :
//                     <FontAwesome name='volume-up' size={15} color={"white"} className="font-bold"/>
//             }

//         </Text>
//     </View>
//     <View className="py-[25px]">
//         {
//             update.type == 'video' &&
//                 <VideoHolder update={update}/>

//         }

//         {
//             update.type == 'audio' &&
//                 <View>
//                     <AudioHolder update={update}/>
//                 </View>
//         }

//     </View>
//     <View className="absolute bottom-3 left-3 flex flex-row gap-1">
//         <View className={`text-white p-[2px] mb-[5px] rounded-3xl border-[#008F43] bg-[#6cdca0] ${updates?.report_type == 'flagged' ? 'border-2' : ''}`}>
//             <TouchableOpacity onPress={() => {flagComment(update.id, updates?.report_type == 'flagged' ? true : false, updates?.id)}}>
//                 <Text className="text-[#008F43] px-[8px] font-bold"> 🚩 {update.flagged}  </Text>
//             </TouchableOpacity>
//         </View>
//         <View className={`text-white p-[2px] mb-[5px] rounded-3xl border-[#008F43] bg-[#6cdca0] ${updates?.report_type == 'endorsed' ? 'border-2' : ''}`}>
//             <TouchableOpacity onPress={() => {endorseComment(update.id, updates?.report_type == 'endorsed'? true : false, updates?.id)}}>
//                 <Text className="px-[8px] font-bold text-[#008F43]"> 👍 { update.endorsed }</Text>
//             </TouchableOpacity>
//         </View>
//     </View>
//     <View className="absolute bottom-3 right-3 text-white bg-[#008F43] p-[3px] mb-[5px] rounded-3xl">
//         <Text className="text-white px-[8px] font-bold"> {moment(update.createdAt).fromNow()}
//         </Text>
//     </View>
// </View>
// }

        
        
        
        
        
        
  )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#ecf0f1',
    },
    video: {
      alignSelf: 'center',
      width: 320,
      height: 200,
    },
    buttons: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

export default LiveFeedCard