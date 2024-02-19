import {
  Alert,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserType } from "../userContext";
import axiosUrl from "../config";

const LoginSreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {userDetail, setUserDetail, userId, setUserId } = useContext(UserType);


  const navigation = useNavigation();

  useEffect(() => {
    const checkToken = async () => {
      // AsyncStorage.removeItem("userData");
      try {
        const userData = await AsyncStorage.getItem("userData");
        const storedData = JSON.parse(userData);
        const token = storedData.authToken;
        const userId = storedData.userId
        if (token) {
          setUserId(userId);
          navigation.replace("Home");
        }
      } catch (error) {
        console.log("error", error);
      }
    };
    checkToken();
  }, []);

  const handleLogin = () => {
    const user = {
      email: email,
      password: password,
    };

    axiosUrl
      .post("user/login", user)
      .then((response) => {
        const token = response.data.token;
        const id = response.data.userId;
        const userData = {
          authToken: token,
          userId: id,
        };
        setUserId(id);
        setUserDetail(response.data)
        AsyncStorage.setItem("userData", JSON.stringify(userData));
        setPassword("");
        setEmail("");
        navigation.navigate("Home");
      })
      .catch((error) => {
        console.log("Login failed", error);
        Alert.alert("Login Failed", "Invalid email or password");
      });
  };

  return (
    <View style={{ flex: 1, alignItems: "center", padding: 10 }}>
      <KeyboardAvoidingView>
        <View
          style={{
            marginTop: 100,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 24, color: "#8F00FF", fontWeight: 700 }}>
            Sign In
          </Text>
          <Text style={{ fontSize: 15, marginTop: 10, fontWeight: "600" }}>
            Sign in to Your Account
          </Text>
        </View>

        <View style={{ marginTop: 50 }}>
          <View>
            <Text style={{ fontSize: 18, fontWeight: "600" }}>Email</Text>
            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              placeholder="Enter your email"
              style={{
                borderBottomColor: "gray",
                borderBottomWidth: 1,
                width: 300,
                marginVertical: 5,
              }}
            />
          </View>

          <View style={{ marginTop: 20 }}>
            <Text style={{ fontSize: 18, fontWeight: "600" }}>Password</Text>
            <TextInput
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
              placeholder="Enter your password"
              style={{
                borderBottomColor: "gray",
                borderBottomWidth: 1,
                width: 300,
                marginVertical: 5,
              }}
            />
          </View>

          <Pressable
            style={{
              width: 200,
              backgroundColor: "#8F00FF",
              padding: 15,
              marginTop: 50,
              marginLeft: "auto",
              marginRight: "auto",
              borderRadius: 30,
            }}
            onPress={handleLogin}
          >
            <Text
              style={{ textAlign: "center", fontSize: 16, fontWeight: "bold" }}
            >
              Login
            </Text>
          </Pressable>
          <Pressable
            style={{ marginTop: 15 }}
            onPress={() => navigation.navigate("Register")}
          >
            <Text style={{ textAlign: "center", color: "gray" }}>
              Don't have an account? SignUp
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default LoginSreen;

const styles = StyleSheet.create({});
