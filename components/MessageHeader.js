import { Image, Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export const RecepientProfile = ({ data, navigation }) => ({
  headerTitle: "",
  headerLeft: () => (
    <View style={{ flexDirection: "row", gap: 10 ,alignItems:'center'}}>
      <Pressable onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </Pressable>
      <Image
        source={{ uri: data.image }}
        style={{ width: 30, height: 30, borderRadius: 15, resizeMode: "cover" }}
      />
      <Text style={{fontSize:15, fontWeight:'bold'}}>{data.name}</Text>
    </View>
  ),
});
