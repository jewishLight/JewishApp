import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import {styles} from './styles';
import Modal from 'react-native-modal';
import {Colors, Metric} from '../../themes';
import {Strings} from '../../utils';
import {en, he} from '../../constants';
import {
  AddModalCloseButton,
  NormalInput,
  NormalPicker,
  LocationInput,
  NosachPicker,
  DateTimeSetter,
  DescriptionInput,
  SynMinTimes,
  NormalSwitch,
  TagView,
  AtoZList,
  AmenitiesPicker,
  SpeakerPicker,
} from '../../components';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import ImagePicker from 'react-native-image-picker';
const options = {
  title: 'Select Avatar',
  customButtons: [],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

export class AddModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
    };
  }

  componentDidMount() {}

  show = () => {
    this.setState({modalVisible: true});
  };

  hide = () => {
    this.setState({modalVisible: false});
  };

  render() {
    const isEnglish = this.props.isEnglish;
    return (
      <Modal visible={this.state.modalVisible} style={styles.addModalContainer}>
        <View style={styles.addModalView}>
          <View style={styles.addModalDropdownView} />
          <View style={styles.addModalMainView}>
            <View style={styles.addNewLine}>
              <Text style={styles.addNewText}>
                {isEnglish ? en.modal.addNew : he.modal.addNew}
              </Text>
              <AddModalCloseButton
                onPress={() => {
                  this.hide();
                }}
                text={isEnglish ? en.modal.close : he.modal.close}
              />
            </View>
            <View style={styles.addModalSeparator} />
            <View style={styles.addBtnsContainer}>
              <TouchableOpacity
                style={styles.addSynBtn}
                onPress={() => {
                  this.hide();
                  this.props.callBack(Strings.MODAL_FLAG_ADD_SYN);
                }}>
                <Text style={styles.synText}>
                  {isEnglish ? en.modal.synagogue : he.modal.synagogue}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.addLessonBtn}
                onPress={() => {
                  this.hide();
                  this.props.callBack(Strings.MODAL_FLAG_ADD_LESSON);
                }}>
                <Text style={styles.lessonText}>
                  {isEnglish ? en.modal.lesson : he.modal.lesson}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

export class FilterModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
    };
  }

  componentDidMount() {
    this.tagData = [];
  }

  show = () => {
    this.setState({modalVisible: true});
  };

  hide = () => {
    this.setState({modalVisible: false});
  };

  render() {
    const isEnglish = this.props.isEnglish;
    return (
      <Modal visible={this.state.modalVisible} style={styles.addModalContainer}>
        <View style={styles.addModalView}>
          <View style={styles.addModalDropdownView} />
          <View style={styles.filterModalMainView}>
            <View style={styles.addNewLine}>
              <Text style={styles.addNewText}>
                {isEnglish ? en.modal.filter : he.modal.filter}
              </Text>
              <AddModalCloseButton
                onPress={() => {
                  this.hide();
                }}
                text={isEnglish ? en.modal.close : he.modal.close}
              />
            </View>
            <View style={styles.addModalSeparator} />
            <View style={styles.addBtnsContainer}>
              <TouchableOpacity
                style={styles.addSynBtn}
                onPress={() => {
                  this.hide();
                }}>
                <Text style={styles.synText}>
                  {isEnglish ? en.modal.lesson : he.modal.lesson}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.addSynBtn}
                onPress={() => {
                  this.hide();
                }}>
                <Text style={styles.synText}>
                  {isEnglish ? en.modal.synagogue : he.modal.synagogue}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.addSynBtn}
                onPress={() => {
                  this.hide();
                }}>
                <Text style={styles.synText}>
                  {isEnglish
                    ? en.modal.bothLessonsAndSynagogue
                    : he.modal.bothLessonsAndSynagogue}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

