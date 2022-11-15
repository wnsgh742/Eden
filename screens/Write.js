
import React, { useEffect, useRef, useState } from 'react';

import styled from "styled-components/native";
import colors from '../colors';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import app from '../firebaseConfig';


const WriteView = styled.View`
      flex: 1;
    padding: 0px 50px;
    padding-top: 100px;
    background-color: ${colors.bgColor};
`;
const WriteInput = styled.TextInput`
     color: ${colors.textColor};
  font-size: 30px;
  margin-bottom: 50px;
  
`;
const WriteButton = styled.TouchableOpacity`
     width: 100%;
  padding: 10px 20px;
  border-width: 1px;
  border-radius: 20px;
  border-color: ${colors.cardColor};
  justify-content: center;
  align-items: center;
`;
const WriteButtonText = styled.Text`
  color: ${colors.cardColor};
  font-size: 20px;
`;
const Write = ({navigation:{navigate}})=>{
    const priceInput = useRef();
    const [name, setName] = useState("");
    const [price, setPrice] = useState(Number);
    const [data, setData] = useState([]);
  
  const db = getFirestore(app);

    const SaveAction = async() =>{
      let parsePrice = parseInt(price,10);
      try {

         await addDoc(collection(db,"userAction"),{
          name:name,
          price:parsePrice,
        });
       // parseInt(price,10);
        navigate("Home");
      } catch (err) {
        alert(console.error("Error adding document: ", err));
      }
    }
    
    
        return(
            <WriteView>
                <WriteInput
               // onSubmitEditing={}
                 placeholder="name"
                 
                 returnKeyType="next"
                 onChangeText={(text) => setName(text)}
                 placeholderTextColor={colors.textColor}
                 autoCapitalize="none"
                 autoCorrect={false}
                 />
                <WriteInput 
                ref={priceInput}
                placeholder="price"
               
                returnKeyType="Done"
                onChangeText={(password) => setPrice(password)}
                 placeholderTextColor={colors.textColor}
                 autoCapitalize="none"
                 autoCorrect={false}
                 keyboardType="numeric"
                 
                />
                
                <WriteButton onPress={SaveAction}>
                    <WriteButtonText>소비하기</WriteButtonText>
                </WriteButton>
                <WriteButtonText>{data.name}</WriteButtonText>
                <WriteButtonText>{data.price}</WriteButtonText>
            </WriteView>

        )
    
}

export default Write;