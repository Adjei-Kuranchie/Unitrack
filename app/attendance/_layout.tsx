import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="confirm" options={{ headerShown: false }} />
      <Stack.Screen name="scan" options={{ headerShown: false }} />
    </Stack>
  );
}
