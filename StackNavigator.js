import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import LoginSreen from "./screens/LoginSreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";
import FriendsScreen from "./screens/FriendsScreen";
import ChatScreen from "./screens/ChatScreen";
import ChatMessageScreen from "./screens/ChatMessageScreen";
import ProfileScreen from "./screens/ProfileScreen";
import { RecepientProfile } from "./components/MessageHeader";

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginSreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Friends" component={FriendsScreen} />
        <Stack.Screen name="Chats" component={ChatScreen} />
        <Stack.Screen name="Messages" component={ChatMessageScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
