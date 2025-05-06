import { formatTimestamp, generateRandomCode } from "@/lib/utils";
import * as Location from "expo-location";
import React, { useState } from "react";
import {
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

const classes = ["MATH101", "CSC102", "ENG103", "BIO104"];

export default function CreateCodeScreen() {
  const [location, setLocation] = useState({ longitude: 0, latitude: 0 });
  const [timestamp, setTimestamp] = useState<number | null>(null);
  const [generatedCode, setGeneratedCode] = useState("");
  const [classSelected, setClassSelected] = useState<string>();
  const [loading, setLoading] = useState(false);

  // Get the device's current location
  const getLocation = async (lecture = "") => {
    if (loading) return; // Prevent multiple clicks
    setLoading(true);

    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "Location permission is required.");
        return;
      }

      const loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);
      setTimestamp(Math.floor(Date.now() / 1000)); // Timestamp in seconds
      setClassSelected(lecture); // Set the selected class

      // Generate the code after getting the location
      const code = generateRandomCode();
      setGeneratedCode(`${lecture}:${code}:${Math.floor(Date.now() / 1000)}`);
    } catch (error) {
      Alert.alert("Error", "Could not retrieve location.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-white px-6 pt-10">
      <View>
        <FlatList
          horizontal
          data={classes}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => {
            return (
              <Pressable
                disabled={loading}
                onPress={() => getLocation(item.toUpperCase())}
                className={`border py-3 rounded-full mb-6 px-6 ${
                  loading ? "opacity-50" : ""
                }`}
              >
                <Text className="text-stone-950 text-center font-bold text-lg">
                  {item}
                </Text>
              </Pressable>
            );
          }}
        />
      </View>

      {/* Display Location, Timestamp, and Generated Code */}
      {location && timestamp ? (
        <View className="mt-6">
          <Text className="text-lg text-gray-700 mb-2">
            Location:
            {"\n"}Latitude: {location.latitude} Longitude: {location.longitude}
          </Text>

          <Text className="text-lg text-gray-700 mb-2">
            Timestamp: {formatTimestamp(timestamp)}
          </Text>

          <Text className="text-lg text-gray-700 mb-4">
            Generated Code: {generatedCode}
          </Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 4,
  },
});
