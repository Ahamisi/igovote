import { View, Text, Image, TouchableOpacity, SafeAreaView, TextInput, Alert, Pressable, StyleSheet, KeyboardAvoidingView } from 'react-native'
import React from 'react';
import GoBack from '../components/General/GoBack';




import { Formik } from 'formik';
import * as Yup from 'yup';
import  Validator  from 'email-validator';
import { Auth } from 'aws-amplify';




const OTPVerification = ({route,navigation}) => {
    const { usermail } = route.params;

    console.log(usermail)



    async function resendConfirmationCode(email) {
        const username = usermail;
        try {
            await Auth.resendSignUp(username);
            // console.log('code resent successfully');
        } catch (err) {
            Alert.alert('error resending code: ', `${err}`);
        }
    }








    const VerifyFormSchema = Yup.object().shape({
        code: Yup.string().required('Code is required'),
    })





    const onVerify = async (code) =>{
        try{
            await Auth.confirmSignUp(usermail, code);
            navigation.push('Login')
        }catch(error){
            Alert.alert('Omo e don choke !!!', 'Error confirming sign up',[
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
        <SafeAreaView className="bg-[#009244]">

                <KeyboardAvoidingView>




                <View className="bg-[#eeeeee] pt-[20%] h-full relative">
                <GoBack navigation={navigation}/>
               
                <View className="mx-auto">
                    <Image className="h-auto w-auto" source={require('../assets/app/login.png')} />

                </View>




            <Formik 
                initialValues={{code:''}}
                onSubmit={(values) => {
                    onVerify(values.code)
                }}
                validationSchema={VerifyFormSchema}
                validateOnMount={true}
            >

                {({handleChange, handleBlur, handleSubmit, values, isValid}) =>(

                    <View className=" bg-white rounded-[20px] mx-auto  my-auto  w-[90%] px-[20px] py-[40px] items-center">

                        <View className="w-[100%] mb-[15px]" >
                            <TextInput 
                                placeholder='Enter code ####'
                                autoCapitalize='none'
                                keyboardType='text'
                                textContentType='text'
                                autoFocus={true}
                                onChangeText={handleChange('code')}
                                onBlur={handleBlur('code')}
                                value={values.code}
                                className="bg-[#eeeeee] text-[] px-[20px] py-[18px] rounded-[25px] shadow-[0px_4px_4px_4px_#00000057]"/>
                        </View>
                        
                        <View className="text-center mb-[15px] shadow-[#ff0000] shadow-2xl">

                            <TouchableOpacity onPress={() => resendConfirmationCode() } className="flex flex-row gap-[3px]">
                                <Text className="font-bold">I didn't receive code. </Text>
                                <Text className="font-bold text-[#009244]">Resend Code</Text>

                            </TouchableOpacity>
                            
                        </View>


                        <View className="w-[100%] mb-[15px] flex justify-end">
                            <Pressable style={styles.button(isValid)} onPress={handleSubmit} disabled={!isValid} >
                                <View className="px-[32px] py-[15px] rounded-[25px] text-[#fff] shadow-2xl" style={styles.button(isValid)} >
                                    <Text className="text-white text-center text-[18px] font-bold">Verify</Text>
                                </View>
                            </Pressable>
                        </View>
                        

                       


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

export default OTPVerification