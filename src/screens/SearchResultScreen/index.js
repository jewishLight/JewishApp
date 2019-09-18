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
import {SearchResultItem, SearchResultHeader, Loading} from '../../components';
import {Colors} from '../../themes';
import {Strings} from '../../utils';
import {en, he} from '../../constants';
import {ApiRequest} from '../../utils';

class SearchResultScreen extends Component {
  static navigationOptions = {
    gesturesEnabled: Platform.OS !== 'ios',
  };

  constructor(props) {
    super(props);
    this.state = {
      language: '',
      showLoading: false,
      searchResult: [],
      searchBody: null,
    };
  }

  _keyExtractor = (item, index) => item._id;

  componentDidMount(): void {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    this.setState({
      language: this.props.appSettings.language,
      searchResult: this.props.navigation.state.params.searchResult,
      searchBody: this.props.navigation.state.params.searchBody,
    });
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
        <SearchResultItem
          onPress={() => {
            this.props.navigation.navigate('Syna');
          }}
          item={item}
        />
        <View style={styles.verticalSpacing} />
      </View>
    );
  };

  onFilter = () => {
    this.props.navigation.navigate('Filter', {onFiltered: this.onFiltered});
  };

  onFiltered = (name, startTime, endTime, max_radius, sortBy) => {
    debugger;
    this.startLoading();
    let body = {
      name,
      startTime,
      endTime,
      min_radius: 0,
      max_radius: `${max_radius}`,
      lon: 35.21702,
      lat: 31.771959,
      sortBy,
    };
    ApiRequest('search/synagogues', body, 'POST')
      .then(response => {
        this.closeLoading();
        this.setState({searchResult: response, searchBody: body});
      })
      .catch(error => {
        this.closeLoading();
      });
  };

  onMapView = () => {
    this.props.navigation.navigate('MapView');
  };

  startLoading = () => {
    this.setState({showLoading: true});
  };
  closeLoading = () => {
    this.setState({showLoading: false});
  };

  render() {
    const {language, searchResult, searchBody, showLoading} = this.state;
    const isEnglish = language === Strings.ENGLISH;
    return (
      <SafeAreaView style={styles.searchContainer}>
        <View style={{flex: 1}}>
          <SearchResultHeader
            onBack={this.onBack}
            isEnglish={isEnglish}
            onMapView={this.onMapView}
          />
          <View style={{flex: 1, paddingHorizontal: 10}}>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
                paddingHorizontal: 10,
              }}>
              <View style={[styles.searchResultTopTagView, {marginLeft: 0}]}>
                <Image
                  source={require('../../assets/icon_search_result_clock.png')}
                  style={{width: 15, height: 15, resizeMode: 'contain'}}
                />
                <Text
                  style={{color: Colors.primary, fontSize: 12, marginLeft: 5}}>
                  {searchBody &&
                    `${searchBody.startTime} - ${searchBody.endTime}`}
                </Text>
              </View>
              <View style={styles.searchResultTopTagView}>
                <Image
                  source={require('../../assets/icon_search_result_radius.png')}
                  style={{width: 14, height: 15, resizeMode: 'contain'}}
                />
                <Text
                  style={{color: Colors.primary, fontSize: 12, marginLeft: 5}}>
                  {`${searchBody && searchBody.max_radius}`} km{' '}
                  {isEnglish ? en.searchResult.radius : he.searchResult.radius}
                </Text>
              </View>
              <View style={styles.searchResultTopTagView}>
                <Image
                  source={require('../../assets/icon_search_result_syna.png')}
                  style={{width: 17, height: 17, resizeMode: 'contain'}}
                />
                <Text
                  style={{color: Colors.primary, fontSize: 12, marginLeft: 5}}>
                  {isEnglish ? en.modal.synagogue : he.modal.synagogue}
                </Text>
              </View>
            </View>
            <View style={{padding: 10, paddingBottom: 40}}>
              <FlatList
                data={searchResult}
                renderItem={this.renderSearchHistories}
                showsHorizontalScrollIndicator={false}
                keyExtractor={this._keyExtractor}
              />
            </View>
          </View>
          <View style={styles.newSearchResultButtonContainer}>
            <View style={styles.searchResultFilterButton}>
              <Text style={styles.searchResultsText}>
                {searchResult.length}{' '}
                {isEnglish
                  ? en.searchResult.resultsFound
                  : he.searchResult.resultsFound}
              </Text>
              <TouchableOpacity
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                  backgroundColor: Colors.primary,
                  height: 50,
                  borderRadius: 25,
                  paddingHorizontal: 40,
                }}
                onPress={this.onFilter}>
                <Image
                  source={require('../../assets/icon_search_result_filter.png')}
                  style={styles.newSearchImage}
                />
                <Text style={{fontSize: 18, color: 'white', marginLeft: 5}}>
                  {isEnglish ? en.modal.filter : he.modal.filter}
                </Text>
              </TouchableOpacity>
            </View>
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
)(SearchResultScreen);
