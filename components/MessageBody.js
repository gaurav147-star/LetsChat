import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { UserType } from "../userContext";
import { useRoute } from "@react-navigation/native";

const MessageBody = ({ messages }) => {
  const { userId } = useContext(UserType);

  const formTime = (time) => {
    const options = { hour: "numeric", minute: "numeric" };
    return new Date(time).toLocaleString("en-US", options);
  };
  return (
    <>
      {messages?.map((item, index) =>
        item.messageType === "text" ? (
          <Pressable
            key={index}
            style={[
              item?.senderId?._id === userId
                ? {
                    alignSelf: "flex-end",
                    backgroundColor: "#8F00FF",
                    padding: 8,
                    borderRadius: 12,
                    maxWidth: "60%",
                    margin: 10,
                  }
                : {
                    alignSelf: "flex-start",
                    backgroundColor: "white",
                    padding: 8,
                    borderRadius: 12,
                    maxWidth: "60%",
                    margin: 10,
                  },
            ]}
          >
            <Text style={{ fontSize: 13, textAlign: "left" ,color:"#fff"}}>
              {item.message}
            </Text>
            <Text style={{ textAlign: "right", fontSize: 10, color: "#000" }}>
              {formTime(item.timeStamp)}
            </Text>
          </Pressable>
        ) : item.messageType === "image" ? (
          <Pressable
            key={index}
            style={[
              item?.senderId?._id === userId
                ? {
                    alignSelf: "flex-end",
                    backgroundColor: "#8F00FF",
                    padding: 8,
                    borderRadius: 12,
                    maxWidth: "60%",
                    margin: 10,
                  }
                : {
                    alignSelf: "flex-start",
                    backgroundColor: "white",
                    padding: 8,
                    borderRadius: 12,
                    maxWidth: "60%",
                    margin: 10,
                  },
            ]}
          >
            <Image
              source={{ uri: item.imageUrl }}
              style={{ width: 200, height: 200, borderRadius: 7 }}
            />
            <Text
              style={{
                textAlign: "right",
                fontSize: 10,
                color: "white",
                position: "absolute",
                right: 12,
                bottom: 10,
              }}
            >
              {formTime(item.timeStamp)}
            </Text>
          </Pressable>
        ) : (
          <></>
        )
      )}
    </>
  );
};

export default MessageBody;

const styles = StyleSheet.create({});
