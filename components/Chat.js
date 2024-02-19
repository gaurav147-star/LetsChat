import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { UserType } from "../userContext";
import axios from "axios";
import { Entypo } from "@expo/vector-icons";
import axiosUrl from "../config";

const Chat = ({ item }) => {
  const navigation = useNavigation();
  const [messages, setMessages] = useState([]);
  const { userId } = useContext(UserType);
  const fetchMessages = async () => {
    try {
      const response = await axiosUrl.get(
        `message/messages/${userId}/${item._id}`
      );
      const data = await response.data;
      setMessages(data);
    } catch (error) {
      console.log("error in showing message", error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const lastMessage = () => {
    const nonEmptyMessages = messages.filter((message) => message.messageType);

    // Get the last message
    const lastMessage =
      nonEmptyMessages.length > 0
        ? nonEmptyMessages[nonEmptyMessages.length - 1]
        : null;
    return lastMessage;
  };
  const lastMsg = lastMessage();

  const formatTime = (time) => {
    const options = { hour: "numeric", minute: "numeric" };
    return new Date(time).toLocaleString("en-US", options);
  };

  return (
    <Pressable
      onPress={() =>
        navigation.navigate("Messages", {
          recepientId: item._id,
        })
      }
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        borderBottomColor: "#DeDeDe",
        borderBottomWidth: 0.7,
        padding: 10,
        marginVertical: 10,
      }}
    >
      <Image
        source={{ uri: item.image }}
        style={{ width: 50, height: 50, borderRadius: 25, resizeMode: "cover" }}
      />
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>{item.name}</Text>

        <Text style={{ fontSize: 15, color: "gray", fontWeight: 500 }}>
          {lastMsg ? (
            lastMsg.messageType === "text" ? (
              lastMsg.message
            ) : (
              <>
                <Entypo
                  name="image"
                  size={15}
                  color="gray"
                  style={{ marginRight: 10 }}
                />
                Photo
              </>
            )
          ) : (
            ""
          )}
        </Text>
      </View>
      <View>
        <Text style={{ color: "#585858", fontWeight: 400 }}>
          {lastMsg ? formatTime(lastMsg.timeStamp) : ""}
        </Text>
      </View>
    </Pressable>
  );
};

export default Chat;

const styles = StyleSheet.create({});
