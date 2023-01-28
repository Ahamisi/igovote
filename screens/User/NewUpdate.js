import { View, Text, Image, TouchableOpacity, SafeAreaView, StyleSheet, Alert, TextInput, Picker} from 'react-native';

import { CheckBox } from '@rneui/base';
import React, {useState, useEffect} from 'react';


// external libraries
import {Dropdown} from 'react-native-element-dropdown';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';


import AsyncStorage from '@react-native-async-storage/async-storage';




// components
import GoBack from '../../components/General/GoBack';
import { STATESDATA } from '../../assets/data/states';


import {BASE_URL} from '@env'



// amplify apis
// import { DataStore } from '@aws-amplify/datastore';
import Amplify, { Auth, DataStore } from "aws-amplify";

import { UserProfile } from "../../src/models";

import { LiveReports } from '../../src/models';







const NewUpdate = ({navigation, canGoBack = true, type='', editing=false}) => {


  const [isSubmitting, setIsSubmitting] = useState(false)



  const [IsEditing, setIsEditing] = useState(editing)



    const [isFocus, setIsFocus] = useState(false);



    const [puDelimitation, setPuDelimitation] = useState('');
    const [adHoc, setAdHoc] = useState(null);
    const [scenery, setScenery] = useState(null);
    const [materialsFunctional, setMaterialsFunctional] = useState(null);
    const [currentState, setCurrentState] = useState(null);









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
        // Error saving data
      }
    }

    






    const CompleteProfileSchema = Yup.object().shape({
        
    })




    const onCompleteProfile = async ( queue, vote_time,comments) =>{
      



       const isValidated = currentState && materialsFunctional && scenery && puDelimitation
       if(isValidated){
        try{
          setIsSubmitting(true)



            const saveUserToDB = async () => {

                  // get user  from cognito
                const userInfo = await Auth.currentAuthenticatedUser();
                if (!userInfo) {
                    return;
                  }
                const userId = userInfo.attributes.sub;

                 // check if user exists in DB
                const user = (await DataStore.query(UserProfile)).find(userProfile => userProfile.sub === userId);
                    // Save Update
                        await DataStore.save(
                          new LiveReports({
                              user: userId,
                              polling_unit: userInfo.attributes.pu ? userInfo.attributes.pu : puDelimitation,
                              pu_current_state: currentState ? currentState : '',
                              pu_scenery: scenery ? scenery : '',
                              no_on_queue: queue ? queue : '',
                              materials_functional: materialsFunctional ? materialsFunctional : '',
                              average_time_to_vote: vote_time ? vote_time : '',
                              staff_present: adHoc ? adHoc : '',
                              endorsements: 0,
                              is_false: 0,
                              comments: comments ? comments : '',
                              report_status: 'active',
                              attachment: '',
                              time_create: '',
                              time_create_clone: new Date().toISOString(),
                          })
                      );
            };

            saveUserToDB();
            navigation.navigate({
                name: 'Success',
                params: { source: 'live-updates' },
                merge: true,
              });

        }catch(error){
            Alert.alert('Omo water don pass garri !!!',`${error}`)
        }finally{
          setIsSubmitting(false)
        }

       }else{
            if(!puDelimitation){
                Alert.alert('E remain one thing',`Abeg go your profile go enter your polling unit from your PVC`);
            }else{
                Alert.alert('No be so oo !!!',`Senior man, abeg fill everything for here...`);
            }
       }



    }





    useEffect(() => {
      getPu();
    },[])






  return (
        <SafeAreaView classNameclassName="bg-[#009244]">

            <View className="bg-[#009244] pt-[20%] h-full pb-[10%]">
                {canGoBack &&
                     <GoBack navigation={navigation} goTo="LiveUpdates" mt="20px"/> 
                }
                
                <View className="mx-auto my-[20px]">

                    <Text className="text-[18px] text-center font-bold text-white">Sabi guy 😁, Oya fill am !!!</Text>
                </View>


                <Formik 
                    initialValues={{pu:'',queue:'', vote_time:'', current_state:'',materials_functional:'', scenery:'', comments: ''}}
                    onSubmit={(values) => {
                        onCompleteProfile(values.queue,values.vote_time,values.comments)
                    }}
                    validationSchema={CompleteProfileSchema}

                    validateOnMount={true} >


                    {({handleChange, handleBlur, handleSubmit, values, isValid}) =>(


                        <View className=" bg-white rounded-[20px] mx-auto my-auto  w-[90%] px-[20px] py-[40px] items-center">
                            
                            <View className="w-[100%] mb-[15px]">
                                
                                <Dropdown
                                    style={[styles.dropdown, isFocus && {borderColor: '#009244'}]}
                                    placeholderStyle={styles.placeholderStyle}
                                    selectedTextStyle={styles.selectedTextStyle}
                                    iconStyle={styles.iconStyle}
                                    data={[{"adHoc": 'Yes'}, { "adHoc": 'No'}]}
                                    maxHeight={300}
                                    labelField="adHoc"
                                    valueField="adHoc"
                                    placeholder={!isFocus ? 'Are INEC officials Present?' : '...'}
                                    value={adHoc}
                                    onFocus={() => setIsFocus(true)}
                                    onBlur={() => setIsFocus(false)}
                                    onChange={item => {
                                        setAdHoc(item.adHoc)
                                        setIsFocus(false);
                                    }}
                                />
                            </View>

                            <View className="w-[100%] mb-[15px]">
                                <TextInput placeholder='How many people are currently on Queue ?'
                                placeholderTextColor="#000" 

                                style={[styles.dropdown, isFocus && {borderColor: '#009244'}]}
                                    autoCapitalize='none'
                                    keyboardType='numeric'
                                    textContentType='numeric'
                                    autoFocus={false}
                                    onChangeText={handleChange('queue')}
                                    onBlur={handleBlur('queue')}
                                    value={values.queue}
                                    className=" text-[] px-[20px] py-[18px] rounded-[5px]"/>
                            
                            </View>


                            <View className="w-[100%] mb-[15px]">
                                <TextInput placeholder='Average time to cast vote in mins ? '
                                style={[styles.dropdown, isFocus && {borderColor: '#009244'}]}
                                    autoCapitalize='none'
                                    keyboardType='numeric'
                                    placeholderTextColor="#000" 

                                    textContentType='numeric'
                                    autoFocus={false}
                                    onChangeText={handleChange('vote_time')}
                                    onBlur={handleBlur('vote_time')}
                                    value={values.vote_time}
                                    className=" text-[] px-[20px] py-[18px] rounded-[5px]"/>
                            
                            </View>



                            <View className="w-[100%] mb-[15px]">
                                <Dropdown
                                    style={[styles.dropdown, isFocus && {borderColor: '#009244'}]}
                                    placeholderStyle={styles.placeholderStyle}
                                    selectedTextStyle={styles.selectedTextStyle}
                                    iconStyle={styles.iconStyle}
                                    data={[{"current_state": 'No officials yet'}, { "current_state": 'Officials are setting up'},
                                    { "current_state": 'Voting Commenced'}, { "current_state": 'Voting on Hold'},
                                    { "current_state": 'Voting ended'}, { "current_state": 'Collation in progress'},
                                    { "current_state": 'Voting and Collation Ended'}
                                    ]}
                                    maxHeight={300}
                                    labelField="current_state"
                                    valueField="current_state"
                                    placeholder={!isFocus ? 'What is Happening Now?' : '...'}
                                    value={currentState}
                                    onFocus={() => setIsFocus(true)}
                                    onBlur={() => setIsFocus(false)}
                                    onChange={item => {
                                        setCurrentState(item.current_state)
                                        setIsFocus(false);
                                    }}
                                />
                            </View>





                            <View className="w-[100%] mb-[15px]">
                                <Dropdown
                                    style={[styles.dropdown, isFocus && {borderColor: '#009244'}]}
                                    placeholderStyle={styles.placeholderStyle}
                                    selectedTextStyle={styles.selectedTextStyle}
                                    iconStyle={styles.iconStyle}
                                    data={[{"materials_functional": 'Yes'}, { "materials_functional": 'No'}                                    ]}
                                    maxHeight={300}
                                    labelField="materials_functional"
                                    valueField="materials_functional"
                                    placeholder={!isFocus ? 'Are electoral materials functional' : '...'}
                                    value={materialsFunctional}
                                    onFocus={() => setIsFocus(true)}
                                    onBlur={() => setIsFocus(false)}
                                    onChange={item => {
                                        setMaterialsFunctional(item.materials_functional)
                                        setIsFocus(false);
                                    }}
                                />
                            </View>



                            <View className="w-[100%] mb-[15px]">
                                <Dropdown
                                    style={[styles.dropdown, isFocus && {borderColor: '#009244'}]}
                                    placeholderStyle={styles.placeholderStyle}
                                    selectedTextStyle={styles.selectedTextStyle}
                                    iconStyle={styles.iconStyle}
                                    data={[{"scenery": 'Calm'}, { "scenery": 'Violent'},
                                    { "scenery": 'Normal'}
                                    ]}
                                    maxHeight={300}
                                    labelField="scenery"
                                    valueField="scenery"
                                    placeholder={!isFocus ? 'What is the current scene like' : '...'}
                                    value={scenery}
                                    onFocus={() => setIsFocus(true)}
                                    onBlur={() => setIsFocus(false)}
                                    onChange={item => {
                                        setScenery(item.scenery)
                                        setIsFocus(false);
                                    }}
                                />
                            </View>

                        


                            <View className="w-[100%] mb-[15px]">
                              <TextInput placeholder='Any extra comment?'
                               style={[styles.dropdown, isFocus && {borderColor: '#009244'}]}
                                 autoCapitalize='none'
                                 keyboardType='text'
                                 textContentType='text'
                                 autoFocus={false}
                                 onChangeText={handleChange('comments')}
                                 onBlur={handleBlur('comments')}
                                 placeholderTextColor="#000" 
                                 value={values.comments}
                                className=" text-[] px-[20px] py-[18px] rounded-[5px]"/>
                               
                            </View>



                            <View className="w-[100%] mb-[15px] flex justify-end">
                              <TouchableOpacity className="" style={styles.button(isValid)} onPress={handleSubmit} disabled={!isValid}>
                                {/* <TouchableOpacity className="" style={styles.button(true)} onPress={handleSubmit}  > */}
                                    <View className="px-[32px] py-[15px] rounded-[25px] text-[#fff] shadow-2xl" >
                                        <Text className="text-white text-center text-[18px] font-bold">
                                        {
                                            isSubmitting ? 'Updating...' : 'Add update'
                                        }
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>


                 


                        </View>

                    )}


                </Formik>
           
            </View>





        </SafeAreaView>
  )
}


const styles = StyleSheet.create({
    checkboxContainer: {
      flexDirection: 'row',
      marginBottom: 20,
    },
    checkbox: {
      alignSelf: 'center',
    },
    label: {
      margin: 8,
    },
    wrapper:{
        marginTop: 80,
    },
    inputField:{
        backgroundColor: '#fafafa',
        marginBottom: 10,
    },
    button: isValid =>({
        backgroundColor: isValid ? '#009244' : '#b5e2cd',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 42,
        borderRadius: 4
    }),
    buttonText:{
        fontWeight: '600',
        color: '#fff',
        fontSize: 20
    },
    signupContainer:{
        flexDirection: 'row',
        width: '100%',
        marginTop: 50,
        justifyContent: 'center'
    } ,
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
        marginBottom: 10,
      },
      icon: {
        marginRight: 5,
      },
      label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
      },
      placeholderStyle: {
        fontSize: 16,
      },
      selectedTextStyle: {
        fontSize: 16,
      },
      iconStyle: {
        width: 20,
        height: 20,
      },
      inputSearchStyle: {
        height: 40,
        fontSize: 16,
      },  
  });
  

export default NewUpdate