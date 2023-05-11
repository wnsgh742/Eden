import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import First from "./screens/First";
import Hello from "./screens/Hello";
import Login from "./screens/Login";
import Join from "./screens/Join";
const Tabs = createNativeStackNavigator();

const OutNavigator = () => (
  <Tabs.Navigator screenOptions={{ headerShown: false }}>
    <Tabs.Screen name="Hello" component={Hello} />
    <Tabs.Screen name="Login" component={Login} />
    <Tabs.Screen name="Join" component={Join} />
   
   
  </Tabs.Navigator>
);

export default OutNavigator;