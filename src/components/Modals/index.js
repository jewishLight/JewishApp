import React, {Component} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {styles} from './styles';
import Modal from 'react-native-modal';
import {Colors, Metric} from '../../themes';
import {Strings} from '../../utils';
import {en, he} from '../../constants';
import {AddModalCloseButton} from '../../components';

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

import AlphaScrollFlatList from 'alpha-scroll-flat-list';
const ITEM_HEIGHT = 50;
import people from './names';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

export class ChangeLocationModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
      lat: 0,
      lng: 0,
      city: '',
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
              {/*<AlphaScrollFlatList*/}
              {/*  keyExtractor={this.keyExtractor.bind(this)}*/}
              {/*  data={people.sort((prev, next) =>*/}
              {/*    prev.name.localeCompare(next.name),*/}
              {/*  )}*/}
              {/*  renderItem={this.renderItem}*/}
              {/*  scrollKey={'name'}*/}
              {/*  reverse={false}*/}
              {/*  itemHeight={ITEM_HEIGHT}*/}
              {/*/>*/}
              <View
                style={{
                  height: 60,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: 17, color: 'red'}}>
                  Set your home city
                </Text>
                <View style={{}}>
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
                        backgroundColor: 'white',
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
                    ref={ref => (this.refGoogleInput = ref)}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}
