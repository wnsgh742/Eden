import React, { useEffect, useRef, useState } from 'react';
import styled from "styled-components/native";
import colors from '../colors';
import { collection, deleteDoc, deleteField, doc, getDocs, getFirestore, query, Timestamp, updateDoc, where } from "firebase/firestore";
import app from '../firebaseConfig';
import { FlatList, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Animated } from 'react-native';

const MainView = styled.View`
   width: 24.375rem;
  height: 52.75rem;
  flex-grow: 0;
  padding: 0 0 19.688rem;
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
const EmptyImage = styled.Image`
 width: 24.375rem;
  height: 10.438rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
  margin: 11.625rem 0 0;
  padding: 0;
  object-fit: contain;

`;


const TwoView = styled.View`
    
    width: 6rem;
  height: 1.25rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin: 0 6.188rem 1rem 8.0rem;
  padding: 0.5rem 1.5rem 0.5rem 1.5rem;
  border-radius: 7px;
//border: 10px ${colors.PRIMARY_GRARY_LOGO_COLOR};
 background-color: ${colors.PRIMARY_GRARY_LOGO_COLOR};
`;
const Mask = styled.View`
    width: 2.75rem;
  height: 1rem;

  border-radius: 6.9px;
 align-items: center;
 justify-content: center;
  background-color: ${colors.PRIMARY_LIGHT};
  
`;
const AllMask = styled.View`
    width: 2.75rem;
  height: 1rem;

   
  border-radius: 6.9px;
 align-items: center;
 justify-content: center;
  background-color: ${colors.PRIMARY_LIGHT};
`;
const AnimatedMask = Animated.createAnimatedComponent(Mask);

const AllText = styled.Text`
  flex-grow: 0;
  font-size: 0.813rem;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.38;
  letter-spacing: normal;
  text-align: center;
  color: ${colors.PRIMARY_TEXT};
`;
const TodayText = styled.Text`
 
  flex-grow: 0;
  font-size: 0.813rem;
  font-weight: 600;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.38;
  letter-spacing: normal;
  text-align: right;
  color: ${colors.PRIMARY_TEXT};
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
const HistoryFlatList = styled.FlatList`
   
`;
const HistoryView = styled.View`
    width: 24.241rem;
  height: 3.875rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 0.031rem 0.134rem 0 0;
  padding: 0 1.25rem;
`;
const HistoryText = styled.Text``;
const HistoryDelete = styled.Button``;
const History = ({route,navigation:{navigate}}) => {
    const db = getFirestore(app);
    const [data,setData] =useState([]);  
    const [userId, setUserId] = useState(route.params.info);
    const [dele , setDele] = useState(route.params.del);
    const [all, setAll] = useState(true);
    const [today, setToday] = useState(true);
    const [todayData, setTodayData] = useState([]);
    const [empty ,setEmpty] = useState(true);
    const [todayEmpty , setTodayEmpty] = useState(true);
    const [edit, setEdit] = useState(false);
    const HereAll = ()=> setAll(false);
    const HereToday = ()=> {
        setAll(true);
        
    }
  const EditToggle = ()=> setEdit((prev) =>!prev);

 const EditDelete = async()=> {
  const ok = window.confirm("정말 삭제하시겠습니까?");
  if(ok){
    const docRef = doc(db, "userAction");
    await deleteDoc(docRef);
     
  }
 
 
  //const userRef=collection(db,"userAction");
 //await deleteDoc(doc(db,"userAction"))
 //await db.doc(`userAction/${}`).delete();

 }
const getAction = async()=>{
        const data3 = [];
        
       try {
        const userRef=collection(db,"userAction");
        const userQuery = query(userRef, where("id","==",userId));
        const userSnapShot = await getDocs(userQuery);
        userSnapShot.forEach((doc)=>{
            
                data3.push({
                     ...doc.data()
                })
                
        })
            
            setData(data3);
       
       
       } catch (err) {
        alert("aazz")
       }
       
};

const todayGetAction = async()=>{
        const today = [];
        let currentTime = new Date();
       let b = currentTime.getDate();
      // console.log(b);
    try {
        const userRef=collection(db,"userAction");
        const userQuery = query(userRef, where("id","==",userId));
        const userSnapShot = await getDocs(userQuery);
        userSnapShot.forEach((doc)=>{
           const Date = doc.data().createAt.toDate().getDate();
       
           if(b == Date){
            today.push(doc.data());
           }
        
        })
       setTodayData(today);
       

       
       } catch (err) {
        alert("aazzzzz")
       }
}

useEffect(()=>{
    getAction();
   todayGetAction();
   
},[])


    return(
        <MainView>
           <HeaderView>
            <TwoView>
            <TouchableOpacity onPress={HereAll}>
                {!all ?<AllMask >
                     <AllText style={{color: all ? colors.PRIMARY_TEXT: colors.SECONDARY_RED}}>전체</AllText>
                    </AllMask>
                 : <AllText style={{color: all ? colors.PRIMARY_TEXT: colors.SECONDARY_RED}}>전체</AllText>
                  }
               
              
               
            </TouchableOpacity>
            <TouchableOpacity onPress={HereToday}>
               {all ? <Mask>
                    <TodayText style={{color: !all ? "Black": colors.SECONDARY_RED}}>오늘</TodayText>
                </Mask> 
               :
               <TodayText style={{color: !all ? "Black": colors.SECONDARY_RED}}>오늘</TodayText>
               }
                
            </TouchableOpacity> 
            </TwoView>
            <EditView>
            <TouchableOpacity onPress={()=>navigate("Home",{info:userId})}>
                <EditText><Ionicons name="chevron-back" size={24} color={colors.SECONDARY_BLUE} /></EditText>
            </TouchableOpacity>
            <TouchableOpacity onPress={EditToggle}>
                <EditText>편집</EditText>
            </TouchableOpacity> 
            </EditView>
                <HeaderTitle>내가 쓴 돈</HeaderTitle>  
           </HeaderView>
       
      {edit ?  <HistoryFlatList
         data={all ? todayData : data}
         keyExtractor={(item)=>item.deleteID}
         
         renderItem={({item})=>(
          
             <HistoryView>     
                 <HistoryText>{item.name}</HistoryText>
                 <HistoryText>{item.price}</HistoryText>
                <HistoryDelete onPress={EditDelete}>삭제</HistoryDelete>
             </HistoryView>
         )}
        /> 
        :
        <HistoryFlatList
        data={all ? todayData : data}
        keyExtractor={(item)=>item.deleteID}
        
        renderItem={({item})=>(
         
            <HistoryView>     
                <HistoryText>{item.name}</HistoryText>
                <HistoryText>{item.price}</HistoryText>
               
               
            </HistoryView>
        )}
       /> 
        }
        
         
        
         
        
       
         
            
          {/* <EmptyImage source={require('../assets/empty-view.png')}/> */} 
          
            
        </MainView>
    )
}
export default History;