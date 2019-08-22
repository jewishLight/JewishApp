import { StyleSheet } from "react-native";
import { Metric } from "../../themes";

export const styles = StyleSheet.create({
  homeHeaderContainer: {
    flexDirection: "row",
    width: Metric.width,
    height: Metric.headerHeight,
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 15,
    paddingRight: 10,
    paddingTop: 5,
    borderBottomColor: "gray",
    borderBottomWidth: 0.5
  },
  homeHeaderLeftView: {},
  iconMenuTouch: {
    padding: 10
  },
  iconMenuImg: {
    width: 25,
    height: 25,
    resizeMode: "contain"
  },
  homeHeaderLocationView: {
    flexDirection: "row",
    height: 15,
    alignItems: "center"
  },
  homeHeaderLocationNameView: {
    flexDirection: "row",
    height: 20,
    alignItems: "center"
  },
  homeHeaderLocationText: {
    marginLeft: 5
  },
  homeHeaderLocationImage: { width: 10, height: 13, resizeMode: "contain" },
  homeHeaderLocationNameImage: {
    marginLeft: 5,
    marginTop: 2,
    width: 10,
    height: 7,
    resizeMode: "contain"
  }
});
