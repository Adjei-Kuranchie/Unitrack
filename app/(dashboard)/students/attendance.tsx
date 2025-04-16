import { useUser } from "@clerk/clerk-expo";
import { FlatList, Text, View } from "react-native";

const mockAttendance = [
  { id: "1", subject: "Math", date: "2025-04-14", status: "Present" },
  { id: "2", subject: "English", date: "2025-04-13", status: "Absent" },
  { id: "3", subject: "Science", date: "2025-04-12", status: "Present" },
];

export default function StudentAttendance() {
  const { user } = useUser();
  return (
    <View className="flex-1 bg-white px-4 pt-10">
      <Text className="text-2xl font-bold text-center mb-4">
        {user ?? "My"} Attendance
      </Text>
      <FlatList
        data={mockAttendance}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="flex-row justify-between py-3 border-b border-gray-200">
            <View>
              <Text className="font-semibold">{item.subject}</Text>
              <Text className="text-sm text-gray-500">{item.date}</Text>
            </View>
            <Text
              className={
                item.status === "Present" ? "text-green-600" : "text-red-500"
              }
            >
              {item.status}
            </Text>
          </View>
        )}
      />
    </View>
  );
}
