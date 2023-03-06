import { StatusBar } from 'expo-status-bar';
import React, {useEffect} from 'react';
import { Button, StyleSheet, Text, View, Image, SafeAreaView,TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import * as Sharing from 'expo-sharing';
import {useNavigation} from '@react-navigation/native';


import BottomTab, {bottomTabIcons} from '../../../components/Home/BottomTab';
import { FontAwesome } from "@expo/vector-icons";




export default function VoiceRecord() {
  const navigation = useNavigation();


  const [recording, setRecording] = React.useState();
  const [recordings, setRecordings] = React.useState([]);
  const [message, setMessage] = React.useState("");
  const [savedFile, setSavedFile] = React.useState(false);
  const [playing, setPlaying] = React.useState(false);
  const [remainingSecs, setRemainingSecs] = React.useState('0');
  const [startAfresh, setStartAfresh] = React.useState(false);


  let timeoutSetter = ''
  // const sound = new Audio.Sound()
  let sound = React.useRef(new Audio.Sound());

  function loadNewSound() { sound = React.useRef(new Audio.Sound() ) 
    console.log('I am new sund')
  };



  async function startRecording() {
    try {
      const permission = await Audio.requestPermissionsAsync();

      if (permission.status === "granted") {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true
        });
        
        const { recording } = await Audio.Recording.createAsync(
          Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
        );

        setRecording(recording);
      } else {
        setMessage("Please grant permission to app to access microphone");
      }
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    setRecording(undefined);
    await recording.stopAndUnloadAsync();

    let updatedRecordings = [...recordings];
    const { sound, status } = await recording.createNewLoadedSoundAsync();
    updatedRecordings.push({
      sound: sound,
      duration: getDurationFormatted(status.durationMillis),
      file: recording.getURI()
    });

    setRecordings(updatedRecordings);
    
  }



const spinListener = async(remSecs) => {
  const result = await sound.current.getStatusAsync();
  if (result.isPlaying === true) {
    timeoutSetter =  setTimeout(()=>{
      setPlaying(false)
      console.log(remSecs,result.positionMillis)
      if(remSecs - result.positionMillis == 0){
        console.log('fon playing')
        setStartAfresh(true)

      }
    },remSecs - result.positionMillis)
  }


 
}



// start recording
  const onStartPlay = async (afresh = false) => {
    setPlaying(true)
    try {
      const result = await sound.current.getStatusAsync();
      if (result.isLoaded) {
        // && result.durationMillis !== result.positionMillis
        // console.log('loaded', result.durationMillis, result.positionMillis, result.didJustFinish)
        // if (result.isPlaying === false) {

        if(result.durationMillis == result.positionMillis){
          console.log('i took effect')
          try {

            await sound.current.replayAsync().then(e => {
              spinListener(e.playableDurationMillis);
  
            }).then(e => {
              console.log('done',e)
            })
            
          } catch (error) {
            console.log(error)
          }
        }
          
          await sound.current.playAsync().then(e => {
            spinListener(e.playableDurationMillis);

          }).then(e => {
            console.log('done',e)
          })
      }else{


        console.log('not loaded')

        try {
          await sound.current.loadAsync({
            uri: recordings[0].file
          })
          console.log('i tried loading pppp')
          await sound.current.playAsync().then(e => {
            spinListener(e.playableDurationMillis);


          })
        }catch(error) {
          console.log(error)

        }  
        
      }
    } catch (error) {}


    // try {
    //   await sound.current.loadAsync({
    //     uri: recordings[0].file
    //   })
    //   await sound.current.playAsync()
    //   // Your sound is playing!
    
    //   // Don't forget to unload the sound from memory
    //   // when you are done using the Sound object
    //   // const unload = await sound.unloadAsync();
    //   // console.log(unload)
    // } catch (error) {
    //   // An error occurred!
    // }finally{
    // }
  };

  const pauseAudio = async () => {
    clearTimeout()

    try {
      const result = await sound.current.getStatusAsync();
      console.log(result, sound.current)
      if (result.isLoaded) {
        if (result.isPlaying === true) {
          setPlaying(false)
          sound.current.pauseAsync();
          clearTimeout(timeoutSetter)

        }
      }
    } catch (error) {}
  };






  async function goBackToOrigin(){
    navigation.navigate('LiveUpdates', {tab: 'media'});

  }

  let saveRecording = (url) => {
    setSavedFile(true);
    navigation.navigate('CreateRecording', {videoUri: recordings[0].file});

  };


  function getDurationFormatted(millis) {
    const minutes = millis / 1000 / 60;
    const minutesDisplay = Math.floor(minutes);
    const seconds = Math.round((minutes - minutesDisplay) * 60);
    const secondsDisplay = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutesDisplay}:${secondsDisplay}`;
  }

  function getRecordingLines() {
    return recordings.map((recordingLine, index) => {
      return (
        
        <View key={index} style={styles.row}>
            {
                savedFile ? <View className="flex flex-column">
                                    <Text className="font-bold text-[24px] text-[#009244] text-center">Successfully uploaded</Text>
                    <Text className="font-bold text-[14px] text-red-900 text-center"> You can close this dialogue now</Text>
                </View>
                : <>
                    <Text style={styles.fill}>Recording {index + 1} - {recordingLine.duration}</Text>
                    {console.log(startAfresh,'minor')}

                    <TouchableOpacity onPress={() => playing ? pauseAudio() : onStartPlay(startAfresh)} className="mr-[5px]">
                      <View className="h-[40px] w-[40px] bg-[#009244] rounded-full justify-center flex items-center">
                        <FontAwesome name={`${playing ? 'pause' : 'play'}`} size={15} color={"white"} className="font-bold"/>
                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity oonPress={saveRecording}>
                      <View className="h-[40px] w-[40px] bg-[#009244] rounded-full justify-center flex items-center">
                        <FontAwesome name='upload' size={15} color={"white"} className="font-bold"/>
                      </View>
                    </TouchableOpacity>
                </>
            }


          

          {/* <Button style={styles.button} onPress={() => Sharing.shareAsync(recordingLine.file)} title="Share"></Button> */}
        </View>
      );
    });
  }

  return (
    
    <>
            <View style={styles.container} className="relative text-center align-middle justify-center pt-[10%]">
                <Text>{message}</Text>
                {
                    recording &&
                    <Image className="" source={require('../../../assets/app/audio-wave.gif')} />
                }
                
                {
                  recordings.length !== 1 &&
                    <TouchableOpacity onPress={recording ? stopRecording : (recordings.length > 0 ? goBackToOrigin : startRecording) }>
                      <View className="h-[40px] w-[40px] bg-[#009244] rounded-full justify-center flex items-center">
                        {
                          recording ? <FontAwesome name='stop' size={15} color={"white"} className="font-bold"/> : (
                            recordings.length > 0 ? <FontAwesome name='play' size={15} color={"white"} className="font-bold"/> :<FontAwesome name='microphone' size={15} color={"white"} className="font-bold"/>
                          )
                        }
                        
                      </View>
                  </TouchableOpacity>
              }
                {getRecordingLines()}
                <StatusBar style="auto" />
            </View>
    </>

  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fill: {
    flex: 1,
    margin: 16
  },
  button: {
    margin: 16
  }
});