import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { UserType } from "../userContext";
import FriendRequest from "../components/FriendRequest";
import axios from "axios";
import axiosUrl from "../config";

const FriendsScreen = () => {
  const { userId, setUserId } = useContext(UserType);
  const [friendRequest, setFriendRequest] = useState([]);

  useEffect(() => {
    fetchFriendRequest();
  }, []);

  const fetchFriendRequest = async () => {
    try {
      const response = await axiosUrl.get(
        `user/friend-request/${userId}`
      );

      if (response.status === 200) {
        const friendRequestData = response.data.map((friends) => ({
          _id: friends._id,
          name: friends.name,
          email: friends.email,
          image: friends.image,
        }));

        setFriendRequest(friendRequestData);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      <View>
        {friendRequest.length > 0 ? (
          <Text style={{ padding: 10, fontWeight: "bold", fontSize: 18 }}>
            Your Friend Requests!
          </Text>
        ) : (
          <Text style={{ padding: 10, fontWeight: "bold", fontSize: 18 }}>
            No Friend Requests!
          </Text>
        )}
      </View>
      <View style={{ padding: 10 }}>
        {friendRequest.map((item, index) => (
          <FriendRequest
            key={index}
            item={item}
            friendRequest={friendRequest}
            setFriendRequest={setFriendRequest}
          />
        ))}
      </View>
    </>
  );
};

export default FriendsScreen;

const styles = StyleSheet.create({});
