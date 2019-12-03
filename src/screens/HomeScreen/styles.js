import {StyleSheet} from 'react-native';
import {Metric} from '../../themes';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  rowView: {
    flexDirection: 'row',
  },
  searchHistoryRowView: {},
  buttonsLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: 'gray',
  },
  addSearchLine: {
    flexDirection: 'row',
  },
  horizontalSpacing: {width: 10},
  aroundEventsView: {
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    paddingVertical: 15,
  },
  aroundEventsTopView: {
    width: Metric.width,
    flexDirection: 'row',
    paddingHorizontal: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 10,
  },
  eventsText: {
    fontSize: 17,
  },
  viewAllText: {
    fontSize: 17,
    color: 'gray',
  },
  spacingHorizontal: {paddingHorizontal: 15},
});
