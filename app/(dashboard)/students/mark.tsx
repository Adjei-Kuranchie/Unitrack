import * as Location from "expo-location";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";

export default function MarkAttendance() {
  const [location, setLocation] = useState(null);
  const [hasMarked, setHasMarked] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const regNo = "PS/CSC/21/0001";

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
  };

  const handleMarkAttendance = async () => {
    await getLocation();
    setHasMarked(true);
  };

  return (
    <View className="flex-1 bg-white items-center justify-center px-4">
      {!hasMarked ? (
        <Pressable
          className="bg-blue-600 px-6 py-3 rounded-full"
          onPress={handleMarkAttendance}
        >
          <Text className="text-white font-semibold text-lg">
            Mark Attendance
          </Text>
        </Pressable>
      ) : (
        <View className="items-center">
          <Text className="text-xl font-bold mb-4">Attendance Marked</Text>
          <Text className="text-base">Reg No: {regNo}</Text>
          {location && (
            <>
              <Text className="text-base">
                Latitude: {location.coords.latitude}
              </Text>
              <Text className="text-base">
                Longitude: {location.coords.longitude}
              </Text>
            </>
          )}
        </View>
      )}
    </View>
  );
}
