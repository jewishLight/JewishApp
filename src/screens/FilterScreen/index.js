import React, {Component} from 'react';
import {SafeAreaView} from 'react-navigation';
import {
  View,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  I18nManager,
  NativeModules,
  BackHandler,
  Image,
  FlatList,
} from 'react-native';
import {styles} from './styles';
import {appSettingsSelector} from '../../redux/selector';
import {AppSettingsActions} from '../../redux';
import {connect} from 'react-redux';
import {FilterHeader, NormalInput} from '../../components';
import {Strings, LocalStorage} from '../../utils';
import {Metric, Colors} from '../../themes';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import CustomMarker from './CustomMarker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {en, he} from '../../constants';

const timeRangeValue = [
  '00:00',
  '01:00',
  '02:00',
  '03:00',
  '04:00',
  '05:00',
  '06:00',
  '07:00',
  '08:00',
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
  '19:00',
  '20:00',
  '21:00',
  '22:00',
  '23:00',
  '23:59',
];

const radiusValue_en = [
  '1km radius',
  '2km radius',
  '3km radius',
  '4km radius',
  '5km radius',
  '6km radius',
  '7km radius',
  '8km radius',
  '9km radius',
  '10km radius',
];

const radiusValue_he = [
  '1 ק"מ',
  '2 ק"מ',
  '3 ק"מ',
  '4 ק"מ',
  '5 ק"מ',
  '6 ק"מ',
  '7 ק"מ',
  '8 ק"מ',
  '9 ק"מ',
  '10 ק"מ',
];

class FilterScreen extends Component {
  static navigationOptions = {
    gesturesEnabled: Platform.OS !== 'ios',
  };

  constructor(props) {
    super(props);
    this.state = {
      timeRangeSliderValue: [0, 24],
      radiusSliderValue: [0],
      radiusSliderChanging: false,
      language: Strings.ENGLISH,
    };
  }

  componentDidMount(): void {
    this.setState({language: this.props.appSettings.language});
  }

  onBack = () => {
    this.props.navigation.goBack();
  };

  multiSliderValuesChange = values => {
    this.setState({
      timeRangeSliderValue: values,
    });
  };

  sliderOneValuesChangeStart = () => {
    this.setState({
      radiusSliderChanging: true,
    });
  };

  sliderOneValuesChange = values => {
    let newValues = [0];
    newValues[0] = values[0];
    this.setState({
      radiusSliderValue: newValues,
    });
  };

  sliderOneValuesChangeFinish = () => {
    this.setState({
      radiusSliderChanging: false,
    });
  };

  async componentWillReceiveProps(nextProps, nextContext) {
    const originLanguage = this.props.appSettings.language;
    const newLanguage = nextProps.appSettings.language;
    if (originLanguage !== newLanguage) {
      this.setState({language: newLanguage});
    }
  }

