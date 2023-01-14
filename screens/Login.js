import { View, Text, Image, TouchableOpacity, SafeAreaView, TextInput, Alert, Pressable, StyleSheet } from 'react-native'
import React from 'react';
import GoBack from '../components/General/GoBack';




import { Formik } from 'formik';
import * as Yup from 'yup';
import  Validator  from 'email-validator';
import { Auth } from 'aws-amplify';




const Login = ({navigation}) => {

    const LoginFormSchema = Yup.object().shape({
        email: Yup.string().email().required('An email is required'),
        password: Yup.string().required().min(6, 'Your password has to have atleast 6 characters')
    })


    const onLogin = async (email, password) =>{
        try{
            const user = await Auth.signIn(email,password)
        }catch(error){
            Alert.alert('Omo e don choke !!!', 'The password is invalid for this user',[
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
    }





  return (
        <SafeAreaView>



            
            <View className="bg-[#eeeeee] pt-[20%] h-full relative">
                <GoBack navigation={navigation}/>
               
                <View className="mx-auto">
                    <Image className="h-auto w-auto" source={require('../assets/app/login.png')} />

                </View>




            <Formik 
                initialValues={{email:'', password: ''}}
                onSubmit={(values) => {
                    onLogin(values.email, values.password)
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
                                placeholder='Phone number, username or email'
                                autoCapitalize='none'
                                keyboardType='email-address'
                                textContentType='email-address'
                                autoFocus={true}
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                                className="bg-[#eeeeee] text-[] px-[20px] py-[18px] rounded-[25px] shadow-[0px_4px_4px_4px_#00000057]"/>
                        </View>

                        <View className="w-[100%] mb-[15px] shadow-[#ff0000] shadow-2xl" style={[styles.inputField, 
                                {
                                    borderColor: 1 > values.password.length || values.password.length >= 6 ? '#ccc' : 'red'
                                }
                            ]}
                        >
                            <TextInput
                                placeholder='Password'
                                autoCapitalize='none'
                                textContentType='password'
                                secureTextEntry={true}
                                autoFocus={false}
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                                className="bg-[#eeeeee] px-[20px] py-[18px] rounded-[25px] shadow-[0px_4px_4px_4px_#00000057]"
                            />
                        </View>


                        <View className="w-[100%] mb-[15px] flex justify-end">
                            <Pressable style={styles.button(isValid)} onPress={handleSubmit} disabled={!isValid} >
                                <View className="px-[32px] py-[15px] rounded-[25px] text-[#fff] shadow-2xl" style={styles.button(isValid)} >
                                    <Text className="text-white text-center text-[18px] font-bold">Login</Text>
                                </View>
                            </Pressable>
                        </View>
                        

                            <TouchableOpacity  onPress={() => navigation.push('ForgotPassword') } >
                                <View className="w-[100%] my-[15px] flex flex-end">
                                    <Text className="font-bold text-[#009244] text-right">Forgot Password</Text>
                                </View>
                            </TouchableOpacity>
                       


                    </View>
                )}



            </Formik>




                



                <View className=" bg-[#eeeeee]">

                    <TouchableOpacity onPress={() => navigation.push('Signup') }>
                        <View className="w-[100%] mb-[15px] flex flex-row items-center justify-center">
                            <Text className="text-[#000000] font-bold text-center">Don't have an account ?&nbsp;</Text>
                            <Text className="font-bold text-[#009244] text-center">Sign Up</Text>
                        </View>
                    </TouchableOpacity>

                </View>
            </View>
        </SafeAreaView>
  )
}



const styles = StyleSheet.create({
    wrapper:{
        marginTop: 80,
    },
    inputField:{
        marginBottom: 10,
        boxShadow: '2px 0px 1px #0000008a',
        shadowColor: '#0000008a',
        shadowOffset: {width: -1, height: 3},
        shadowOpacity: 0.2,
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

export default Login