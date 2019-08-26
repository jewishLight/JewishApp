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
  itemContainer: {
    flexDirection: "row",
    height: 50,
    alignItems: "center"
  },
  whiteText: {
    color: Colors.white
  },
  listContainer: {
    marginTop: 30
  },
  iconMenu: {
    height: 50,
    resizeMode: "contain"
  },
  primaryBoldText: {
    ...Metric.font.h1,
    fontWeight: "500",
    color: Colors.primary
  },
  imgLogoText: {
    height: Metric.topNavBarHeight - 35,
    width: 110,
    resizeMode: "contain"
  },
  iconClose: {
    width: 15,
    height: 15,
    resizeMode: "contain"
  },
  bottomContainer: {
    marginBottom: 50
  },
  closeContainer: {
    position: "absolute",
    right: 10,
    top: 5,
    width: 50,
    height: 40,
    alignItems: "center",
    justifyContent: "center"
  }
});
