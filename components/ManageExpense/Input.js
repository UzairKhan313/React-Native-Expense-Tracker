import { TextInput } from "react-native";
import { View, Text } from "react-native";

export default function Input({ label, textInputConfig }) {
  return (
    <View>
      <Text>{label}</Text>
      <TextInput {...textInputConfig} />
    </View>
  );
}
