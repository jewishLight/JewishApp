import { StyleSheet } from "react-native";
import { Metric, Colors } from "../../themes";

export const styles = StyleSheet.create({
  addBtnContainer: {
    width: 110,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderWidth: 1,
    borderColor: Colors.primary
  },
  likeBtnContainer: {
    width: 90,
    height: 34,
    borderRadius: 17,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderWidth: 1,
    borderColor: Colors.primary
  },
  commentBtnContainer: {
    width: 90,
    height: 34,
    borderRadius: 17,
    justifyContent: "center",
    alignItems: "center"
  },
  commentBtnContainerBack: {
    width: 90,
    height: 34,
    borderRadius: 17,
    backgroundColor: Colors.primary,
    opacity: 0.07,
    position: "absolute"
  },
  searchIcon: {
    width: 13,
    height: 13,
    resizeMode: "contain"
  },
  addIcon: {
    width: 14,
    height: 12,
    resizeMode: "contain"
  },
  likeIcon: {
    width: 14,
    height: 12,
    resizeMode: "contain"
  },
  addText: {
    color: "white",
    marginLeft: 3
  },
  likeText: {
    color: "white",
    marginLeft: 3,
    marginTop: 3
  },
  commentText: {
    color: Colors.primary
  },
  searchBtnContainer: {
    width: 110,
    height: 40,
    borderRadius: 20,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderWidth: 1,
    borderColor: Colors.primary
  },
  searchText: {
    color: Colors.primary,
    marginLeft: 3
  },
  filterBtnContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.secondary,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.secondary
  },
  filterIcon: {
    width: 15,
    height: 14,
    resizeMode: "contain"
  }
});
