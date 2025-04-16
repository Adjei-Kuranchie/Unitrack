/* import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="active-codes" options={{ headerShown: false }} />
      <Stack.Screen name="create-code" options={{ headerShown: false }} />
      <Stack.Screen name="records" options={{ headerShown: false }} />
    </Stack>
  );
}
*/

import { icons } from "@/constants";
import { Tabs } from "expo-router";
import { Image, ImageSourcePropType, View } from "react-native";

const TabIcon = ({
  focused,
  source,
}: {
  source: ImageSourcePropType;
  focused: boolean;
}) => {
  return (
    <View
      className={`h-12 w-12 flex-row justify-center items-center rounded-full relative top-2/3`}
    >
      <View
        className={` ${focused ? "bg-primary-500" : ""} rounded-full w-full h-full items-center justify-center`}
      >
        <Image
          source={source}
          tintColor={"white"}
          resizeMode="contain"
          className="w-7 h-7"
        />
      </View>
    </View>
  );
};

export default function TabsLayout() {
  return (
    <Tabs
      initialRouteName="home"
      screenOptions={{
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "white",
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#333333",
          borderRadius: 50,
          paddingBottom: 0, // ios only
          overflow: "hidden",
          marginHorizontal: 20,
          marginBottom: 20,
          height: 78,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          position: "absolute",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }: { focused: boolean }) => (
            <TabIcon focused={focused} source={icons.home} />
          ),
          headerShown: true,
        }}
      />
      <Tabs.Screen
        name="create-code"
        options={{
          title: "Create Code",
          tabBarIcon: ({ focused }: { focused: boolean }) => (
            <TabIcon focused={focused} source={icons.create} />
          ),
          headerShown: true,
        }}
      />
      <Tabs.Screen
        name="active-codes"
        options={{
          title: "Active Codes",
          tabBarIcon: ({ focused }: { focused: boolean }) => (
            <TabIcon focused={focused} source={icons.list} />
          ),
          headerShown: true,
        }}
      />
      <Tabs.Screen
        name="records"
        options={{
          title: "Records",
          tabBarIcon: ({ focused }: { focused: boolean }) => (
            <TabIcon focused={focused} source={icons.record} />
          ),
          headerShown: true,
        }}
      />
    </Tabs>
  );
}
