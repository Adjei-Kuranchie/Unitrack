import { SignOutButton } from "@/components/SignOutButton";
import { generateDateFromTimestamp } from "@/lib/utils";
import { useUser } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import { FlatList, Text, View } from "react-native";

const mockAttendance = [
  { id: "1", subject: "Math", timestamp: 1744608000, status: "Present" },
  { id: "2", subject: "English", timestamp: 1744521600, status: "Absent" },
  { id: "3", subject: "Science", timestamp: 1744435200, status: "Present" },
];

export default function StudentAttendance() {
  const { user } = useUser();

  return (
    <View className="flex-1 bg-white px-5 pt-10">
      <View className="flex-row justify-between items-center mb-6">
        <Text className="text-3xl font-extrabold text-center text-primary-600">
          {`${user?.firstName}'s` || "My"} Attendance
        </Text>
        <SignOutButton />
      </View>
      <Link href={"/(dashboard)/students/mark"} asChild>
        <Text className="text-primary-500 font-JakartaMedium text-lg mb-4 text-center bg:blue-100 p-4 rounded-full shadow-sm">
          Mark
        </Text>
      </Link>

      <FlatList
        data={mockAttendance}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 30 }}
        renderItem={({ item }) => (
          <View className="mb-4 p-4 rounded-2xl bg-gray-100 shadow-sm">
            <View className="flex-row justify-between items-center">
              <View>
                <Text className="text-lg font-semibold text-gray-800">
                  {item.subject}
                </Text>
                <Text className="text-sm text-gray-500">
                  {generateDateFromTimestamp(item.timestamp)}
                </Text>
              </View>
              <View
                className={`px-3 py-1 rounded-full ${
                  item.status === "Present" ? "bg-green-100" : "bg-red-100"
                }`}
              >
                <Text
                  className={`font-medium ${
                    item.status === "Present"
                      ? "text-green-700"
                      : "text-red-600"
                  }`}
                >
                  {item.status}
                </Text>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
}
