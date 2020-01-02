import {StyleSheet} from 'react-native';
import {Metric, Colors} from '../../themes';

export const styles = StyleSheet.create({
  newLessonSubjectTextInput: {
    height: 45,
    borderColor: Colors.lessonLightText,
    borderWidth: 1,
    color: Colors.lessonLightText,
    fontSize: 14,
    paddingHorizontal: 10,
    marginTop: 10,
    borderRadius: 5,
    fontFamily: 'Heebo-Regular',
  },
  newLessonModalDayText: {
    fontSize: 8,
    marginLeft: 3,
    color: Colors.dayText,
    fontFamily: 'Heebo-Regular',
  },
  newLessonModalDaySelected: {
    width: 20,
    height: 20,
    backgroundColor: Colors.primary,
    borderRadius: 10,
  },
  newLessonModalDayUnselected: {
    width: 20,
    height: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.lessonLightText,
  },
  newLessonModalDayContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  descriptionInputStyle: {
    borderRadius: 10,
    height: 60,
    borderWidth: 1,
    borderColor: Colors.lessonLightText,
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginTop: 10,
  },
});
