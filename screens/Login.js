

import React, { useEffect, useRef, useState } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import styled from "styled-components/native";
import colors from '../colors';
import { addDoc, collection, doc, getDocs, getFirestore, query, where } from 'firebase/firestore';
import app from '../firebaseConfig';
import img from '../assets/backgroundLight.png';
import { Ionicons } from '@expo/vector-icons';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import Join from './Join';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../responsive';


const FirstView = styled.View`
  width: ${SCREEN_WIDTH};
  height: ${SCREEN_HEIGHT};
 // padding: 12.938rem 0 24rem;
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
  margin: 4rem 1.75rem 15.938rem 1.625rem;
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
  color: ${colors.PRIMARY_LIGHT};
  background-color: ${colors.PRIMARY_DARK};
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
  const JoinBtn = styled.TouchableOpacity`
  width: 5.313rem;
  height: 1.313rem;
  flex-grow: 0;
  padding: 0.303rem 0.223rem 2.35rem 0.252rem;
  `;
  const NextText = styled.Text``;

const Login = ({  navigation: { navigate } } ) => {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

 
  const db = getFirestore(app);
  const priceInput = useRef();
  const onSubmitEditing = ()=>{
    priceInput.current.foucs();
}

const onSubmitLogin = async()=>{
    try {
        const auth=getAuth();
      const CheckUser = await signInWithEmailAndPassword(auth, email, password);
      console.log(CheckUser)
     
    } catch (e) {
       
      switch(e.code){
          case "auth/invalid-email":{
              window.confirm("잘못된 이메일 혹은 패스워드 입니다.");
          }
          case "auth/user-disabled":{
            window.confirm("유저가 비활성화 상태입니다.");
          }
          case "auth/user-not-found":{
            window.confirm("사용자를 찾을 수 없습니다.");
          }
          case "auth/wrong-password":{
            window.confirm("잘못된 이메일 혹은 패스워드 입니다.");
          }
      }
    }  

 
 
}
  return (
    <FirstView>
      <SecondView>
        <Input source={require('../assets/login-profile.png')}/>
     <NameInput
        placeholder="이메일을 입력하세요" 
        onChangeText={(text) => setEmail(text)}
        returnKeyType="next"
       placeholderTextColor={colors.PRIMARY_GRARY_LOGO_COLOR}
            autoCapitalize="none"
            autoCorrect={false}
            onSubmitEditing={onSubmitEditing}
            keyboardType="email-address"
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
    {password ? <NextBtn onPress={onSubmitLogin}><Ionicons name="chevron-forward-circle-outline" size={30} color={colors.PRIMARY_LIGHT} /></NextBtn>
     : <JoinBtn onPress={()=>navigate(Join)}><NextText>가입하러가기</NextText></JoinBtn>} 
     <SaveButtonText>지난달 소비보다 약간만 낮춰봐요!</SaveButtonText>
     </SecondView>

     
     
     

    </FirstView>
  )

}

export default Login;