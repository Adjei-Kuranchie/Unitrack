import { useAuth } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import "react-native-get-random-values";

export default function Home() {
  const { isSignedIn, isLoaded } = useAuth();

  // Show loading indicator while auth state is loading
  if (!isLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (isSignedIn) {
    // return <Redirect href={"/(root)/(tabs)/home"} />;
    return <Redirect href={"/(dashboard)/lecturers/home"} />;
    // return <Redirect href={"/(dashboard)/students/attendance"} />;
  } else {
    return <Redirect href={"/(auth)/sign-up-copy"} />;
  }
}
