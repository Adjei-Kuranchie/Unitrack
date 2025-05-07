import { formatTimestamp } from "@/lib/utils";
import { useAttendanceStore } from "@/store";
import React, { useEffect } from "react";
import { Alert, FlatList, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Example student registration numbers for testing the addAttendee function
const testStudentRegNos = [
  "PS/CSC/21/0001",
  "PS/CSC/21/0002",
  "PS/CSC/21/0003",
  "PS/CSC/21/0004",
  "PS/CSC/21/0005",
];

export default function ActiveCodesScreen() {
  // Get state and actions from the attendance store
  const {
    sessionActive,
    sessionCode,
    sessionClass,
    attendees,
    endSession,
    addAttendee,
  } = useAttendanceStore();

  // Handle session end
  const handleEndSession = () => {
    Alert.alert(
      "End Session",
      "Are you sure you want to end this attendance session?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "End Session",
          style: "destructive",
          onPress: () => {
            endSession();
            Alert.alert("Session Ended", "The attendance session has ended.");
          },
        },
      ]
    );
  };

  // Add a sample student for testing - only for demonstration purposes
  // In a real app, this would come from students scanning QR codes or entering codes
  const addSampleAttendee = () => {
    if (!sessionActive) return;

    // Get a random student reg number from our test list
    const randomIndex = Math.floor(Math.random() * testStudentRegNos.length);
    const regNo = testStudentRegNos[randomIndex];

    // Add the attendee to our store
    addAttendee(regNo);
  };

  // Simulate students joining (for testing only)
  useEffect(() => {
    if (sessionActive) {
      // Add a sample student every few seconds for testing
      const interval = setInterval(addSampleAttendee, 5000);

      // Auto-end session after 30 minutes
      const timer = setTimeout(
        () => {
          endSession();
        },
        30 * 60 * 1000
      );

      return () => {
        clearInterval(interval);
        clearTimeout(timer);
      };
    }
  }, [sessionActive]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-6 pt-10">
        {/* Session Active Indicator */}
        <Text className="text-lg font-semibold text-gray-700 mb-4">
          {sessionActive ? "Active Attendance Session" : "Session Ended"}
        </Text>

        {/* Session Details */}
        {sessionActive && (
          <View className="mb-4">
            <Text className="text-md text-gray-600">Class: {sessionClass}</Text>
            <Text className="text-md text-gray-600">Code: {sessionCode}</Text>
          </View>
        )}

        {/* End Session Button */}
        {sessionActive && (
          <Pressable
            onPress={handleEndSession}
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
          ListEmptyComponent={
            <Text className="text-center text-gray-500 mt-4">
              Waiting for students to join...
            </Text>
          }
        />
      ) : (
        <View className="flex-1 justify-center items-center">
          <Text className="text-center text-gray-600">
            No active attendance session.
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}
