import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function AuthLayout() {
  return (
    <Tabs
      initialRouteName="sign-up-copy"
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen
        name="sign-up-copy"
        options={{
          title: "Sign Up",
          tabBarIcon: ({
            focused,
            color,
          }: {
            focused: boolean;
            color: string;
          }) => (
            <Ionicons
              name={focused ? "person-add-sharp" : "person-add-outline"}
              color={color}
              size={24}
            />
          ),

          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="sign-in-copy"
        options={{
          title: "Sign In",
          tabBarIcon: ({
            focused,
            color,
          }: {
            focused: boolean;
            color: string;
          }) => (
            <Ionicons
              name={focused ? "log-in" : "log-in-outline"}
              color={color}
              size={24}
            />
          ),

          headerShown: false,
        }}
      />
    </Tabs>
  );
}
