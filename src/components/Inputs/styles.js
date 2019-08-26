import { StyleSheet } from "react-native";
import { Metric, Colors } from "../../themes";

export const styles = StyleSheet.create({
  newLessonSubjectTextInput: {
    height: 45,
    borderColor: Colors.lessonLightText,
    borderWidth: 1,
    color: Colors.lessonLightText,
    fontSize: 14,
    paddingHorizontal: 10,
    marginTop: 10,
    borderRadius: 5
  },
  newLessonModalDayText: { fontSize: 11, marginLeft: 3, color: Colors.dayText },
  newLessonModalDaySelected: {
    width: 20,
    height: 20,
    backgroundColor: Colors.primary,
    borderRadius: 10
  },
  newLessonModalDayUnselected: {
    width: 20,
    height: 20,
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.lessonLightText
  },
  newLessonModalDayContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  }
});
