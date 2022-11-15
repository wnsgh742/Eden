import React, { useEffect, useState } from 'react';
import styled from "styled-components/native";
import colors from '../colors';
import { Ionicons } from "@expo/vector-icons";
import { AsyncStorage, TouchableOpacity } from 'react-native';
const HelloView = styled.View`
  flex: 1;
  padding: 0px 50px;
  padding-top: 100px;
  background-color: ${colors.bgColor};
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
   display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 4px;
gap: 8px;

position: absolute;
width: 45px;
height: 45px;
left: 172px;
top: 532px;

`;
const HelloText = styled.Text`
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 8px;
gap: 8px;

position: absolute;
width: 72px;
height: 34px;
left: 159px;
top: 497px;

`;
const HelloButtonText = styled.Text`
  
`;
const Message = ({navigation:{navigate}}) => {
    return(
        <HelloView>
            <HelloTitle>my Message</HelloTitle>
            
            <HelloButton onPress={()=>navigate("Home")}>
                <HelloButtonText>""</HelloButtonText>
            </HelloButton>
        </HelloView>
    )
}
export default Message;