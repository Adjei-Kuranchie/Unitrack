import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import OAuth from "@/components/OAuth";
import { icons, images } from "@/constants";
import { useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Image, ScrollView, Text, View } from "react-native";

const SignIn = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  // Handle the submission of the sign-in form
  const onSignInPress = async () => {
    if (!isLoaded) return;

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: form.email,
        password: form.password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/(root)/(tabs)/home");
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
        <View className="relative w-full h-[300px]">
          <Image source={images.signUpCar} className="z-0 w-full h-[300px]" />
          <Text className="text-black text-2xl absolute bottom-5 left-5 font-JakartaBold">
            Welcome 👋
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

          <CustomButton
            title="Sign In"
            onPress={onSignInPress}
            className={`mt-6`}
          />

          {/*Oauth*/}
          <OAuth />

          <Link
            href={`/sign-up`}
            className="text-lg text-center mt-10 text-general-200"
          >
            <Text>Don't have an account? </Text>
            <Text className="text-primary-500">Sign Up</Text>
          </Link>
        </View>

        {/* Verification Modal */}
      </View>
    </ScrollView>
  );
};
export default SignIn;
