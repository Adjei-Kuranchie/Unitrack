import { useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, ScrollView, Text } from "react-native";

export default function TeacherDashboard() {
  const router = useRouter();
  const firstName = useUser().user?.fullName ?? "User";
  return (
    <ScrollView className="flex-1 bg-white px-6 pt-12">
      <Text className="text-3xl font-bold text-blue-700 mb-2">
        Welcome {firstName} 👩🏽‍🏫
      </Text>
      <Text className="text-gray-500 mb-6">
        Here’s your attendance control center
      </Text>

      <Pressable
        onPress={() => router.push("/(dashboard)/lecturers/create-code")}
        className="flex-row items-center bg-blue-600 px-6 py-4 rounded-2xl mb-4"
      >
        <Ionicons name="qr-code-outline" size={24} color="white" />
        <Text className="ml-3 text-white font-semibold">
          Create Attendance Code
        </Text>
      </Pressable>

      <Pressable
        onPress={() => router.push("/(dashboard)/lecturers/active-codes")}
        className="flex-row items-center bg-yellow-500 px-6 py-4 rounded-2xl mb-4"
      >
        <Ionicons name="time-outline" size={24} color="white" />
        <Text className="ml-3 text-white font-semibold">View Active Codes</Text>
      </Pressable>

      <Pressable
        onPress={() => router.push("/(dashboard)/lecturers/records")}
        className="flex-row items-center bg-green-600 px-6 py-4 rounded-2xl"
      >
        <Ionicons name="document-text-outline" size={24} color="white" />
        <Text className="ml-3 text-white font-semibold">
          View Attendance Records
        </Text>
      </Pressable>
    </ScrollView>
  );
}
