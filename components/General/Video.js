import React, { useRef, useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Video } from 'expo-av';
import { Storage } from 'aws-amplify';
import { Playback } from 'expo-av/build/AV';
import { ActivityIndicator } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import * as Sharing from 'expo-sharing'; // Import the library
import * as FileSystem from 'expo-file-system';




const VideoHolder = ({update}) => {
    const  episode = update;
    const [videoURL, setVideoURL] = useState('');
    const [isPreloading, setIsPreloading] = useState(false);
    const [rawUrl, setRawUrl] = useState('');
    const [sharing, setSharing] = useState(false);


    const [status, setStatus] = useState({});
    const video = useRef(null);

    useEffect(() => {
        if (episode.resource_url.startsWith('http')) {
            setVideoURL(episode.resource_url);
            return;
        }
        Storage.get(episode.resource_url).then(setVideoURL);
    }, [episode])

    useEffect(() => {
        if (!video) {
            return;
        }
        (async () => {
            await video?.current?.unloadAsync();
            await video?.current?.loadAsync(
                { uri: videoURL },
                {},
                false
            );
        })();
    }, [videoURL])



    const sharePlayer = async () =>{
        const downloadPath = FileSystem.cacheDirectory + audioUrl;
        // 1 - download the file to a local cache directory
        const { uri: localUrl } = await FileSystem.downloadAsync(remoteURL, downloadPath);
        // 2 - share it from your local storage :)
        Sharing.shareAsync(localUrl, {
          dialogTitle: 'I-go-vote-video', // Android and Web
          dialosTitle: 'I-go-vote-video'
        });
      }


    const openShareDialogAsync = async (url) => {
        setSharing(true)
        const downloadPath = `${FileSystem.cacheDirectory}${rawUrl}`;
        const { uri: localUrl } = await FileSystem.downloadAsync(
          url,
          downloadPath
        );
        if (!(await Sharing.isAvailableAsync())) {
          Alert.alert('Sharing is not available on your device')
          return;
        }
        try{
          await Sharing.shareAsync(localUrl, {
            dialogTitle: 'Audio-Igovote'
          });
        }finally{
          setSharing(false)
        }
        
      };

    console.log(videoURL);

    if (videoURL === '') {
        return null;
    }

    return (
      <>
      {isPreloading &&
            <ActivityIndicator
                animating
                color={"#009244"}
                size="large"
                style={{ flex: 1, position:"absolute", top:"50%", left:"45%" }}
            />
        }
        <View className="text-right flex flex-row justify-end mb-[3px]">
            <TouchableOpacity onPress={() => openShareDialogAsync(videoURL)}>
            <View className="h-[40px] w-[40px] bg-[#009244] rounded-full justify-center flex items-center">
                <FontAwesome name='share' size={15} color={"white"} className="font-bold"/>
            </View>
            </TouchableOpacity>
        </View>
        <Video
            ref={video}
            style={styles.video}
            source={{
                uri: videoURL,
            }}
            // posterSource={{
            //     uri: episode.poster,
            // }}
            posterStyle={{
                resizeMode: 'cover',
            }}
            usePoster={false}
            useNativeControls
            resizeMode="contain"
            onLoadStart={() => setIsPreloading(true)}
            onReadyForDisplay={() => setIsPreloading(false)}
            onPlaybackStatusUpdate={status => setStatus(() => status)}            
        />
      </>
    )
}


const styles = StyleSheet.create({
  video: {
    width: '100%',
    aspectRatio: 16/9,   
}
});

export default VideoHolder;



