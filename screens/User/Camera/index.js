import React, {useRef, useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Button, SafeAreaView} from 'react-native';

import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import BottomTab, {bottomTabIcons} from '../../../components/Home/BottomTab';
import { Camera, CameraType  } from 'expo-camera';
import { Video } from 'expo-av';
import * as MediaLibrary from 'expo-media-library';
import Icon from 'react-native-vector-icons/FontAwesome5';




const CameraScreen = () => {
  let cameraRef = useRef();
  const [cameraPermission, setCameraPermission] = useState(null);
  const [galleryPermission, setGalleryPermission] = useState(null);



  const [type, setType] = useState(CameraType.back);


  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMicrophonePermission, setHasMicrophonePermission] = useState();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [isRecording, setIsRecording] = useState(false);
  const [video, setVideo] = useState();





  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const microphonePermission = await Camera.requestMicrophonePermissionsAsync();
      const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();

      setHasCameraPermission(cameraPermission.status === "granted");
      setHasMicrophonePermission(microphonePermission.status === "granted");
      setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
    })();
  }, []);

  // if (hasCameraPermission === undefined || hasMicrophonePermission === undefined) {
  //   return <Text>Requestion permissions...</Text>
  // } else if (!hasCameraPermission) {
  //   return <Text>Permission for camera not granted.</Text>
  // }











  function toggleCameraType() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }



  const camera = useRef();

  const navigation = useNavigation();



  let recordVideo = () => {
    setIsRecording(true);
    let options = {
      quality: "720p",
      maxDuration: 60,
      mute: false
    };

    cameraRef.current.recordAsync(options).then((recordedVideo) => {
      setVideo(recordedVideo);
      setIsRecording(false);
    });
  };


  let stopRecording = () => {
    setIsRecording(false);
    cameraRef.current.stopRecording();
  };


  if (video) {
    let shareVideo = () => {
      shareAsync(video.uri).then(() => {
        setVideo(undefined);
      });
    };

    let saveVideo = () => {
      console.log(video.uri)
        navigation.navigate('CreateVideo', {videoUri: video.uri});

    };

    return (
      <SafeAreaView style={styles.container}>
        <Video
          style={styles.video}
          source={{uri: video.uri}}
          useNativeControls
          resizeMode='contain'
          isLooping
        />
        <Button title="Save" onPress={saveVideo} />
        <Button title="Discard" onPress={() => setVideo(undefined)} />
      </SafeAreaView>
    );
  }


  


  const onRecord = async () => {
    if (isRecording) {
      camera.current.stopRecording();
    } else {
      const data = await camera.current.recordAsync();
      navigation.navigate('CreateVideo', {videoUri: data.uri});
    }
  };

  return (
   <>
      <View style={styles.container} className="h-full relative">
            <Camera style={styles.preview} ref={cameraRef} type={type}>
            <View className="absolute top-10 right-8">
                    <TouchableOpacity onPress={() => navigation.navigate("LiveUpdates")}>
                      <Icon name="times" size={30} color="#fff" style={styles.icon} />
                    </TouchableOpacity>
                  </View>
              
             <View className="flex flex-row absolute w-[100%]" style={styles.buttonContainer}>
                  
                <View className="mx-auto w-[140%] justify-self-center">
                    <TouchableOpacity onPress={isRecording ? stopRecording : recordVideo}
                    style={
                      isRecording ? styles.buttonStop : styles.buttonRecord
                    }  className="border-2 border-white"/>
                    { isRecording ? <Text className="text-white text-center text-[12px] font-bold">Stop Recording</Text>
                    :   <Text className="text-white text-center text-[12px] font-bold">Start Recording</Text>
                  }
                  </View>
                  <View  className="mx-auto justify-self-end align-middle mt-[20px] mr-[10px]">
                    <TouchableOpacity onPress={toggleCameraType}>
                        <Icon name="camera" size={30} color="#fff" style={styles.icon} />
                        <Text style={styles.text} className="text-white text-center text-[10px] font-bold">Flip Camera</Text>
                      </TouchableOpacity>
                  </View>
             </View>
            </Camera>
      </View>
      <BottomTab icons={bottomTabIcons} navigation={navigation} tabName='LiveUpdates'/>
  
   </>

  );
};

export default CameraScreen;