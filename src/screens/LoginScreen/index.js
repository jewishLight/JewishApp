import React, {Component} from 'react';
import {SafeAreaView} from 'react-navigation';
import {
  View,
  Platform,
  BackHandler,
  Text,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Metric} from '../../themes';
import {
  ApiRequest,
  ApiRequestWithoutToken,
  LocalStorage,
  Strings,
} from '../../utils';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from 'react-native-google-signin';
import config from '../../config';
import {appSettingsSelector} from '../../redux/selector';
import {AppSettingsActions, UserActions} from '../../redux';
import {connect} from 'react-redux';
import {en, he} from '../../constants';
import {Loading} from '../../components';

class LoginScreen extends Component {
  static navigationOptions = {
    // gesturesEnabled: Platform.OS !== 'ios',
    gesturesEnabled: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      language: '',
      showLoading: false,
    };
  }

  async componentDidMount(): void {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    this._configureGoogleSignIn();
    let language = this.props.appSettings.language;
    this.setState({language});
  }

  componentWillUnmount(): void {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton = () => {
    return true;
  };

  _configureGoogleSignIn = () => {
    GoogleSignin.configure({
      webClientId: config.webClientId,
      offlineAccess: false,
    });
  };

  _signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      this.startLoading();
      let body = {
        id_token: userInfo.idToken,
      };
      ApiRequestWithoutToken('auth/google', body, 'POST')
        .then(async response => {
          this.props.updateUser(response.user);
          this.closeLoading();
          Strings.localToken = response.token;
          Strings.loginType = Strings.LOGIN_TYPE_GOOGLE;
          Strings.userId = response.user._id;
          await LocalStorage.setToken(response.token);
          await LocalStorage.setUser(JSON.stringify(response.user));
          await LocalStorage.setUserId(response.user._id);
          await LocalStorage.setLoggedIn(true);
          await LocalStorage.setLoginType(Strings.LOGIN_TYPE_GOOGLE);
          this.props.navigation.navigate('Home');
        })
        .catch(error => {
          this.closeLoading();
        });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // sign in was cancelled
        Alert.alert('cancelled');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation in progress already
        Alert.alert('in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('play services not available or outdated');
      } else {
        Alert.alert('Something went wrong', error.toString());
        this.setState({
          error,
        });
      }
    }
  };

  startLoading = () => {
    this.setState({showLoading: true});
  };
  closeLoading = () => {
    this.setState({showLoading: false});
  };

  render() {
    const {language, showLoading} = this.state;
    const isEnglish = language === Strings.ENGLISH;
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Image
            source={require('../../assets/login_background.png')}
            style={{
              position: 'absolute',
              width: Metric.width,
              height: Metric.height,
              resizeMode: 'cover',
            }}
          />
          <View
            style={{
              position: 'absolute',
              top: 70,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={require('../../assets/login_logo.png')}
              style={{
                width: Metric.width * 0.6,
                resizeMode: 'contain',
              }}
            />
          </View>
          <View
            style={{
              position: 'absolute',
              bottom: 20,
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 20,
            }}>
            <Text style={{color: 'white', fontSize: 32, fontWeight: 'bold'}}>
              Welcome to Jewish
            </Text>
            <Text
              style={{
                color: 'white',
                fontSize: 16,
                marginTop: 10,
                textAlign: 'center',
              }}>
              Some text goes here Some text goes here some text goes here Some
              goes…
            </Text>
            <TouchableOpacity
              style={{
                width: '90%',
                backgroundColor: '#0076FC',
                height: 56,
                borderRadius: 28,
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                marginTop: 20,
              }}
              onPress={async () => {
                // await LocalStorage.setLoggedIn(true);
                // await LocalStorage.setToken(Strings.TEST_TOKEN);
                // await LocalStorage.setLoginType(Strings.LOGIN_TYPE_FACEBOOK);
                // Strings.loginType = Strings.LOGIN_TYPE_FACEBOOK;
                // Strings.localToken = Strings.TEST_TOKEN;
                // this.props.navigation.navigate('Home');
              }}>
              <Image
                source={require('../../assets/facebook.png')}
                style={{width: 14, height: 29, resizeMode: 'contain'}}
              />
              <Text style={{color: 'white', fontSize: 18, marginLeft: 10}}>
                Login with facebook
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: '90%',
                backgroundColor: 'transparent',
                height: 56,
                borderRadius: 28,
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                marginTop: 20,
                borderColor: 'white',
                borderWidth: 1,
              }}
              onPress={async () => {
                // await LocalStorage.setLoggedIn(true);
                // await LocalStorage.setToken(Strings.TEST_TOKEN);
                // await LocalStorage.setLoginType(Strings.LOGIN_TYPE_EMAIL);
                // Strings.loginType = Strings.LOGIN_TYPE_EMAIL;
                // Strings.localToken = Strings.TEST_TOKEN;
                // this.props.navigation.navigate('Home');
              }}>
              <Image
                source={require('../../assets/login_nav.png')}
                style={{width: 25, height: 23, resizeMode: 'contain'}}
              />
              <Text style={{color: 'white', fontSize: 18, marginLeft: 10}}>
                Start with email address
              </Text>
            </TouchableOpacity>
            <GoogleSigninButton
              style={{
                width: '90%',
                backgroundColor: 'transparent',
                height: 56,
                borderRadius: 28,
                marginTop: 20,
              }}
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.Dark}
              onPress={this._signIn}
              disabled={false}
            />
          </View>
        </View>
        <View
          style={{
            height: 30,
            backgroundColor: '#EDEFF1',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>
            {isEnglish
              ? en.memorial.all_over_the_app
              : he.memorial.all_over_the_app}
          </Text>
        </View>
        {showLoading && <Loading />}
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
  updateUser: user => dispatch(UserActions.updateUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
