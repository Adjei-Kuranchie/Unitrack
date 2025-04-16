// import * as FileSystem from "expo-file-system";
// import * as Sharing from "expo-sharing";
// import { FlatList, Pressable, Text, View } from "react-native";

// const mockData = [
//   { id: "1", name: "Alice Johnson", date: "2025-04-14", status: "Present" },
//   { id: "2", name: "Bob Smith", date: "2025-04-14", status: "Absent" },
//   { id: "3", name: "Clara Lee", date: "2025-04-14", status: "Present" },
// ];

// export default function RecordsScreen() {
//   const exportCSV = async () => {
//     const csv =
//       `ID,Name,Date,Status\n` +
//       mockData.map((r) => `${r.id},${r.name},${r.date},${r.status}`).join("\n");

//     const fileUri = FileSystem.documentDirectory + "attendance_records.csv";
//     await FileSystem.writeAsStringAsync(fileUri, csv, {
//       encoding: FileSystem.EncodingType.UTF8,
//     });

//     await Sharing.shareAsync(fileUri, {
//       mimeType: "text/csv",
//       dialogTitle: "Export Attendance Records",
//       UTI: "public.comma-separated-values-text",
//     });
//   };

//   return (
//     <View className="flex-1 bg-white px-4 pt-10">
//       <View className="flex flex-row justify-around items-center mb-4">
//         <Text className="text-2xl font-bold text-center ">
//           Attendance Records
//         </Text>
//         <Pressable
//           onPress={exportCSV}
//           className=" bg-primary-500 p-3  rounded-xl"
//         >
//           <Text className="text-white text-center font-semibold">
//             Export as CSV
//           </Text>
//         </Pressable>
//       </View>
//       <FlatList
//         className="h-full"
//         data={mockData}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <View className="flex-row justify-between py-2 border-b border-gray-200">
//             <Text>{item.name}</Text>
//             <Text className="text-gray-500">{item.status}</Text>
//           </View>
//         )}
//       />
//     </View>
//   );
// }

import { icons } from "@/constants";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import React, { useState } from "react";
import {
  Animated,
  Easing,
  FlatList,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Simulated data for previous sessions
const mockSessions = [
  { id: "1", name: "Session 1", timestamp: 1678475247 },
  { id: "2", name: "Session 2", timestamp: 1678475312 },
  { id: "3", name: "Session 3", timestamp: 1678475378 },
];

// Simulated data for attendance in each session
const mockSessionRecords = {
  "1": [
    { id: "1", name: "John Doe", timestamp: 1678475247 },
    { id: "2", name: "Jane Smith", timestamp: 1678475312 },
  ],
  "2": [
    { id: "3", name: "Michael Lee", timestamp: 1678475378 },
    { id: "4", name: "Sarah Lee", timestamp: 1678475487 },
  ],
  "3": [
    { id: "5", name: "David Brown", timestamp: 1678475555 },
    { id: "6", name: "Lucy Green", timestamp: 1678475655 },
  ],
};

export default function RecordsScreen() {
  const [selectedSessionId, setSelectedSessionId] = useState(null);
  const [slideAnimation] = useState(new Animated.Value(0)); // For sliding animation

  // Function to handle opening the slide for session details
  const openSessionSlide = (sessionId: keyof typeof mockSessionRecords) => {
    setSelectedSessionId(sessionId);
    Animated.timing(slideAnimation, {
      toValue: 1,
      duration: 500,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  };

  // Function to close the session slide
  const closeSessionSlide = () => {
    Animated.timing(slideAnimation, {
      toValue: 0,
      duration: 500,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
    setSelectedSessionId(null); // Reset the selected session
  };

  // Formatting timestamp for display
  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp * 1000); // Convert to milliseconds
    return date.toLocaleString(); // Local formatted date and time
  };

  const exportCSV = async (sessionId: keyof typeof mockSessionRecords) => {
    const csv =
      `ID,Name,Date\n` +
      mockSessionRecords[sessionId]
        .map(
          (r) =>
            `${r.id},${r.name},${new Date(r.timestamp * 1000).toLocaleString()}`
        )
        .join("\n");

    const fileUri =
      FileSystem.documentDirectory + `attendance_records_${Date.now()}.csv`;
    await FileSystem.writeAsStringAsync(fileUri, csv, {
      encoding: FileSystem.EncodingType.UTF8,
    });

    await Sharing.shareAsync(fileUri, {
      mimeType: "text/csv",
      dialogTitle: "Export Attendance Records",
      UTI: "public.comma-separated-values-text",
    });
  };
  return (
    <View className="flex-1 bg-white px-6 pt-10">
      {/* List of Previous Sessions */}
      <Text className="text-2xl font-semibold text-gray-700 mb-6">
        Previous Sessions
      </Text>

      <FlatList
        data={mockSessions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => openSessionSlide(item.id)}
            className="bg-gray-100 p-4 rounded-lg mb-4"
          >
            <Text className="text-lg font-bold">{item.name}</Text>
            <Text className="text-sm text-gray-600">
              {formatTimestamp(item.timestamp)}
            </Text>
          </Pressable>
        )}
      />

      {/* Slide for Selected Session Records */}
      {selectedSessionId && (
        <Animated.View
          style={{
            transform: [
              {
                translateY: slideAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [500, 0],
                }),
              },
            ],
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "80%",
            paddingTop: 20,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.25,
            shadowRadius: 4,
          }}
          className={`bg-slate-300  `}
        >
          <View className="flex-1 px-6">
            <View className="mb-4">
              <View className="flex flex-row justify-between mb-4">
                <Text className="text-2xl font-semibold text-gray-700">
                  Attendance for{" "}
                  {
                    mockSessions.find(
                      (session) => session.id === selectedSessionId
                    )?.name
                  }
                </Text>

                {/* Close Button */}
                <TouchableOpacity
                  onPress={closeSessionSlide}
                  className="bg-red-600 p-3 rounded-full"
                >
                  <View className="text-white text-center font-bold text-lg">
                    <Image source={icons.close} className="w-4 h-4" />
                  </View>
                </TouchableOpacity>
              </View>

              <Pressable
                onPress={() => {
                  exportCSV(selectedSessionId);
                }}
                className=" bg-primary-500 p-3  rounded-xl"
              >
                <Text className="text-white text-center font-semibold">
                  Export as CSV
                </Text>
              </Pressable>
            </View>

            <FlatList
              data={mockSessionRecords[selectedSessionId]}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View className="bg-gray-100 p-4 rounded-lg mb-4">
                  <Text className="text-lg font-bold">{item.name}</Text>
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
        </Animated.View>
      )}
    </View>
  );
}
