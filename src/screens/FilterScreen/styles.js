import {StyleSheet} from 'react-native';
import {Colors, Metric} from '../../themes';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  filterContainer: {
    flex: 1,
    backgroundColor: Colors.searchPageBackColor,
  },
  verticalSpacing: {
    height: 10,
  },
  filterButtonContainer: {
    paddingHorizontal: 50,
    paddingVertical: 20,
    paddingBottom: 50,
  },
  filterButton: {
    flexDirection: 'row',
    backgroundColor: 'white',
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: Colors.searchResultButtonBorder,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 15,
  },
  filterText: {
    color: Colors.searchResultText,
    fontSize: 17,
  },
});
