import {StyleSheet} from 'react-native';
import {Colors, Metric} from '../../themes';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  searchContainer: {flex: 1, backgroundColor: Colors.searchPageBackColor},
  newSearchText: {color: 'white', fontSize: 18, marginLeft: 10},
  newSearchImage: {width: 16, height: 16, resizeMode: 'contain'},
  newSearchButton: {
    flexDirection: 'row',
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    borderRadius: 25,
  },
  newSearchButtonContainer: {paddingHorizontal: 30, paddingVertical: 20},
  searchHistoryContainer: {flex: 1, paddingTop: 10, paddingHorizontal: 10},
  verticalSpacing: {height: 10},
});