export class NewLessonModal extends Component {
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
    };
  }

  componentDidMount() {}

  show = speakers => {
    this.setState({modalVisible: true});
    let speakerPickerArray = [];
    speakers.map(item => {
      if (item.name && item._id) {
        speakerPickerArray.push({label: item.name, value: item._id});
      }
    });
    this.setState({speakers: speakerPickerArray});
  };

  hide = () => {
    this.setState({modalVisible: false});
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
    const isEnglish = this.props.isEnglish;
    return (
      <Modal visible={this.state.modalVisible} style={styles.addModalContainer}>
        <View style={styles.addModalView}>
          <View style={styles.addModalDropdownView} />
          <View style={styles.newLessonModalMainView}>
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
              {/*<KeyboardAvoidingView behavior="height" style={styles.flexFull}>*/}
              {/*<KeyboardAwareScrollView>*/}
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
                {/*<LocationInput*/}
                {/*  direction={this.props.direction}*/}
                {/*  placeholder={*/}
                {/*    isEnglish ? en.modal.enterLocation : he.modal.enterLocation*/}
                {/*  }*/}
                {/*/>*/}

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
                {/*<DateTimeSetter*/}
                {/*  mon={false}*/}
                {/*  tue={false}*/}
                {/*  wed={false}*/}
                {/*  thu={false}*/}
                {/*  fri={false}*/}
                {/*  sat={false}*/}
                {/*  sun={false}*/}
                {/*  isEnglish={isEnglish}*/}
                {/*  updateWeekdays={(mon, tue, wed, thu, fri, sat, sun) => {*/}
                {/*    this.setState({mon, tue, wed, thu, fri, sat, sun});*/}
                {/*  }}*/}
                {/*/>*/}
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
                    isEnglish
                      ? en.modal.enterNumberHere
                      : he.modal.enterNumberHere
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
                    this.props.onPublish(
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
                    {isEnglish
                      ? en.modal.publishLessons
                      : he.modal.publishLessons}
                  </Text>
                </TouchableOpacity>
                <View style={styles.verticalSpacingBig} />
              </View>
              {/*</KeyboardAwareScrollView>*/}
              {/*</KeyboardAvoidingView>*/}
            </KeyboardAwareScrollView>
          </View>
        </View>
      </Modal>
    );
  }
}

