import React, { useEffect, useState } from "react";
import { Alert, FlatList, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Simulated data for attendees (You can replace this with actual data from your backend)
const mockData = [
  { id: "1", regNo: "PS/CSC/21/0001", timestamp: 1678475247 },
  { id: "2", regNo: "PS/CSC/21/0002", timestamp: 1678475312 },
  { id: "3", regNo: "PS/CSC/21/0001", timestamp: 1678475378 },
  { id: "4", regNo: "PS/CSC/21/0003", timestamp: 1678475487 },
  { id: "5", regNo: "PS/CSC/21/0004", timestamp: 1678475555 },
  { id: "6", regNo: "PS/CSC/21/0005", timestamp: 1678475655 },
  { id: "7", regNo: "PS/CSC/21/0006", timestamp: 1678475755 },
  { id: "8", regNo: "PS/CSC/21/0007", timestamp: 1678475855 },
  { id: "9", regNo: "PS/CSC/21/0008", timestamp: 1678475955 },
  { id: "10", regNo: "PS/CSC/21/0009", timestamp: 1678476055 },
  { id: "11", regNo: "PS/CSC/21/0010", timestamp: 1678476155 },
  { id: "12", regNo: "PS/CSC/21/0011", timestamp: 1678476255 },
  { id: "13", regNo: "PS/CSC/21/0012", timestamp: 1678476355 },
  { id: "14", regNo: "PS/CSC/21/0013", timestamp: 1678476455 },
  { id: "15", regNo: "PS/CSC/21/0014", timestamp: 1678476555 },
  { id: "16", regNo: "PS/CSC/21/0015", timestamp: 1678476655 },
];

export default function ActiveCodesScreen() {
  const [attendees, setAttendees] = useState(mockData); // Replace with dynamic data later
  const [sessionActive, setSessionActive] = useState(true); // Track if the session is active

  // Function to handle session end
  const endSession = () => {
    setSessionActive(false); // Ends the session
    Alert.alert("Session Ended", "The attendance session has ended.");
  };

  // Formatting timestamp for display
  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp * 1000); // Convert to milliseconds
    return date.toLocaleString(); // Local formatted date and time
  };

  useEffect(() => {
    // You can implement logic to stop the session after a certain time, etc.
    const timer = setTimeout(
      () => {
        setSessionActive(false); // End session after 30 minutes or any condition
      },
      30 * 60 * 1000
    ); // Example: End session after 30 minutes

    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-6 pt-10">
        {/* Session Active Indicator */}
        <Text className="text-lg font-semibold text-gray-700 mb-4">
          {sessionActive ? "Active Attendance Session" : "Session Ended"}
        </Text>

        {/* End Session Button */}
        {sessionActive && (
          <Pressable
            onPress={endSession}
            className="bg-red-600 py-3 rounded-full mt-6"
          >
            <Text className="text-white text-center font-bold text-lg">
              End Session
            </Text>
          </Pressable>
        )}
      </View>

      {/* List of Attendees */}
      {sessionActive ? (
        <FlatList
          data={attendees}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 20 }}
          showsVerticalScrollIndicator={true}
          renderItem={({ item }) => (
            <View className="bg-gray-100 p-4 rounded-lg mb-2 w-full flex flex-row justify-between">
              <Text className="text-lg font-bold">{item.regNo}</Text>
              <Text className="text-sm text-gray-800">
                {formatTimestamp(item.timestamp)}
              </Text>
            </View>
          )}
        />
      ) : (
        <Text className="text-center text-gray-600">
          No attendees during the session.
        </Text>
      )}
    </SafeAreaView>
  );
}
