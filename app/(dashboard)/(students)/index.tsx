import { Text, View } from "react-native";

export default function StudentDashboard() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-2xl font-bold">Student Dashboard</Text>
      <Text className="text-gray-500 mt-2">
        Welcome to your student dashboard
      </Text>
    </View>
  );
}
