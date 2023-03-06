import React, {useEffect, useRef, useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {Storage, API, Auth,DataStore} from 'aws-amplify';
import {useRoute, useNavigation} from '@react-navigation/native';
import ProgressDialog from 'react-native-progress-dialog';


import styles from './styles';

import { UserProfile, ElectionPosts } from '../../../src/models';
import { SafeAreaView } from 'react-native-safe-area-context';

const CreateRecording = () => {
  const [description, setDescription] = useState('');
  const [videoKey, setVideoKey] = useState(null);
  const [puDelimitation, setPuDelimitation] = useState('');


  const route = useRoute();
  const navigation = useNavigation();

  const uploadToStorage = async (imagePath) => {
    let vvkey = ''
    try {
      const response = await fetch(imagePath);

      const blob = await response.blob();
      const extension = imagePath?.split(".");
      const filename = `${uuid.v4()}.${extension[extension.length - 1]}`;
      const s3Response = await Storage.put(filename, blob);
      setVideoKey(s3Response.key);
      vvkey = s3Response.key;
      console.log(s3Response.key,'dododo',videoKey)

      
    } catch (e) {
      console.error(e);
    }finally{
        console.log('done uploading')
        onPublish(vvkey) 
    }
  };

  const getPu = async (pu) => {
    try {
      setPuDelimitation(await AsyncStorage.getItem('pu'))
      if(!puDelimitation){
          // get user  from cognito
          const userInfo = await Auth.currentAuthenticatedUser();
          if (!userInfo) {
              return;
          }
          const userId = userInfo.attributes.sub;
          const user = (await DataStore.query(UserProfile)).find(userProfile => userProfile.sub === userId);
          setPuDelimitation(user.pu);
      }
    } catch (error) {
      console.log(error)
      // Error saving data
    }
  }



  useEffect(() => {
    getPu();
    uploadToStorage(route.params.videoUri);
  }, []);

  const onPublish = async (vvkey) => {
    console.log('got here',videoKey,vvkey)
    // create post in the database (API)
    // if (!videoKey) {
    //     console.log(videoKey)
    // //   Alert.alert('Audio is not yet uploaded');
    //   return;
    // }

    try {
      const userInfo = await Auth.currentAuthenticatedUser();
      const user = (await DataStore.query(UserProfile)).find(userProfile => userProfile.sub === userInfo.attributes.sub);
      await DataStore.save(
        new ElectionPosts({
        "user": userInfo.attributes.sub,
        "polling_unit": userInfo.attributes.pu ? userInfo.attributes.pu : puDelimitation,
        "lga": userInfo.attributes.lga ? userInfo.attributes.lga : '',
        "type": 'audio',
        "resource_url": vvkey,
        "flagged": 0,
        "endorsed": 0,
        "status": "active",
        "date_created": new Date().toISOString()
      })
    );
    } catch (e) {
      console.error(e);
    }finally{
        navigation.navigate("LiveUpdates", { screen: "Home", hideModal: true });
    }
  };

  return (
    <SafeAreaView>
        <ProgressDialog visible={true} label="Uploading" loaderColor="#009244"/>
    </SafeAreaView>
  );
};

export default CreateRecording;