import { View, Text, Image, TouchableOpacity, SafeAreaView, StyleSheet, Alert, TextInput} from 'react-native';

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







const Profile = ({navigation, canGoBack = false, type='', editing=false}) => {





  const [IsEditing, setIsEditing] = useState(editing)


  const [isSubmitting, setIsSubmitting] = useState(false)



  const Logout = async () => {
    try {
        await AsyncStorage.removeItem('@userProfile');
        await AsyncStorage.removeItem('@userData');
        await Auth.signOut();
        navigation.push('BeforeAuth')
    } catch (error) {
        console.log('error signing out: ', error);
    }
   
  
}








    const [isFocus, setIsFocus] = useState(false);


    const [lgaData, setLgaData] = useState([]);
    const [wardData, setWardData] = useState([]);
    const [puData, setPuData] = useState([]);




    const [stateName, setStateName] = useState(null);
    const [gender, setGender] = useState(null);

    const [stateId, setStateId] = useState(null);

    const [lgaName, setLgaName] = useState(null);
    const [lgaId, setLgaId] = useState(null);
    const [lgaAbbreviation, setLgaAbbreviation] = useState(null);



    const [wardName, setWardName] = useState(null);
    const [wardId, setWardId] = useState(null);
    const [wardAbbreviation, setWardAbbreviation] = useState(null);





    const [puName, setPuName] = useState(null);
    const [puId, setPuId] = useState(null);
    const [puDelimitation, setPuDelimitation] = useState('');


    const storePu = async (pu) => {
      try {
        await AsyncStorage.setItem('pu',pu);
      } catch (error) {
        // Error saving data
      }
    }


    const getPu = async (pu) => {
      try {
        setPuDelimitation(await AsyncStorage.getItem('pu'))
      } catch (error) {
        // Error saving data
      }
    }






    


    const handlePu = (stateCode, lgaCode, wardCode) => {
      var config = {
          method: 'get',
          url: `${BASE_URL}/get-pu/${stateCode}/${lgaCode}/${wardCode}`,
        };
  
      axios(config)
        .then(function (response) {
          // console.log(JSON.stringify(response.data));
          var count = Object.keys(response.data?.result?.Items).length;
          let puArray = [];
          for (var i = 0; i < count; i++) {
            puArray.push({
              id: response.data?.result?.Items[i].lga_id.S,
              name: response.data?.result?.Items[i].name.S,
              abbreviation: response.data?.result?.Items[i].abbreviation.S,
            });
          }
          setPuData(puArray);
        })
        .catch(function (error) {
          console.log(error);
        });
  };




    const handleWard = (stateCode, lgaCode) => {
        var config = {
            method: 'get',
            url: `${BASE_URL}/get-wards/${stateCode}/${lgaCode}`,
          //   headers: {
          //     'X-CSCAPI-KEY': API_KEY,
          //   },
          };
    
        axios(config)
          .then(function (response) {
            // console.log(JSON.stringify(response.data));
            var count = Object.keys(response.data?.result?.Items).length;
            let wardArray = [];
            for (var i = 0; i < count; i++) {
                wardArray.push({
                id: response.data?.result?.Items[i].lga_id.S,
                name: response.data?.result?.Items[i].name.S,
                abbreviation: response.data?.result?.Items[i].abbreviation.S,
              });
            }
            setWardData(wardArray);
          })
          .catch(function (error) {
            console.log(error);
          });
    };





    const handleLga = stateCode => {
        var config = {
          method: 'get',
          url: `${BASE_URL}/get-lga/${stateCode}`,
        //   headers: {
        //     'X-CSCAPI-KEY': API_KEY,
        //   },
        };
    
        axios(config)
          .then(function (response) {
            // console.log(JSON.stringify(response.data));
            var count = Object.keys(response.data?.result?.Items).length;
            let lgaArray = [];
            for (var i = 0; i < count; i++) {
                lgaArray.push({
                id: response.data?.result?.Items[i].lga_id.S,
                name: response.data?.result?.Items[i].lga.S,
                state: stateCode,
                abbreviation: response.data?.result?.Items[i].abbreviation.S,
              });
            }
            setLgaData(lgaArray);
          })
          .catch(function (error) {
            console.log(error);
          });
      };
    




    const CompleteProfileSchema = Yup.object().shape({
        
    })




    const onCompleteProfile = async (pu) =>{

       const isValidated = gender && stateName && lgaName && wardName
       if(isValidated){
        try{
          setIsSubmitting(true)



          /* Models in DataStore are immutable. To update a record you must use the copyOf function
 to apply updates to the item’s fields rather than mutating the instance directly */


            const saveUserToDB = async () => {

                  // get user  from cognito
                const userInfo = await Auth.currentAuthenticatedUser();
                if (!userInfo) {
                    return;
                  }
                const userId = userInfo.attributes.sub;

                 // check if user exists in DB
                const user = (await DataStore.query(UserProfile)).find(userProfile => userProfile.sub === userId);


                storePu(pu);




                if (!user) {
                    // if not, save user to db.


                

                        await DataStore.save(
                          new UserProfile({
                              sub: userId,
                              name: userInfo.attributes.email,
                              state_id: stateId,
                              lga: lgaName,
                              ward: wardName,
                              ward_id: wardId,
                              ward_abbreviation: wardAbbreviation,
                              state: stateName,
                              pu: pu,
                              pu_id: pu,
                              lga_abbreviation: lgaAbbreviation,
                              lga_id: lgaId,
                              gender: gender
                          })
                      );
                } else if(IsEditing){

                    await DataStore.save(UserProfile.copyOf(user, item => {
                            item.state_id = stateId,
                            item.lga = lgaName,
                            item.ward = wardName,
                            item.ward_id =  wardId,
                            item.ward_abbreviation =  wardAbbreviation,
                            item.state = stateName,
                            item.pu = pu,
                            item.pu_id =  pu,
                            item.lga_abbreviation = lgaAbbreviation
                            item.lga_id = lgaId,
                            item.gender =  gender
                      // Update the values on {item} variable to update DataStore entry
                    }));

                } else {
                    console.warn("User already exists in DB");
                }
            };

            saveUserToDB();
            navigation.push('Success')
        }catch(error){
            Alert.alert('Omo water don pass garri !!!',`${error}`)
        }finally{
          setIsSubmitting(false)
        }

       }else{
            Alert.alert('No be so oo !!!',`Senior man, abeg fill all everything for here......you fit fill the polling unit later 😉`);
       }

    }





    useEffect(() => {
      getPu();
    },[])






  return (
        <SafeAreaView classNameclassName="bg-[#008F43]">

            <View className="bg-[#ffffff] pt-[10%] h-full pb-[10%]">

            {/* <View className=""> */}
              {/* {canGoBack ?
                      <GoBack navigation={navigation} goTo="Profile"/> 
                  :
                  <View className="absolute top-5 bg-[#fff] rounded-full">
                      <TouchableOpacity  onPress={Logout}>
                          <View className={`h-[40px] w-[40px] bg-[#008F43]  rounded-full flex items-center justify-center mx-[20px] my-[10px`}>
                              <Image source={require('../../assets/app/back-icon.png')}/>
                          </View>
                      </TouchableOpacity>
                  </View>

                } */}
                  <GoBack navigation={navigation} goTo="MainMenu"/> 

                
            {/* </View> */}
                

             
                
                <View className=" bg-[#EDF2F8] p-[12px] mt-6">
                  <View className="mx-auto text-center">
                    {/* <Text className="text-[18px] text-center font-bold text-white">Hello there 😁, Please {IsEditing ? 'Edit' : 'Complete' } your profile</Text> */}
                    <Image className="h-[200px] w-[300px]" source={require('../../assets/app/pvc.png')} />
                    <Text className="text-[12px] text-center text-[#008F43]">1. Check your PVC for polling unit code</Text>
                    <Text className="text-[12px] text-center text-[#008F43]">2. State, LGA and Ward must be where you registered to vote</Text>
                  </View>
                  

                    

                </View>


               <View>
               <Formik 
                    initialValues={{pu: ''}}
                    onSubmit={(values) => {
                      console.log('sokok')
                        onCompleteProfile(values.pu)
                    }}
                    validationSchema={CompleteProfileSchema}

                    validateOnMount={true} >


                    {({handleChange, handleBlur, handleSubmit, values, isValid}) =>(


                        <View className=" bg-white rounded-[20px] mx-auto my-auto  w-[90%] px-[8px] py-[10px] items-center">
                            
                            {/* <View className="mx-auto mb-[30px]">
                                    <Text className="text-red-800 font-bold pt-[4px]">1. For polling unit Code? see sample above on your pvc</Text>
                                    <Text className="text-red-800 font-bold pt-[4px]">2. STATE, LGA and WARD must be where you registered to vote</Text>



                            </View> */}



                            <View className="w-[100%] mb-[10px]">
                                <Dropdown
                                    style={[styles.dropdown, isFocus && {borderColor: '#008F43'}]}
                                    placeholderStyle={styles.placeholderStyle}
                                    selectedTextStyle={styles.selectedTextStyle}
                                    iconStyle={styles.iconStyle}
                                    data={[{"gender": 'Male'}, { "gender": 'Female'}]}
                                    maxHeight={300}
                                    labelField="gender"
                                    valueField="gender"
                                    placeholder={!isFocus ? 'Select Gender' : '...'}
                                    value={gender}
                                    onFocus={() => setIsFocus(true)}
                                    onBlur={() => setIsFocus(false)}
                                    onChange={item => {
                                        setGender(item.gender)
                                        setIsFocus(false);
                                    }}
                                />
                            </View>


                            <View className="w-[100%] mb-[10px]">
                                <Dropdown
                                    style={[styles.dropdown, isFocus && {borderColor: '#008F43'}]}
                                    placeholderStyle={styles.placeholderStyle}
                                    selectedTextStyle={styles.selectedTextStyle}
                                    inputSearchStyle={styles.inputSearchStyle}
                                    iconStyle={styles.iconStyle}
                                    data={STATESDATA}
                                    search
                                    maxHeight={300}
                                    labelField="name"
                                    valueField="name"
                                    placeholder={!isFocus ? 'Select State' : '...'}
                                    searchPlaceholder="Search..."
                                    value={stateName}
                                    onFocus={() => setIsFocus(true)}
                                    onBlur={() => setIsFocus(false)}
                                    onChange={item => {
                                        handleLga(item.id);
                                        setStateName(item.name);
                                        setStateId(item.id)
                                        setIsFocus(false);
                                    }}
                                />
                            </View>



                            <View className="w-[100%] mb-[10px]">
                            <Dropdown
                                style={[styles.dropdown, isFocus && {borderColor: '#008F43'}]}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                inputSearchStyle={styles.inputSearchStyle}
                                iconStyle={styles.iconStyle}
                                data={lgaData}
                                search
                                maxHeight={300}
                                labelField="name"
                                valueField="id"
                                placeholder={!isFocus ? 'Select LGA' : '...'}
                                searchPlaceholder="Search..."
                                value={'SelectedLGA'}
                                onFocus={() => setIsFocus(true)}
                                onBlur={() => setIsFocus(false)}
                                onChange={item => {
                                    setLgaName(item.name);
                                    setLgaId(item.id)
                                    setLgaAbbreviation(item.abbreviation)
                                    handleWard(item.state,item.id);
                                    setIsFocus(false);
                                }}
                            />
                            </View>



                            <View className="w-[100%] mb-[10px]">
                                <Dropdown
                                    style={[styles.dropdown, isFocus && {borderColor: '#008F43'}]}
                                    placeholderStyle={styles.placeholderStyle}
                                    selectedTextStyle={styles.selectedTextStyle}
                                    inputSearchStyle={styles.inputSearchStyle}
                                    iconStyle={styles.iconStyle}
                                    data={wardData}
                                    search
                                    maxHeight={300}
                                    labelField="name"
                                    valueField="id"
                                    placeholder={!isFocus ? 'Select Ward' : '...'}
                                    searchPlaceholder="Search..."
                                    value={'selectedWARD'}
                                    onFocus={() => setIsFocus(true)}
                                    onBlur={() => setIsFocus(false)}
                                    onChange={item => {
                                        setWardName(item.name);
                                        setWardId(item.id)
                                        setWardAbbreviation(item.abbreviation)
                                        setIsFocus(false);
                                    }}
                                />
                            </View>



                            <View className="w-[100%] mb-[10px]">
                              <TextInput placeholder='Enter Polling Unit Code i.e 04-01-01-010 '
                               style={[styles.dropdown, isFocus && {borderColor: '#008F43'}]}
                                 autoCapitalize='none'
                                 keyboardType='text'
                                 textContentType='text'
                                 autoFocus={false}
                                 onChangeText={handleChange('pu')}
                                 onBlur={handleBlur('pu')}
                                 value={values.pu}
                                 onChange={() => {
                                  setPuDelimitation(values.pu)
                                 }}
                                className=" text-[] px-[20px] py-[18px] rounded-[24px]"/>
                                <Text className="text-red-800 font-bold pt-[4px] text-[10px]">Polling unit delimeter is not compulsory, but required to get full app experience</Text>

                               
                            </View>



                            <View className="w-[100%] mb-[10px] flex justify-end">
                              <TouchableOpacity className="" style={styles.button(isValid)} onPress={handleSubmit} disabled={!isValid}>
                                {/* <TouchableOpacity className="" style={styles.button(true)} onPress={handleSubmit}  > */}
                                    <View className="px-[32px] py-[15px] rounded-[24px] text-[#fff] shadow-2xl" >
                                        <Text className="text-white text-center text-[18px] font-bold"> 
                                        {
                                            isSubmitting ? 'E dey rush ....' : (IsEditing ? 'Save Profile' : 'Create Profile' )
                                        }
                                        
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>


                 


                        </View>

                    )}


                </Formik>
           
               </View>
            </View>





        </SafeAreaView>
  )
}


const styles = StyleSheet.create({
    checkboxContainer: {
      flexDirection: 'row',
      marginBottom: 2,
    },
    checkbox: {
      alignSelf: 'center',
    },
    label: {
      margin: 8,
    },
    wrapper:{
        marginTop: 40,
    },
    inputField:{
        marginBottom: 10,
        borderRadius: 24
    },
    button: isValid =>({
        backgroundColor: isValid ? '#008F43' : '#b5e2cd',
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
        borderColor: '#CDCFD0',
        borderWidth: 0.5,
        borderRadius: 24,
        paddingHorizontal: 32,
        marginBottom: 10,
        color: '#6C7072',
        fontSize: '14px'
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
        fontSize: 14,
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
  

export default Profile