import { View, Text, Image, TouchableOpacity, SafeAreaView, TextInput, StyleSheet, Alert, KeyboardAvoidingView, ScrollView} from 'react-native'
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
    const [passwordType, setPasswordType] = useState(true)


    const SignupFormSchema = Yup.object().shape({
        email: Yup.string().email().required('An email is required'),
        password: Yup.string().required().min(6, 'Your password has to have atleast 6 characters')
    })




    const onSignup = async (email, password, firstname) =>{
        if(isChecked){
            setIsSubmitting(true)
            const username = email.toLowerCase()
            try{
                    const { user } = await Auth.signUp({
                        username,
                        password,
                        autoSignIn: { // optional - enables auto sign in after user is confirmed
                            enabled: true,
                        }
                    });
                    navigation.push('OnboardVerify',{usermail: username, password: password})
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
        <SafeAreaView className="bg-[#008F43]">

                <KeyboardAvoidingView>

                <ScrollView keyboardShouldPersistTaps="handled">

                <View className="bg-[#ffffff] flex flex-1 h-100 pb-[100%]">
                <GoBack navigation={navigation} goTo="BeforeAuth"/>
                <View className="mx-auto pt-[20%]">
                        <Image className="h-[200px] w-[200px]" source={require('../assets/app/igv-power.png')} />

                </View>


                <Formik 
                    initialValues={{email:'', password: '', username: ''}}
                    onSubmit={(values) => {
                        onSignup(values.email, values.password, values.username)
                    }}
                    validationSchema={SignupFormSchema}
                    validateOnMount={true} >


                    {({handleChange, handleBlur, handleSubmit, values, isValid}) =>(


                        <View className=" bg-white rounded-[20px] mx-auto my-[10px]  w-[90%] px-[20px] py-[10px] items-center">
                            
                            <View className="w-[100%] mb-[15px]" style={[styles.inputField
                            ]}>
                                 <View className="py-[8px]">
                                    <Text style={{fontFamily: 'Sora-Medium', fontWeight: '700', color: '#404446', textAlign: 'center'}}>Email Address</Text>
                                </View>
                                <TextInput placeholder='Email' 
                                autoCapitalize='none'
                                keyboardType='email-address'
                                textContentType='email-address'
                                autoFocus={false}
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                                className="bg-[#F2F4F5] px-[20px] py-[18px] rounded-[25px] text-[#404446]"/>
                                 {
                                    values.email.length < 1 || Validator.validate(values.email) ? '' : <Text className="text-red-800 font-medium">Enter a valid email address</Text>
                                }
                            </View>

                            <View className="w-[100%] mb-[15px]"
                            style={[styles.inputField, 
                                {
                                    borderColor: 1 > values.password.length || values.password.length >= 6 ? '#ccc' : 'red'
                                }
                            ]}
                            >
                                 <View className="pb-[8px]">
                                    <Text style={{fontFamily: 'Sora-Medium', fontWeight: '700', color: '#404446', textAlign: 'center'}}>Password</Text>
                                </View>
                                <View className="relative">
                                    <TextInput placeholder='Password'
                                    autoCapitalize='none'
                                    textContentType={passwordType ? 'password' : 'text'}
                                    secureTextEntry={passwordType}
                                    autoFocus={false}
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                    value={values.password}
                                    className="bg-[#F2F4F5] px-[20px] py-[18px] rounded-[25px] text-[#404446]"/>
                                    <View className="absolute right-[14px] top-[18px]">
                                        <TouchableOpacity onPress={() => {  setPasswordType((prevState) => !prevState ) }}>
                                            <Image className="h-[13px] w-[13px]" source={require('../assets/app/passkeeper.png')} />
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                {
                                    values.password.length < 1 || values.password.length < 6 ? <Text className="text-red-800 font-medium">Password must be atleast 6 characters</Text> : ''
                                }
                                
                                
                            </View>



                        <View className="mb-[15px]  flex flex-row items-center justify-center w-[100%]">
                        <Checkbox style={styles.checkbox} value={isChecked} onValueChange={setChecked} color={isChecked ? '#008F43' : undefined} />

                            <Text className="text-[#3c3b3b] text-center">I accept the <Text className="text-[#008F43]"><A href='https://igovote.org/terms-of-service/'>Terms of Service</A></Text> & <Text className="text-[#008F43]"><A href='https://igovote.org/privacy-policy'>Privacy Policy</A></Text></Text>
                        </View>


                

                            <View className="w-[100%] mb-[15px] flex justify-end">
                                <TouchableOpacity className="" style={styles.button(isValid)} onPress={handleSubmit} disabled={!isValid || isSubmitting}>
                                    <View className="bg-[#008F43] px-[32px] py-[15px] rounded-[35px] text-[#fff] shadow-2xl" style={styles.button(isValid)}>
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
                                    <Text className="text-[#000000] font-bold text-center" style={{fontFamily: 'Sora-Medium'}}>Already have an account ?&nbsp;</Text>
                                    <Text className="font-bold text-[#008F43] text-center" style={{fontFamily: 'Sora-Medium'}}>Sign In</Text>
                                </View>
                            </TouchableOpacity>


                        </View>

                    )}


                </Formik>



           
            </View>






                </ScrollView>   


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
        marginBottom: 10,
    },
    button: isValid =>({
        backgroundColor: isValid ? '#008F43' : '#b5e2cd',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 42,
        borderRadius: 30
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