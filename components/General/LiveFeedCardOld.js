import { View, Text, TouchableOpacity, Alert, TouchableWithoutFeedback, StyleSheet, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react'
import moment from 'moment';

import Amplify, { Auth, DataStore } from "aws-amplify";
import { LiveReports, ReportToUser } from '../../src/models';
import { isInteger } from 'formik';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import Video from 'react-native-video'
import { Video, AVPlaybackStatus } from 'expo-av';

import {Storage} from 'aws-amplify';











const LiveFeedCard = ({update}) => {
    const [clicked, setClicked] = useState(true)
    const videoRef = React.useRef(null);
    const [status, setStatus] = React.useState({});



    // const [post, setPost] = useState(props.post);
    const [isLiked, setIsLiked] = useState(false);
    const [videoUri, setVideoUri] = useState('');
    const [paused, setPaused] = useState(false);

    const onPlayPausePress = () => {
        setPaused(!paused);
    };

    const getVideoUri = async () => {
        if (update.resource_url.startsWith('http')) {
          setVideoUri(update.resource_url);
          return;
        }
        setVideoUri(await Storage.get(update.resource_url));
      };
    


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
            getVideoUri();

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
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => status.isPlaying ? videoRef.current.pauseAsync() : videoRef.current.playAsync()} >
      
        <View>
            {
                update.type == 'video' &&
                <Video
                    ref={videoRef}
                    style={styles.video}
                    source={{
                    uri: videoUri
                    }}
                    useNativeControls
                    resizeMode="contain"
                    isLooping
                    isMuted={false}
                    onPlaybackStatusUpdate={status => setStatus(() => status)}
                />

            }
          
          

          <View style={styles.uiContainer}>
            <View style={styles.rightContainer}>
        

              <TouchableOpacity style={styles.iconContainer}>
                {/* <AntDesign name={'heart'} size={40} color={isLiked ? 'red' : 'white'} /> */}
                <Text style={styles.statsLabel}>3</Text>
              </TouchableOpacity>

              <View style={styles.iconContainer}>
                {/* <FontAwesome name={'commenting'} size={40} color="white" /> */}
                <Text style={styles.statsLabel}>2</Text>
              </View>

              <View style={styles.iconContainer}>
                {/* <Fontisto name={'share-a'} size={35} color="white" /> */}
                <Text style={styles.statsLabel}>10</Text>
              </View>
            </View>

            <View style={styles.bottomContainer}>
              <View>
                <Text style={styles.handle}>@aceman</Text>
                <Text style={styles.description}>Ifo Lga</Text>

                {/* <View style={styles.songRow}>
                  <Entypo name={'beamed-note'} size={24} color="white" />
                  <Text style={styles.songName}>{post.song.name}</Text>
                </View> */}
              </View>

              {/* <Image
                style={styles.songImage}
                source={{uri: post.song.imageUri}}
              /> */}
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
    //     <View className="bg-[#7cf6b6] px-[10px] py-[20px] relative rounded-2xl my-[7px] mx-[15px] shadow-2xl">
    //     <View className="absolute top-3 left-3 text-white bg-red-700 p-[3px] mb-[5px] rounded-3xl">
    //         <Text className="text-white px-[8px] font-bold">{update.type == 'video' ? 'Video' : 'Audio'}</Text>
    //     </View>
    //     <View className="py-[25px]">
    //         {
    //             update.type == 'video' &&
    //             <TouchableWithoutFeedback onPress={() =>
    //                 status.isPlaying ? videoRef.current.pauseAsync() : videoRef.current.playAsync()}>
    //                 <View style={styles.container}>
    //                     {/* <Video
    //                         source={{uri: videoUri}}
    //                         onError={(e) => console.log(e)}
    //                         resizeMode={'cover'}
    //                         repeat={true}
    //                         paused={paused}
    //                     /> */}

    //                 <Video
    //                     ref={videoRef}
    //                     style={styles.video}
    //                     source={{
    //                     uri: videoUri
    //                     }}
    //                     useNativeControls
    //                     resizeMode="contain"
    //                     isLooping
    //                     onPlaybackStatusUpdate={status => setStatus(() => status)}
    //                 />
                      
    //                 </View> 
    //              </TouchableWithoutFeedback>
    //         }
    //     </View>
    //     <View className="absolute bottom-3 left-3 flex flex-row gap-1">
    //         <View className={`text-white p-[2px] mb-[5px] rounded-3xl border-[#009244] bg-[#6cdca0] ${updates?.report_type == 'flagged' ? 'border-2' : ''}`}>
    //             <TouchableOpacity onPress={() => {flagComment(update.id, updates?.report_type == 'flagged' ? true : false, updates?.id)}}>
    //                 <Text className="text-[#009244] px-[8px] font-bold"> 🚩 {update.is_false}  </Text>
    //             </TouchableOpacity>
    //         </View>
    //         <View className={`text-white p-[2px] mb-[5px] rounded-3xl border-[#009244] bg-[#6cdca0] ${updates?.report_type == 'endorsed' ? 'border-2' : ''}`}>
    //             <TouchableOpacity onPress={() => {endorseComment(update.id, updates?.report_type == 'endorsed'? true : false, updates?.id)}}>
    //                 <Text className="px-[8px] font-bold text-[#009244]"> 👍 { update.endorsements }</Text>
    //             </TouchableOpacity>
    //         </View>
    //     </View>
    //     <View className="absolute bottom-3 right-3 text-white bg-[#009244] p-[3px] mb-[5px] rounded-3xl">
    //         <Text className="text-white px-[8px] font-bold">Updated {moment(update.createdAt).fromNow()}
    //         </Text>
    //     </View>

    // </View>
  )
}


const styles = StyleSheet.create({
    buttons: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    container: {
        width: '100%',
        height: Dimensions.get('window').height - 130,
      },
      videPlayButton: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        zIndex: 100,
      },
      video: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        height: 800
      },
      uiContainer: {
        height: '100%',
        justifyContent: 'flex-end',
      },
      bottomContainer: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
      },
      handle: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 10,
      },
      description: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '300',
        marginBottom: 10,
      },
      songRow: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      songName: {
        color: '#fff',
        fontSize: 16,
        marginLeft: 5,
      },
    
      songImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 5,
        borderColor: '#4c4c4c',
      },
    
      //  right container
      rightContainer: {
        alignSelf: 'flex-end',
        height: 300,
        justifyContent: 'space-between',
        marginRight: 5,
      },
      profilePicture: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: '#fff',
      },
    
      iconContainer: {
        alignItems: 'center',
      },
      statsLabel: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        marginTop: 5,
      },
  });

export default LiveFeedCard