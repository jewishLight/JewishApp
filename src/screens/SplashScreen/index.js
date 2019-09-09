import React, {Component} from 'react';
import {SafeAreaView} from 'react-navigation';
import {
  View,
  Platform,
  BackHandler,
  Text,
  Image,
  I18nManager,
} from 'react-native';
import {Metric} from '../../themes';
import {LocalStorage, Strings} from '../../utils';

class SplashScreen extends Component {
  static navigationOptions = {
    gesturesEnabled: Platform.OS !== 'ios',
  };

  constructor(props) {
    super(props);
    this.state = {};
    this.splashTimerGone = false;
    this.getOnlineDataTimerGone = false;
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    setTimeout(async () => {
      if (this.getOnlineDataTimerGone === false) {
        let introChecked = await LocalStorage.getIntroChecked();
        if (introChecked) {
          let isLoggedIn = await LocalStorage.getLoggedIn();
          if (isLoggedIn) {
            Strings.localToken = await LocalStorage.getToken();
            this.props.navigation.navigate('Home');
          } else {
            this.props.navigation.navigate('Login');
          }
        } else {
          this.props.navigation.navigate('Intro');
        }
      } else {
        this.splashTimerGone = true;
      }
    }, 3000);
  }

  componentWillUnmount(): void {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton = () => {
    return true;
  };

  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Image
            source={require('../../assets/img_splash.png')}
            style={{
              position: 'absolute',
              width: Metric.width,
              height: Metric.height,
              resizeMode: 'cover',
            }}
          />
          <Image
            source={require('../../assets/splash_background.png')}
            style={{
              position: 'absolute',
              width: Metric.width,
              height: Metric.height,
              resizeMode: 'cover',
              top: Metric.height * 0.25,
            }}
          />
          <Image
            source={require('../../assets/splash_background_top.png')}
            style={{
              position: 'absolute',
              width: Metric.width,
              height: Metric.height,
              resizeMode: 'cover',
              bottom: Metric.height * 0.75,
            }}
          />
          <View
            style={{
              flex: 1,
              paddingBottom: Metric.height * 0.3,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={require('../../assets/splash_logo.png')}
              style={{
                width: Metric.width * 0.6,
                resizeMode: 'contain',
              }}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default SplashScreen;
