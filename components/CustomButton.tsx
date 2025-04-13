import { ButtonProps } from "@/types/type";
import { Text, TouchableOpacity } from "react-native";

const customButton = ({
  onPress,
  title,
  bgVariant = "primary",
  textVariant = "default",
  IconLeft,
  IconRight,
  className,
  ...props
}: ButtonProps) => (
  <TouchableOpacity
    onPress={onPress}
    className={`w-full p-3 rounded-full flex flex-row items-center justify-center shadow-md shadow-neutral-400/70 ${getBGVariantStyle(bgVariant)} ${className} {...props}`}
  >
    {IconLeft && <IconLeft />}
    <Text
      className={`text-lg font-JakartaBold ${getTextVariantStyle(textVariant)}`}
    >
      {title}
    </Text>
    {IconRight && <IconRight />}
  </TouchableOpacity>
);

function getBGVariantStyle(variant: ButtonProps["bgVariant"]) {
  switch (variant) {
    case "secondary":
      return "bg-gray-500";
    case "success":
      return "bg-green-500";
    case "danger":
      return "bg-red-500";
    case "outline":
      return "bg-transparent border-neutral-300 border-[0.5px]";
    default:
      return "bg-[#0286ff]"; // Default to primary
  }
}

function getTextVariantStyle(variant: ButtonProps["textVariant"]) {
  switch (variant) {
    case "primary":
      return "text-black";
    case "secondary":
      return "text-gray-100";
    case "success":
      return "text-green-100";
    case "danger":
      return "text-red-100";
    default:
      return "text-white"; // Default to primary
  }
}

export default customButton;
