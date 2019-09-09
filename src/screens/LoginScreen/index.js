import React, {Component} from 'react';
import {SafeAreaView} from 'react-navigation';
import {
  View,
  Platform,
  BackHandler,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Metric} from '../../themes';
import {LocalStorage, Strings} from '../../utils';

class LoginScreen extends Component {
  static navigationOptions = {
    // gesturesEnabled: Platform.OS !== 'ios',
    gesturesEnabled: false,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount(): void {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
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
                await LocalStorage.setLoggedIn(true);
                await LocalStorage.setToken(Strings.TEST_TOKEN);
                Strings.localToken = Strings.TEST_TOKEN;
                this.props.navigation.navigate('Home');
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
                await LocalStorage.setLoggedIn(true);
                await LocalStorage.setToken(Strings.TEST_TOKEN);
                Strings.localToken = Strings.TEST_TOKEN;
                this.props.navigation.navigate('Home');
              }}>
              <Image
                source={require('../../assets/login_nav.png')}
                style={{width: 25, height: 23, resizeMode: 'contain'}}
              />
              <Text style={{color: 'white', fontSize: 18, marginLeft: 10}}>
                Start with email address
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default LoginScreen;
