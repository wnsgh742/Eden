import React, { useEffect, useState } from 'react';
import styled from "styled-components/native";
import colors from '../colors';
import { Ionicons } from "@expo/vector-icons";
import { AsyncStorage, TouchableOpacity } from 'react-native';
const MainView = styled.View`
  width: 24.375rem;
  height: 52.75rem;
  flex-grow: 0;
  background-color: ${colors.PRIMARY_LIGHT};
`;
const HeaderView = styled.View`
 width: 24.375rem;
  height: 11rem;
  margin: 0 0 0rem;
  padding: 2.125rem 0 0.813rem;
  background-color: ${colors.PRIMARY_MIDDLE};
`;
const HeaderTitle =styled.Text`
      width: 20.375rem;
  height: 2.563rem;
  margin: 1.5rem 2rem 0rem;
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
 width: 17.5rem;
  height: 3.688rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 3px;
  margin: 0 0 0 0.75rem;
  padding: 0;

`;

const ContentText = styled.Text`
  
`;
const MessageFlatList = styled.FlatList`
   
`;
const EditView =styled.View`
    width: 24.375rem;
  height: 0.05rem;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  gap: 289px;
  margin: 1rem 0 1.5rem;
  padding: 0 1.875rem 0 0;
`;
const EditText = styled.Text`
    color: ${colors.SECONDARY_BLUE};
`;
const Message = ({route,navigation:{navigate}}) => {
    useEffect(()=>{
        //getAction();
    },[])
    const [message, setMessage] = useState([]); 
    const [userId, setUserId] = useState(route.params.info);
    const getAction = async()=>{
        const data = [];
        
       try {
        const userRef=collection(db,"Message");
        const userQuery = query(userRef);
        const userSnapShot = await getDocs(userQuery);
        userSnapShot.forEach((doc)=>{
            
            data.push({
                     ...doc.data()
                })
                
        })
            
            setData(data);
       
       
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
            <TouchableOpacity>
                <EditText>편집</EditText>
            </TouchableOpacity> 
            </EditView>
                <HeaderTitle>Message</HeaderTitle>
           </HeaderView>
           <MessageFlatList
            data={message}
            renderItem={({item})=>(
                <Content>
                    <ContentText></ContentText>
                </Content>
            )}
           />
           
            
        </MainView>
    )
}
export default Message;