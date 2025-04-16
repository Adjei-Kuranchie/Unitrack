import React, { useEffect, useState } from "react";
import { Alert, FlatList, Pressable, Text, View } from "react-native";

// Simulated data for attendees (You can replace this with actual data from your backend)
const mockData = [
  { id: "1", regNo: "PS/CSC/21/0001", timestamp: 1678475247 },
  { id: "2", regNo: "PS/CSC/21/0002", timestamp: 1678475312 },
  { id: "3", regNo: "PS/CSC/21/0001", timestamp: 1678475378 },
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
    <View className="flex-1 bg-white px-6 pt-10">
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

      {/* List of Attendees */}
      {sessionActive ? (
        <View>
          <FlatList
            data={attendees}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View className="bg-gray-100 p-4 rounded-lg mb-4">
                <Text className="text-xl font-bold">{item.regNo}</Text>
                <Text className="text-sm text-gray-600">
                  Marked Attendance At:
                </Text>
                <Text className="text-sm text-gray-800">
                  {formatTimestamp(item.timestamp)}
                </Text>
              </View>
            )}
          />
        </View>
      ) : (
        <Text className="text-center text-gray-600">
          No attendees during the session.
        </Text>
      )}
    </View>
  );
}
