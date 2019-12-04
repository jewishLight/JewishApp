import React, {Component} from 'react';
import {SafeAreaView, ScrollView} from 'react-navigation';
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
      headerItems: [],
    };
  }

  _keyExtractor = (item, index) => item._id;

  componentDidMount(): void {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    const searchBody = this.props.navigation.state.params.searchBody;
    const language = this.props.appSettings.language;
    const isEnglish = language === Strings.ENGLISH;
    this.setState({
      language,
      searchResult: this.props.navigation.state.params.searchResult,
      searchBody,
    });
    console.info(this.props.navigation.state.params.searchResult);
    let headerItems = [];
    headerItems.push({
      _id: 'header_0',
      view: (
        <View style={[styles.searchResultTopTagView, {marginLeft: 0}]}>
          <Text
            numberOfLines={1}
            style={{color: Colors.primary, fontSize: 12, marginLeft: 5}}>
            {searchBody && `${searchBody.address}`}
          </Text>
        </View>
      ),
    });
    headerItems.push({
      _id: 'header_1',
      view: (
        <View style={[styles.searchResultTopTagView]}>
          <Image
            source={require('../../assets/icon_search_result_clock.png')}
            style={{width: 15, height: 15, resizeMode: 'contain'}}
          />
          <Text
            numberOfLines={1}
            style={{color: Colors.primary, fontSize: 12, marginLeft: 5}}>
            {searchBody && `${searchBody.startTime} - ${searchBody.endTime}`}
          </Text>
        </View>
      ),
    });
    headerItems.push({
      _id: 'header_2',
      view: (
        <View style={styles.searchResultTopTagView}>
          <Image
            source={require('../../assets/icon_search_result_radius.png')}
            style={{width: 14, height: 15, resizeMode: 'contain'}}
          />
          <Text
            numberOfLines={1}
            style={{color: Colors.primary, fontSize: 12, marginLeft: 5}}>
            {`${searchBody &&
              parseInt(searchBody.max_radius) -
                parseInt(searchBody.min_radius)}`}{' '}
            km {isEnglish ? en.searchResult.radius : he.searchResult.radius}
          </Text>
        </View>
      ),
    });
    headerItems.push({
      _id: 'header_3',
      view: (
        <View style={styles.searchResultTopTagView}>
          <Image
            source={require('../../assets/icon_search_result_syna.png')}
            style={{width: 17, height: 17, resizeMode: 'contain'}}
          />
          <Text
            numberOfLines={1}
            style={{color: Colors.primary, fontSize: 12, marginLeft: 5}}>
            {isEnglish ? en.modal.synagogue : he.modal.synagogue}
          </Text>
        </View>
      ),
    });
    this.setState({headerItems});
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
            this.startLoading();
            ApiRequest(`synagogue/view?id=${item._id}`)
              .then(response => {
                this.closeLoading();
                this.props.navigation.navigate('Syna', {
                  synaData: response,
                  comments: response.comments,
                });
              })
              .catch(error => {
                this.closeLoading();
              });
          }}
          item={item}
        />
        <View style={styles.verticalSpacing} />
      </View>
    );
  };

  renderTop = ({item, index}) => {
    return item.view;
  };

  onFilter = () => {
    this.props.navigation.navigate('Filter', {onFiltered: this.onFiltered});
  };

  onFiltered = (
    name,
    startTime,
    endTime,
    max_radius,
    sortBy,
    lat,
    lng,
    address,
  ) => {
    this.startLoading();
    let body = {
      name,
      startTime,
      endTime,
      min_radius: 0,
      max_radius: `${max_radius}`,
      lon: lng,
      lat: lat,
      sortBy,
      address,
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
    this.props.navigation.navigate('MapView', {
      results: this.state.searchResult,
    });
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
                marginTop: 10,
                paddingHorizontal: 10,
                height: 34,
              }}>
              <FlatList
                data={this.state.headerItems}
                renderItem={this.renderTop}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                keyExtractor={this._keyExtractor}
              />
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
