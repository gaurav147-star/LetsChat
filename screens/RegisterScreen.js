import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import axiosUrl from "../config";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission denied",
          "Sorry, we need camera roll permissions to make this work!"
        );
      }
    })();
  }, []);

  const handleChooseImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        setImage(result.assets[0].uri);
      } else {
        console.log("Image picker cancelled");
      }
    } catch (error) {
      console.error("Image picker error:", error);
    }
  };

  const navigation = useNavigation();

  const handleRegister = () => {
    // Create FormData object
    const formData = new FormData();

    // Append user data to FormData
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);

    // Append image file to FormData if an image is selected
    if (image) {
      formData.append("image", {
        uri: image,
        type: "image/jpeg", // or 'image/png' depending on the image type
        name: "profile.jpg", // name of the file
      });
    }

    axiosUrl
      .post("user/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        Alert.alert(
          "Registration successful",
          "You have been registered successfully"
        );
        setName("");
        setEmail("");
        setPassword("");
        setImage("");
      })
      .catch((error) => {
        console.log("Registration error ", error);
        Alert.alert(
          "Registration failed",
          "An error occurred while registering"
        );
      });
  };

  return (
    <ScrollView>
      <View style={{ flex: 1, alignItems: "center", padding: 10 }}>
        <KeyboardAvoidingView>
          <View
            style={{
              marginTop: 80,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 24, color: "#8F00FF", fontWeight: 700 }}>
              Sign Up
            </Text>
            <Text style={{ fontSize: 15, marginTop: 10, fontWeight: "600" }}>
              Create Your Account
            </Text>
          </View>

          <View style={{ marginTop: 50 }}>
            <View>
              <Text style={{ fontSize: 18, fontWeight: "600" }}>Name</Text>
              <TextInput
                value={name}
                onChangeText={(text) => setName(text)}
                placeholder="Enter your name"
                style={{
                  borderBottomColor: "gray",
                  borderBottomWidth: 1,
                  width: 300,
                  marginVertical: 5,
                }}
              />
            </View>

            <View style={{ marginTop: 20 }}>
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

            <View style={{ marginTop: 20 }}>
              <Text style={{ fontSize: 18, fontWeight: "600" }}>Image</Text>
              <Pressable onPress={handleChooseImage}>
                <Text style={{ color: "blue", marginTop: 5 }}>
                  Choose an image from gallery
                </Text>
              </Pressable>
              {image ? (
                <Image
                  key={image}
                  source={{ uri: image }}
                  style={{ width: 100, height: 100, marginTop: 10 }}
                />
              ) : (
                <Text>No image</Text>
              )}
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
              onPress={handleRegister}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 16,
                  fontWeight: "bold",
                  color:"#fff"
                }}
              >
                Register
              </Text>
            </Pressable>
            <Pressable
              style={{ marginTop: 15 }}
              onPress={() => navigation.goBack()}
            >
              <Text style={{ textAlign: "center", color: "gray" }}>
                Already have an account? SignIn
              </Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </View>
    </ScrollView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({});