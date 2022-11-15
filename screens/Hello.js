import React, { useEffect, useState } from 'react';
import styled from "styled-components/native";
import colors from '../colors';
import { Ionicons } from "@expo/vector-icons";
import { AsyncStorage, TouchableOpacity } from 'react-native';
const HelloView = styled.View`
  width: 100%;
  height: 100%;
  background-color: ${colors.LOGO_COLOR_GREEN};
`;
const HelloTitle = styled.Text`
  
width: 300px;
height: 22px;
//font-family: 'SF Pro';
font-style: normal;
font-weight: 590;
font-size: 50px;
line-height: 22px;
text-align: center;
color: #FFFFFF;
flex: none;
order: 0;
flex-grow: 0;
`;
const HelloButton = styled.TouchableOpacity`
 width: 139px;
  height: 36px;
  border-radius: 13px;
//margin: 38.7% 32.3% 38.7% 32.1% ;
//gap: 8px;
background-color: ${colors.SECONDARY_BLUE};

`;

const HelloButtonText = styled.Text`
  width: 123px;
  height: 20px;
  font-size: 17px;
  font-weight: bold;
  font-style: normal;
  letter-spacing: 0;
  text-align: left;
 // fontFamily: "SFPro";
 
  color: ${colors.PRIMARY_LIGHT};
`;
const LogoImage = styled.Image`
 // margin: 13.5% 14.7% 87.7% 14.7%;
  width: 342px;
  height: 124px;
`;
const LogoButtom = styled.Image`
  width: 235px;
  height: 245.2px;
  object-fit: contain;
`;

const Hello = ({navigation:{navigate}}) => {


    return(
        <HelloView>
           <LogoImage source={require('../assets/Logo.title.full.png')} />
            
            <HelloButton onPress={()=>navigate("First")}>
                <HelloButtonText>내 돈 지키러가기</HelloButtonText>
            </HelloButton>
        <LogoButtom source={require('../assets/login-profile.png')}/>
        </HelloView>
    )
}
export default Hello;