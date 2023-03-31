import React, {useContext, useEffect, useState, useRef} from 'react';
// import { View, Text, TouchableOpacity, Alert, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  Animated,
  Alert
} from 'react-native';
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { Audio } from 'expo-av';
import * as Sharing from 'expo-sharing'; // Import the library
import { Storage } from 'aws-amplify';
import * as FileSystem from 'expo-file-system';



const AudioHolder = ({update}) => {


  const episode = update;
  const [audioUrl, setAudioUrl] = useState('');
  const [audioId, setAudioId] = useState('');
  const [rawUrl, setRawUrl] = useState('');
  const [sharing, setSharing] = useState(false);





  let timeoutSetter = ''
  let sound = React.useRef(new Audio.Sound());

  const {width, height} = Dimensions.get('window');



  








const setUpPlayer = async (play=false) => {

  // if(play){
  //   await sound.current.playAsync().then(e => {
  //     // spinListener(e.playableDurationMillis);
  //   })

  // }
  //   // set up the player
  //   try {
  //     await sound.current.loadAsync({
  //       uri: audioUrl
  //   })
  //   }catch(e){
  //       console.log(e)
  //   }
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




const sharePlayer = async () =>{
  const downloadPath = FileSystem.cacheDirectory + audioUrl;
  // 1 - download the file to a local cache directory
  const { uri: localUrl } = await FileSystem.downloadAsync(remoteURL, downloadPath);
  // 2 - share it from your local storage :)
  Sharing.shareAsync(localUrl, {
    dialogTitle: 'I-go-vote-audio', // Android and Web
    dialosTitle: 'I-go-vote-audio'
  });
}





  useEffect(() => {
    setAudioId(episode.id)
    setRawUrl(episode.resource_url)
    if (episode.resource_url.startsWith('http')) {
      console.log('loading resource url')
      setAudioUrl(episode.resource_url);
      console.log(audioUrl,'new audio')
        return;
    }
    // setVideoUri(await Storage.get(update.resource_url));
    Storage.get(episode.resource_url).then(e=>setAudioUrl(e));
    setUpPlayer()

    
   



}, [episode])
  
  


 

  return (
    <View className="flex flex-row">
        {/* <Text style={styles.fill}>Recording 1 - {duration}</Text> */}
        {/* <View style={[styles.progress, { width: `${getProgress()}%`}]} /> */}

      {/* <View>
               

                <View style={styles.progressLevelDuraiton}>
                  <Text style={styles.progressLabelText}>
                    {new Date(progress.position * 1000)
                      .toLocaleTimeString()
                      .substring(3)}
                  </Text>
                  <Text style={styles.progressLabelText}>
                    {new Date((progress.duration - progress.position) * 1000)
                      .toLocaleTimeString()
                      .substring(3)}
                  </Text>
                </View>
      </View>
        */}

          
        <TouchableOpacity onPress={() => setUpPlayer(true)} disabled={true} className="mr-[5px]">
          <View className="h-[40px] w-[40px] bg-[#008F43] rounded-full justify-center flex items-center">
          <FontAwesome name={`play`} size={15} color={"white"} className="font-bold"/>

            {/* <FontAwesome name={`${playBackState === State.Playing ? 'pause' : 'play'}`} size={15} color={"white"} className="font-bold"/> */}
          </View>
        </TouchableOpacity>
        <View className="w-[75%]">
          <Image source={require('../../assets/app/audio-1.png')} className="w-[90%] h-auto"/>
        </View>

        <TouchableOpacity onPress={() => openShareDialogAsync(audioUrl)}>
          <View className="h-[40px] w-[40px] bg-[#008F43] rounded-full justify-center flex items-center">
            <FontAwesome name='download' size={15} color={"white"} className="font-bold"/>
          </View>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 79,
        backgroundColor: '#131313',
        borderWidth: 2,
        borderColor: 'black',
      },
      progress: {
        height: 3,
        backgroundColor: '#bcbcbc'
      },
  });


export default AudioHolder;