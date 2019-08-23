import { StyleSheet } from "react-native";
import { Metric, Colors } from "../../themes";

export const styles = StyleSheet.create({
  addModalContainer: {
    margin: 0
  },
  addModalView: {
    flex: 1,
    justifyContent: "flex-end"
  },
  addModalDropdownView: {
    position: "absolute",
    backgroundColor: "black",
    width: Metric.width,
    height: Metric.height,
    opacity: 0.7
  },
  addModalMainView: {
    backgroundColor: "white",
    height: 280,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    borderColor: "rgba(0, 0, 0, 0.1)",
    paddingVertical: 20
  },
  addSynBtn: {
    width: "100%",
    height: 50,
    borderRadius: 25,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center"
  },
  addNewLine: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 50,
    paddingHorizontal: 15
  },
  addNewText: { fontSize: 18 },
  addModalSeparator: {
    marginTop: 10,
    height: 1,
    backgroundColor: Colors.modalSeparator
  },
  addLessonBtn: {
    width: "100%",
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center"
  },
  lessonText: { color: "white", fontSize: 18 },
  synText: { color: Colors.primary, fontSize: 18 },
  addBtnsContainer: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
    justifyContent: "space-around"
  },
  filterModalMainView: {
    backgroundColor: "white",
    height: 330,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    borderColor: "rgba(0, 0, 0, 0.1)",
    paddingVertical: 20
  },
  newLessonModalMainView: {
    backgroundColor: "white",
    height: Metric.height - 50,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    borderColor: "rgba(0, 0, 0, 0.1)",
    paddingVertical: 20
  },
  newLessonModalContainer: {
    paddingHorizontal: 15
  },
  newLessonModalTextInputTitle: {
    fontSize: 14,
    marginTop: 10
  }
});
