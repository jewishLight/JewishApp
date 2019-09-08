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
import {Strings} from '../../utils';
import {en, he} from '../../constants';

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
    this.state = {
      language: Strings.ENGLISH,
    };
  }

  _keyExtractor = (item, index) => item.id.toString();

  componentDidMount(): void {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    this.setState({language: this.props.appSettings.language});
  }

  componentWillUnmount(): void {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  async componentWillReceiveProps(nextProps, nextContext) {
    const originLanguage = this.props.appSettings.language;
    const newLanguage = nextProps.appSettings.language;
    if (originLanguage !== newLanguage) {
      this.setState({language: newLanguage});
    }
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
        <SearchHistoryItem
          onPress={() => {
            this.props.navigation.navigate('SearchResult');
          }}
          isEnglish={this.props.appSettings.language === Strings.ENGLISH}
        />
        <View style={styles.verticalSpacing} />
      </View>
    );
  };

  onNewSearch = () => {
    this.props.navigation.navigate('SearchResult');
  };

  render() {
    const {language} = this.state;
    const isEnglish = language === Strings.ENGLISH;
    return (
      <SafeAreaView style={styles.searchContainer}>
        <SearchHeader onBack={this.onBack} isEnglish={isEnglish} />
        <View style={styles.searchHistoryContainer}>
          <FlatList
            data={tempSearchHistoryData}
            renderItem={this.renderSearchHistories}
            showsHorizontalScrollIndicator={false}
            keyExtractor={this._keyExtractor}
          />
        </View>
        <View style={styles.newSearchButtonContainer}>
          <TouchableOpacity
            style={styles.newSearchButton}
            onPress={this.onNewSearch}>
            <Image
              source={require('../../assets/icon_search_newicon.png')}
              style={styles.newSearchImage}
            />
            <Text style={styles.newSearchText}>
              {isEnglish
                ? en.searchHistory.newSearch
                : he.searchHistory.newSearch}
            </Text>
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