export class NewSynModal extends Component {
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
    };
  }

  componentDidMount() {}

  show = () => {
    this.setState({modalVisible: true});
  };

  hide = () => {
    this.setState({modalVisible: false});
  };

  onNosachSelect = value => {
    this.setState({nosach: value});
  };

  onSelectAmenities = key => {
    if (key != null) {
      let amenities = this.state.amenities;
      let amenities_key = this.state.amenities_key;
      let value = '';
      switch (key) {
        case 0:
          value = this.props.isEnglish
            ? en.amenities.value_0
            : he.amenities.value_0;
          break;
        case 1:
          value = this.props.isEnglish
            ? en.amenities.value_1
            : he.amenities.value_1;
          break;
        case 2:
          value = this.props.isEnglish
            ? en.amenities.value_2
            : he.amenities.value_2;
          break;
        case 3:
          value = this.props.isEnglish
            ? en.amenities.value_3
            : he.amenities.value_3;
          break;
        default:
          value = this.props.isEnglish
            ? en.amenities.value_0
            : he.amenities.value_0;
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
    this.setState({amenities: items});
    let keys = [];
    if (
      items.includes(
        this.props.isEnglish ? en.amenities.value_0 : he.amenities.value_0,
      )
    ) {
      keys.push(0);
    }
    if (
      items.includes(
        this.props.isEnglish ? en.amenities.value_1 : he.amenities.value_1,
      )
    ) {
      keys.push(1);
    }
    if (
      items.includes(
        this.props.isEnglish ? en.amenities.value_2 : he.amenities.value_2,
      )
    ) {
      keys.push(2);
    }
    if (
      items.includes(
        this.props.isEnglish ? en.amenities.value_3 : he.amenities.value_3,
      )
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
    const isEnglish = this.props.isEnglish;
    return (
      <Modal visible={this.state.modalVisible} style={styles.addModalContainer}>
        <View style={styles.addModalView}>
          <View style={styles.addModalDropdownView} />
          <View style={styles.newLessonModalMainView}>
            <View style={styles.addNewLine}>
              <Text style={styles.addNewText}>
                {isEnglish
                  ? en.modal.addNewSynagogue
                  : he.modal.addNewSynagogue}
              </Text>
              <AddModalCloseButton
                onPress={() => {
                  this.hide();
                }}
                text={isEnglish ? en.modal.close : he.modal.close}
              />
            </View>
            <View style={styles.addModalSeparator} />
            <KeyboardAvoidingView behavior="padding" style={styles.flexFull}>
              <ScrollView>
                <View style={styles.newLessonModalContainer}>
                  <Text style={styles.newLessonModalTextInputTitle}>
                    {isEnglish
                      ? en.modal.synagogueName
                      : he.modal.synagogueName}
                  </Text>
                  <NormalInput
                    direction={this.props.direction}
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
                    direction={this.props.direction}
                    onSelect={this.onNosachSelect}
                  />

                  <Text style={styles.newLessonModalPickerTitle}>
                    {isEnglish ? en.modal.location : he.modal.location}
                  </Text>
                  {/*<LocationInput*/}
                  {/*  direction={this.props.direction}*/}
                  {/*  placeholder={*/}
                  {/*    isEnglish*/}
                  {/*      ? en.modal.enterLocation*/}
                  {/*      : he.modal.enterLocation*/}
                  {/*  }*/}
                  {/*/>*/}

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
                    direction={this.props.direction}
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
                    direction={this.props.direction}
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
                    direction={this.props.direction}
                    placeholder={
                      isEnglish
                        ? en.modal.enterNumberHere
                        : he.modal.enterNumberHere
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
                      <Text
                        style={{color: 'white', marginLeft: 5, fontSize: 15}}>
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
                      this.props.onPublish(
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
                    }}>
                    <Text style={styles.bigBtnText}>
                      {isEnglish
                        ? en.modal.addNewSynagogue
                        : he.modal.addNewSynagogue}
                    </Text>
                  </TouchableOpacity>
                  <View style={styles.verticalSpacingBig} />
                </View>
              </ScrollView>
            </KeyboardAvoidingView>
          </View>
        </View>
      </Modal>
    );
  }
}

import AlphaScrollFlatList from 'alpha-scroll-flat-list';
const ITEM_HEIGHT = 50;
import people from './names';

export class ChangeLocationModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
    };
  }

  componentDidMount() {}

  show = () => {
    this.setState({modalVisible: true});
  };

  hide = () => {
    this.setState({modalVisible: false});
  };

  onSelectLocation = (index, name) => {
    this.hide();
    this.props.onSelectLocation(index, name);
  };

  renderItem = ({item, index}) => {
    return (
      <View style={{paddingRight: 30}}>
        <TouchableOpacity
          style={{
            height: 50,
            flexDirection: 'row',
            alignItems: 'center',
          }}
          onPress={() => {
            this.onSelectLocation(index, item.name);
          }}>
          <Text>{item.name}</Text>
        </TouchableOpacity>
        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: Colors.separator,
          }}
        />
      </View>
    );
  };

  keyExtractor = item => {
    return item.code;
  };

  render() {
    return (
      <Modal visible={this.state.modalVisible} style={styles.addModalContainer}>
        <View style={styles.addModalView}>
          <View style={styles.addModalDropdownView} />
          <View style={styles.alphaModalMainView}>
            <View style={styles.addNewLine}>
              <Text style={styles.addNewText}>Change Location</Text>
              <AddModalCloseButton
                onPress={() => {
                  this.hide();
                }}
                text={this.props.isEnglish ? en.modal.close : he.modal.close}
              />
            </View>
            <View style={styles.addModalSeparator} />
            <View style={styles.alphaListModalContainer}>
              <AlphaScrollFlatList
                keyExtractor={this.keyExtractor.bind(this)}
                data={people.sort((prev, next) =>
                  prev.name.localeCompare(next.name),
                )}
                renderItem={this.renderItem}
                scrollKey={'name'}
                reverse={false}
                itemHeight={ITEM_HEIGHT}
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}
