import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import InputBox from "../components/InputBox";
import { UserType } from "../userContext";
import { RecepientProfile } from "../components/MessageHeader";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import MessageBody from "../components/MessageBody";
import axiosUrl from "../config";
import io from 'socket.io-client';

const socket = io('https://baat-cheet-nd2v.onrender.com/api/');

const ChatMessageScreen = () => {
  const { userId } = useContext(UserType);
  const navigation = useNavigation();
  const [recepientData, setRecepientData] = useState(null);
  const [messages, setMessages] = useState(null);
  const route = useRoute();
  const { recepientId } = route.params;

  const scrollViewRef = useRef(null);

  useEffect(() => {
    scrollToBottom()
  },[]);

  const scrollToBottom = () => {
      if(scrollViewRef.current){
          scrollViewRef.current.scrollToEnd({animated:false})
      }
  }

  const handleContentSizeChange = () => {
      scrollToBottom();
  }

  const recepientDetail = async () => {
    try {
      const response = await axiosUrl.get(
        `user/${recepientId}`
      );
      setRecepientData(response.data);
    } catch (error) {
      console.log("error", error);
    }
  };
  const fetchMessages = async () => {
    try {
      const response = await axiosUrl.get(
        `message/messages/${userId}/${recepientId}`
      );
      const data = await response.data;
      setMessages(data);
    } catch (error) {
      console.log("error in showing message", error);
    }
  };
 
  useEffect(() => {
    recepientDetail();
    fetchMessages();
    socket.on('message', (data) => {
      console.log('Received message:', data);
      // Handle received message
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.disconnect();
    };
  }, [messages]);


  useEffect(() => {
    if (recepientData) {
      navigation.setOptions(
        RecepientProfile({ data: recepientData, navigation: navigation })
      );
    }
  }, [recepientData, navigation]);

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <ScrollView ref={scrollViewRef} contentContainerStyle={{flexGrow:1}} onContentSizeChange={handleContentSizeChange}>
        <MessageBody messages={messages} />
      </ScrollView>
      <InputBox fetchMessages={fetchMessages} />
    </KeyboardAvoidingView>
  );
};

export default ChatMessageScreen;

const styles = StyleSheet.create({});