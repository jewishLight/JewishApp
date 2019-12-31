import {en, he} from '../../constants';
import {LocalStorage, Strings} from '../../utils';
import ImagePicker from 'react-native-image-picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {styles} from './styles';
import {
  BackHandler,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  AmenitiesPicker,
  DescriptionInput,
  NormalInput,
  NormalSwitch,
  NosachPicker,
  SynMinTimes,
  TagView,
  AddModalCloseButton,
} from '../../components';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {Colors, Metric} from '../../themes';
import React, {Component} from 'react';
import {appSettingsSelector} from '../../redux/selector';
import {AppSettingsActions} from '../../redux';
import {connect} from 'react-redux';
import {SafeAreaView} from 'react-navigation';
import MapView, {Callout, Marker, ProviderPropType} from 'react-native-maps';
import LocationItem from '../NewLessonScreen/locationItem';
import {GoogleAutoComplete} from 'react-native-google-autocomplete';
import moment from 'moment';
import Geocoder from 'react-native-geocoder';

const options = {
  title: 'Select Avatar',
  customButtons: [],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

class NewSynModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      name: '',
      lat: 0,
      lng: 0,
      city: '',
      nosach: '',
      shtiblach: false,
      amenities: [],
      amenities_key: [],
      showTimeSelector: false,
      datetime: null,
      mon: false,
      tue: false,
      wed: false,
      thu: false,
      fri: false,
      sat: false,
      sun: false,
      notes: '',
      phoneNumber: '',
      avatarSource: null,
      isEnglish: this.props.navigation.state.params.isEnglish,
      poi: null,
      address: Strings.currentLocationCity,
      addMinTimeFlag: false,
      marker: {
        longitude: Strings.currentLongitude,
        latitude: Strings.currentLatitude,
      },
    };
  }

  async componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount(): void {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton = () => {
    this.props.navigation.goBack();
    return true;
  };

  hide = () => {
    this.props.navigation.goBack();
  };

  onNosachSelect = value => {
    this.setState({nosach: value});
  };

  onSelectAmenities = key => {
    const {isEnglish} = this.state;
    if (key != null) {
      let amenities = this.state.amenities;
      let amenities_key = this.state.amenities_key;
      let value = '';
      switch (key) {
        case 0:
          value = isEnglish ? en.amenities.value_0 : he.amenities.value_0;
          break;
        case 1:
          value = isEnglish ? en.amenities.value_1 : he.amenities.value_1;
          break;
        case 2:
          value = isEnglish ? en.amenities.value_2 : he.amenities.value_2;
          break;
        case 3:
          value = isEnglish ? en.amenities.value_3 : he.amenities.value_3;
          break;
        default:
          value = isEnglish ? en.amenities.value_0 : he.amenities.value_0;
          break;
      }
      if (!amenities.includes(value)) {
        amenities.push(value);
        amenities_key.push(key);
      }
      this.setState({amenities, amenities_key});
    }
  };

  onTagViewUpdate = items => {
    const {isEnglish} = this.state;
    this.setState({amenities: items});
    let keys = [];
    if (
      items.includes(isEnglish ? en.amenities.value_0 : he.amenities.value_0)
    ) {
      keys.push(0);
    }
    if (
      items.includes(isEnglish ? en.amenities.value_1 : he.amenities.value_1)
    ) {
      keys.push(1);
    }
    if (
      items.includes(isEnglish ? en.amenities.value_2 : he.amenities.value_2)
    ) {
      keys.push(2);
    }
    if (
      items.includes(isEnglish ? en.amenities.value_3 : he.amenities.value_3)
    ) {
      keys.push(3);
    }
    this.setState({amenities_key: keys});
  };

  setTime = datetime => {
    this.setState({datetime});
  };

  updateWeekdays = (mon, tue, wed, thu, fri, sat, sun) => {
    this.setState({mon, tue, wed, thu, fri, sat, sun});
  };

  uploadImage = () => {
    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: response.uri};

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          avatarSource: source,
        });
      }
    });
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

  updateGoogleAutocomplete = nextState => {
    this.setState({
      marker:{
        longitude: nextState.longitude,
        latitude: nextState.latitude,
      },
      address: nextState.justCity,
      city: nextState.address,
      lat: nextState.latitude,
      lng: nextState.longitude,
    });
  };

  render() {
    const {isEnglish, mon, tue, wed, thu, fri, sat, sun} = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="always"
          style={{flex: 1}}>
          <View style={styles.addNewLine}>
            <Text style={styles.addNewText}>
              {isEnglish ? en.modal.addNewSynagogue : he.modal.addNewSynagogue}
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
              {isEnglish ? en.modal.synagogueName : he.modal.synagogueName}
            </Text>
            <NormalInput
              direction={isEnglish ? 'ltr' : 'rtl'}
              placeholder={
                isEnglish
                  ? en.modal.enterSynagogueNameHere
                  : he.modal.enterSynagogueNameHere
              }
              onChangeText={text => {
                this.setState({name: text});
              }}
              phoneNumber={false}
            />

            <Text style={styles.newLessonModalPickerTitle}>
              {isEnglish ? en.modal.nosach : he.modal.nosach}
            </Text>
            <NosachPicker
              isEnglish={isEnglish}
              direction={isEnglish ? 'ltr' : 'rtl'}
              onSelect={this.onNosachSelect}
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
            {/*      backgroundColor: 'white',*/}
            {/*      width: Metric.width - 30,*/}
            {/*    },*/}
            {/*    textInput: {},*/}
            {/*    predefinedPlacesDescription: {*/}
            {/*      color: '#1faadb',*/}
            {/*    },*/}
            {/*  }}*/}
            {/*  currentLocation={false} // Will add a 'Current location' button at the top of the predefined places list*/}
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

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={styles.newLessonModalPickerTitle}>
                {isEnglish ? en.modal.addMinTimes : he.modal.addMinTimes}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  if (mon || tue || wed || thu || fri || sat || sun) {
                    this.setState({addMinTimeFlag: true});
                  }
                }}>
                <Text style={{color: 'blue'}}>Add</Text>
              </TouchableOpacity>
            </View>
            <SynMinTimes
              mon={false}
              tue={false}
              wed={false}
              thu={false}
              fri={false}
              sat={false}
              sun={false}
              type={'week'}
              isEnglish={isEnglish}
              setTime={this.setTime}
              updateWeekdays={this.updateWeekdays}
            />

            {this.state.addMinTimeFlag && (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View />
                <TouchableOpacity
                  onPress={() => {
                    this.setState({addMinTimeFlag: false});
                  }}>
                  <Text style={styles.newLessonModalPickerTitleRed}>
                    {isEnglish ? en.modal.remove : he.modal.remove}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            {this.state.addMinTimeFlag && (
              <SynMinTimes
                mon={false}
                tue={false}
                wed={false}
                thu={false}
                fri={false}
                sat={false}
                sun={false}
                type={'day'}
                isEnglish={isEnglish}
                setTime={this.setTime}
                updateWeekdays={this.updateWeekdays}
              />
            )}

            <NormalSwitch
              type={isEnglish ? en.modal.shtiblach : he.modal.shtiblach}
              initialStatus={false}
              onChange={value => {
                this.setState({shtiblach: value});
              }}
            />

            <Text style={styles.newLessonModalPickerTitle}>
              {isEnglish ? en.modal.amenities : he.modal.amenities}
            </Text>
            <AmenitiesPicker
              isEnglish={isEnglish}
              direction={isEnglish ? 'ltr' : 'rtl'}
              items={[
                {
                  label: isEnglish
                    ? en.amenities.value_0
                    : he.amenities.value_0,
                  value: 0,
                },
                {
                  label: isEnglish
                    ? en.amenities.value_1
                    : he.amenities.value_1,
                  value: 1,
                },
                {
                  label: isEnglish
                    ? en.amenities.value_2
                    : he.amenities.value_2,
                  value: 2,
                },
                {
                  label: isEnglish
                    ? en.amenities.value_3
                    : he.amenities.value_3,
                  value: 3,
                },
              ]}
              onSelect={this.onSelectAmenities}
            />
            <TagView
              items={this.state.amenities}
              itemSelected={this.onTagViewUpdate}
            />

            <Text style={styles.newLessonModalPickerTitle}>
              {isEnglish ? en.modal.notes : he.modal.notes}
            </Text>
            <DescriptionInput
              direction={isEnglish ? 'ltr' : 'rtl'}
              onChangeText={text => {
                this.setState({note: text});
              }}
              placeholder={
                isEnglish
                  ? en.modal.enterDescription
                  : he.modal.enterDescription
              }
            />

            <Text style={styles.newLessonModalPickerTitle}>
              {isEnglish
                ? en.modal.ownerContactNumber
                : he.modal.ownerContactNumber}
            </Text>
            <NormalInput
              direction={isEnglish ? 'ltr' : 'rtl'}
              placeholder={
                isEnglish ? en.modal.enterNumberHere : he.modal.enterNumberHere
              }
              onChangeText={text => {
                this.setState({phoneNumber: text});
              }}
              phoneNumber={true}
            />
          </View>

          <View style={styles.verticalSpacing} />
          <View style={styles.addModalSeparator} />
          <View style={styles.verticalSpacingSmall} />

          <View style={styles.newLessonModalContainer}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={styles.newLessonModalTextInputTitle}>
                {isEnglish
                  ? en.modal.synagoguePicture
                  : he.modal.synagoguePicture}
              </Text>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: Colors.uploadImage,
                  width: 160,
                  height: 50,
                  borderRadius: 25,
                  marginTop: 5,
                }}
                onPress={this.uploadImage}>
                <Image
                  source={require('../../assets/icon_modal_upload.png')}
                  style={{width: 20, height: 13, resizeMode: 'contain'}}
                />
                <Text style={{color: 'white', marginLeft: 5, fontSize: 15}}>
                  {isEnglish ? en.modal.upload : he.modal.upload}
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.publishLessonContainer}
              onPress={() => {
                const {
                  lat,
                  lng,
                  city,
                  name,
                  nosach,
                  shtiblach,
                  amenities_key,
                  datetime,
                  mon,
                  tue,
                  wed,
                  thu,
                  fri,
                  sat,
                  sun,
                  note,
                  phoneNumber,
                  avatarSource,
                } = this.state;
                if (lat === 0 || lng === 0 || city === '') {
                  alert(
                    isEnglish
                      ? 'Please input the location'
                      : 'נא להזין כתובת תקינה',
                  );
                } else if (name === '') {
                  alert('Please input the name');
                } else if (nosach === '') {
                  alert('Please input the nosach');
                } else if (phoneNumber === '') {
                  alert('Please input the phone number');
                } else if (note === '') {
                  alert('Please input the note');
                } else if (!avatarSource) {
                  alert('Please upload avatar');
                } else {
                  this.props.navigation.goBack();
                  this.props.navigation.state.params.onPublish(
                    lat,
                    lng,
                    city,
                    name,
                    nosach,
                    shtiblach,
                    amenities_key,
                    datetime,
                    mon,
                    tue,
                    wed,
                    thu,
                    fri,
                    sat,
                    sun,
                    note,
                    phoneNumber,
                    avatarSource,
                  );
                }
              }}>
              <Text style={styles.bigBtnText}>
                {isEnglish
                  ? en.modal.addNewSynagogue
                  : he.modal.addNewSynagogue}
              </Text>
            </TouchableOpacity>
            <View style={styles.verticalSpacingBig} />
          </View>
        </KeyboardAwareScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(NewSynModal);
