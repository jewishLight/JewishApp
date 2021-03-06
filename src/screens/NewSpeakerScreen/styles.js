import {StyleSheet} from 'react-native';
import {Metric, Colors} from '../../themes';

export const styles = StyleSheet.create({
  addModalContainer: {
    margin: 0,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  addModalView: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  addModalDropdownView: {
    position: 'absolute',
    backgroundColor: 'black',
    width: Metric.width,
    height: Metric.height,
    opacity: 0.7,
  },
  addModalMainView: {
    backgroundColor: 'white',
    height: 280,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    paddingVertical: 20,
  },
  addSynBtn: {
    width: '100%',
    height: 50,
    borderRadius: 25,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addNewLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    paddingHorizontal: 15,
  },
  addNewText: {fontSize: 18},
  addModalSeparator: {
    marginTop: 10,
    height: 1,
    backgroundColor: Colors.modalSeparator,
  },
  addLessonBtn: {
    width: '100%',
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lessonText: {color: 'white', fontSize: 18},
  synText: {color: Colors.primary, fontSize: 18},
  addBtnsContainer: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
    justifyContent: 'space-around',
  },
  filterModalMainView: {
    backgroundColor: 'white',
    height: 330,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    paddingVertical: 20,
  },
  newLessonModalMainView: {
    backgroundColor: 'white',
    height: Metric.height - 180,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    paddingVertical: 20,
  },
  alphaModalMainView: {
    backgroundColor: 'white',
    height: Metric.height - 80,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    paddingVertical: 20,
  },
  newLessonModalContainer: {
    paddingHorizontal: 15,
  },
  alphaListModalContainer: {
    flex: 1,
    paddingHorizontal: 15,
  },
  newLessonModalTextInputTitle: {
    fontSize: 14,
    marginTop: 10,
  },
  newLessonModalPickerTitle: {
    fontSize: 14,
    marginTop: 20,
  },
  newLessonModalPickerTitleRed: {
    fontSize: 14,
    marginTop: 20,
    color: Colors.redText,
  },
  flexFull: {
    flex: 1,
  },
  verticalSpacing: {
    height: 15,
  },
  verticalSpacingSmall: {
    height: 10,
  },
  verticalSpacingBig: {
    height: 60,
  },
  publishLessonContainer: {
    flex: 1,
    height: 50,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    marginTop: 40,
  },
  bigBtnText: {color: 'white', fontSize: 20},
  alphabetSidebar: {
    position: 'absolute',
    backgroundColor: 'transparent',
    top: 0,
    bottom: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderCircle: {
    width: 50,
    height: 50,
    backgroundColor: '#ccc',
    borderRadius: 25,
    marginRight: 10,
    marginLeft: 5,
  },
  name: {
    fontSize: 15,
  },
  cell: {
    height: 95,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
