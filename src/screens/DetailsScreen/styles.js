import {StyleSheet} from 'react-native';
import {Metric, Colors} from '../../themes';

export const styles = StyleSheet.create({
  topSafeAreaView: {flex: 0, backgroundColor: Colors.primary},
  bottomSafeAreaView: {flex: 1, backgroundColor: 'white'},
  container: {
    backgroundColor: 'white',
  },
  detailUserContainer: {
    flex: 1,
    height: 80,
    flexDirection: 'row',
    marginTop: 10,
  },
  detailUserAvatar: {width: 40, height: 40, resizeMode: 'contain'},
  userDetail: {
    height: 40,
    justifyContent: 'center',
    marginLeft: 5,
  },
  detailBasicInfo: {marginTop: 10, alignItems: 'center'},
  detailTitleText: {
    color: 'black',
    fontSize: 20,
    textAlign: 'center',
    marginHorizontal: 15,
  },
  detailBasic: {flexDirection: 'row', paddingHorizontal: 15},
  detailClockLocation: {flexDirection: 'row', paddingHorizontal: 15},
  userRole: {color: 'black', fontSize: 12, opacity: 0.35},
  userName: {color: 'black', fontSize: 14, opacity: 0.67},
  detailClockImage: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  detailLocationImage: {
    width: 18,
    height: 24,
    resizeMode: 'contain',
  },
  detailClockContainer: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailLocationContainer: {
    flex: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailClockText: {marginLeft: 5},
  detailLocationText: {marginLeft: 5},
  detailDescContainer: {marginTop: 30, paddingHorizontal: 13},
  detailDescText: {color: Colors.lessonLightText, fontSize: 18},
  separator: {
    backgroundColor: Colors.separator,
    height: 1,
    width: Metric.width,
    marginTop: 50,
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
  },
  paddingSeparator: {
    backgroundColor: Colors.separator,
    height: 1,
    width: Metric.width - 30,
    marginLeft: 15,
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
  },
  commentsNumberText: {
    color: 'black',
    fontSize: 13,
    opacity: 0.5,
  },
  iconDetailLikedImage: {width: 80, height: 36, resizeMode: 'contain'},
  commentInputText: {height: 50, fontSize: 14},
  commentSendView: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 20,
    top: 9,
  },
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
  flexFull: {flex: 1},
});
