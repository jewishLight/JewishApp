import {styles} from './styles';
import {BackHandler, Text, TouchableOpacity, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {en, he} from '../../constants';
import {AddModalCloseButton} from '../../components';
import {
  DescriptionInput,
  NormalInput,
  SpeakerPicker,
  SynMinTimes,
} from '../../components';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {Metric} from '../../themes';
import React, {Component} from 'react';
import {appSettingsSelector} from '../../redux/selector';
import {AppSettingsActions} from '../../redux';
import {connect} from 'react-redux';
import {Strings} from '../../utils';
import {SafeAreaView} from 'react-navigation';

class NewLessonScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      subject: '',
      speakers: [],
      selectedSpeaker: '',
      lat: 0,
      lng: 0,
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
      date: null,
      selectedAudience: '',
      language: '',
    };
  }

  async componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    let language = this.props.appSettings.language;
    this.setState({language});

    let speakers = this.props.navigation.state.params.speakers;
    let speakerPickerArray = [];
    speakers.map(item => {
      if (item.name && item._id) {
        speakerPickerArray.push({label: item.name, value: item._id});
      }
    });
    this.setState({speakers: speakerPickerArray});
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

  setDate = date => {
    this.setState({date});
  };

  render() {
    const isEnglish = this.state.language === Strings.ENGLISH;
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
            />
            <View
              style={{
                marginTop: 20,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={{fontSize: 14}}>
                {isEnglish ? en.modal.speaker : he.modal.speaker}
              </Text>
              <TouchableOpacity
                style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{color: 'blue', fontSize: 14}}>
                  Add New Speaker
                </Text>
              </TouchableOpacity>
            </View>

            <SpeakerPicker
              items={this.state.speakers}
              direction={this.props.direction}
              onValueChange={this.onChangeSpeaker}
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
              isEnglish={isEnglish}
              setDate={this.setDate}
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
                this.setState({selectedAudience: value});
              }}
            />
            <TouchableOpacity
              style={styles.publishLessonContainer}
              onPress={() => {
                const {
                  lat,
                  lng,
                  city,
                  subject,
                  selectedSpeaker,
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
                  date,
                  selectedAudience,
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
                this.props.navigation.state.params.onPublish(
                  lat,
                  lng,
                  city,
                  subject,
                  selectedSpeaker,
                  note,
                  contactName,
                  phoneNumber,
                  days,
                  date,
                  selectedAudience,
                );
              }}>
              <Text style={styles.bigBtnText}>
                {isEnglish ? en.modal.publishLessons : he.modal.publishLessons}
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
)(NewLessonScreen);