  render():
    | React.ReactElement<any>
    | string
    | number
    | {}
    | React.ReactNodeArray
    | React.ReactPortal
    | boolean
    | null
    | undefined {
    const {timeRangeSliderValue, radiusSliderValue} = this.state;
    const {language} = this.state;
    const isEnglish = language === Strings.ENGLISH;
    return (
      <SafeAreaView style={styles.filterContainer}>
        <FilterHeader onBack={this.onBack} isEnglish={isEnglish} />
        <View style={{flex: 1}}>
          <ScrollView>
            <View style={{paddingHorizontal: 20}}>
              <View style={styles.verticalSpacing} />
              <NormalInput
                placeholder={
                  isEnglish
                    ? en.filter.searchBySpeakerName
                    : he.filter.searchBySpeakerName
                }
                direction={
                  this.props.appSettings.language === Strings.ENGLISH
                    ? 'ltr'
                    : 'rtl'
                }
              />
              <View style={styles.verticalSpacing} />
              <NormalInput
                placeholder={
                  isEnglish
                    ? en.filter.searchByLocation
                    : he.filter.searchByLocation
                }
                direction={
                  this.props.appSettings.language === Strings.ENGLISH
                    ? 'ltr'
                    : 'rtl'
                }
              />
              <Text style={{fontSize: 20, color: '#3F4046', marginTop: 20}}>
                {isEnglish ? en.filter.sortResults : he.filter.sortResults}
              </Text>
              <View style={{height: 50, flexDirection: 'row', marginTop: 10}}>
                <TouchableOpacity
                  style={{
                    flex: 1,
                    height: 50,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 5,
                    backgroundColor: '#E6E5F5',
                  }}>
                  <Image
                    source={require('../../assets/icon_filter_nearby.png')}
                    style={{width: 16, height: 20, resizeMode: 'contain'}}
                  />
                  <Text style={{color: '#3264EC', fontSize: 16, marginLeft: 5}}>
                    {isEnglish ? en.filter.nearBy : he.filter.nearBy}
                  </Text>
                </TouchableOpacity>
                <View style={{width: 20}} />
                <TouchableOpacity
                  style={{
                    flex: 1,
                    height: 50,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 5,
                    backgroundColor: '#FEF5DF',
                  }}>
                  <Image
                    source={require('../../assets/icon_filter_clock.png')}
                    style={{width: 19, height: 19, resizeMode: 'contain'}}
                  />
                  <Text style={{color: '#FEB412', fontSize: 16, marginLeft: 5}}>
                    {isEnglish ? en.filter.time : he.filter.time}
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 20,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: 20, color: '#3F4046'}}>
                  {isEnglish ? en.filter.timeRange : he.filter.timeRange}
                </Text>
                <TouchableOpacity style={{paddingLeft: 15, paddingVertical: 5}}>
                  <Text style={{fontSize: 16, color: '#4542B8'}}>
                    {isEnglish ? en.filter.clear : he.filter.clear}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{marginTop: 10}}>
                <MultiSlider
                  values={[timeRangeSliderValue[0], timeRangeSliderValue[1]]}
                  selectedStyle={{backgroundColor: Colors.primary, height: 3}}
                  unselectedStyle={{
                    backgroundColor: Colors.separator,
                    height: 3,
                  }}
                  sliderLength={Metric.width - 40}
                  onValuesChange={this.multiSliderValuesChange}
                  min={0}
                  max={24}
                  step={1}
                  allowOverlap
                  isMarkersSeparated={true}
                  snapped
                  customMarkerLeft={() => {
                    return (
                      <CustomMarker
                        value={timeRangeValue[timeRangeSliderValue[0]]}
                      />
                    );
                  }}
                  customMarkerRight={() => {
                    return (
                      <CustomMarker
                        value={timeRangeValue[timeRangeSliderValue[1]]}
                      />
                    );
                  }}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text
                  style={{fontSize: 10, color: '#3F4046', marginBottom: 30}}>
                  00:00
                </Text>
                <Text
                  style={{fontSize: 10, color: '#3F4046', marginBottom: 30}}>
                  23:59
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 20,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: 20, color: '#3F4046'}}>
                  {isEnglish ? en.searchResult.radius : he.searchResult.radius}
                </Text>
                <TouchableOpacity style={{paddingLeft: 15, paddingVertical: 5}}>
                  <Text style={{fontSize: 16, color: '#4542B8'}}>
                    {isEnglish ? en.filter.clear : he.filter.clear}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{marginTop: 10}}>
                <MultiSlider
                  values={radiusSliderValue}
                  onValuesChangeStart={this.sliderOneValuesChangeStart}
                  onValuesChange={this.sliderOneValuesChange}
                  onValuesChangeFinish={this.sliderOneValuesChangeFinish}
                  selectedStyle={{backgroundColor: Colors.primary, height: 3}}
                  unselectedStyle={{
                    backgroundColor: Colors.separator,
                    height: 3,
                  }}
                  sliderLength={Metric.width - 40}
                  min={0}
                  max={9}
                  step={1}
                  allowOverlap
                  snapped
                  customMarker={() => {
                    return (
                      <CustomMarker
                        value={
                          isEnglish
                            ? radiusValue_en[radiusSliderValue[0]]
                            : radiusValue_he[radiusSliderValue[0]]
                        }
                      />
                    );
                  }}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text
                  style={{fontSize: 10, color: '#3F4046', marginBottom: 30}}>
                  1k
                </Text>
                <Text
                  style={{fontSize: 10, color: '#3F4046', marginBottom: 30}}>
                  10k
                </Text>
              </View>
              <Text style={{fontSize: 20, color: '#3F4046', marginTop: 20}}>
                {isEnglish
                  ? en.filter.searchingTypes
                  : he.filter.searchingTypes}
              </Text>
              <View style={{height: 60, marginTop: 10, flexDirection: 'row'}}>
                <TouchableOpacity
                  style={{
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: 'row',
                    paddingHorizontal: 10,
                    flex: 1,
                    height: 50,
                    borderColor: Colors.separator,
                    borderWidth: 1,
                    borderRadius: 5,
                  }}>
                  <Text style={{color: Colors.separator}}>
                    {isEnglish ? en.modal.synagogue : he.modal.synagogue}
                  </Text>
                  <View
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 10,
                      borderColor: Colors.separator,
                      borderWidth: 1,
                    }}
                  />
                </TouchableOpacity>
                <View style={{width: 10}} />
                <TouchableOpacity
                  style={{
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: 'row',
                    paddingHorizontal: 10,
                    flex: 1,
                    height: 50,
                    borderColor: Colors.primary,
                    borderWidth: 1,
                    borderRadius: 5,
                  }}>
                  <Text style={{color: Colors.primary}}>
                    {isEnglish ? en.modal.speaker : he.modal.speaker}
                  </Text>
                  <View
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 10,
                      backgroundColor: Colors.primary,
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.filterButtonContainer}>
              <View style={styles.filterButton}>
                <TouchableOpacity
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={styles.filterText}>
                    {isEnglish ? en.filter.reset : he.filter.reset}
                  </Text>
                </TouchableOpacity>
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
                  onPress={() => {
                    this.props.navigation.goBack();
                  }}>
                  <Text style={{fontSize: 18, color: 'white', marginLeft: 5}}>
                    {isEnglish ? en.modal.filter : he.modal.filter}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
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
)(FilterScreen);