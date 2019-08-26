import { StyleSheet } from "react-native";
import { Colors, Metric } from "./../../themes";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20
  },
  logoContainer: {
    height: 80,
    marginTop: 50,
    flexDirection: "row",
    alignItems: "center"
  },
  imgLogo: {
    width: 40,
    height: 40,
    resizeMode: "contain"
  },
  logoImageView: {
    width: 55,
    height: 50,
    justifyContent: "center",
    alignItems: "center"
  },
  logoText: { fontSize: 30, color: "#9EA3BA" },
  itemContainer: {
    flexDirection: "row",
    height: 50,
    alignItems: "center"
  },
  listContainer: {
    marginTop: 30
  },
  iconMenu: {
    height: 50,
    resizeMode: "contain"
  },
  bottomContainer: {
    marginBottom: 50
  },
  separator: { height: 1, backgroundColor: Colors.separator },
  logoutText: { fontSize: 18 }
});
