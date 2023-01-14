import { View, Text, Image, TouchableOpacity, SafeAreaView, TextInput, StyleSheet, Alert} from 'react-native'
import { CheckBox } from '@rneui/base';
import React from 'react';

import GoBack from '../components/General/GoBack';



// import amplify auth
import { Auth } from 'aws-amplify';





import { Formik } from 'formik';
import * as Yup from 'yup';
import Validator from 'email-validator';




const Signup = ({navigation}) => {

    const SignupFormSchema = Yup.object().shape({
        email: Yup.string().email().required('An email is required'),
        password: Yup.string().required().min(6, 'Your password has to have atleast 6 characters')
    })




    const onSignup = async (email, password, firstname, phone) =>{
        
        
        const username = email


        // try {
        //     const { user } = await Auth.signUp({ username, password });
        //     console.log(user);
        // } catch (error) {
            
        //             // Alert.alert('Naija which way', error)
        // }
        try{
                const { user } = await Auth.signUp({
                    username,
                    password,
                    // attributes: {
                    //     email,          // optional
                    //     phone,   // optional - E.164 number convention
                    //     // other custom attributes 
                    //     firstname
                    // },
                    autoSignIn: { // optional - enables auto sign in after user is confirmed
                        enabled: true,
                    }
                });
                navigation.push('OnboardVerify',{usermail: username})
        }catch(error){
            Alert.alert('Omo water don pass garri !!!',`${error}`)
        }
    }














  return (
        <SafeAreaView>


            <View className="bg-[#eeeeee] pt-[20%] h-full">
                <GoBack navigation={navigation}/>
                <View className="mx-auto">
                    <Image className="h-auto w-auto" source={require('../assets/app/signup.png')} />

                </View>


                <Formik 
                    initialValues={{email:'', password: '', username: ''}}
                    onSubmit={(values) => {
                        onSignup(values.email, values.password, values.username)
                    }}
                    validationSchema={SignupFormSchema}
                    validateOnMount={true} >


                    {({handleChange, handleBlur, handleSubmit, values, isValid}) =>(


                        <View className=" bg-white rounded-[20px] mx-auto my-auto  w-[90%] px-[20px] py-[40px] items-center">
                            
                            <View className="w-[100%] mb-[15px]" style={[styles.inputField, 
                                {
                                    borderColor: values.email.length < 1 || Validator.validate(values.email) ? '#ccc' : 'red'
                                }
                            ]}>
                                <TextInput placeholder='Email' 
                                autoCapitalize='none'
                                keyboardType='email-address'
                                textContentType='email-address'
                                autoFocus={true}
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                                className="bg-[#eeeeee] text-[] px-[20px] py-[18px] rounded-[25px]"/>
                            </View>

                            <View className="w-[100%] mb-[15px]">
                                <TextInput placeholder='Phone Number'
                                 autoCapitalize='none'
                                 keyboardType='text'
                                 textContentType='text'
                                 autoFocus={false}
                                 onChangeText={handleChange('phone')}
                                 onBlur={handleBlur('phone')}
                                 value={values.phone}
                                className="bg-[#eeeeee] text-[] px-[20px] py-[18px] rounded-[25px]"/>
                            </View>
                            <View className="w-[100%] mb-[15px]"
                            style={[styles.inputField, 
                                {
                                    borderColor: 1 > values.password.length || values.password.length >= 6 ? '#ccc' : 'red'
                                }
                            ]}
                            >
                                <TextInput placeholder='Password'
                                 autoCapitalize='none'
                                 textContentType='password'
                                 secureTextEntry={true}
                                 autoFocus={false}
                                 onChangeText={handleChange('password')}
                                 onBlur={handleBlur('password')}
                                 value={values.password}
                                className="bg-[#eeeeee] text-[] px-[20px] py-[18px] rounded-[25px]"/>
                            </View>


                            {/* <View >
                                <CheckBox
                                value='selected'
                                />
                                <Text style={styles.label}>By creating an account you agree to our Terms of Service and Privacy Policy</Text>
                            </View>
        */}


                            {/* <View className="w-[100%] mb-[15px]">
                                <Text className="text-[#009244] text-[18px]"></Text>
                            </View> */}


                            <View className="w-[100%] mb-[15px] flex justify-end">
                                <TouchableOpacity className="" style={styles.button(isValid)} onPress={handleSubmit} disabled={!isValid}>
                                    <View className="bg-[#009244] px-[32px] py-[15px] rounded-[25px] text-[#fff] shadow-2xl" style={styles.button(isValid)}>
                                        <Text className="text-white text-center text-[18px] font-bold">Register</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>


                            <TouchableOpacity onPress={() => navigation.push('Login') } >
                                <View className="w-[100%] mb-[15px] flex flex-row items-center justify-center">
                                    <Text className="text-[#000000] font-bold text-center">Already have an account ?&nbsp;</Text>
                                    <Text className="font-bold text-[#009244] text-center">Sign In</Text>
                                </View>
                            </TouchableOpacity>


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
    }   
  });
  

export default Signup