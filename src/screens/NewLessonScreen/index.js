import {styles} from './styles';
import {
  BackHandler,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
  Alert,
  Image,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {en, he} from '../../constants';
import {AddModalCloseButton, Loading} from '../../components';
import {
  DescriptionInput,
  NormalInput,
  SpeakerPicker,
  SynMinTimes,
} from '../../components';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {Metric, Colors} from '../../themes';
import React, {Component} from 'react';
import {appSettingsSelector} from '../../redux/selector';
import {AppSettingsActions} from '../../redux';
import {connect} from 'react-redux';
import {ApiRequest, Strings} from '../../utils';
import {SafeAreaView} from 'react-navigation';
import MapView, {Callout, Marker, ProviderPropType} from 'react-native-maps';
import {GoogleAutoComplete} from 'react-native-google-autocomplete';
import LocationItem from './locationItem';
import {CustomPicker} from 'react-native-custom-picker';

class NewLessonScreen extends Component {
  constructor(props) {
    super(props);
    const {lessonData} = this.props.navigation.state.params;
    const speakers = this.props.navigation.state.params.speakers;
    const speakerPickerArray = [];
    speakers.map(item => {
      if (item.name && item._id) {
        speakerPickerArray.push({
          label: item.name,
          value: item._id,
          about: item.about,
          avatar: item.avatar,
        });
      }
    });

    const speaker =
      lessonData &&
      lessonData.speaker &&
      speakerPickerArray.find(item => item.value === lessonData.speaker._id);

    this.state = {
      modalVisible: false,
      subject: '',
      speakers: [],
      selectedSpeaker:
        lessonData && lessonData.speaker && lessonData.speaker._id,
      speaker: speaker,
      lat:
        lessonData && lessonData.location && lessonData.location.coordinates[1],
      lng:
        lessonData && lessonData.location && lessonData.location.coordinates[0],
      city: '',
      note: '',
      contactName: '',
      phoneNumber: '',
      mon: false,
      tue: false,
      wed: false,
      thu: false,
      fri: false,
      sat: false,
      sun: false,
      datetime: new Date(),
      selectedAudience: '',
      language: '',
      addNewSpeakerState: false,
      showLoading: false,
      newSpeakerName: '',
      newSpeakerAvatar: '',
      newSpeakerAbout: '',
      address: (lessonData && lessonData.address) || '',
      marker: {
        longitude: Strings.currentLongitude,
        latitude: Strings.currentLatitude,
      },
    };
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    let language = this.props.appSettings.language;
    this.setState({language});

    let speakers = this.props.navigation.state.params.speakers;
    let speakerPickerArray = [];
    speakers.map(item => {
      if (item.name && item._id) {
        speakerPickerArray.push({
          label: item.name,
          value: item._id,
          about: item.about,
          avatar: item.avatar,
        });
      }
    });

    const {lessonData} = this.props.navigation.state.params;
    // const {
    //   lessonSubject,
    //   address,
    //   contact_name,
    //   contact_number,
    //   notes,
    //   location,
    //   audience,
    //   time,
    // } = lessonData;
    const audienceValue = this.checkAudience();
    // const selectedSpeaker =
    //   lessonData &&
    //   lessonData.speaker &&
    //   speakerPickerArray.find(item => item.value === lessonData.speaker._id);
    // console.log('didmount selectedSpeaker', selectedSpeaker);

    this.setState({
      speakers: speakerPickerArray,
      subject: (lessonData && lessonData.lessonSubject) || '',
      address: (lessonData && lessonData.address) || '',
      contactName: (lessonData && lessonData.contact_name) || '',
      phoneNumber: (lessonData && lessonData.contact_number) || '',
      note: (lessonData && lessonData.notes) || '',
      marker: {
        longitude:
          (lessonData &&
            lessonData.location &&
            lessonData.location.coordinates[0]) ||
          Strings.currentLongitude,
        latitude:
          (lessonData &&
            lessonData.location &&
            lessonData.location.coordinates[1]) ||
          Strings.currentLatitude,
      },
      selectedAudience: lessonData && lessonData.audience,
      datetime: (lessonData && lessonData.time) || null,
      // selectedSpeaker: selectedSpeaker,
      audienceValue,
    });
  }

  componentWillUnmount(): void {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton = () => {
    this.props.navigation.goBack();
    return true;
  };

  async componentWillReceiveProps(nextProps, nextContext) {
    const originLanguage = this.props.appSettings.language;
    const newLanguage = nextProps.appSettings.language;
    if (originLanguage !== newLanguage) {
      this.setState({language: newLanguage});
    }
  }

  hide = () => {
    this.props.navigation.goBack();
  };

  onChangeSpeaker = value => {
    this.setState({selectedSpeaker: value});
  };

  onChangeSubject = text => {
    this.setState({subject: text});
  };

  setTime = datetime => {
    console.log('dateTime new lesson', datetime);
    this.setState({datetime});
  };

  newSpeaker = speakerPickerArray => {
    this.setState({speakers: speakerPickerArray});
  };

  addSpeaker = () => {
    this.props.navigation.navigate('NewSpeaker', {newSpeaker: this.newSpeaker});
  };

  onPoiClick = e => {
    const poi = e.nativeEvent;
    this.setState({
      poi,
      city: poi.name,
      lat: poi.coordinate.latitude,
      lng: poi.coordinate.longitude,
    });
    this.setState({marker: e.nativeEvent.coordinate});
  };

  onMapClick = e => {
    this.setState({
      marker: e.nativeEvent.coordinate,
      lat: e.nativeEvent.coordinate.latitude,
      lng: e.nativeEvent.coordinate.longitude,
    });
  };

  startLoading = () => {
    this.setState({showLoading: true});
  };
  closeLoading = () => {
    this.setState({showLoading: false});
  };

  updateGoogleAutocomplete = nextState => {
    this.setState({
      marker: {
        longitude: nextState.longitude,
        latitude: nextState.latitude,
      },
      address: nextState.address,
      city: nextState.justCity,
      lat: nextState.latitude,
      lng: nextState.longitude,
    });
  };

  renderField = settings => {
    const {selectedItem, defaultText, getLabel, clear} = settings;
    return (
      <View style={styles.container}>
        <View>
          {!selectedItem && (
            <Text style={[styles.text, {color: 'grey'}]}>{defaultText}</Text>
          )}
          {selectedItem && (
            <View style={styles.innerContainer}>
              <Text style={[styles.text, {color: selectedItem.color}]}>
                {getLabel(selectedItem)}
              </Text>
            </View>
          )}
        </View>
      </View>
    );
  };

  renderOption = settings => {
    const {item, getLabel} = settings;
    return (
      <View style={styles.optionContainer}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={
              item.avatar
                ? {uri: `data:image/png;base64,${item.avatar}`}
                : require('../../assets/icon_commentlist_avatar.png')
            }
            style={{width: 40, height: 40, resizeMode: 'contain'}}
          />
          <Text
            style={{
              color: item.color,
              marginLeft: 5,
              fontFamily: 'Heebo-Regular',
            }}>
            {getLabel(item)}
          </Text>
        </View>
        <View>
          <Text>{item.about}</Text>
        </View>
      </View>
    );
  };

  checkAudience = () => {
    const {lessonData} = this.props.navigation.state.params;
    const isEnglish = this.state.language === Strings.ENGLISH;
    let audienceValue = '';

    switch (lessonData && lessonData.audience) {
      case 'men':
      case 'Men':
        audienceValue = 'men';
        break;
      case 'women':
      case 'Women':
        audienceValue = 'women';
        break;
      case 'men_and_women':
      case 'Men and Women':
        audienceValue = 'men_and_women';
        break;
      default:
        audienceValue = '';
        break;
    }
    return audienceValue;
  };

  render() {
    const isEnglish = this.state.language === Strings.ENGLISH;
    const {lessonData} = this.props.navigation.state.params;
    const {audienceValue, speaker} = this.state;
    const time = (lessonData && lessonData.time) || null;
    const days = (lessonData && lessonData.days) || null;
    // const audienceValue = this.checkAudience();
    // console.log('selectedSpeaker', selectedSpeaker);

    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="always"
          style={{flex: 1}}>
          <View style={styles.addNewLine}>
            <Text style={styles.addNewText}>
              {isEnglish ? en.modal.addNewLesson : he.modal.addNewLesson}
            </Text>
            <AddModalCloseButton
              onPress={() => {
                this.hide();
              }}
              text={isEnglish ? en.modal.close : he.modal.close}
            />
          </View>
          <View style={styles.addModalSeparator} />
          <View style={styles.newLessonModalContainer}>
            <Text style={styles.newLessonModalTextInputTitle}>
              {isEnglish ? en.modal.enterSubject : he.modal.enterSubject}
            </Text>
            <NormalInput
              direction={this.props.direction}
              placeholder={
                isEnglish
                  ? en.modal.enterSubjectHere
                  : he.modal.enterSubjectHere
              }
              onChangeText={this.onChangeSubject}
              phoneNumber={false}
              value={this.state.subject}
            />
            <View
              style={{
                marginTop: 20,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={{fontSize: 14, fontFamily: 'Heebo-Regular'}}>
                {isEnglish ? en.modal.speaker : he.modal.speaker}
              </Text>
              <TouchableOpacity
                style={{justifyContent: 'center', alignItems: 'center'}}
                onPress={this.addSpeaker}>
                <Text
                  style={{
                    color: 'blue',
                    fontSize: 14,
                    fontFamily: 'Heebo-Regular',
                  }}>
                  Add New Speaker
                </Text>
              </TouchableOpacity>
            </View>

            {/*<SpeakerPicker*/}
            {/*  items={this.state.speakers}*/}
            {/*  direction={this.props.direction}*/}
            {/*  onValueChange={this.onChangeSpeaker}*/}
            {/*  placeholder={"We don't need to choose from list."}*/}
            {/*/>*/}

            <CustomPicker
              placeholder={"We don't need to choose from list."}
              options={this.state.speakers}
              getLabel={item => item.label}
              fieldTemplate={this.renderField}
              optionTemplate={this.renderOption}
              onValueChange={value => {
                // console.log('selectedSpeaker', value);
                this.setState({selectedSpeaker: value.value, speaker: value});
              }}
              defaultValue={speaker}
            />

            <Text style={styles.newLessonModalPickerTitle}>
              {isEnglish ? en.modal.location : he.modal.location}
            </Text>

            <View style={{height: 10}} />

            <GoogleAutoComplete
              apiKey="AIzaSyAKlDWP_hkcOoCrUS-hsRXn67qKW0o9n0M"
              debounce={300}>
              {({
                inputValue,
                handleTextChange,
                locationResults,
                fetchDetails,
                clearSearchs,
              }) => (
                <React.Fragment>
                  <TextInput
                    style={{
                      height: 40,
                      width: Metric.width - 30,
                      borderWidth: 1,
                      borderRadius: 5,
                      paddingHorizontal: 16,
                      borderColor: Colors.separator,
                      fontFamily: 'Heebo-Regular',
                    }}
                    value={this.state.address}
                    onChangeText={text => {
                      this.setState({address: text});
                      handleTextChange(text);
                    }}
                    placeholder="Location..."
                  />
                  <ScrollView
                    style={{maxHeight: 100}}
                    nestedScrollEnabled={true}>
                    {locationResults.map(el => (
                      <LocationItem
                        {...el}
                        key={el.id}
                        fetchDetails={fetchDetails}
                        update={this.updateGoogleAutocomplete}
                        {...{clearSearchs}}
                      />
                    ))}
                  </ScrollView>
                </React.Fragment>
              )}
            </GoogleAutoComplete>

            {/*<GooglePlacesAutocomplete*/}
            {/*  placeholder="Search"*/}
            {/*  minLength={2} // minimum length of text to search*/}
            {/*  autoFocus={false}*/}
            {/*  fetchDetails={true}*/}
            {/*  onPress={(data, details = null) => {*/}
            {/*    // 'details' is provided when fetchDetails = true*/}
            {/*    console.log(data);*/}
            {/*    console.log(details);*/}
            {/*    this.setState({*/}
            {/*      lat: details.geometry.location.lat,*/}
            {/*      lng: details.geometry.location.lng,*/}
            {/*      city: details.address_components[0].long_name,*/}
            {/*    });*/}
            {/*  }}*/}
            {/*  getDefaultValue={() => {*/}
            {/*    return ''; // text input default value*/}
            {/*  }}*/}
            {/*  query={{*/}
            {/*    // available options: https://developers.google.com/places/web-service/autocomplete*/}
            {/*    key: 'AIzaSyAKlDWP_hkcOoCrUS-hsRXn67qKW0o9n0M',*/}
            {/*    language: 'en', // language of the results*/}
            {/*    types: '(cities)', // default: 'geocode'*/}
            {/*  }}*/}
            {/*  styles={{*/}
            {/*    description: {*/}
            {/*      fontWeight: 'bold',*/}
            {/*    },*/}
            {/*    textInputContainer: {*/}
            {/*      width: Metric.width - 30,*/}
            {/*      backgroundColor: 'white',*/}
            {/*    },*/}
            {/*    textInput: {},*/}
            {/*    predefinedPlacesDescription: {*/}
            {/*      color: '#1faadb',*/}
            {/*    },*/}
            {/*  }}*/}
            {/*  currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list*/}
            {/*  currentLocationLabel="Current location"*/}
            {/*  nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch*/}
            {/*  GoogleReverseGeocodingQuery={*/}
            {/*    {*/}
            {/*      // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro*/}
            {/*    }*/}
            {/*  }*/}
            {/*  GooglePlacesSearchQuery={{*/}
            {/*    // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search*/}
            {/*    rankby: 'distance',*/}
            {/*    types: 'food',*/}
            {/*  }}*/}
            {/*  GooglePlacesDetailsQuery={{*/}
            {/*    // available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details*/}
            {/*    fields: 'formatted_address',*/}
            {/*  }}*/}
            {/*  filterReverseGeocodingByTypes={[*/}
            {/*    'locality',*/}
            {/*    'administrative_area_level_3',*/}
            {/*  ]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities*/}
            {/*  predefinedPlaces={[]}*/}
            {/*  predefinedPlacesAlwaysVisible={false}*/}
            {/*  ref={ref => (this.refGoogleInput = ref)}*/}
            {/*/>*/}

            <View
              style={{
                width: Metric.width - 30,
                height: 300,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <MapView
                initialRegion={{
                  latitude: this.state.marker.latitude,
                  longitude: this.state.marker.longitude,
                  latitudeDelta: 0.0222,
                  longitudeDelta: 0.0121,
                }}
                region={{
                  latitude: this.state.marker.latitude,
                  longitude: this.state.marker.longitude,
                  latitudeDelta: 0.0222,
                  longitudeDelta: 0.0121,
                }}
                style={{
                  width: Metric.width - 30,
                  height: 250,
                }}
                onPoiClick={this.onPoiClick}
                onPress={this.onMapClick}>
                {/*{this.state.poi && (*/}
                {/*  <Marker coordinate={this.state.poi.coordinate}>*/}
                {/*    <Callout>*/}
                {/*      <View>*/}
                {/*        <Text>Place Id: {this.state.poi.placeId}</Text>*/}
                {/*        <Text>Name: {this.state.poi.name}</Text>*/}
                {/*      </View>*/}
                {/*    </Callout>*/}
                {/*  </Marker>*/}
                {/*)}*/}
                {this.state.marker && (
                  <MapView.Marker coordinate={this.state.marker} />
                )}
              </MapView>
            </View>

            <Text style={styles.newLessonModalPickerTitle}>
              {isEnglish ? en.modal.timeAndDate : he.modal.timeAndDate}
            </Text>

            <SynMinTimes
              mon={false}
              tue={false}
              wed={false}
              thu={false}
              fri={false}
              sat={false}
              sun={false}
              type={'week'}
              initialTime={time || null}
              initialDay={days || null}
              isEnglish={isEnglish}
              setTime={this.setTime}
              updateWeekdays={(mon, tue, wed, thu, fri, sat, sun) => {
                this.setState({mon, tue, wed, thu, fri, sat, sun});
              }}
            />
            <Text style={styles.newLessonModalPickerTitle}>
              {isEnglish ? en.modal.description : he.modal.description}
            </Text>
            <DescriptionInput
              direction={this.props.direction}
              onChangeText={text => {
                this.setState({note: text});
              }}
              placeholder={
                isEnglish
                  ? en.modal.enterDescription
                  : he.modal.enterDescription
              }
              value={this.state.note}
            />
          </View>
          <View style={styles.verticalSpacing} />
          <View style={styles.addModalSeparator} />
          <View style={styles.verticalSpacingSmall} />
          <View style={styles.newLessonModalContainer}>
            <Text style={styles.newLessonModalTextInputTitle}>
              {isEnglish ? en.modal.contactName : he.modal.contactName}
            </Text>
            <NormalInput
              direction={this.props.direction}
              placeholder={
                isEnglish ? en.modal.enterNameHere : he.modal.enterNameHere
              }
              onChangeText={text => {
                this.setState({contactName: text});
              }}
              phoneNumber={false}
              value={this.state.contactName}
            />
            <Text style={styles.newLessonModalTextInputTitle}>
              {isEnglish ? en.modal.contactNumber : he.modal.contactNumber}
            </Text>
            <NormalInput
              direction={this.props.direction}
              placeholder={
                isEnglish ? en.modal.enterNumberHere : he.modal.enterNumberHere
              }
              onChangeText={text => {
                this.setState({phoneNumber: text});
              }}
              phoneNumber={true}
              value={this.state.phoneNumber}
            />
            <Text style={styles.newLessonModalPickerTitle}>
              {isEnglish ? en.modal.audience : he.modal.audience}
            </Text>
            <SpeakerPicker
              direction={this.props.direction}
              items={[
                {
                  label: isEnglish ? en.audience.men : he.audience.men,
                  value: 'men',
                },
                {
                  label: isEnglish ? en.audience.women : he.audience.women,
                  value: 'women',
                },
                {
                  label: isEnglish
                    ? en.audience.men_and_women
                    : he.audience.men_and_women,
                  value: 'men_and_women',
                },
              ]}
              onValueChange={value => {
                this.setState({selectedAudience: value, audienceValue: value});
              }}
              placeholder={{label: '', value: null}}
              value={audienceValue}
            />
            <TouchableOpacity
              style={styles.publishLessonContainer}
              onPress={() => {
                const {isEdit} = this.props.navigation.state.params;
                const {
                  lat,
                  lng,
                  city,
                  subject,
                  selectedSpeaker,
                  speaker,
                  note,
                  contactName,
                  phoneNumber,
                  mon,
                  tue,
                  wed,
                  thu,
                  fri,
                  sat,
                  sun,
                  datetime,
                  selectedAudience,
                  address,
                } = this.state;
                let days = [];
                if (mon) {
                  days.push(0);
                }
                if (tue) {
                  days.push(1);
                }
                if (wed) {
                  days.push(2);
                }
                if (thu) {
                  days.push(3);
                }
                if (fri) {
                  days.push(4);
                }
                if (sat) {
                  days.push(5);
                }
                if (sun) {
                  days.push(6);
                }

                // error
                if (!datetime) {
                  alert('Please input time');
                } else if (selectedSpeaker === '' || !selectedSpeaker) {
                  alert('Please select speaker');
                } else if (selectedAudience === '' || !selectedAudience) {
                  alert('Please select audience');
                } else if (lat === 0 || lng === 0 || address === '') {
                  alert('Please input the correct address');
                } else {
                  this.props.navigation.goBack();
                  if (!isEdit) {
                    console.log('datetime onPress Add', datetime, days);
                    this.props.navigation.state.params.onPublish(
                      lat,
                      lng,
                      city,
                      address,
                      subject,
                      selectedSpeaker,
                      speaker,
                      note,
                      contactName,
                      phoneNumber,
                      days,
                      datetime,
                      selectedAudience,
                    );
                  } else {
                    console.log('datetime onPress Edit', datetime, days);
                    this.props.navigation.state.params.onEditLesson(
                      lat,
                      lng,
                      city,
                      address,
                      subject,
                      selectedSpeaker,
                      speaker,
                      note,
                      contactName,
                      phoneNumber,
                      days,
                      datetime,
                      selectedAudience,
                    );
                  }
                }
              }}>
              <Text style={styles.bigBtnText}>
                {isEnglish ? en.modal.publishLessons : he.modal.publishLessons}
              </Text>
            </TouchableOpacity>
            <View style={styles.verticalSpacingBig} />
          </View>
        </KeyboardAwareScrollView>
        {this.state.showLoading && <Loading />}
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
)(NewLessonScreen);
