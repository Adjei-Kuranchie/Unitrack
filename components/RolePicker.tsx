import { Picker } from "@react-native-picker/picker";
import { useRef, useState } from "react";

export default function RolePicker() {
  const pickerRef = useRef<Picker<string> | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState();

  function open() {
    if (pickerRef.current) {
      pickerRef.current?.focus();
    }
  }

  function close() {
    pickerRef?.current?.blur();
  }

  return (
    <Picker
      ref={pickerRef}
      selectedValue={selectedLanguage}
      onValueChange={(itemValue, itemIndex) => setSelectedLanguage(itemValue)}
      onFocus={open}
      onBlur={close}
    >
      <Picker.Item label="Java" value="java" />
      <Picker.Item label="JavaScript" value="js" />
    </Picker>
  );
}
