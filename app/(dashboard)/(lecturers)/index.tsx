import { Text, View } from "react-native";

export default function TeacherDashboard() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-2xl font-bold">Teacher Dashboard</Text>
      <Text className="text-gray-500 mt-2">
        Manage your attendance sessions
      </Text>
    </View>
  );
}
