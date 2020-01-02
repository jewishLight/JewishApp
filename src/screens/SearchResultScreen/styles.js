import {StyleSheet} from 'react-native';
import {Colors, Metric} from '../../themes';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  searchContainer: {
    flex: 1,
    backgroundColor: Colors.searchPageBackColor,
  },
  newSearchText: {
    color: 'white',
    fontSize: 18,
    marginLeft: 10,
    fontFamily: 'Heebo-Regular',
  },
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
  newSearchResultButtonContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  searchHistoryContainer: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  verticalSpacing: {height: 10},
  searchResultTopTagView: {
    paddingHorizontal: 15,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#E6E5F5',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: 10,
  },
  searchResultFilterButton: {
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
  searchResultsText: {
    color: Colors.searchResultText,
    fontSize: 17,
    fontFamily: 'Heebo-Regular',
  },
});
