import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { UserType } from "../userContext";
import { useNavigation } from "@react-navigation/native";
import axiosUrl from "../config";

const FriendRequest = ({ item, friendRequest, setFriendRequest }) => {
  const { userId, setUserId } = useContext(UserType);
  const navigation = useNavigation();

  const handleAccept = async (friendRequestId) => {
    try {
      const response = await axiosUrl.post(
        "user/friend-request/accept",
        {
          senderId: friendRequestId,
          recepientId: userId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      if (response.status === 200) {
        setFriendRequest(
          friendRequest.filter((requests) => requests._id !== friendRequestId)
        );
      }
      navigation.navigate("Chats");
    } catch (error) {
      console.error("error", error);
    }
  };
  

  return (
    <Pressable
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
      }}
    >
      <Image
        source={{ uri: item.image }}
        style={{ width: 50, height: 50, borderRadius: 25, resizeMode: "cover" }}
      />
      <Text style={{ fontSize: 15, flex: 1, marginLeft: 10 }}>
        {item?.name} has sent you a request!
      </Text>
      <Pressable
        onPress={() => handleAccept(item._id)}
        style={{
          borderWidth: 2,
          borderColor: "#8F00FF",
          padding: 7,
          borderRadius: 6,
          width: 85,
        }}
      >
        <Text style={{ textAlign: "center" }}>Accept</Text>
      </Pressable>
    </Pressable>
  );
};

export default FriendRequest;

const styles = StyleSheet.create({});
