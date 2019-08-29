import {StyleSheet, Platform} from 'react-native';
import {Metric, Colors} from '../../themes';

export const styles = StyleSheet.create({
  homeHeaderContainer: {
    flexDirection: 'row',
    width: Metric.width,
    height: Metric.headerHeight,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 10,
    paddingTop: Platform.OS === 'ios' ? 5 : 30,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
  },
  homeHeaderLeftView: {},
  iconMenuTouch: {
    marginLeft: 10,
    padding: 10,
  },
  iconMenuImg: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
  homeHeaderLocationView: {
    flexDirection: 'row',
    height: 15,
    alignItems: 'center',
  },
  homeHeaderLocationNameView: {
    flexDirection: 'row',
    height: 20,
    alignItems: 'center',
  },
  homeHeaderLocationText: {
    marginLeft: 5,
  },
  homeHeaderLocationImage: {width: 10, height: 13, resizeMode: 'contain'},
  homeHeaderLocationNameImage: {
    marginLeft: 5,
    marginTop: 2,
    width: 10,
    height: 7,
    resizeMode: 'contain',
  },
  detailsHeaderContainer: {
    flexDirection: 'row',
    width: Metric.width,
    height: Metric.headerHeight,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 10,
    paddingTop: Platform.OS === 'ios' ? 5 : 30,
    backgroundColor: Colors.primary,
  },
  detailsHeaderBackContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailsHeaderBackContainerOpacity: {
    width: 40,
    height: 40,
    borderRadius: 20,
    position: 'absolute',
    backgroundColor: '#EFEFF4',
    opacity: 0.1,
  },
  detailsHeaderBackIcon: {
    width: 36,
    height: 36,
    resizeMode: 'contain',
  },
  detailsHeaderFavoriteIcon: {
    width: 21,
    height: 20,
    resizeMode: 'contain',
  },
  detailsHeaderSendIcon: {
    width: 18,
    height: 17,
    resizeMode: 'contain',
  },
  detailsHeaderRightButtonsView: {
    flexDirection: 'row',
  },
  horizontalSpacing: {
    width: 10,
  },
  searchHeaderContainer: {
    flexDirection: 'row',
    width: Metric.width,
    height: Metric.searchHeaderHeight,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 10,
    paddingTop: Platform.OS === 'ios' ? 5 : 30,
    backgroundColor: 'white',
  },
  searchHeaderBackIcon: {
    width: 19,
    height: 15,
    resizeMode: 'contain',
  },
  searchHeaderBackContainer: {
    height: 40,
  },
  searchHeaderText: {
    fontSize: 30,
    color: Colors.searchHeaderText,
    marginTop: 5,
  },
  filterHeaderBackIcon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
  },
});
