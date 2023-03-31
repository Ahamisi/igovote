import { View, Text, Image, TouchableOpacity, SafeAreaView, TextInput, Alert, Pressable, StyleSheet, KeyboardAvoidingView,ScrollView } from 'react-native'
import React, {useEffect, useState} from 'react';
import GoBack from '../components/General/GoBack';




import { Formik } from 'formik';
import * as Yup from 'yup';
import  Validator  from 'email-validator';
import { Auth } from 'aws-amplify';




const OTPVerification = ({route,navigation}) => {
    const [isSubmitting, setIsSubmitting] = useState(false)

    const { usermail } = route.params;
    const { password } = route.params;
    const { fromLogin } = route.params;



    console.log(usermail, password,'sijjj', fromLogin)



    async function resendConfirmationCode(email) {
        const username = usermail;
        try {
            await Auth.resendSignUp(username);
            // console.log('code resent successfully');
        } catch (err) {
            Alert.alert('error resending code: ', `${err}`);
        }
    }

    if(fromLogin == true){
        resendConfirmationCode(usermail)
    }








    const VerifyFormSchema = Yup.object().shape({
        code: Yup.string().required('Code is required'),
    })





    const onVerify = async (code) =>{
        setIsSubmitting(true)
        try{
           const confirmation =  await Auth.confirmSignUp(usermail, code);
            if(confirmation){
                const user = await Auth.signIn(usermail,password);
                if(user){
                    navigation.push('HomeScreen',{userDetail: 'user'})
                }

            }
            

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
        }finally{
            setIsSubmitting(false)
        }
    }





  return (
        <SafeAreaView className="bg-[#008F43]">

                <KeyboardAvoidingView>



                <ScrollView keyboardShouldPersistTaps="handled">
                <View className="bg-[#ffffff] flex flex-1 h-100 pb-[100%]">
                    <GoBack navigation={navigation}/>
                
                    <View className="mx-auto pt-[20%]">
                        <Image className="h-[200px] w-[200px]" source={require('../assets/app/igv-power.png')} />

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

                            <View className=" bg-white rounded-[20px] mx-auto w-[90%] px-[20px] py-[20px] items-center">
                                

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
                                    className="bg-[#F2F4F5] px-[20px] py-[18px] rounded-[25px] text-[#404446]"/>
                            </View>
                            
                            <View className="text-center mb-[15px] shadow-[#ff0000] shadow-2xl">

                                <TouchableOpacity onPress={() => resendConfirmationCode() } className="flex flex-row gap-[3px]">
                                    <Text className="font-bold">I didn't receive code. </Text>
                                    <Text className="font-bold text-[#008F43]">Resend Code</Text>

                                </TouchableOpacity>
                                
                            </View>


                            <View className="w-[100%] mb-[15px] flex justify-end">
                                <Pressable style={styles.button(isValid)} onPress={handleSubmit} disabled={!isValid} >
                                    <View className="px-[32px] py-[15px] rounded-[25px] text-[#fff] shadow-2xl" style={styles.button(isValid)} >
                                        <Text className="text-white text-center text-[18px] font-bold">
                                        {
                                            isSubmitting ? 'Verifying...' : 'Verify'
                                        }
                                        </Text>
                                    </View>
                                </Pressable>
                            </View>
                            

                        


                        </View>
                    )}



                </Formik>




                    



                    <View className=" bg-[#ffffff]">

                        <TouchableOpacity onPress={() => navigation.push('Signup') }>
                            <View className="w-[100%] mb-[15px] flex flex-row items-center justify-center">
                                <Text className="text-[#000000] font-bold text-center">Don't have an account ?&nbsp;</Text>
                                <Text className="font-bold text-[#008F43] text-center">Sign Up</Text>
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
        boxShadow: '2px 0px 1px #0000008a',
        shadowColor: '#0000008a',
        shadowOffset: {width: -1, height: 3},
        shadowOpacity: 0.2,
        shadowRadius: 3,
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
    }   
})

export default OTPVerification