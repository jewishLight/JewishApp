import {StyleSheet} from 'react-native';
import {Metric, Colors} from '../../themes';

export const styles = StyleSheet.create({
  commentItemContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingBottom: 10,
    paddingHorizontal: 15,
  },
  commentItemAvatar: {width: 55, height: 55, resizeMode: 'contain'},
  commentItemTimeText: {
    width: 60,
    alignItems: 'flex-end',
    fontFamily: 'Heebo-Regular',
  },
  commentItemNameText: {fontSize: 18, fontFamily: 'Heebo-Regular'},
  commentItemDescText: {
    fontSize: 14,
    color: Colors.lessonLightText,
    fontFamily: 'Heebo-Regular',
  },
  searchHistoryItemContainer: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.separator,
  },
  searchResultItemContainer: {
    padding: 5,
    height: 120,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.separator,
    flexDirection: 'row',
  },
  searchResultItemImageContainer: {
    width: 110,
    height: 110,
    borderRadius: 5,
    backgroundColor: '#E6E5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
