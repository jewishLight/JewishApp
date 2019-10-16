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
import {SearchHistoryItem, SearchHeader, Loading} from '../../components';
import {Colors} from '../../themes';
import {Strings} from '../../utils';
import {en, he} from '../../constants';
import {ApiRequest} from '../../utils';

class SearchScreen extends Component {
  static navigationOptions = {
    gesturesEnabled: Platform.OS !== 'ios',
  };

  constructor(props) {
    super(props);
    this.state = {
      language: Strings.ENGLISH,
      showLoading: false,
      searchHistory: [],
    };
  }

  _keyExtractor = (item, index) => item._id;

  componentDidMount(): void {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    console.info(
      'search history',
      this.props.navigation.state.params.searchHistory,
    );
    this.setState({
      language: this.props.appSettings.language,
      searchHistory: this.props.navigation.state.params.searchHistory,
    });
  }

  componentWillUnmount(): void {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  startLoading = () => {
    this.setState({showLoading: true});
  };
  closeLoading = () => {
    this.setState({showLoading: false});
  };

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

  onClearSearchHistory = () => {
    this.startLoading();
    ApiRequest('search/delete', {}, 'DELETE')
      .then(response => {
        this.closeLoading();
        this.setState({searchHistory: []});
      })
      .catch(error => {
        this.closeLoading();
      });
  };

  renderSearchHistories = ({item, index}) => {
    let key = `search_key_${index}`;
    return (
      <View style={styles.searchHistoryRowView} key={key}>
        <SearchHistoryItem
          onPress={() => {
            this.onNewSearch(item);
          }}
          item={item}
          isEnglish={this.props.appSettings.language === Strings.ENGLISH}
        />
        <View style={styles.verticalSpacing} />
      </View>
    );
  };

  onNewSearch = cacheBody => {
    this.startLoading();
    let body = null;
    if (cacheBody) {
      body = cacheBody;
    } else {
      body = {
        name: '',
        startTime: '00:00',
        endTime: '23:59',
        min_radius: 0,
        max_radius: 10,
        lon: Strings.currentLongitude,
        lat: Strings.currentLatitude,
        address: Strings.currentLocationCity,
        sortBy: 'time',
      };
    }
    ApiRequest('search/synagogues', body, 'POST')
      .then(response => {
        this.closeLoading();
        this.props.navigation.navigate('SearchResult', {
          searchResult: response,
          searchBody: body,
        });
      })
      .catch(error => {
        this.closeLoading();
      });
  };

  render() {
    const {showLoading, language, searchHistory} = this.state;
    const isEnglish = language === Strings.ENGLISH;
    return (
      <SafeAreaView style={styles.searchContainer}>
        <View style={{flex: 1}}>
          <SearchHeader
            onBack={this.onBack}
            onClear={this.onClearSearchHistory}
            isEnglish={isEnglish}
          />
          <View style={styles.searchHistoryContainer}>
            <FlatList
              data={searchHistory}
              renderItem={this.renderSearchHistories}
              showsHorizontalScrollIndicator={false}
              keyExtractor={this._keyExtractor}
            />
          </View>
          <View style={styles.newSearchButtonContainer}>
            <TouchableOpacity
              style={styles.newSearchButton}
              onPress={() => {
                this.onNewSearch();
              }}>
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
        </View>
        <View
          style={{
            height: 30,
            backgroundColor: '#EDEFF1',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>
            {isEnglish
              ? en.memorial.all_over_the_app
              : he.memorial.all_over_the_app}
          </Text>
        </View>
        {showLoading && <Loading />}
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
