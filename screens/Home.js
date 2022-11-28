import React, { useEffect, useRef, useState } from 'react';
import {View, Text, Button,  TextInput, FlatList, ScrollView, RefreshControl, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import colors from '../colors';
import { Ionicons } from "@expo/vector-icons";
import { addDoc, collection, getDocs, getFirestore, orderBy, query, Timestamp, where } from "firebase/firestore";
import app from '../firebaseConfig';
import { useIsFocused } from '@react-navigation/native';
import uuid from 'react-native-uuid';
import ProgressBar from 'react-native-progress/Bar';
import img from '../assets/backgroundLight.png';
import img2 from '../assets/Main.png';
import { Linking } from 'react-native';
const SetHome = styled.View``;
const HomeView = styled.View`
    width: 24.375rem;
  height: 52.75rem;
  padding: 3.5rem 0.625rem 1.5rem 0.688rem;
    background-image: url(${img});
    
`;
const HomeBlurView= styled.View`
   width: 24.375rem;
   height: 52.75rem;
  padding: 11.625rem 0.625rem 1.5rem 0.688rem;

  background-image: url(${img2});

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



const GoBack = styled.TouchableOpacity`
  width: 24.375rem;
  height: 3.563rem;
  
`;
const WirteView = styled.View`
  border-radius: 30px;
  
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 19.688rem;
  height: 17.563rem;
  gap: 17px;
  margin: 0 1.75rem 15.938rem 1.625rem;
  padding: 2.188rem 0 0;
  background-color: ${colors.PRIMARY_GRARY_LOGO_COLOR};
`;
const WriteTitle = styled.Text`
   font-size: 1.063rem;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: ${colors.PRIMARY_TEXT};
`;
const WirteText = styled.Text`
  font-size: 0.813rem;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: ${colors.PRIMARY_TEXT};
`;
const WriteInput = styled.TextInput`
  width: 14.688rem;
  height: 2.188rem;
  flex-grow: 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
  padding: 0.5rem;
  border-radius: 8px;
  background-color: ${colors.PRIMARY_LIGHT};
`;

const WriteButtonText = styled.Text`
  
  flex-grow: 0;
  font-size: 1.063rem;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: ${colors.SECONDARY_BLUE};
`;
const SubmitView = styled.View`
flex-direction: row;

`;
const Cancle = styled.Text`
  margin-right: 2rem;
  flex-grow: 0;
  font-size: 1.063rem;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: ${colors.SECONDARY_RED};
`;
const BottomView = styled.View`
  width: 369;
  height: 98;
  margin: 12.313rem 0 0;
  margin-top: 0;
  padding: 0.313rem 1.438rem 0.313rem 2rem;
  object-fit: contain;
  flex-direction: row;
  background-color: rgba(194,194,194,1);
  border-radius: 23px;
  
`;

const BottomImage = styled.Image`
  width: 3.75rem;
  height: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
  margin: 0.5rem 3.875rem 0 0;
  padding: 0;
  object-fit: contain;
`;
const WidgetView = styled.View`
  width: 21rem;
  height: 21rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 48px;
  margin: 0 1.063rem 3.313rem 1rem;
  padding: 3.375rem 2.5rem;
  border-radius: 34.1px;
 
  background-color: ${colors.PRIMARY_TEXT};


  `;
const WidgetTitle = styled.Text`

  width: 16rem;
  height: 4.5rem;
  flex-grow: 0;
  font-size: 3.0rem;
  font-weight: 900;
  font-stretch: normal;
  font-style: italic;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: ${colors.PRIMARY_LIGHT};
`;
const WidgetTextOne = styled.Text`
   width: 4.188rem;
  height: 1.25rem;
  flex-grow: 0;
  font-size: 1.063rem;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: ${colors.PRIMARY_LIGHT};
`;
const WidgetTextTwo = styled.Text`
  
  flex-grow: 0;
 align-items: center;
 justify-content: center;
  font-size: 1.063rem;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: ${colors.PRIMARY_LIGHT};
`;
const SecondView = styled.TouchableOpacity`
 
`;
const SecondImage = styled.Image`
 width: 3.75rem;
  height: 5rem;
  margin: 0.313rem 18.313rem 12.313rem 1rem;
  object-fit: contain;
`;
const ProgressView = styled.View`
  width: 15.625rem;
  height: 0.938rem;
  flex-grow: 0;
 // padding: 0 12.5rem 0 0;
  border-radius: 15px;
  align-items: center;
  justify-content: center;
`;
const ProgressPercent = styled.Text`
  margin-bottom: 0.5rem;
  margin-left: 6.0rem;
  flex-grow: 0;
  font-size: 1.063rem;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: right;
  color: ${colors.LOGO_COLOR_BLUE};
`;
const Home = ({route,navigation:{navigate}})=>{
    const [userId, setUserId] = useState(route.params.info);
    const priceInput = useRef();
    const [writeMode, setWriteMode] = useState(false);
    const [authLoad, setAuthLoad] = useState(); //myName.name
    const [name, setName] = useState();
    const [price, setPrice] = useState();
    const [final, setFinal] = useState();
    const [firstPrice, setFirstPrice] = useState();
    const [widgetBar, setWidgetBar] = useState();
    const [percentage, setPercentage] = useState();
    const [del, setDel] = useState();
    const db = getFirestore(app);

    const WriteBox = ()=> setWriteMode(true);
    const HomeReturn = ()=> setWriteMode(false);

   const SaveAction = async() =>{
    let parsePrice = parseInt(price,10);
    try {

       await addDoc(collection(db,"userAction"),{
        id:userId,
        name:name,
        price:parsePrice,
        createAt:Timestamp.now(),
        deleteID:uuid.v4(),
      });
     
      setName();
      setPrice();
      setWriteMode(false);
      get();
    } catch (err) {
     if(err.code == "invalid-argument"){
      alert("입력된 값이 없습니다.")
      setWriteMode(false);
     }
    }
  }

    const get = async()=>{
      try {
        let b = 0;
       const userInfo = collection(db,"userInfo");
      const userIdQuery = query(userInfo, where("id", "==", userId));
      //  const userIdQuery = query(userInfo);
       const userQuerySnapshot = await getDocs(userIdQuery);
       userQuerySnapshot.forEach((doc)=>{
       
        b = doc.data().price;   
        let won2 = b.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');    
        setFirstPrice(won2);
       })
       
       
      const data2 = []
      const userRef = collection(db,"userAction");
      const q = query(userRef, where("id", "==", userId));
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
  
 
  let ShowPrice = b-ArrayTotalSum;
  let won = ShowPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  setFinal(won);
  let ShowWidget =ArrayTotalSum / b;
  let percent = (ShowPrice / b) * 100;
  let math = Math.floor(percent);
  setWidgetBar(ShowWidget);
  setPercentage(math);
  setDel(data2.deleteID);
     // AsyncStorage save total price - firestore totalprice

    } catch (err) {
        alert("aa")
    }

      

};
const Instar = ()=>{
  Linking.openURL(url);
}
const url = "https://www.instagram.com/we_mlbw/";
  
  const isFocused = useIsFocused();
    useEffect(()=>{
      get();
      console.log(firstPrice/final);
    },[isFocused]);

        return (
          <SetHome>
          {writeMode 
          ?
           <HomeBlurView >
            
           
       
              <WirteView>
            <WriteTitle>솔직해도 괜찮아요</WriteTitle>
            <WirteText>현명한 소비는 '기록' 부터 시작입니다.</WirteText>
            <WriteInput 
            placeholder="오늘 소비한 장소를 적어주세요"
            returnKeyType="next"
            onChangeText={(text) => setName(text)}
            placeholderTextColor={colors.textColor}
            autoCapitalize="none"
            autoCorrect={false}
            />
            <WriteInput
             placeholder="오늘 소비한 금액을 적어주세요" 
             returnKeyType="Done"
             onChangeText={(password) => setPrice(password)}
              placeholderTextColor={colors.textColor}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="numeric"
              ref={priceInput}
             />
             <SubmitView>
             <TouchableOpacity onPress={HomeReturn}>
              <Cancle>취소</Cancle>
              </TouchableOpacity>
             <TouchableOpacity onPress={SaveAction}>
              <WriteButtonText>기록할게요</WriteButtonText>
              </TouchableOpacity>
              </SubmitView>

           </WirteView>


           <BottomView>
            <TouchableOpacity  >
              <BottomImage source={require('../assets/HomeBottomFirst.png')}/>
              
            </TouchableOpacity >
            <TouchableOpacity onPress={WriteBox}>
            <BottomImage source={require('../assets/HomeBottomSecond.png')}/>
              
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigate("Message")}>
            <BottomImage source={require('../assets/HomeBottomThird.png')}/>
             
            </TouchableOpacity>
           </BottomView>
          
           </HomeBlurView> 
            
           :
           <HomeView>
           
           <WidgetView>
            <WidgetTextOne>남은 금액</WidgetTextOne>
            <WidgetTitle>{final}원</WidgetTitle>
            <ProgressView>
              <ProgressPercent>{percentage}%</ProgressPercent>
            <ProgressBar
             color={colors.PRIMARY_LIGHT}
              unfilledColor={colors.LOGO_COLOR_BLUE}
              progress= {widgetBar}
             
              
            />
            </ProgressView>
            <WidgetTextTwo>목표 금액   {firstPrice}원</WidgetTextTwo>
           </WidgetView>
          
           <SecondView onPress={Instar}>
            <SecondImage source={require('../assets/Instargram.png')}/>
           </SecondView>
          
          
          
           <BottomView>
            <TouchableOpacity  onPress={()=>navigate("History",{
           info:userId,
          })}>
              <BottomImage source={require('../assets/HomeBottomFirst.png')}/>
              
            </TouchableOpacity >
            <TouchableOpacity onPress={WriteBox}>
            <BottomImage source={require('../assets/HomeBottomSecond.png')}/>
              
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigate("Message",{info:userId, delete:del})}>
            <BottomImage source={require('../assets/HomeBottomThird.png')}/>
             
            </TouchableOpacity>
           </BottomView>
           
          </HomeView> }
          
         
           </SetHome>
        )
    
}
export default Home;

  
          