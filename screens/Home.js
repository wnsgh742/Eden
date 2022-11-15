import React, { useEffect, useState } from 'react';
import {View, Text, Button,  TextInput, FlatList, AsyncStorage, ScrollView, RefreshControl} from 'react-native';
import styled from 'styled-components/native';
import colors from '../colors';
import { Ionicons } from "@expo/vector-icons";
import { collection, getDocs, getFirestore, orderBy, query, where } from "firebase/firestore";
import app from '../firebaseConfig';
import { useIsFocused } from '@react-navigation/native';

const HomeView = styled.View`
    flex:1;
    padding: 0px 50px;
     padding-top: 100px;
    background-color: ${colors.bgColor};
`;
const HomeButton = styled.TouchableOpacity`
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
const HomeInput = styled.TextInput`
    color: ${colors.textColor};
  font-size: 30px;
  margin-bottom: 100px;
`;
const HomeTitle = styled.Text`
  color: ${colors.textColor};
  font-size: 30px;
  margin-bottom: 50px;
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
const Home = ({navigation:{navigate}})=>{
   
   const [authLoad, setAuthLoad] = useState(); //myName.name

    const [final, setFinal] = useState();
   const db = getFirestore(app);

  /* const loadAuth = async()=> {
    try {
        let authload = await AsyncStorage.getItem("myName");
        let authLoadParse = JSON.parse(authload);
        let b =  authLoadParse.price;
        let b1 = parseInt(b, 10);
        setAuthParse(b1);
      setAuthLoad(authLoadParse.name);
     
    } catch (err) {
        alert("aa")
    }
    
}*/

    const get = async()=>{
      try {
        let authload = await AsyncStorage.getItem("myName");
        let authLoadParse = JSON.parse(authload);
        let b =  authLoadParse.price;
        let b1 = parseInt(b, 10);
       
      setAuthLoad(authLoadParse.name);
        //AsyncStorage load

      const data2 = []
      const userRef = collection(db,"userAction");
      const q = query(userRef);
      const querySnapshot =await getDocs(q);
      querySnapshot.forEach((doc) => {
          data2.push({
              ...doc.data(),
          })
      })
      // firebase store load

      let data3 = []
      for(let i = 0; i < data2.length; i++) {
        data3.push(data2[i].price);
       
     };
     
  let ArrayTotalSum = data3.reduce((sum, data3) => sum + data3, 0);
  
  let ShowPrice = b1-ArrayTotalSum;
  setFinal(ShowPrice);
     // AsyncStorage save total price - firestore totalprice

    } catch (err) {
        alert("aa")
    }

      

};

    
/*const result = ()=>{
    let priceSelect = [];
 
      
 // console.log(priceSelect); 
  let parseTotal = parseInt(authParse,10);
   const c = parseTotal-ArrayTotalSum;
   console.log(ArrayTotalSum);
   setFinal(c);
   
   
   }; */
  

   
   const [refreshing, setRefreshing] = useState(false);
   const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
 
    wait(500).then(() => setRefreshing(false));
  }, []);

  const isFocused = useIsFocused();
    useEffect(()=>{
       
     
      get();
   
      
    },[isFocused]);

        return (
           <HomeView>
            <ScrollView
             refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                />
             }
            >
            <HomeTitle>{authLoad}님 환영합니다!</HomeTitle>
           
            
            <HomeTitle>{final}</HomeTitle>
           
           <SaveButton onPress={()=>navigate("History")}>
            <SaveButtonText>생활비기록보기</SaveButtonText>
            </SaveButton>
            <SaveButton onPress={()=>navigate("Message")}>
            <SaveButtonText>메세지</SaveButtonText>
            </SaveButton>
            <SaveButton onPress={()=>navigate("History")}>
            <SaveButtonText>인스타</SaveButtonText>
            </SaveButton>
            
            
            </ScrollView>
            <FlatList 
              
            />
            <HomeButton onPress={()=>navigate("Write")}>
            <Ionicons name="add" color="white" size={40} />
            </HomeButton>
            
           </HomeView>
        )
    
}
export default Home;