import React, { useEffect, useId, useState } from 'react';
import styled from "styled-components/native";
import colors from '../colors';
import { AsyncStorage, Dimensions, Linking, TouchableOpacity } from 'react-native';
import img from '../assets/backgroundLight.png';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../responsive';
import Hyperlink from 'react-native-hyperlink';



const HelloView = styled.View`
   width: ${SCREEN_WIDTH};
  height: ${SCREEN_HEIGHT};
  //padding: 22rem 3.5rem 4.438rem;
 
 
 
  background-image: url(${img});

`;
const TitleView = styled.View`
   margin-top:${SCREEN_HEIGHT/5};
    align-items: center;
  justify-content: center;
`;
const Title = styled.Text`
    font-size: 1.563rem;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
 color: ${colors.ORANGE_LOGO_COLOR};
 margin-bottom: 1.5rem;
 margin-top: 1.5rem;
`;
const TitleDiscription = styled.Text`
      font-size: 1.063rem;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
 color: ${colors.PRIMARY_TEXT};
`;

const LinkView = styled.View`
    align-items: center;
    justify-content: center;
    margin-top: 0.2rem;
`;
const LinkText = styled.Text`
    font-size: 1.063rem;
`;
const GoBack = styled.Text`
     font-size: 1.063rem;
     font-weight: bold;
     color: ${colors.PRIMARY_DARK};
`;
const GoBackView = styled.TouchableOpacity`
    margin-top: 2rem;
`;
const MLBW = ({navigation:{navigate}}) => {
 
    return(
        <HelloView>
            <TitleView>
          <Title>머그폰을 소개합니다!{"\n"}</Title>
          <TitleDiscription>목표금액을 설정하고, 절약을 돕는 서비스입니다.</TitleDiscription>
          <Title>이렇게 사용해보세요!{"\n"}</Title>
          <TitleDiscription>
            1.목표금액을 설정합니다.{"\n"}
            2.매일 쓴 돈을 기록합니다.{"\n"}
            3.목표금액 대비 쓴 돈과 남은 돈을 확인합니다.{"\n"}
            4.모바일 홈화면에 추가해서 매일 기록해보세요.{"\n"}
            </TitleDiscription>
          <Title>MLBW가 만들었어요!{"\n"}</Title>
          <TitleDiscription>
          more love,better world를 위해 일하는 팀입니다.{"\n"}
          </TitleDiscription>
          <LinkView>
            <LinkText>insta@we_mlbw</LinkText>
          </LinkView>
        <GoBackView onPress={()=>navigate("Home")}>
            <GoBack>Home으로 돌아가기!</GoBack>
        </GoBackView>
         </TitleView>
        
         
        
      
        </HelloView>
    )
}
export default MLBW;