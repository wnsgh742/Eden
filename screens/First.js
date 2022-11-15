

import { getAuth, signInAnonymously } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { AsyncStorage } from 'react-native';
import styled from "styled-components/native";
import colors from '../colors';
import { collection, getDocs, getFirestore, orderBy, query, where } from "firebase/firestore";
import app from '../firebaseConfig';
import { BlurView } from "@react-native-community/blur";
import back from "../assets/back.jpg";
import LogoScr from "../assets/login-profile.png";

const FirstView = styled.View`
  flex: 1;
  padding: 0px 50px;
  padding-top: 100px;
  background-color: rgba(86, 211, 181, 0.4);
 // background-image : url(${require(`../assets/back.jpg/`)});
 backdrop-filter:blur(12px);
 
`;
const FirstTitle = styled.Text`
  color: ${colors.textColor};
  font-size: 30px;
  margin-bottom: 100px;
`;
const NameInput = styled.TextInput`
     width: 18.813rem;
  height: 2.375rem;
  flex-grow: 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
  padding: 0.5rem;
  border-radius: 10px;
  background-color: ${colors.PRIMARY_DARK};
  font-size: 17px;
  font-weight: normal;
  font-style: normal;
  letter-spacing: 0;
  text-align: left;
  color: ${colors.PRIMARY_GRARY_LOGO_COLOR};
  
`;
const PriceInput = styled.TextInput`
    width: 18.813rem;
  height: 2.25rem;
  flex-grow: 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
  padding: 0.5rem;
  border-radius: 10px;
  background-color: ${colors.PRIMARY_DARK};
`;
const FirstButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 50px;
  right: 50px;
  height: 80px;
  width: 80px;
  border-radius: 40px;
  justify-content: center;
  align-items: center;
  background-color: ${colors.btnColor};
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);
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
  color: ${colors.cardColor};
  font-size: 20px;
`;


const First = ({ navigation: { navigate } }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [dataAuth, setDataAuth] = useState([]);
  const [loadPrice1, setLoadPrice1] = useState([]);
  const [final, setFinal] = useState();


  const AuthSave = async () => {
    const AuthData = {
      name: name,
      price: price
    }

    try {
      await AsyncStorage.setItem("myName", JSON.stringify(AuthData));
    } catch (err) {
      alert("aa")
    }
    navigate("Home");
  }

  const AuthLoad = async () => {
    try {
      let AuthArray = await AsyncStorage.getItem("myName");
      let AuthParse = JSON.parse(AuthArray);
      if (AuthParse !== null) {
        setDataAuth(AuthParse);
      }
    } catch (err) {
      alert("aa")
    }
  }



  useEffect(() => {
    if (name !== null && price !== null) {
      //  navigate("Home");
    } else {
      AuthLoad();
    }

  }, [])

  const remove = async () => {
    await AsyncStorage.removeItem("myName");
  }


  return (
    <FirstView>

      <FirstTitle>Welcome Eden Project</FirstTitle>
   
      <NameInput
        placeholder="Here Input your name"
        onChangeText={(text) => setName(text)}

      />
      <PriceInput
        placeholder="Here Input your Hope Save Money"
        onChangeText={(text) => setPrice(text)}

      />

      <SaveButton onPress={AuthSave}>
        <SaveButtonText>등록하기</SaveButtonText>
      </SaveButton>
      <SaveButton onPress={remove}>
        <SaveButtonText>등록하기</SaveButtonText>
      </SaveButton>

    </FirstView>
  )

}

export default First;