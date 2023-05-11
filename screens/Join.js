

import React, { useEffect, useRef, useState } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import styled from "styled-components/native";
import colors from '../colors';
import { addDoc, collection, doc, getDocs, getFirestore, query, where } from 'firebase/firestore';
import app from '../firebaseConfig';
import img from '../assets/backgroundLight.png';
import { Ionicons } from '@expo/vector-icons';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../responsive';
import { Alert } from 'react-native';
import { getAnalytics, logEvent, setUserId, setUserProperties } from 'firebase/analytics';


const FirstView = styled.View`
  width: ${SCREEN_WIDTH};
  height: ${SCREEN_HEIGHT};
  //padding: 12.938rem 0 24rem;
  object-fit: contain;
  background-image: url(${img});
  backdrop-filter: blur(10px);
  background-color: rgba(0, 0, 0, 0.65);
`;
const SecondView = styled.View`
  border-radius: 30px;
  
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 19.688rem;
  height: 20.563rem;
  gap: 17px;
  margin: 5rem 1.75rem 15.938rem 1.625rem;
  padding: 2.188rem 0 0;
  
`;
const NameInput = styled.TextInput`
 width: 18.813rem;
  height: 2.375rem;
  flex-grow: 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 219px;
  padding: 0.5rem;
  border-radius: 10px;
  color: ${colors.PRIMARY_TEXT};
  background-color: ${colors.PRIMARY_MIDDLE};
  font-size: 1.063rem;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
`;
const Input = styled.Image`
   width: 7.438rem;
  height: 7.438rem;
  margin: 0 8.5rem 0.625rem 8.438rem;
  object-fit: contain;
  //box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.6);
  
`;

const SaveButton = styled.TouchableOpacity`
   width: 100%;
  padding: 10px 20px;
  border-width: 1px;
  border-radius: 20px;
  border-color: ${colors.cardColor};
  justify-content: center;
  align-items: center;
`;
const SaveButtonText = styled.Text`
  color: ${colors.PRIMARY_TEXT};
  width: 10.563rem;
  height: 1.125rem;
  flex-grow: 0;
  font-size: 0.75rem;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: normal;
  text-align: left;
`;
const NextBtn = styled.TouchableOpacity`
   width: 1.313rem;
  height: 1.313rem;
  flex-grow: 0;
  padding: 0.303rem 0.223rem 2.35rem 0.252rem;
  `;
  const WelcomeText = styled.Text`
     width: 8.563rem;
  height: 2.563rem;
  flex-grow: 0;
  
  font-size: 2.125rem;
  font-weight: 900;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: ${colors.PRIMARY_TEXT};
  `;
  const BottomText = styled.Text`
    width: 9.875rem;
  height: 1.125rem;
  flex-grow: 0;
  
  font-size: 0.75rem;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: normal;
  text-align: left;
  color: ${colors.PRIMARY_TEXT};
  `;

const Join = ({  navigation: { navigate } } ) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
 
  const db = getFirestore(app);
  const analytics = getAnalytics(app);
  const priceInput = useRef();
  const onSubmitEditing = ()=>{
    priceInput.current.foucs();
}

const onSubmitCreate = async()=>{
    if(email == "" || password == ""){
        window.confirm("email or password is empty");
    }
  try {
    const auth =getAuth();
  await  createUserWithEmailAndPassword(auth, email, password);
  await Promise.all([
    setUserId(analytics,email),
    setUserProperties(analytics,createAt, new Date()),
    logEvent("Join"),
  ])
   // console.log(userCredential);
   // navigate("Hello");
  } catch (e) {
   console.log(e)
    switch(e.code){
        case ("auth/weak-password") : {
            
            window.confirm("password is weak!");
        }
        case "auth/email-already-in-use" :{
           window.confirm("already email or password");
        }
        case  "auth/invalid-email":{
            window.confirm("잘못된 형식입니다. 이메일을 입력해주세요");
        }
    }
    
}

 

 
}
  return (
    <FirstView>
      <SecondView>
       <WelcomeText>환영해요!</WelcomeText>
     <NameInput
        placeholder="이메일을 입력하세요" 
        onChangeText={(text) => setEmail(text)}
        returnKeyType="next"
        keyboardType="email-address"
       placeholderTextColor={colors.PRIMARY_GRARY_LOGO_COLOR}
            autoCapitalize="none"
            autoCorrect={false}
            onSubmitEditing={onSubmitEditing}
      />
     
      <NameInput
        
        placeholder="비밀번호를 입력하세요"
        onChangeText={(text) => setPassword(text)}
        returnKeyType="done"
              placeholderTextColor={colors.PRIMARY_GRARY_LOGO_COLOR}
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry
              ref={priceInput}
      />
    {password ? <NextBtn onPress={onSubmitCreate}><Ionicons name="chevron-forward-circle-outline" size={30} color={colors.PRIMARY_LIGHT} /></NextBtn>
     : 
     null} 
       <BottomText>이메일 주소는 꼭 기억해주세요!</BottomText>
     <SaveButtonText></SaveButtonText>
     </SecondView>

   
     
     

    </FirstView>
  )

}

export default Join;