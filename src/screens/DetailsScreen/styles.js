import { StyleSheet } from "react-native";
import { Metric, Colors } from "../../themes";

export const styles = StyleSheet.create({
  topSafeAreaView: { flex: 0, backgroundColor: Colors.primary },
  bottomSafeAreaView: { flex: 0, backgroundColor: "white" },
  container: {
    flex: 1,
    backgroundColor: "white"
  }
});
