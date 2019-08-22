import { StyleSheet } from "react-native";
import { Metric, Colors } from "../../themes";

export const styles = StyleSheet.create({
  eventCardContainer: {
    width: 320,
    height: 200,
    borderRadius: 15,
    backgroundColor: Colors.primary,
    borderWidth: 1,
    borderColor: Colors.primary,
    paddingHorizontal: 10,
    paddingTop: 10,
    justifyContent: "space-around"
  },
  torahImageContainer: {
    width: 80,
    height: 80,
    backgroundColor: Colors.torah,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10
  },
  torahImage: { width: 46, height: 46, resizeMode: "contain" },
  eventUserContainer: { height: 80, flexDirection: "row", marginRight: 5 },
  eventUserAvatar: { width: 40, height: 40, resizeMode: "contain" },
  eventUserDetail: { height: 40, justifyContent: "center", marginLeft: 5 },
  eventUserRole: { color: "white", fontSize: 12 },
  eventUserName: { color: "white", fontSize: 14 },
  eventUserLine: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row"
  },
  eventTitle: { color: "white", fontSize: 18 },
  eventTimeView: { marginTop: 10, flexDirection: "row" },
  eventTimeText: { color: Colors.eventCardText, fontSize: 13, marginLeft: 3 }
});
