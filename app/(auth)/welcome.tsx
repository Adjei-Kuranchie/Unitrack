import CustomButton from "@/components/CustomButton";
import { onboarding } from "@/constants";
import { router } from "expo-router";
import { useRef, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";

const Onboarding = () => {
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const isLastSlide = activeIndex === onboarding.length - 1;

  return (
    <SafeAreaView className="flex h-full items-center justify-between bg-white py-3">
      <TouchableOpacity
        onPress={() => {
          router.replace("/(auth)/sign-up");
        }}
        className="w-full flex items-end justify-end p-5"
      >
        <Text className="text-black text-md font-JakartaBold">Skip</Text>
      </TouchableOpacity>
      <Swiper
        ref={swiperRef}
        loop={false}
        dot={
          <View className="w-[32px] h-[4px] mx-1 bg-[#e2e8f0] rounded-full" />
        }
        activeDot={
          <View className="w-[32px] h-[4px] mx-1 bg-[#0286ff] rounded-full" />
        }
        onIndexChanged={(index) => setActiveIndex(index)}
      >
        {onboarding.map((item, i) => (
          <View key={i} className="flex items-center justify-center p-5">
            <Image
              source={item.image}
              className="w-full h-[400px]"
              resizeMode="contain"
            />
            <View className="flex flex-row items-center justify-center mt-16">
              <Text className="text-black text-3xl font-bold mx-12 text-center">
                {item.title}
              </Text>
            </View>
            <Text className="text-xl font-JakartaSemiBold text-center text-[#858585] mt-8 mx-24">
              {item.description}
            </Text>
          </View>
        ))}
      </Swiper>
      <CustomButton
        title={isLastSlide ? "Get Started" : "Next"}
        onPress={() => {
          if (isLastSlide) {
            router.replace("/(auth)/sign-up");
          } else {
            swiperRef.current?.scrollBy(1);
          }
        }}
        className={"w-11/12 mt-12 h-16"}
      />
    </SafeAreaView>
  );
};
export default Onboarding;
