

import React, { useEffect, useRef, useState } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import styled from "styled-components/native";
import colors from '../colors';
import { addDoc, collection, doc, getDocs, getFirestore, query, where } from 'firebase/firestore';
import app from '../firebaseConfig';
import img from '../assets/backgroundLight.png';
import { Ionicons } from '@expo/vector-icons';
import { getAuth } from 'firebase/auth';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../responsive';


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
  margin: 0rem 1.75rem 15.938rem 1.625rem;
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
  width: 12.5rem;
  height: 12.5rem;
  margin: 0 5.938rem;
  object-fit: contain;
  //box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.6);
  
`;
const SiriTitle = styled.Text`
   width: 12.188rem;
  height: 2.563rem;
  flex-grow: 0;
 
  font-size: 2.125rem;
  font-weight: 900;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: ${colors.PRIMARY_DARK};
`;
const SiriText = styled.Text`
   width: 20.875rem;
  height: 2.813rem;
  flex-grow: 0;
 
  font-size: 1.063rem;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: ${colors.PRIMARY_DARK};
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

const First = ({  navigation: { navigate }, userObj } ) => {
  const auth = getAuth();
  const obj = auth.currentUser.uid;
  console.log(obj);
  const [userId, setUserId] = useState(obj);
  const [name, setName] = useState();
  const [price, setPrice] = useState("");
 const [load , setLoad] = useState([]);
  const [test , setTest] = useState();
 const [Async , setAsync] = useState();
  const db = getFirestore(app);
  const priceInput = useRef();
  
const Start = async()=>{
  const ok = window.confirm("한번 저장하면 수정은 불가능합니다. 이대로 진행할까요?");
  if(ok){
    let parsePrice = parseInt(price,10);
    setTest(parsePrice);
    try {
      await addDoc(collection(db,"userInfo"),{
        id:userId,
       
        price:parsePrice,
      });
    const p =  await AsyncStorage.setItem("myPrice", parsePrice);
    setAsync(p);
      navigate("Home",{
        obj:userId,
      }); 
    } catch (err) {
      alert("eee");
    }
  }
  
}

const get = async()=>{
  const myInfo =[];
  
    try {
      const userInfo = collection(db,"userInfo");
      const userIdQuery = query(userInfo, where("id","==",userId));
       const userQuerySnapshot = await getDocs(userIdQuery);
       userQuerySnapshot.forEach((doc)=>{
          myInfo.push({...doc.data()});
       })
        console.log(myInfo);
    if(myInfo[0]){
      navigate("Home",{
        userObj:userId
      }) 
    }else{
      navigate("First");
    }
     
     
  } catch (err) {
    alert(err)
  }
  
  
    
    
  
  
}


  useEffect(() => {
   
      get();
     
    
     
    
   
   
   

  }, [])

 

  return (
    <FirstView>
      <SecondView>
        <Input source={require('../assets/siri.png')}/>
        <SiriTitle>목표금액 설정</SiriTitle>
          <SiriText>내가 쓸 돈을 미리 계획해보세요.{"\n"}재설정이 어려우니 참고하세요!</SiriText>
     
      <NameInput
        
        placeholder="목표금액을 입력하세요"
        onChangeText={(price) => setPrice(price)}
        returnKeyType="done"
              placeholderTextColor={colors.PRIMARY_GRARY_LOGO_COLOR}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="numeric"
            
      />
    {price ? <NextBtn onPress={Start}><Ionicons name="chevron-forward-circle-outline" size={30} color={colors.PRIMARY_LIGHT} /></NextBtn> : null} 
     <SaveButtonText>지난달 소비보다 약간만 낮춰봐요!</SaveButtonText>
     
     </SecondView>

     
     
     

    </FirstView>
  )

}

export default First;