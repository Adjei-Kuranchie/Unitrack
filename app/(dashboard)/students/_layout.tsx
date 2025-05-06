import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="attendance" options={{ headerShown: false }} />
      <Stack.Screen
        name="mark"
        options={{ title: "Mark Attendance", headerShown: true }}
      />
    </Stack>
  );
}
