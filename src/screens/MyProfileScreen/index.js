import React, {Component} from 'react';
import {SafeAreaView} from 'react-navigation';
import {
  View,
  Platform,
  BackHandler,
  Text,
  Image,
  I18nManager,
  TouchableOpacity,
} from 'react-native';
import {Colors, Metric} from '../../themes';
import {LocalStorage, Strings} from '../../utils';
import {en, he} from '../../constants';
import {MyProfileHeader, SearchResultHeader} from '../../components';
import {appSettingsSelector} from '../../redux/selector';
import {AppSettingsActions} from '../../redux';
import {connect} from 'react-redux';

class MyProfileScreen extends Component {
  static navigationOptions = {
    gesturesEnabled: Platform.OS !== 'ios',
  };

  constructor(props) {
    super(props);
    this.state = {
      language: '',
    };
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    this.setState({language: this.props.appSettings.language});
  }

  componentWillUnmount(): void {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  async componentWillReceiveProps(nextProps, nextContext) {
    const originLanguage = this.props.appSettings.language;
    const newLanguage = nextProps.appSettings.language;
    if (originLanguage !== newLanguage) {
      this.setState({language: newLanguage});
    }
  }

  handleBackButton = () => {
    return true;
  };

  onBack = () => {
    this.props.navigation.goBack();
  };

  onEdit = () => {
    this.props.navigation.navigate('EditProfile');
  };

  render() {
    const {language} = this.state;
    const isEnglish = language === Strings.ENGLISH;
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <MyProfileHeader
          onBack={this.onBack}
          isEnglish={isEnglish}
          onEdit={this.onEdit}
        />
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20,
          }}>
          <Image
            source={require('../../assets/img_noavatar.png')}
            style={{width: 150, height: 150, resizeMode: 'contain'}}
          />
        </View>
        <View style={{paddingHorizontal: 20, marginTop: 30}}>
          <Text style={{color: '#252325', fontSize: 16, opacity: 0.4}}>
            Display Name
          </Text>
          <Text style={{color: '#252325', fontSize: 18, marginTop: 10}}>
            John Doe
          </Text>
        </View>
        <View
          style={{height: 1, backgroundColor: Colors.separator, marginTop: 15}}
        />
        <View style={{paddingHorizontal: 20, marginTop: 15}}>
          <Text style={{color: '#252325', fontSize: 16, opacity: 0.4}}>
            Email
          </Text>
          <Text style={{color: '#252325', fontSize: 18, marginTop: 10}}>
            johndoe123@gmail.com
          </Text>
        </View>
        <View
          style={{height: 1, backgroundColor: Colors.separator, marginTop: 15}}
        />
        <View
          style={{
            paddingHorizontal: 20,
            marginTop: 15,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TouchableOpacity>
            <Image
              source={require('../../assets/icon_profile_checkoff.png')}
              style={{width: 19, height: 19, resizeMode: 'contain'}}
            />
          </TouchableOpacity>
          <Text style={{color: '#9B9B9B', marginLeft: 5, fontSize: 16}}>
            Hide my name in updates
          </Text>
        </View>
        <View style={{flex: 1}}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={require('../../assets/icon_profile_logout.png')}
                style={{width: 21, height: 21, resizeMode: 'contain'}}
              />
              <Text style={{color: '#EC2139', fontSize: 20, marginLeft: 5}}>
                Logout
              </Text>
            </TouchableOpacity>
          </View>
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
)(MyProfileScreen);
