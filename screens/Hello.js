import React, { useEffect, useId, useState } from 'react';
import styled from "styled-components/native";
import colors from '../colors';
import { Ionicons } from "@expo/vector-icons";
import { AsyncStorage, Dimensions, TouchableOpacity } from 'react-native';
import { getAuth, signInAnonymously } from 'firebase/auth';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import app from '../firebaseConfig';
import img from '../assets/backgroundLight.png';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../responsive';




const HelloView = styled.View`
   width: ${SCREEN_WIDTH};
  height: ${SCREEN_HEIGHT};
  //padding: 22rem 3.5rem 4.438rem;
 
 
 
  background-image: url(${img});
`;

const HelloButton = styled.TouchableOpacity`
  width: ${SCREEN_WIDTH/2};
  height: ${SCREEN_HEIGHT/12};
 // gap: 8px;
  //margin: 2.125rem 6.375rem 11.625rem 6.313rem;
 margin-top: ${SCREEN_HEIGHT/2};
 margin-left: ${SCREEN_WIDTH/4};
 //margin-bottom: 140;
//  padding: 0.5rem;
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
const LogoView = styled.View`
  width: ${SCREEN_WIDTH/2};
 
 margin-top: 130;
 margin-left: 50;
`;
const LogoImage = styled.Image`
  width: 17.375rem;
  height: 3.827rem;
 // margin: 0 0 21.235rem;
 
  object-fit: contain;
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


const Hello = ({navigation:{navigate}}) => {
 
  const [login, setLogin] = useState(false);
  
  const Anonymous = ()=>{
    
    navigate("Login");
  }

    return(
        <HelloView>
          
          <LogoView>
           <LogoImage source={require('../assets/Hello3x.png')} />
           </LogoView>
           <NameInput />


            <HelloButton onPress={Anonymous}>
                <HelloButtonText>내 돈 지키러가기</HelloButtonText>
             <HelloButtonText><Ionicons name="chevron-forward" size={24} color={colors.SECONDARY_BLUE} /></HelloButtonText>
            </HelloButton> 
          
            
            

       
        </HelloView>
    )
}
export default Hello;