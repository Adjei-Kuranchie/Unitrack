import { InputFieldProps } from "@/types/type";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const InputField = ({
  label,
  labelStyle,
  icon,
  secureTextEntry = false,
  containerStyle,
  inputStyle,
  iconStyle,
  className,
  ...props
}: InputFieldProps) => {
  return (
    <KeyboardAvoidingView
      className="flex flex-row items-center border-b border-gray-300 mb-5"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="my-2 w-full">
          <Text className={`text-lg font-JakartaSemiBold mb-3 ${labelStyle}`}>
            {label}
          </Text>
          <View
            className={`pl-2 flex flex-row justify-start items-center relative bg-neutral-100 rounded-full border border-neutral-100 ${containerStyle}`}
          >
            {icon && <Image source={icon} className={`w-6 h-6 ${iconStyle}`} />}
            <TextInput
              className={`rounded-full p-4 font-JakartaSemiBold flex-1 text-[15px]`}
              secureTextEntry={secureTextEntry}
              {...props}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default InputField;
