

import React, { useEffect, useRef, useState } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import styled from "styled-components/native";
import colors from '../colors';
import { addDoc, collection, doc, getDocs, getFirestore, query, where } from 'firebase/firestore';
import app from '../firebaseConfig';
import img from '../assets/backgroundLight.png';



const FirstView = styled.View`
  width: 24.375rem;
  height: 52.75rem;
  padding: 12.938rem 0 24rem;
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
  margin: 0 1.75rem 15.938rem 1.625rem;
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


const First = ({ route, navigation: { navigate } } ) => {
  const [info, setInfo] =useState(route.params.auth); 
  
  const [name, setName] = useState();
  const [price, setPrice] = useState("");
 const [load , setLoad] = useState([]);
  const [test , setTest] = useState();
 
  const db = getFirestore(app);
  const priceInput = useRef();
  
const Start = async()=>{
  let parsePrice = parseInt(price,10);
  try {
    await addDoc(collection(db,"userInfo"),{
      id:info,
      name:name,
      price:parsePrice,
    });
    await AsyncStorage.setItem("myName", name);
    navigate("Home",{
      info:info,
    }); 
  } catch (err) {
    alert("eee");
  }
}
const get = async()=>{
  const myInfo =[];
  try {
   
      const userInfo = collection(db,"userInfo");
      const userIdQuery = query(userInfo, where("id", "==", info));
       const userQuerySnapshot = await getDocs(userIdQuery);
       userQuerySnapshot.forEach((doc)=>{
          myInfo.push({...doc.data()});
       })
      let b = await AsyncStorage.getItem("myName");
      if(b !== null){
        setLoad(myInfo);
       navigate("Home",{
          info:info,
        })   
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
        <Input source={require('../assets/login-profile.png')}/>
     <NameInput
        placeholder="이름을 입력하세요" 
        onChangeText={(text) => setName(text)}
        returnKeyType="next"
       placeholderTextColor={colors.PRIMARY_GRARY_LOGO_COLOR}
            autoCapitalize="none"
            autoCorrect={false}
      />
     
      <NameInput
        
        placeholder="목표금액을 입력하세요"
        onChangeText={(price) => setPrice(price)}
        returnKeyType="done"
              placeholderTextColor={colors.PRIMARY_GRARY_LOGO_COLOR}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="numeric"
              ref={priceInput}
      />
     
     <SaveButtonText>지난달 소비보다 약간만 낮춰봐요!</SaveButtonText>
     </SecondView>

     
     
     

    </FirstView>
  )

}

export default First;