import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Write from "./screens/Write";
import Home from "./screens/Home";
import First from "./screens/First";
import Hello from "./screens/Hello";
import History from "./screens/History";
import Message from "./screens/Message";

const Tabs = createNativeStackNavigator();

const Navigator = () => (
  <Tabs.Navigator screenOptions={{ headerShown: false }}>
    <Tabs.Screen name="Hello" component={Hello} />
    <Tabs.Screen name="First" component={First} />
    <Tabs.Screen name="Home" component={Home} />
    <Tabs.Screen name="Write" component={Write}  />
    <Tabs.Screen name="History" component={History} options={{presentation:"modal"}} />
    <Tabs.Screen name="Message" component={Message} />
  </Tabs.Navigator>
);

export default Navigator;
