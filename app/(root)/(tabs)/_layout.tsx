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
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="rides"
        options={{
          title: "Rides",
          tabBarIcon: ({ focused }: { focused: boolean }) => (
            <TabIcon focused={focused} source={icons.list} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: "Chat",
          tabBarIcon: ({ focused }: { focused: boolean }) => (
            <TabIcon focused={focused} source={icons.chat} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }: { focused: boolean }) => (
            <TabIcon focused={focused} source={icons.profile} />
          ),
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
