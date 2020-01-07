import React, {Component} from 'react';
import {SafeAreaView} from 'react-navigation';
import {
  View,
  Platform,
  BackHandler,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {AddModalCloseButton, Loading, MapViewHeader} from '../../components';
import MapView, {Marker} from 'react-native-maps';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {appSettingsSelector} from '../../redux/selector';
import {AppSettingsActions} from '../../redux';
import {connect} from 'react-redux';
import {ApiRequest, Strings} from '../../utils';
import {en, he} from '../../constants';
import {styles} from './styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ImagePicker from 'react-native-image-picker';
import {Metric, Colors} from '../../themes';

const options = {
  title: 'Select Avatar',
  customButtons: [],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

class NewSpeakerScreen extends Component {
  static navigationOptions = {
    gesturesEnabled: Platform.OS !== 'ios',
  };

  constructor(props) {
    super(props);
    this.state = {
      language: '',
      showLoading: false,
      newSpeakerName: '',
      newSpeakerAvatar: '',
      newSpeakerAbout: '',
    };
  }

  componentDidMount(): void {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    console.info('search results', this.props.navigation.state.params.results);
    this.setState({
      language: this.props.appSettings.language,
    });
  }

  componentWillUnmount(): void {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton = () => {
    return true;
  };

  startLoading = () => {
    this.setState({showLoading: true});
  };
  closeLoading = () => {
    this.setState({showLoading: false});
  };

  onBack = () => {
    this.props.navigation.goBack();
  };

  onAddSpeakerFinish = () => {
    if (this.state.newSpeakerName === '') {
      alert('Please input the speaker name');
    } else if (this.state.newSpeakerAvatar === '') {
      alert('Please upload the speaker avatar');
    } else if (this.state.newSpeakerAbout === '') {
      alert('Please input the speaker description');
    } else {
      this.startLoading();
      let body = {
        name: this.state.newSpeakerName,
        avatar: this.state.newSpeakerAvatar,
        about: this.state.newSpeakerAbout,
      };

      ApiRequest('lesson/addSpeaker', body, 'POST')
        .then(response => {
          this.closeLoading();
          let speakerPickerArray = [];
          response.speakers.map(item => {
            if (item.name && item._id) {
              speakerPickerArray.push({label: item.name, value: item._id});
            }
          });
          this.props.navigation.goBack();
          this.props.navigation.state.params.newSpeaker(speakerPickerArray);
        })
        .catch(error => {
          this.closeLoading();
        });
    }
  };

  onAvatar = () => {
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

        this.setState({
          newSpeakerAvatar: response.data,
        });
      }
    });
  };

  render() {
    const {language} = this.state;
    const isEnglish = language === Strings.ENGLISH;
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="always"
          style={{flex: 1}}>
          <View style={styles.addNewLine}>
            <Text style={styles.addNewText}>Add New Speaker</Text>
            <AddModalCloseButton
              onPress={() => {
                this.props.navigation.goBack();
              }}
              text={isEnglish ? en.modal.close : he.modal.close}
            />
          </View>
          <View style={styles.addModalSeparator} />
          <View
            style={{
              borderWidth: 0.5,
              borderColor: Colors.separator,
              borderRadius: 10,
              padding: 10,
              marginTop: 10,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{fontFamily: 'Heebo-Regular'}}>Name</Text>
              <View style={{width: 5}} />
              <TextInput
                style={{
                  flex: 1,
                  height: 40,
                  borderWidth: 1,
                  borderColor: Colors.separator,
                  fontFamily: 'Heebo-Regular',
                }}
                onChangeText={text => {
                  this.setState({newSpeakerName: text});
                }}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <Text style={{fontFamily: 'Heebo-Regular'}}>Avatar</Text>
              <TouchableOpacity
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: 120,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: 'lightgray',
                }}
                onPress={this.onAvatar}>
                <Text style={{fontFamily: 'Heebo-Regular'}}>Upload</Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <Text style={{fontFamily: 'Heebo-Regular'}}>About</Text>
              <View style={{width: 5}} />
              <TextInput
                style={{
                  flex: 1,
                  height: 40,
                  borderWidth: 1,
                  borderColor: Colors.separator,
                  fontFamily: 'Heebo-Regular',
                }}
                onChangeText={text => {
                  this.setState({newSpeakerAbout: text});
                }}
              />
            </View>
            <TouchableOpacity
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
                height: 40,
                borderRadius: 20,
                backgroundColor: Colors.separator,
                marginTop: 10,
              }}
              onPress={this.onAddSpeakerFinish}>
              <Text style={{fontFamily: 'Heebo-Regular'}}>Add</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
        <View
          style={{
            height: 30,
            backgroundColor: '#EDEFF1',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontFamily: 'Heebo-Bold'}}>
            {isEnglish
              ? en.memorial.all_over_the_app
              : he.memorial.all_over_the_app}
          </Text>
        </View>
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
)(NewSpeakerScreen);
