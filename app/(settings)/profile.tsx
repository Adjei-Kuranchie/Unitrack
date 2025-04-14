import { useState } from "react";
import { Pressable, Switch, Text, TextInput, View } from "react-native";

export default function ProfileScreen() {
  const [name, setName] = useState("John Doe");
  const [regId, setRegId] = useState("PS/CSC/21/0174");
  const [notifications, setNotifications] = useState(true);

  const handleSave = () => {
    // Save logic here
    alert("Profile saved!");
  };

  return (
    <View className="flex-1 bg-gray-100 px-5 justify-center">
      <Text className="text-2xl font-bold mb-6 text-center">
        Profile Settings
      </Text>

      <Text className="mb-1">Name</Text>
      <TextInput
        className="border border-gray-300 bg-white rounded-lg px-4 py-2 mb-4"
        value={name}
        onChangeText={setName}
      />

      <Text className="mb-1">Reg. Id</Text>
      <TextInput
        className="border border-gray-300 bg-white rounded-lg px-4 py-2 mb-4"
        value={regId}
        onChangeText={setRegId}
        keyboardType="default"
      />

      <View className="flex-row items-center justify-between mb-6">
        <Text>Notifications</Text>
        <Switch value={notifications} onValueChange={setNotifications} />
      </View>

      <Pressable onPress={handleSave} className="bg-blue-500 rounded-xl py-3">
        <Text className="text-white text-center font-semibold">
          Save Changes
        </Text>
      </Pressable>
    </View>
  );
}
