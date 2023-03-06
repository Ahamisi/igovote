import { View, Text, Image, TouchableOpacity, SafeAreaView, TextInput, Alert, Pressable, StyleSheet, KeyboardAvoidingView, ScrollView } from 'react-native'
import React, {useState} from 'react';
import GoBack from '../components/General/GoBack';




import { Formik } from 'formik';
import * as Yup from 'yup';
import  Validator  from 'email-validator';
import { Auth } from 'aws-amplify';




const ForgotPasswordScreen = ({navigation}) => {
    const [isSubmitting, setIsSubmitting] = useState(false)


    const [codeSent, setcodeSent] = useState(false)


    const scheme = codeSent ? {
        email: Yup.string().email().required('An email is required'),
        password: Yup.string().required().min(6, 'Your password has to have atleast 6 characters'),
        code: Yup.string().required('Please enter code sent yo your email')
    } : {
        email: Yup.string().email().required('An email is required'),
    }
    const LoginFormSchema = Yup.object().shape(scheme)


    const onLogin = async (email,code,password) =>{
        setIsSubmitting(true)

        if(codeSent){
            const username = email
            // Collect confirmation code and new password, then
            Auth.forgotPasswordSubmit(username, code, password)
            .then((data) => { console.log(data); navigation.push('Login') })
            .catch((err) => {
                Alert.alert('Omo yawa don gas !!!',`${err}`)
            });
            
            
        }else{
            const username = email
            Auth.forgotPassword(username)
            .then((data) => { console.log(data); setcodeSent(true) })
            .catch((err) => {
                Alert.alert('Omo yawa don gas !!!',`${err}`)
            });
        }











        try{
            const username = email
            // Send confirmation code to user's email
                
        }catch(error){
            console.log(error)
        }finally{
            setIsSubmitting(false)
        }

    }





  return (
        <SafeAreaView className="bg-[#009244]">

            <KeyboardAvoidingView>
                <ScrollView keyboardShouldPersistTaps="handled">
                <View className="bg-[#eeeeee] pt-[20%] h-full relative">
                <GoBack navigation={navigation}/>
               
                <View className="mx-auto">
                    <Image className="h-auto w-auto" source={require('../assets/app/signup.png')} />

                </View>




            <Formik 
                initialValues={{email:'', code: '', password:''}}
                onSubmit={(values) => {
                    onLogin(values.email,values.code, values.password)
                    console.log(values)
                }}
                validationSchema={LoginFormSchema}
                validateOnMount={true}
            >

                {({handleChange, handleBlur, handleSubmit, values, isValid}) =>(

                    <View className=" bg-white rounded-[20px] mx-auto  my-auto  w-[90%] px-[20px] py-[40px] items-center">

                        <View className="w-[100%] mb-[15px]" style={[styles.inputField, 
                                {
                                    borderColor: values.email.length < 1 || Validator.validate(values.email) ? '#ccc' : 'red'
                                }
                            ]}
                         >
                            <TextInput 
                                placeholder='Enter your email'
                                autoCapitalize='none'
                                keyboardType='email-address'
                                textContentType='email-address'
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                                className="bg-[#eeeeee] text-[] px-[20px] py-[18px] rounded-[25px] shadow-[0px_4px_4px_4px_#00000057]"/>
                        </View>


                       { codeSent && <>



                            {/* show when code has been sent or triggered */}




                            <View className="w-[100%] mb-[15px]" style={[styles.inputField, 
                                {
                                    borderColor: 1 > values.code.length ? '#ccc' : 'red'
                                }
                            ]} >
                                <TextInput 
                                    placeholder='Enter code'
                                    autoCapitalize='none'
                                    keyboardType='text'
                                    textContentType='text'
                                    onChangeText={handleChange('code')}
                                    onBlur={handleBlur('code')}
                                    value={values.code}
                                    className="bg-[#eeeeee] text-[] px-[20px] py-[18px] rounded-[25px] shadow-[0px_4px_4px_4px_#00000057]"/>
                            </View>


                                <View className="w-[100%] mb-[15px]"  style={[styles.inputField, 
                                {
                                    borderColor: 1 > values.password.length || values.password.length >= 6 ? '#ccc' : 'red'
                                }
                            ]}
                                >
                                    <TextInput 
                                        placeholder='Enter new password'
                                        autoCapitalize='none'
                                        keyboardType='password'
                                        textContentType='password'
                                        onChangeText={handleChange('password')}
                                        onBlur={handleBlur('password')}
                                        value={values.password}
                                        className="bg-[#eeeeee] text-[] px-[20px] py-[18px] rounded-[25px] shadow-[0px_4px_4px_4px_#00000057]"/>
                                </View>


                                







                        </>

                                }
                        


                        <View className="w-[100%] mb-[15px] flex justify-end">
                            <Pressable style={styles.button(isValid)} onPress={handleSubmit} disabled={!isValid} >
                                <View className="px-[32px] py-[15px] rounded-[25px] text-[#fff] shadow-2xl" style={styles.button(isValid)} >
                                    <Text className="text-white text-center text-[18px] font-bold">
                                    {
                                            isSubmitting ? 'Sending ...' : 'Send'
                                        }
                                    </Text>
                                </View>
                            </Pressable>
                        </View>

                        


                    </View>
                )}



            </Formik>




                



                <View className=" bg-[#eeeeee] mt-[10px]">

                    <TouchableOpacity onPress={() => navigation.push('Signup') }>
                        <View className="w-[100%] mb-[15px] flex flex-row items-center justify-center">
                            <Text className="text-[#000000] font-bold text-center">Don't have an account ?&nbsp;</Text>
                            <Text className="font-bold text-[#009244] text-center">Sign Up</Text>
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
        // boxShadow: '4px 4px 4px #000',
        // shadowColor: 'rgba(0,0,0,25)',
        // shadowOffset: {width: -1, height: 3},
        // shadowOpacity: 0.2,
        shadowRadius: 3,
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
})

export default ForgotPasswordScreen