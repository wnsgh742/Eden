import React, { useEffect, useState } from 'react';
import styled from "styled-components/native";
import colors from '../colors';
import { Ionicons } from "@expo/vector-icons";

import { AsyncStorage, FlatList, ImageEditor, ScrollView, TouchableOpacity } from 'react-native';
import { collection, getDocs, getFirestore, query } from 'firebase/firestore';
import app from '../firebaseConfig';
import { MessageList, MessageList1 } from '../MessageList';
import MessageInfo from './MessageInfo';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../responsive';
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
const HeaderTitle =styled.Text`
      width: 20.375rem;
  height: 2.563rem;
  margin: 0.5rem 2rem 0rem;
  font-size: 2.125rem;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: ${colors.PRIMARY_TEXT};
`;

const Content = styled.TouchableOpacity`
  width: ${SCREEN_WIDTH};
  height: 4.75rem;
  flex-grow: 0;
  padding: 0.563rem 0.375rem 0.5rem 0.625rem;
border-left: 1px;
background-color: ${colors.PRIMARY_LIGHT};
`;

const ContentText = styled.Text`
  width: 17.125rem;
  height: 2.25rem;
  flex-grow: 0;
  font-size: 0.813rem;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: ${colors.PRIMARY_DARK};
`;
const ContextTitle = styled.Text`
     width: 12.188rem;
  height: 1.25rem;
  flex-grow: 0;
 
  font-size: 1.063rem;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
 color: ${colors.PRIMARY_TEXT};
 
`;
const ContextDate = styled.Text`
    width: 4.375rem;
  height: 1rem;
  flex-grow: 0;
 color: ${colors.PRIMARY_DARK};
  font-size: 0.613rem;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: right;
`;
const ContextDateView = styled.View`
    flex-direction: row;
    
`;
const CImage = styled.Image`
     width: 3.688rem;
  height: 3.688rem;
  margin: 0 0.75rem; 
  
`;
const CImageView = styled.View`
    flex-direction: row;
    border: solid 1px ${colors.PRIMARY_MIDDLE};
    align-items: center;
`;
const EditView =styled.View`
    width: ${SCREEN_WIDTH};
  height: 0.05rem;
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  gap: 289px;
  margin: 1rem 0 0.5rem 1rem ;
  padding: 0 1.875rem 0 0;
`;
const EditText = styled.Text`
    color: ${colors.SECONDARY_BLUE};
`;
const Message = ({route,navigation:{navigate}}) => {
    useEffect(()=>{
        getAction();
    },[])
    const [message, setMessage] = useState([]); 
    const [userId, setUserId] = useState(route.params.info);
    const [list ,setList] = useState(MessageList);
    const db = getFirestore(app);
    
    const getAction = async()=>{
        const data = [];
        
       try {
        const userRef=collection(db,"userMessage");
        const userQuery = query(userRef);
        const userSnapShot = await getDocs(userQuery);
        userSnapShot.forEach((doc)=>{
            
            data.push({
                     ...doc.data()
                })
                
        })
        
            
        setMessage(data);
       
       
       } catch (err) {
        alert("aazz")
       }
       
};


    return(
        <MainView>
           <HeaderView>
           <EditView>
            <TouchableOpacity onPress={()=>navigate("Home",{info:userId})}>
                <EditText><Ionicons name="chevron-back" size={24} color={colors.SECONDARY_BLUE} /></EditText>
            </TouchableOpacity>
           
            </EditView>
                <HeaderTitle>Message</HeaderTitle>
           </HeaderView>
           <FlatList 
            data={list}
         
            renderItem={({item})=>(
                <CImageView>
                <CImage source={item.image}/>
             
                <Content onPress={()=>navigate("MessageInfo",
                {
                  infomation:{
                    id:item.idid,
                    name:item.name,
                    message:item.message,
                    message2:item.message2,
                    message3:item.message3,
                    message4:item.message4,
                    image:item.image,
                    date:item.date
                  } 
              })}>
                    <ContextDateView>
                        <ContextTitle numberOfLines={1}>{item.name}</ContextTitle>
                        <ContextDate>{item.date}<Ionicons name="chevron-forward" size={12} color={colors.PRIMARY_DARK} /></ContextDate>
                    </ContextDateView>
                        <ContentText numberOfLines={1}>{item.message}{item.message2}{item.message3}{item.message4}</ContentText>
                    </Content>
                   
                    </CImageView>
                    
    
            )}

          
           />
           
           
   
        </MainView>
    )
}
export default Message;