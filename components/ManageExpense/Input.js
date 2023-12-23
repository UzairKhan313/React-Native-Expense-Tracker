import { StyleSheet, TextInput } from "react-native";
import { View, Text } from "react-native";
import { GlobalStyles } from "../../constants/styles";

export default function Input({ label, style, inValid, textInputConfig }) {
  const inputStyle = [styles.input];

  if (textInputConfig && textInputConfig.multiline) {
    inputStyle.push(styles.input, styles.inputMutltiLine);
  }
  if (inValid) {
    inputStyle.push(styles.inValidInput);
  }
  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={[styles.label, inValid && styles.inValidLable]}>
        {label}
      </Text>
      <TextInput style={inputStyle} {...textInputConfig} />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: { marginHorizontal: 4, marginVertical: 8 },
  label: {
    fontSize: 12,
    color: GlobalStyles.colors.primary100,
    marginBottom: 4,
  },
  input: {
    backgroundColor: GlobalStyles.colors.primary100,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
    color: GlobalStyles.colors.primary700,
  },
  inputMutltiLine: {
    minHeight: 100,
    textAlignVertical: "top",
    marginBottom: 24,
  },
  inValidLable: {
    color: GlobalStyles.colors.error500,
  },
  inValidInput: {
    backgroundColor: GlobalStyles.colors.error50,
  },
});
