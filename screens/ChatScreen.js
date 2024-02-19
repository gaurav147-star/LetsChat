import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { UserType } from "../userContext";
import axios from "axios";
import Chat from "../components/Chat";
import axiosUrl from "../config";

const ChatScreen = () => {
  const { userId, setUserId } = useContext(UserType);
  const [friends, setFriends] = useState([]);
  useEffect(() => {
    fetchFriends();
  }, []);

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

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View>
        {friends.map((item, index) => (
          <Chat key={index} item={item} />
        ))}
      </View>
    </ScrollView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({});
