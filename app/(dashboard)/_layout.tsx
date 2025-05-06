import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="lecturers" options={{ headerShown: false }} />
      <Stack.Screen name="students" options={{ headerShown: false }} />
    </Stack>
  );
}
