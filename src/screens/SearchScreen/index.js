import React, {Component} from 'react';
import {SafeAreaView} from 'react-navigation';
import {
  View,
  Platform,
  BackHandler,
  TouchableOpacity,
  Text,
  Image,
  FlatList,
} from 'react-native';
import {styles} from './styles';
import {appSettingsSelector} from '../../redux/selector';
import {AppSettingsActions} from '../../redux';
import {connect} from 'react-redux';
import {SearchHistoryItem, SearchHeader} from '../../components';
import {Colors} from '../../themes';

const tempSearchHistoryData = [
  {
    id: 1,
  },
  {
    id: 2,
  },
  {
    id: 3,
  },
  {
    id: 4,
  },
  {
    id: 5,
  },
  {
    id: 6,
  },
];

class SearchScreen extends Component {
  static navigationOptions = {
    gesturesEnabled: Platform.OS !== 'ios',
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  _keyExtractor = (item, index) => item.id.toString();

  componentDidMount(): void {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount(): void {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton = () => {
    this.onBack();
    return true;
  };

  onBack = () => {
    this.props.navigation.goBack();
  };

  renderSearchHistories = ({item, index}) => {
    return (
      <View style={styles.searchHistoryRowView}>
        <SearchHistoryItem onPress={() => {}} />
        <View style={styles.verticalSpacing} />
      </View>
    );
  };

  render() {
    return (
      <SafeAreaView style={styles.searchContainer}>
        <SearchHeader onBack={this.onBack} />
        <View style={styles.searchHistoryContainer}>
          <FlatList
            data={tempSearchHistoryData}
            renderItem={this.renderSearchHistories}
            showsHorizontalScrollIndicator={false}
            keyExtractor={this._keyExtractor}
          />
        </View>
        <View style={styles.newSearchButtonContainer}>
          <TouchableOpacity style={styles.newSearchButton}>
            <Image
              source={require('../../assets/icon_search_newicon.png')}
              style={styles.newSearchImage}
            />
            <Text style={styles.newSearchText}>New Search</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  ...appSettingsSelector(state),
});
const mapDispatchToProps = dispatch => ({
  updateDeviceStatus: isDeviceTurnON =>
    dispatch(AppSettingsActions.updateDeviceStatus(isDeviceTurnON)),
  updateLightStatus: isLightTurnON =>
    dispatch(AppSettingsActions.updateLightStatus(isLightTurnON)),
  updateLanguage: language =>
    dispatch(AppSettingsActions.updateLanguage(language)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchScreen);
