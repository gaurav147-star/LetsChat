import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { UserType } from "../userContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import User from "../components/User";
import axiosUrl from "../config";

const HomeScreen = () => {
  const navigation = useNavigation();
  const { userDetail, setUserDetail, userId, setUserId } = useContext(UserType);
  const [users, setUsers] = useState([]);

  const fetchUserDetail = async () => {
    try {
      const response = await axiosUrl.get(`user/${userId}`);
      console.log(response.data.image);
      setHeaderOptions(response.data.image);
      setUserDetail(response.data);
    } catch (error) {
      console.log("error", error);
    }
  };
  const fetchUser = async () => {
    const userData = await AsyncStorage.getItem("userData");
    const storedData = JSON.parse(userData);
    const token = storedData.authToken;
    const config = {
      headers: {
        Authorization: `${token}`,
      },
    };

    axiosUrl
      .get(`user/users/${userId}`, config)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchUser();
    fetchUserDetail();
  }, []);

  const handleProfile = () => {
    navigation.navigate("Profile");
  };

  const setHeaderOptions = async (image) => {
    navigation.setOptions({
      headerTitle: "",
      headerLeft: () => (
       
        <View>
          <Text>
            <Text style={{color:"#8F00FF", fontWeight:700}}>L</Text>
            <Text>ets</Text>
            <Text>c</Text>
            <Text>hat</Text>
          </Text>
        </View>
      ),
      headerRight: () => (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <Ionicons
            name="chatbox-ellipses-outline"
            size={24}
            color="black"
            onPress={() => navigation.navigate("Chats")}
          />
          <Ionicons
            name="people-outline"
            size={24}
            color="black"
            onPress={() => navigation.navigate("Friends")}
          />
          <Pressable onPress={handleProfile}>
            <Image
              source={{ uri: image }}
              style={{
                width: 25,
                height: 25,
                borderRadius: 25,
                resizeMode: "cover",
              }}
            />
          </Pressable>
        </View>
      ),
    });
  };

  return (
    <View>
      <View style={{ margin: 10 }}>
        {users.map((item, index) => (
          <User key={index} item={item} />
        ))}
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
