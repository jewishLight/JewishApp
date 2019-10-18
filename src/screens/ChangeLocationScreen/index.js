import React, {Component} from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Colors, Metric} from '../../themes';
import {AddModalCloseButton} from '../../components';
import {en, he} from '../../constants';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {styles} from './styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import LocationItem from '../NewLessonScreen/locationItem';
import {GoogleAutoComplete} from 'react-native-google-autocomplete';
import GetLocation from 'react-native-get-location';
import {LocalStorage, Strings} from '../../utils';
import Geocoder from 'react-native-geocoder';

class ChangeLocationScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lat: 0,
      lng: 0,
      city: '',
      address: '',
    };
  }

  componentDidMount() {}

  updateGoogleAutocomplete = async nextState => {
    this.setState({
      address: nextState.address,
      city: nextState.address,
      lat: nextState.latitude,
      lng: nextState.longitude,
    });
    this.props.navigation.state.params.updateLocation(
      nextState.latitude,
      nextState.longitude,
      nextState.address,
    );
    Strings.currentLatitude = parseFloat(location.latitude);
    Strings.currentLongitude = parseFloat(location.longitude);
    await LocalStorage.setMyLatitude(Strings.currentLatitude.toString());
    await LocalStorage.setMyLongitude(Strings.currentLongitude.toString());
    Geocoder.geocodePosition({
      lat: Strings.currentLatitude,
      lng: Strings.currentLongitude,
    })
      .then(async res => {
        // res is an Array of geocoding object (see below)
        Strings.currentLocationCity = `${res[0].streetNumber}, ${
          res[0].streetName
        }, ${res[0].locality}, ${res[0].country}`;
        Strings.currentOnlyCity = `${res[0].locality}, ${res[0].country}`;
        await LocalStorage.setMyLocation(Strings.currentLocationCity);
        await LocalStorage.setMyOnlyCity(Strings.currentOnlyCity);
      })
      .catch(err => {});
  };

  render() {
    return (
      <View style={styles.alphaModalMainView}>
        <View style={styles.addNewLine}>
          <Text style={styles.addNewText}>
            {this.props.navigation.state.params.isEnglish
              ? en.changeLocation
              : he.changeLocation}
          </Text>
          <AddModalCloseButton
            onPress={() => {
              this.props.navigation.goBack();
            }}
            text={
              this.props.navigation.state.params.isEnglish
                ? en.modal.close
                : he.modal.close
            }
          />
        </View>
        <View style={styles.addModalSeparator} />
        <KeyboardAwareScrollView style={{flex: 1}}>
          <View
            style={{
              height: 60,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 17, color: 'red'}}>
              {this.props.navigation.state.params.isEnglish
                ? en.setYourHomeCity
                : he.setYourHomeCity}
            </Text>
          </View>
          <View
            style={{
              width: Metric.width,
              alignItems: 'center',
              paddingHorizontal: 15,
            }}>
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
            {/*    this.props.navigation.state.params.updateLocation(*/}
            {/*      details.geometry.location.lat,*/}
            {/*      details.geometry.location.lng,*/}
            {/*      details.address_components[0].long_name,*/}
            {/*    );*/}
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
                    placeholder={
                      this.props.navigation.state.params.isEnglish
                        ? en.modal.location
                        : he.modal.location
                    }
                  />
                  <ScrollView
                    style={{maxHeight: 100, width: Metric.width - 30}}
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
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

export default ChangeLocationScreen;
