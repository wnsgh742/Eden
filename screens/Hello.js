import React, { useEffect, useId, useState } from 'react';
import styled from "styled-components/native";
import colors from '../colors';
import { Ionicons } from "@expo/vector-icons";
import { AsyncStorage, TouchableOpacity } from 'react-native';
import { getAuth, signInAnonymously } from 'firebase/auth';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import app from '../firebaseConfig';
import img from '../assets/backgroundLight.png';



const HelloView = styled.View`
   width: 24.375rem;
  height: 52.75rem;
  padding: 7.5rem 1.5rem 3.188rem;
  background-image: url(${img});
`;

const HelloButton = styled.TouchableOpacity`
 width: 10.688rem;
  height: 2.25rem;
  gap: 8px;
  margin: 2.125rem 6.375rem 11.625rem 6.313rem;
  padding: 0.5rem;
  object-fit: contain;
  border-radius: 13px;
  flex-direction: row;
  justify-content: center;
  align-items: center;


`;

const HelloButtonText = styled.Text`
  
 
  
  font-size: 1.063rem;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
 // fontFamily: "SFPro";
 
  color: ${colors.PRIMARY_LIGHT};
`;
const LogoImage = styled.Image`
 width: 17.375rem;
  height: 3.827rem;
  margin: 0 0 21.235rem 2.3rem;
  object-fit: contain;
`;




const Hello = ({navigation:{navigate}}) => {
 
  
  
  const Anonymous = ()=>{
    const auth = getAuth();
    signInAnonymously(auth);
    
    navigate("First", {
      auth:auth.lastNotifiedUid,
    });
  }

    return(
        <HelloView>
           <LogoImage source={require('../assets/Hello.png')} />
            <HelloButton onPress={Anonymous}>
                <HelloButtonText>내 돈 지키러가기</HelloButtonText>
             <HelloButtonText><Ionicons name="chevron-forward" size={24} color={colors.SECONDARY_BLUE} /></HelloButtonText>
            </HelloButton> 
            
            

       
        </HelloView>
    )
}
export default Hello;