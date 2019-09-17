import {en, he} from '../../constants';
import {Strings} from '../../utils';
import ImagePicker from 'react-native-image-picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {styles} from './styles';
import {
  BackHandler,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Text,
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
      date: null,
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

  setDate = date => {
    this.setState({date});
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

  render() {
    const {isEnglish} = this.state;
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

            <GooglePlacesAutocomplete
              placeholder="Search"
              minLength={2} // minimum length of text to search
              autoFocus={false}
              fetchDetails={true}
              onPress={(data, details = null) => {
                // 'details' is provided when fetchDetails = true
                console.log(data);
                console.log(details);
                this.setState({
                  lat: details.geometry.location.lat,
                  lng: details.geometry.location.lng,
                  city: details.address_components[0].long_name,
                });
              }}
              getDefaultValue={() => {
                return ''; // text input default value
              }}
              query={{
                // available options: https://developers.google.com/places/web-service/autocomplete
                key: 'AIzaSyAKlDWP_hkcOoCrUS-hsRXn67qKW0o9n0M',
                language: 'en', // language of the results
                types: '(cities)', // default: 'geocode'
              }}
              styles={{
                description: {
                  fontWeight: 'bold',
                },
                textInputContainer: {
                  width: Metric.width - 30,
                },
                textInput: {},
                predefinedPlacesDescription: {
                  color: '#1faadb',
                },
              }}
              currentLocation={false} // Will add a 'Current location' button at the top of the predefined places list
              currentLocationLabel="Current location"
              nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
              GoogleReverseGeocodingQuery={
                {
                  // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
                }
              }
              GooglePlacesSearchQuery={{
                // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                rankby: 'distance',
                types: 'food',
              }}
              GooglePlacesDetailsQuery={{
                // available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
                fields: 'formatted_address',
              }}
              filterReverseGeocodingByTypes={[
                'locality',
                'administrative_area_level_3',
              ]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
              predefinedPlaces={[]}
              predefinedPlacesAlwaysVisible={false}
            />

            <Text style={styles.newLessonModalPickerTitle}>
              {isEnglish ? en.modal.addMinTimes : he.modal.addMinTimes}
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
              isEnglish={isEnglish}
              setDate={this.setDate}
              updateWeekdays={this.updateWeekdays}
            />

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View />
              <Text style={styles.newLessonModalPickerTitleRed}>
                {isEnglish ? en.modal.remove : he.modal.remove}
              </Text>
            </View>
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
              setDate={this.setDate}
              updateWeekdays={this.updateWeekdays}
            />

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
                  date,
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
                  alert('Please input the location');
                } else if (name === '') {
                  alert('Please input the name');
                } else if (nosach === '') {
                  alert('Please input the nosach');
                } else if (phoneNumber === '') {
                  alert('Please input the phone number');
                } else if (note === '') {
                  alert('Please input the note');
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
                    date,
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewSynModal);
