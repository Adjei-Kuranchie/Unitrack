import CustomBottomSheetModal from "@/components/CustomBottomSheetModal";
import { icons } from "@/constants";
import {
  BottomSheetFlatList,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import React, { useCallback, useRef, useState } from "react";
import {
  Button,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
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

const Records = () => {
  const modalRef = useRef<BottomSheetModal>(null);
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(
    null
  );

  const openSessionSlide = (sessionId: keyof typeof mockSessionRecords) => {
    setSelectedSessionId(sessionId);
    handlePresentModalPress();
  };

  const closeSessionSlide = () => {
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
      <Button
        onPress={handlePresentModalPress}
        title="Present Modal"
        color="black"
      />
      <CustomBottomSheetModal ref={modalRef} title="Awesome 🔥">
        <BottomSheetView style={styles.contentContainer}>
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
          </View>
          <BottomSheetFlatList
            data={mockSessionRecords[1]}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <BottomSheetView className="bg-gray-100 p-4 rounded-lg mb-4">
                <Text className="text-lg font-bold">{item.name}</Text>
                <Text className="text-sm text-gray-600">
                  Marked Attendance At:
                </Text>
                <Text className="text-sm text-gray-800">
                  {formatTimestamp(item.timestamp)}
                </Text>
              </BottomSheetView>
            )}
          />
        </BottomSheetView>
      </CustomBottomSheetModal>
    </View>
  );
};
export default Records;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});
