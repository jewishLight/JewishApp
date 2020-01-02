import {StyleSheet, Platform} from 'react-native';
import {Metric, Colors} from '../../themes';

export const styles = StyleSheet.create({
  wrapper: {},
  slide1: {
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  separator: {height: 1, backgroundColor: Colors.separator},
  commentSendImage: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
  },
  commentInputView: {
    height: 50,
    paddingHorizontal: 15,
    backgroundColor: Colors.commentInputBackColor,
  },
  paddingSeparator: {
    backgroundColor: Colors.separator,
    height: 1,
    width: Metric.width - 30,
    marginLeft: 15,
  },
  commentInputText: {
    height: 50,
    fontSize: 14,
    fontFamily: 'Heebo-Regular',
  },
  commentSendView: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 20,
    top: 9,
  },
  commentsView: {
    paddingVertical: 15,
  },
  commentsTopView: {
    width: Metric.width,
    flexDirection: 'row',
    paddingHorizontal: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  commentsText: {
    color: 'black',
    fontSize: 17,
    fontFamily: 'Heebo-Regular',
  },
  commentsNumberText: {
    color: 'black',
    fontSize: 13,
    opacity: 0.5,
    fontFamily: 'Heebo-Regular',
  },
  likeBtnContainer: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 20,
    justifyContent: 'space-between',
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  horizontalSpacing: {
    width: 10,
  },
  likesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likesText: {
    color: Colors.lessonLightText,
    fontSize: 15,
    marginRight: 5,
    fontFamily: 'Heebo-Regular',
  },
});
