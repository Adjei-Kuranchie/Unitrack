import * as Location from "expo-location";
import React, { useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";

// Helper function to generate a random code
const generateRandomCode = () => {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
};

export default function CreateCodeScreen() {
  const [location, setLocation] = useState({ longitude: 0, latitude: 0 });
  const [timestamp, setTimestamp] = useState<number | null>(null);
  const [generatedCode, setGeneratedCode] = useState("");
  const [classSelected, setClassSelected] = useState("MATH101"); // Default class

  // Get the device's current location
  const getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Denied", "Location permission is required.");
      return;
    }

    const loc = await Location.getCurrentPositionAsync({});
    setLocation(loc.coords);
    setTimestamp(Math.floor(Date.now() / 1000)); // Timestamp in seconds

    // Generate the code after getting the location
    const code = generateRandomCode();
    setGeneratedCode(
      `${classSelected}:${code}:${Math.floor(Date.now() / 1000)}`
    );
  };

  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
    return date.toLocaleString(); // Format as a local string (date + time)
  };

  return (
    <View className="flex-1 bg-white px-6 pt-10">
      {/* Create Button */}
      <Pressable
        onPress={getLocation}
        className="bg-blue-600 py-4 rounded-full mb-6"
      >
        <Text className="text-white text-center font-bold text-lg">Create</Text>
      </Pressable>

      {/* Display Location, Timestamp, and Generated Code */}
      {location && timestamp ? (
        <View className="mt-6">
          {/* Display GPS Coordinates */}
          <Text className="text-lg text-gray-700 mb-2">
            Location:
            {"\n"}Latitude: {location.latitude} Longitude: {location.longitude}
          </Text>

          {/* Display Timestamp */}
          <Text className="text-lg text-gray-700 mb-2">
            Timestamp: {formatTimestamp(timestamp)}
          </Text>

          {/* Display Generated Code */}
          <Text className="text-lg text-gray-700 mb-4">
            Generated Code: {generatedCode}
          </Text>
        </View>
      ) : null}
    </View>
  );
}
