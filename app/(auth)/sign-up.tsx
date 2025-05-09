import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import { icons, images } from "@/constants";
import { fetchAPI } from "@/lib/fetch";
import { useSignUp } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ReactNativeModal } from "react-native-modal";

const SignUp = () => {
  const router = useRouter();
  const { isLoaded, signUp, setActive } = useSignUp();
  const [ShowSuccessModal, setShowSuccessModal] = useState(false);
  const [role, setRole] = useState<"student" | "lecturer">("student");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: role,
  });
  const [verification, setVerification] = useState({
    state: "default",
    error: "",
    code: "",
  });

  const onSignUpPress = async () => {
    if (!isLoaded) return;

    try {
      await signUp.create({
        firstName: String(form.name),
        emailAddress: form.email,
        password: form.password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setVerification({ ...verification, state: "pending" });
    } catch (err) {
      Alert.alert(
        "Error",
        (err as any)?.errors?.[0]?.longMessage || "An unknown error occurred"
      );
    }
  };

  const onVerifyPress = async () => {
    if (!isLoaded) return;

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      });

      if (signUpAttempt.status === "complete") {
        await fetchAPI("/(api)/user", {
          method: "POST",
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            clerkId: signUpAttempt.createdUserId,
            role: form.role,
          }),
        });

        await setActive({ session: signUpAttempt.createdSessionId });
        setVerification({ ...verification, state: "success" });
      } else {
        setVerification({
          ...verification,
          state: "failed",
          error: "Verification failed",
        });
      }
    } catch (err) {
      setVerification({
        ...verification,
        state: "failed",
        error:
          (err as any)?.errors?.[0]?.longMessage || "An unknown error occurred",
      });
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="flex flex-row items-center justify-between h-[100px] mx-4">
          <Text className="text-black text-4xl font-JakartaBold align-middle">
            Sign Up
          </Text>
        </View>
        <View className="p-5 ">
          <InputField
            label={role === "student" ? "Registration No" : "Name"}
            placeholder={
              role === "student"
                ? "Enter your registration number"
                : "Enter your name"
            }
            icon={icons.person}
            value={form.name}
            onChangeText={(value) => setForm({ ...form, name: value })}
          />
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

          <View className="flex flex-row justify-center gap-2 mt-4 overflow-hidden bg-white">
            <TouchableOpacity
              onPress={() => setRole("student")}
              className={`px-4 py-2 rounded-lg border-none ${
                role === "student" ? "bg-primary-500" : "bg-gray-200"
              }`}
            >
              <Text
                className={` ${
                  role === "student" ? "text-white" : "text-gray-800"
                }`}
              >
                Student
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setRole("lecturer")}
              className={`px-4 py-2 rounded-lg border-none ${
                role === "lecturer" ? "bg-primary-500" : "bg-gray-200"
              }`}
            >
              <Text
                className={`${
                  role === "lecturer" ? "text-white" : "text-gray-800"
                }`}
              >
                Lecturer
              </Text>
            </TouchableOpacity>
          </View>

          <View className="flex flex-col items-center gap-4">
            <CustomButton
              title="Sign Up"
              onPress={onSignUpPress}
              className={`mt-6`}
            />
          </View>
          <TouchableOpacity className="mt-6 items-center">
            <Text className=" text-xl font-JakartaSemiBold">
              Already have an account?{" "}
              <Text
                className="text-primary-500"
                onPress={() => router.push("/(auth)/sign-in")}
              >
                Log in
              </Text>
            </Text>
          </TouchableOpacity>
        </View>

        <ReactNativeModal
          isVisible={verification.state === "pending"}
          onModalHide={() => {
            if (verification.state === "success") setShowSuccessModal(true);
          }}
        >
          <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
            <Text className="text-2xl font-JakartaExtraBold mb-2">
              Verification
            </Text>
            <Text className="font-Jakarta mb-5">
              We have sent a verification code to {form.email}
            </Text>

            <InputField
              label="Code"
              icon={icons.lock}
              placeholder="12345"
              value={verification.code}
              keyboardType="numeric"
              onChangeText={(value) =>
                setVerification({ ...verification, code: value })
              }
            />
            {verification.error && (
              <Text className="text-red-500 text-sm mt-2">
                {verification.error}
              </Text>
            )}

            <CustomButton
              title="Verify Email"
              onPress={onVerifyPress}
              className={`mt-6`}
            />
          </View>
        </ReactNativeModal>

        <ReactNativeModal isVisible={ShowSuccessModal}>
          <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
            <Image
              source={images.check}
              className="w-[110px] h-[110px] mx-auto my-5"
            />
            <Text className="text-2xl font-JakartaBold text-center">
              Verified
            </Text>
            <Text className="text-base text-gray-400 font-Jakarta text-center mt-2">
              You have successfully verified your account.
            </Text>
            <CustomButton
              title="Browse Home"
              className="mt-5"
              onPress={() => {
                setShowSuccessModal(false);
                if (role === "student") {
                  router.push("/(dashboard)/students/attendance");
                } else {
                  router.push("/(dashboard)/lecturers/home");
                }
              }}
            />
          </View>
        </ReactNativeModal>
      </View>
    </ScrollView>
  );
};

export default SignUp;
