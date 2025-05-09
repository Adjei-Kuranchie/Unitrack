import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import { icons } from "@/constants";
import { fetchAPI } from "@/lib/fetch";
import { useSignIn } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";

const SignIn = () => {
  const { signIn, setActive, isLoaded } = useSignIn();

  const [form, setForm] = useState({ email: "", password: "" });

  const router = useRouter();

  const onSignInPress = async () => {
    if (!isLoaded) return;

    try {
      const signInAttempt = await signIn.create({
        identifier: form.email,
        password: form.password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        const {
          data: { role },
        } = await fetchAPI(
          `/(api)/user?email=${encodeURIComponent(form.email)}`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
            },
          }
        );

        console.log(role);

        if (role === "lecturer") {
          router.replace("/lecturers/home");
        } else {
          router.replace("/students/attendance");
        }
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      Alert.alert(
        "Error",
        (err as any)?.errors?.[0]?.longMessage || "An unknown error occurred"
      );
    }
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="flex flex-row items-center justify-between h-[100px] mx-4">
          <Text className="text-black text-4xl font-JakartaBold align-middle">
            Log In
          </Text>
        </View>
        <View className="p-5">
          <InputField
            label={"Email"}
            placeholder="Enter your email"
            icon={icons.email}
            value={form.email}
            onChangeText={(value) => setForm({ ...form, email: value })}
          />
          <InputField
            label={"Password"}
            placeholder="Enter your password"
            icon={icons.eyecross}
            secureTextEntry={true}
            value={form.password}
            onChangeText={(value) => setForm({ ...form, password: value })}
          />

          <View className="flex flex-col items-center gap-4">
            <CustomButton
              title="Log In"
              onPress={onSignInPress}
              className={`mt-6`}
            />
          </View>
          <TouchableOpacity className="mt-6 items-center">
            <Text className=" text-xl font-JakartaSemiBold">
              Don't have an account?{" "}
              <Text
                className="text-primary-500"
                onPress={() => router.push("/(auth)/sign-up")}
              >
                Sign up
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignIn;
