import { NavigationContainer } from '@react-navigation/native';
import { getAuth } from 'firebase/auth';
import { useEffect, useState } from 'react';
import Navigator from './navigator';

export default function App() {

  const [loading, setLoading] = useState(false);
 const [userObj, setUserObj] = useState(null);
 const [init, setInit] = useState(false);
  const onFinshed = ()=> setLoading(true);
const auth=getAuth();

  useEffect(()=>{
    auth.onAuthStateChanged((user)=>{
     if(user){
       setLoading(true);
       setUserObj(user);
     
     }else{
       setLoading(false);
     }
     setInit(true);
    })
   },[]);
  return (
   
    <NavigationContainer>
    <Navigator userObj={userObj}/>
    </NavigationContainer>
    
  );
}

