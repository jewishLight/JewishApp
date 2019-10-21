import React, {Component} from 'react';
import {
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
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
      address: '',
      isFetching: false,
      autoCompleteResult: [],
      showList: false,
    };
  }

  componentDidMount() {}

  _keyExtractor = item => item.id;

  onChangeAutoComplete = async text => {
    this.setState({address: text});
    if (text.length > 3 && !this.state.isFetching) {
      this.setState({isFetching: true});
      let url = 'https://maps.googleapis.com/maps/api/place/textsearch/json';
      let params = {
        query: text,
        radius: '50000000',
        key: 'AIzaSyAKlDWP_hkcOoCrUS-hsRXn67qKW0o9n0M',
      };
      debugger;
      fetch(`${url}?${this.objToQueryString(params)}`)
        .then(async response => {
          let data = await response.text();
          data = JSON.parse(data);
          this.setState({
            autoCompleteResult: data.results,
            showList: true,
          });
          setTimeout(() => {
            this.setState({isFetching: false});
          }, 1000);
        })
        .catch(error => {
          setTimeout(() => {
            this.setState({isFetching: false});
          }, 1000);
        });
    }
  };

  objToQueryString = obj => {
    const keyValuePairs = [];
    for (let i = 0; i < Object.keys(obj).length; i += 1) {
      keyValuePairs.push(
        `${encodeURIComponent(Object.keys(obj)[i])}=${encodeURIComponent(
          Object.values(obj)[i],
        )}`,
      );
    }
    return keyValuePairs.join('&');
  };

  parseFormattedAddress = address => {
    const splitResult = address.split(', ');
    if (splitResult.length > 1) {
      return `${splitResult[splitResult.length - 2]}, ${
        splitResult[splitResult.length - 1]
      }`;
    } else {
      return splitResult;
    }
  };

  renderRow = ({item, index}) => {
    return (
      <View
        style={{
          width: Metric.width - 40,
          paddingVertical: 5,
          paddingHorizontal: 10,
          borderBottomColor: 'lightgray',
          borderBottomWidth: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}>
        <TouchableOpacity
          style={{width: Metric.width - 40}}
          onPress={() => {
            const country = this.parseFormattedAddress(item.formatted_address);
            Strings.currentLatitude = item.geometry.location.lat;
            Strings.currentLongitude = item.geometry.location.lon;
            Strings.currentOnlyCity = country;
            Strings.currentLocationCity = item.formatted_address;
            this.props.navigation.state.params.updateLocation(
              Strings.currentLatitude,
              Strings.currentLongitude,
              country,
            );
            this.setState({address: country, showList: false});
          }}>
          <Text style={{fontSize: 14}}>{item.formatted_address}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    const {autoCompleteResult, showList, address} = this.state;
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
              width: '100%',
              height: 60,
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 15,
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
            <TextInput
              style={{
                width: '100%',
                height: 40,
                borderWidth: 1,
                borderColor: 'lightgray',
                borderRadius: 5,
                paddingHorizontal: 10,
              }}
              onChangeText={this.onChangeAutoComplete}
              value={address}
            />

            {showList && (
              <View
                style={{
                  height: 300,
                  width: '100%',
                  borderWidth: 1,
                  borderColor: 'gray',
                }}>
                <FlatList
                  data={autoCompleteResult}
                  renderItem={this.renderRow}
                  keyExtractor={this._keyExtractor}
                />
              </View>
            )}

            {/*<GoogleAutoComplete*/}
            {/*  apiKey="AIzaSyAKlDWP_hkcOoCrUS-hsRXn67qKW0o9n0M"*/}
            {/*  debounce={300}>*/}
            {/*  {({*/}
            {/*    inputValue,*/}
            {/*    handleTextChange,*/}
            {/*    locationResults,*/}
            {/*    fetchDetails,*/}
            {/*    clearSearchs,*/}
            {/*  }) => (*/}
            {/*    <React.Fragment>*/}
            {/*      <TextInput*/}
            {/*        style={{*/}
            {/*          height: 40,*/}
            {/*          width: Metric.width - 30,*/}
            {/*          borderWidth: 1,*/}
            {/*          borderRadius: 5,*/}
            {/*          paddingHorizontal: 16,*/}
            {/*          borderColor: Colors.separator,*/}
            {/*        }}*/}
            {/*        value={this.state.address}*/}
            {/*        onChangeText={text => {*/}
            {/*          this.setState({address: text});*/}
            {/*          handleTextChange(text);*/}
            {/*        }}*/}
            {/*        placeholder={*/}
            {/*          this.props.navigation.state.params.isEnglish*/}
            {/*            ? en.modal.location*/}
            {/*            : he.modal.location*/}
            {/*        }*/}
            {/*      />*/}
            {/*      <ScrollView*/}
            {/*        style={{maxHeight: 100, width: Metric.width - 30}}*/}
            {/*        nestedScrollEnabled={true}>*/}
            {/*        {locationResults.map(el => (*/}
            {/*          <LocationItem*/}
            {/*            {...el}*/}
            {/*            key={el.id}*/}
            {/*            fetchDetails={fetchDetails}*/}
            {/*            update={this.updateGoogleAutocomplete}*/}
            {/*            {...{clearSearchs}}*/}
            {/*          />*/}
            {/*        ))}*/}
            {/*      </ScrollView>*/}
            {/*    </React.Fragment>*/}
            {/*  )}*/}
            {/*</GoogleAutoComplete>*/}
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

export default ChangeLocationScreen;
