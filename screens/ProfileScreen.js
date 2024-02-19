import { Alert, Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { UserType } from "../userContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const ProfileScreen = () => {
  const { userDetail, setUserDetail, userId, setUserId } = useContext(UserType);

  const navigation = useNavigation();
  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Do you want to logout?",
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            setUserId("");
            setUserDetail("");
            AsyncStorage.removeItem("userData");
            navigation.navigate("Login");
          },
        },
      ],
      { cancelable: false }
    );
  };
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        marginTop: 50,
        gap: 40,
      }}
    >
      <Image
        source={{ uri: userDetail.image }}
        style={{
          width: 200,
          height: 200,
          borderRadius: 100,
          resizeMode: "cover",
        }}
      />
      <View style={{ gap: 5 }}>
        <Text style={{ fontSize: 25, fontWeight: "bold", textAlign: "center" }}>
          {userDetail.name}
        </Text>
        <Text
          style={{
            fontSize: 22,
            fontWeight: "bold",
            color: "gray",
            textAlign: "center",
          }}
        >
          {userDetail.email}
        </Text>
      </View>
      <Pressable
        onPress={handleLogout}
        style={{
          borderWidth: 2,
          borderColor: "#8F00FF",
          padding: 7,
          borderRadius: 50,
          width: 85,
        }}
      >
        <Text style={{ textAlign: "center" }}>Logout</Text>
      </Pressable>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
