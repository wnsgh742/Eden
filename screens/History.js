import React, { useEffect, useState } from 'react';
import styled from "styled-components/native";
import colors from '../colors';
import { collection, getDocs, getFirestore } from "firebase/firestore";
import app from '../firebaseConfig';
import { FlatList, ScrollView } from 'react-native';
const HelloView = styled.View`
  flex: 1;
  padding: 0px 50px;
  padding-top: 100px;
  background-color: ${colors.bgColor};
`;
const HelloTitle = styled.Text`
  color: ${colors.textColor};
  font-size: 30px;
  margin-bottom: 100px;
`;
const HistoryView = styled.View``;
const HistoryText = styled.Text``;

const History = ({navigation:{navigate}}) => {
    const db = getFirestore(app);
    const [data,setData] =useState([]);  
  
const getAction = async()=>{
        const data = [];
    const querySnapshot = await getDocs(collection(db, "userAction"));
    querySnapshot.forEach((doc) => {
    data.push({
        ...doc.data(),
        key:doc.id,
    })
})
    setData(data);

};
useEffect(()=>{
    getAction();
},[])


    return(
        <HelloView>
            <HelloTitle>History</HelloTitle>
           <FlatList
            data={data}
            renderItem={({item})=>(
                <HistoryView>
                    <HistoryText>{item.name}</HistoryText>
                    <HistoryText>{item.price}</HistoryText>
                </HistoryView>
            )}
           />
            
        </HelloView>
    )
}
export default History;