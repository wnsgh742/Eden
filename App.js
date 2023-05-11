import { NavigationContainer } from '@react-navigation/native';
import { getAnalytics, setUserProperties } from 'firebase/analytics';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import Navigator from './navigator';
import OutNavigator from './outNavigator';
import {Helmet} from "react-helmet";

export default function App() {

  const [loading, setLoading] = useState(false);
 const [userObj, setUserObj] = useState(null);

const auth=getAuth();

const analytics = getAnalytics();

//const user = auth.currentUser;
  useEffect(()=>{
   
    onAuthStateChanged(auth, (user)=>{
     if(user){
       setLoading(true);
       setUserObj(user.uid);
      setUserProperties(analytics,{user_info : user});
     }else{
       setLoading(false);
     }
    
    })
   },[]);
  return (
   
    <NavigationContainer>
         
       
   {loading ? <Navigator userObj={userObj} />: <OutNavigator />}
    </NavigationContainer>
    
  );
}

