import { View, Text, Image, TouchableOpacity, SafeAreaView, ScrollView, TextInput, Alert, Pressable, StyleSheet, KeyboardAvoidingView } from 'react-native'
import React, {useState} from 'react';
import GoBack from '../components/General/GoBack';




import { Formik } from 'formik';
import * as Yup from 'yup';
import  Validator  from 'email-validator';
import { Auth } from 'aws-amplify';

import DismissKeyboard from '../components/General/DismissKeyboard';




const Login = ({navigation}) => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [hasLoggedIn, setHasLoggedIn] = useState(false)
    const [passwordType, setPasswordType] = useState(true)


    

    const LoginFormSchema = Yup.object().shape({
        email: Yup.string().email().required('An email is required'),
        password: Yup.string().required().min(6, 'Your password has to have atleast 6 characters')
    })


    const onLogin = async (email, password) =>{
        setIsSubmitting(true)
        try{
            const user = await Auth.signIn(email.toLowerCase(),password);
            console.log(user,'just to check')
            setHasLoggedIn(true)
            console.log(hasLoggedIn)
            navigation.push('MainMenu',{userDetail: user})
        }catch(error){
            // console.log(Object.keys(error))
            if(error.name == "UserNotConfirmedException"){
                navigation.push('OnboardVerify',{usermail: email, password: password, fromLogin: true})
            }else{
                Alert.alert('Omo e don choke !!!', `The password is invalid for this user`,[
                    {
                        text: 'OK',
                        onPress : () => {console.log('ok')},
                        style: 'cancel'
                    },
                    {
                        text : 'Sign up',
                        onPress: () => navigation.push('Signup'),
                    }
                ])
            }
            
        }finally{
            setIsSubmitting(false)

        }
    }



    





  return (
        <SafeAreaView className="bg-[#008F43] text-white">
            <KeyboardAvoidingView>

            <ScrollView keyboardShouldPersistTaps="handled" className=" ">
                <View className="bg-[#ffffff] flex flex-1 h-100 pb-[100%]">
                    <GoBack navigation={navigation} goTo="BeforeAuth"/>
                
                    <View className="mx-auto pt-[20%]">
                        <Image className="h-[200px] w-[200px]" source={require('../assets/app/igv-power.png')} />

                    </View>

                        <DismissKeyboard>
                        <Formik 
                            initialValues={{email:'', password: ''}}
                            onSubmit={(values) => {
                                onLogin(values.email, values.password)
                            }}
                            validationSchema={LoginFormSchema}
                            validateOnMount={true}
                        >

                            {({handleChange, handleBlur, handleSubmit, values, isValid}) =>(



                            <View className=" bg-white rounded-[20px] mx-auto w-[90%] px-[20px] py-[20px] items-center">

                            <View className="w-[100%] mb-[15px]" style={[styles.inputField
                                ]}
                            >
                                <View className="py-[8px]">
                                    <Text style={{fontFamily: 'Sora-Medium', fontWeight: '700', color: '#404446', textAlign: 'center'}}>Email Address</Text>
                                </View>
                                <TextInput 
                                    placeholder='Email Address'
                                    autoCapitalize='none'
                                    keyboardType='email-address'
                                    textContentType='email-address'
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    value={values.email}
                                    className="bg-[#F2F4F5] px-[20px] py-[18px] rounded-[25px] text-[#404446]"/>
                                    {
                                        values.email.length < 1 || Validator.validate(values.email) ? '' : <Text className="text-red-800 font-medium">Enter a valid email address</Text>
                                    }
                            </View>

                            <View className="w-[100%] mb-[15px]" style={[styles.inputField, 
                                    {
                                        borderColor: 1 > values.password.length || values.password.length >= 6 ? '#ccc' : 'red'
                                    }
                                ]}
                            >
                                 <View className="pb-[8px]">
                                    <Text style={{fontFamily: 'Sora-Medium', fontWeight: '700', color: '#404446', textAlign: 'center'}}>Password</Text>
                                </View>
                                <View className="relative">
                                    <TextInput
                                        placeholder='Password'
                                        autoCapitalize='none'
                                        textContentType={passwordType ? 'password' : 'text'}
                                        secureTextEntry={passwordType}
                                        onChangeText={handleChange('password')}
                                        onBlur={handleBlur('password')}
                                        value={values.password}
                                        
                                        className="bg-[#F2F4F5] px-[20px] py-[18px] rounded-[25px] text-[#404446]"
                                    />
                                    <View className="absolute right-[14px] top-[18px]">
                                        <TouchableOpacity onPress={() => {  setPasswordType((prevState) => !prevState ) }}>
                                            <Image className="h-[13px] w-[13px]" source={require('../assets/app/passkeeper.png')} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>


                            <View className="w-[100%] mb-[15px] flex justify-end">
                                <Pressable style={styles.button(isValid)} onPress={handleSubmit} disabled={!isValid || isSubmitting} >
                                    <View className="px-[32px] py-[15px] rounded-[30px] text-[#fff] shadow-2xl" >
                                        <Text className="text-white text-center text-[18px] font-bold">
                                            {
                                                isSubmitting ? 'Logging In ....' : 'Login'
                                            }
                                        </Text>
                                    </View>
                                </Pressable>
                            </View>


                                <TouchableOpacity  onPress={() => navigation.push('ForgotPassword') } >
                                    <View className="w-[100%] my-[15px] flex flex-end">
                                        <Text className="font-bold text-[#008F43] text-right" style={{fontFamily: 'Sora-Medium'}}>Forgot Password</Text>
                                    </View>
                                </TouchableOpacity>



                            </View>
                                    

                                
                            )}



                        </Formik>

                        </DismissKeyboard>



                    



                    <View className=" bg-[#ffffff]">

                        <TouchableOpacity onPress={() => navigation.push('Signup') }>
                            <View className="w-[100%] mb-[15px] flex flex-row items-center justify-center">
                                <Text className="text-[#000000] font-bold text-center" style={{fontFamily: 'Sora-Medium'}}>Don't have an account ?&nbsp;</Text>
                                <Text className="font-bold text-[#008F43] text-center" style={{fontFamily: 'Sora-Medium'}}>Sign Up</Text>
                            </View>
                        </TouchableOpacity>

                    </View>
                </View>
            </ScrollView>    

            </KeyboardAvoidingView>

            
        </SafeAreaView>
  )
}



const styles = StyleSheet.create({
    wrapper:{
        marginTop: 80,
    },
    inputField:{
        marginBottom: 10,
        // boxShadow: '2px 0px 1px #0000008a',
        // shadowColor: '#0000008a',
        // shadowOffset: {width: -1, height: 3},
        // shadowOpacity: 0.2,
        shadowRadius: 3,
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
    }   
})

export default Login