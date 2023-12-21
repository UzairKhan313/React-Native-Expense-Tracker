import { StyleSheet, View, FlatList, Button, Text } from "react-native";

export default function App() {
  return (
    <View style={styles.rootContainer}>
      <Text>Hello world</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor:"#fff",
    alignItems: "center",
    justifyContent: "center",
    color:"white"
  },
});
