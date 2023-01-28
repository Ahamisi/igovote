import { View, Text, Image, TouchableOpacity, SafeAreaView, TextInput, StyleSheet, Alert, KeyboardAvoidingView} from 'react-native'
import { CheckBox } from '@rneui/base';
import React, {useState} from 'react';

import GoBack from '../components/General/GoBack';
import Checkbox from 'expo-checkbox';
import { A } from '@expo/html-elements';



// import amplify auth
import { Auth } from 'aws-amplify';





import { Formik } from 'formik';
import * as Yup from 'yup';
import Validator from 'email-validator';




const Signup = ({navigation}) => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isChecked, setChecked] = useState(false);


    const SignupFormSchema = Yup.object().shape({
        email: Yup.string().email().required('An email is required'),
        password: Yup.string().required().min(6, 'Your password has to have atleast 6 characters')
    })




    const onSignup = async (email, password, firstname) =>{
        if(isChecked){
            setIsSubmitting(true)
            const username = email
            try{
                        const { user } = await Auth.signUp({
                            username,
                            password,
                            autoSignIn: { // optional - enables auto sign in after user is confirmed
                                enabled: true,
                            }
                        });
                        navigation.push('OnboardVerify',{usermail: username})
                }catch(error){
                    Alert.alert('Omo water don pass garri !!!',`${error}`)
                }finally{
                    setIsSubmitting(false)

            }

        }else{
            Alert.alert('Dey Play!',`You must agree to our terms of service`)

        }
        
    }














  return (
        <SafeAreaView className="bg-[#009244]">

                <KeyboardAvoidingView>





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
                                autoFocus={false}
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                                className="bg-[#eeeeee] text-[] px-[20px] py-[18px] rounded-[25px]"/>
                            </View>

                            {/* <View className="w-[100%] mb-[15px]">
                                <TextInput placeholder='Phone Number'
                                 autoCapitalize='none'
                                 keyboardType='text'
                                 textContentType='text'
                                 autoFocus={false}
                                 onChangeText={handleChange('phone')}
                                 onBlur={handleBlur('phone')}
                                 value={values.phone}
                                className="bg-[#eeeeee] text-[] px-[20px] py-[18px] rounded-[25px]"/>
                            </View> */}
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
                                {
                                    values.password.length < 6 && <Text className="text-red-700 font-bold">!!! Password must be 6 characters long</Text>
                                }
                                
                            </View>



                        <View className="mb-[15px]  flex flex-row items-center justify-center w-[100%]">
                        <Checkbox style={styles.checkbox} value={isChecked} onValueChange={setChecked} color={isChecked ? '#009244' : undefined} />

                            <Text className="text-[#3c3b3b] text-center">I accept the <Text className="text-[#009244]"><A href='https://igovote.org/terms-of-service/'>Terms of Service</A></Text> & <Text className="text-[#009244]"><A href='https://igovote.org/privacy-policy'>Privacy Policy</A></Text></Text>
                        </View>


                

                            <View className="w-[100%] mb-[15px] flex justify-end">
                                <TouchableOpacity className="" style={styles.button(isValid)} onPress={handleSubmit} disabled={!isValid || isSubmitting}>
                                    <View className="bg-[#009244] px-[32px] py-[15px] rounded-[25px] text-[#fff] shadow-2xl" style={styles.button(isValid)}>
                                        <Text className="text-white text-center text-[18px] font-bold">
                                        {
                                            isSubmitting ? 'Submitting...' : 'Register'
                                        }
                                        </Text>
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















                </KeyboardAvoidingView>




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
    },
    checkbox: {
        margin: 8,
      },
  });
  

export default Signup