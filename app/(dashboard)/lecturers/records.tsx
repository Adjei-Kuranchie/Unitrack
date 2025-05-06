import CustomBottomSheetModal from "@/components/CustomBottomSheetModal";
import {
  BottomSheetFlatList,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import React, { useCallback, useRef, useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";

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
    { id: "7", name: "Lucy Green", timestamp: 1678475655 },
    { id: "8", name: "Lucy Green", timestamp: 1678475655 },
    { id: "9", name: "Lucy Green", timestamp: 1678475655 },
    { id: "10", name: "Lucy Green", timestamp: 1678475655 },
    { id: "11", name: "Lucy Green", timestamp: 1678475655 },
    { id: "12", name: "Lucy Green", timestamp: 1678475655 },
    { id: "13", name: "Lucy Green", timestamp: 1678475655 },
    { id: "14", name: "Lucy Green", timestamp: 1678475655 },
    { id: "15", name: "Lucy Green", timestamp: 1678475655 },
    { id: "16", name: "Lucy Green", timestamp: 1678475655 },
  ],
};

const Records = () => {
  const modalRef = useRef<BottomSheetModal>(null);
  const [selectedSessionId, setSelectedSessionId] =
    useState<keyof typeof mockSessionRecords>("1");

  const openSessionSlide = (sessionId: keyof typeof mockSessionRecords) => {
    setSelectedSessionId(sessionId);
    handlePresentModalPress();
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

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    modalRef.current?.present();
  }, []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

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
      <CustomBottomSheetModal ref={modalRef}>
        <BottomSheetView
          style={{ flex: 1, width: "100%" }}
          className="items-center"
        >
          <BottomSheetView className=" px-4">
            <BottomSheetView className="flex flex-row justify-between mb-4">
              <Text className="text-2xl font-semibold text-gray-700">
                Attendance for{" "}
                {
                  mockSessions.find(
                    (session) => session.id === selectedSessionId
                  )?.name
                }
              </Text>
            </BottomSheetView>

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
          </BottomSheetView>

          <BottomSheetFlatList
            showsVerticalScrollIndicator={true}
            data={mockSessionRecords[selectedSessionId].slice(0, 5)}
            className="w-full px-4 mt-6 "
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <BottomSheetView className="bg-gray-100 p-4 rounded-lg mb-4 w-full flex flex-row justify-between">
                <Text className="text-lg font-bold">{item.name}</Text>
                <Text className="text-sm text-gray-800">
                  {formatTimestamp(item.timestamp)}
                </Text>
              </BottomSheetView>
            )}
          />
          <Text className="text-sm text-gray-500 mt-2 mb-4">
            {mockSessionRecords[selectedSessionId].length > 5
              ? `+${mockSessionRecords[selectedSessionId].length - 5} more`
              : ""}
          </Text>
        </BottomSheetView>
      </CustomBottomSheetModal>
    </View>
  );
};
export default Records;
