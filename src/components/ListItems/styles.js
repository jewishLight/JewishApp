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
  commentItemTimeText: {width: 60, alignItems: 'flex-end'},
  commentItemNameText: {fontSize: 18},
  commentItemDescText: {fontSize: 14, color: Colors.lessonLightText},
  searchHistoryItemContainer: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.separator,
  },
});
