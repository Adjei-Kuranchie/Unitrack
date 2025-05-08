import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack initialRouteName="sign-up" screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="sign-up"
        options={{
          title: "Sign Up",

          headerShown: false,
        }}
      />
      <Stack.Screen
        name="sign-in"
        options={{
          title: "Sign In",
          headerShown: false,
        }}
      />
    </Stack>
  );
}
