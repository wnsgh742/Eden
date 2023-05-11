import React, { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Write from "./screens/Write";
import Home from "./screens/Home";
import First from "./screens/First";
import Hello from "./screens/Hello";
import History from "./screens/History";
import Message from "./screens/Message";
import MessageInfo from "./screens/MessageInfo";
import { useSafeAreaFrame } from "react-native-safe-area-context";
import MLBW from "./screens/MLBW";

const Tabs = createNativeStackNavigator();

const Navigator = ({userObj}) => {
 
console.log(userObj);
  return(
  <Tabs.Navigator screenOptions={{ headerShown: false }}>
     <Tabs.Screen name="First" component={First} />
    <Tabs.Screen name="Home" component={Home}/>
    <Tabs.Screen name="History" component={History} />
    <Tabs.Screen name="Message" component={Message} />
    <Tabs.Screen name="MessageInfo" component={MessageInfo} />
    <Tabs.Screen name="MLBW" component={MLBW} />
  </Tabs.Navigator>
  )
  
  };

export default Navigator;
