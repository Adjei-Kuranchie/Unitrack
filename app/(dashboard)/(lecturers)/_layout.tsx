import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="active-codes" options={{ headerShown: false }} />
      <Stack.Screen name="create-code" options={{ headerShown: false }} />
      <Stack.Screen name="records" options={{ headerShown: false }} />
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
}
