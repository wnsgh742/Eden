import React, { useEffect, useState } from 'react';
import styled from "styled-components/native";
import colors from '../colors';
import { Ionicons } from "@expo/vector-icons";
import { AsyncStorage, FlatList, ImageEditor, Linking, ScrollView, TouchableOpacity } from 'react-native';
import { collection, getDocs, getFirestore, query } from 'firebase/firestore';
import app from '../firebaseConfig';
import { MessageList, MessageList1 } from '../MessageList';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../responsive';
import Hyperlink from 'react-native-hyperlink';

const MainView = styled.View`
  width: ${SCREEN_WIDTH};
  height: ${SCREEN_HEIGHT};
  flex-grow: 0;
  background-color: ${colors.PRIMARY_LIGHT};
`;
const HeaderView = styled.View`
 width: ${SCREEN_WIDTH};
  height: ${SCREEN_HEIGHT/5};
  margin: 0 0 0rem;
  padding: 2.125rem 0 0.813rem;
  background-color: ${colors.PRIMARY_MIDDLE};
`;


const CircleView = styled.View`
     width: 13.125rem;
  height: 4.438rem;
  margin: 0 0 4rem 5.625rem;
  padding: 0 5.063rem 0 5rem;
  align-items: center;
  justify-content: center;
`;
const CircleImage = styled.Image`
      width: 3.063rem;
  height: 3.063rem;
  margin: 0 0 0.325rem;
 
`;
const CircleText = styled.Text`
    width: 11.75rem;
  height: 0.75rem;
  margin: 0.325rem 0.491rem 0 0.321rem;
  color: ${colors.PRIMARY_TEXT};
  font-size: 0.625rem;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
`;

const EditView =styled.View`
   width: 13.125rem;
  height: 2.438rem;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: left;
  gap: 5px;
  margin: 0 12rem 0 0;
  padding: 0 0 0 1.25rem;
  object-fit: contain;
`;
const EditText = styled.Text`
    color: ${colors.SECONDARY_BLUE};
    font-size: 1rem;
`;
const SecondView = styled.View`
    width: ${SCREEN_WIDTH};
  height: 7.188rem;
  flex-grow: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
  padding: 1.25rem 0 0;
  object-fit: contain;
`;
const SecondBox = styled.View`
  width: 12.438rem;
  height: 3rem;
  flex-grow: 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: left;
  gap: 8px;
  padding: 0.5rem;
  margin-right: 10rem;
  border-radius: 13px;
  background-color: ${colors.SECONDARY_BLUE};
`;
const SecondText =styled.Text`
  
  flex-grow: 0;
  font-size: 0.813rem;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: ${colors.PRIMARY_LIGHT};
`;
const SecondDateView = styled.View`
     width: 6.563rem;
  height: 0.75rem;
  flex-grow: 0;
  padding: 0 0 0.531rem;
`;
const SecondDateText = styled.Text`
    color: ${colors.PRIMARY_TEXT};
    font-size: 0.5rem;
`;
const MessageInfo = ({route,navigation:{navigate}}) => {
    useEffect(()=>{
      
    },[])
   
    const [infolist, setInfoList] = useState(route.params.infomation);
    const [userId, setUserId] = useState(route.params.info);
    
    const db = getFirestore(app);
    
    
    const OpenHyperLink = (url)=>{
        Linking.openURL(url);
      }      
       
    return(
        <MainView>
           <HeaderView>
            <CircleView>
                <CircleImage source={infolist.image}/>
                <CircleText>{infolist.name}</CircleText>
                <EditView>
                <TouchableOpacity onPress={()=>navigate("Message",{info:userId})}>
                <EditText>
                    <Ionicons name="chevron-back" size={20} color={colors.SECONDARY_BLUE} />
                    뒤로가기
                    </EditText>
                
            </TouchableOpacity>
            </EditView>
            </CircleView>
         
               
           </HeaderView>

           <ScrollView>
        <SecondView>
            <SecondDateView>
                <SecondDateText>{infolist.date} 목 오후12:01</SecondDateText>
            </SecondDateView>
            {infolist.id == 10 || infolist.id == 11 || infolist.id ==12
             ?  
                 <SecondBox>
                    <Hyperlink
                    linkStyle={{color:colors.PRIMARY_DARK}}
                     onPress={(url)=>OpenHyperLink(url)}>
                <SecondText>{infolist.message}</SecondText>
                </Hyperlink>
            </SecondBox>
           
            
            : <SecondBox>
            <SecondText>{infolist.message}</SecondText>
        </SecondBox>
        }
            
        </SecondView>
        {infolist.message2
         ? <SecondView>
         <SecondDateView>
             <SecondDateText>{infolist.date} 목 오후12:02</SecondDateText>
         </SecondDateView>
         <SecondBox>
             <SecondText>{infolist.message2}</SecondText>
         </SecondBox>
     </SecondView>
         
         : null}
       {infolist.message3 
       ? <SecondView>
       <SecondDateView>
           <SecondDateText>{infolist.date} 목 오후12:03</SecondDateText>
       </SecondDateView>
       <SecondBox>
           <SecondText>{infolist.message3}</SecondText>
       </SecondBox>
   </SecondView>
    
       
       : null}

       {infolist.message4 
       ? <SecondView>
       <SecondDateView>
           <SecondDateText>{infolist.date} 목 오후12:04</SecondDateText>
       </SecondDateView>
       <SecondBox>
           <SecondText>{infolist.message4}</SecondText>
       </SecondBox>
   </SecondView>
    
       
       : null}
        
        </ScrollView>
           
   
        </MainView>
    )
}
export default MessageInfo;