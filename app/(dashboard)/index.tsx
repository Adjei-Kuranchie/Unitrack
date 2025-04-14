import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Text, View } from "react-native";

// This would normally come from auth context or API
const mockUser = {
  role: "teacher", // change to 'student' to test student flow
};

export default function DashboardIndex() {
  const router = useRouter();

  useEffect(() => {
    if (mockUser.role === "teacher") {
      router.replace("/(dashboard)/(lecturers)/index");
    } else {
      router.replace("/(dashboard)/(students)/index");
    }
  }, []);

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-2xl font-bold">Teacher Dashboard</Text>
      <Text className="text-gray-500 mt-2">
        Manage your attendance sessions
      </Text>
    </View>
  );
}
