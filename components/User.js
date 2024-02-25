import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { UserType } from "../userContext";
import axios from "axios";
import axiosUrl from "../config";

const User = ({ item }) => {
  const { userId, setUserId } = useContext(UserType);
  const [requestSent, setRequestSent] = useState(false);
  const [friends, setFriends] = useState([]);
  const [sentFriendRequests, setSentFriendRequests] = useState([]);

  useEffect(() => {
    fetchSentFriendRequests();
  }, [sentFriendRequests]);

  useEffect(() => {
    fetchFriends();
  }, [friends]);

  const fetchSentFriendRequests = async () => {
    try {
      const response = await axiosUrl.get(
        `user/friend-request/sent/${userId}`
      );
      const data = response.data;
      if (data) {
        setSentFriendRequests(data);
      }
    } catch (error) {
      console.log("error message", error);
    }
  };

  const fetchFriends = async () => {
    try {
      const response = await axiosUrl.get(
        `user/friends/${userId}`
      );

      const data = response.data;
      setFriends(data);
    } catch (error) {
      console.log("error", error);
    }
  };



const handleFriendRequest = async (currentUserId, selectedUserId) => {
  try {
    const response = await axiosUrl.post(
      "user/friend-request",
      { currentUserId, selectedUserId },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      setRequestSent(true);
    }
  } catch (error) {
    console.error("Error in sending request", error);
  }
};

  return (
    <Pressable
      style={{ flexDirection: "row", alignItems: "center", marginVertical: 10 }}
    >
      <View>
        <Image
          source={{ uri: item.image }}
          style={{
            width: 40,
            height: 40,
            borderRadius: 25,
            resizeMode: "cover",
          }}
        />
      </View>
      <View style={{ marginLeft: 12, flex: 1 }}>
        <Text>{item?.name}</Text>
        <Text style={{ color: "gray" }}>{item?.email}</Text>
      </View>
      {friends.some((friend) => friend._id === item._id) ? (
        <Pressable
          style={{
            borderWidth: 2,
            borderColor: "#8F00FF",
            // backgroundColor: "#000000",
            padding: 7,
            borderRadius: 6,
            width: 85,
          }}
        >
          <Text style={{ color: "#000", textAlign: "center" }}>Added</Text>
        </Pressable>
      ) : requestSent ||
        sentFriendRequests.some((friend) => friend === item._id) ? (
        <Pressable
          style={{
            borderWidth: 2,
            borderColor: "#8F00FF",
            padding: 7,
            borderRadius: 6,
            width: 85,
          }}
        >
          <Text style={{ textAlign: "center" }}>Requested</Text>
        </Pressable>
      ) : (
        <Pressable
          style={{
            backgroundColor: "#8F00FF",
            padding: 7,
            borderRadius: 6,
            width: 85,
          }}
          onPress={() => handleFriendRequest(userId, item._id)}
        >
          <Text style={{ textAlign: "center" ,color:"#fff"}}>Add Friend</Text>
        </Pressable>
      )}
    </Pressable>
  );
};

export default User;

const styles = StyleSheet.create({});