import React, {Component} from 'react';
import {SafeAreaView} from 'react-navigation';
import {
  View,
  Platform,
  BackHandler,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Metric, Colors} from '../../themes';
import {LocalStorage, Strings} from '../../utils';

class IntroScreen extends Component {
  static navigationOptions = {
    // gesturesEnabled: Platform.OS !== 'ios',
    gesturesEnabled: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      introStep: 1,
    };
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
    const {introStep} = this.state;
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Image
            source={require('../../assets/intro_background.png')}
            style={{
              width: Metric.width,
              height: Metric.height,
              resizeMode: 'cover',
              position: 'absolute',
              top: 0,
            }}
          />
          <View
            style={{
              width: Metric.width - 30,
              height: Metric.width - 30,
              position: 'absolute',
              top: 50,
            }}>
            <Image
              source={require('../../assets/intro_logo_backimg.png')}
              style={{width: '100%', height: '100%', resizeMode: 'contain'}}
            />
            <View
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {introStep === 1 && (
                <Image
                  source={require('../../assets/intro_logo1.png')}
                  style={{width: '70%', height: '70%', resizeMode: 'contain'}}
                />
              )}
              {introStep === 2 && (
                <Image
                  source={require('../../assets/intro_logo2.png')}
                  style={{width: '70%', height: '70%', resizeMode: 'contain'}}
                />
              )}
              {introStep === 3 && (
                <Image
                  source={require('../../assets/intro_logo3.png')}
                  style={{width: '70%', height: '70%', resizeMode: 'contain'}}
                />
              )}
            </View>
          </View>
          <View
            style={{
              position: 'absolute',
              top: Metric.width + 50,
              width: Metric.width - 30,
              alignItems: 'center',
            }}>
            {introStep === 1 && (
              <Image
                source={require('../../assets/intro_slider1.png')}
                style={{width: 60, resizeMode: 'contain'}}
              />
            )}
            {introStep === 2 && (
              <Image
                source={require('../../assets/intro_slider2.png')}
                style={{width: 60, resizeMode: 'contain'}}
              />
            )}
            {introStep === 3 && (
              <Image
                source={require('../../assets/intro_slider3.png')}
                style={{width: 60, resizeMode: 'contain'}}
              />
            )}

            <Text style={{color: 'white', fontSize: 22, marginTop: 15}}>
              Search
            </Text>
            <Text
              style={{
                color: 'white',
                fontSize: 14,
                textAlign: 'center',
                marginTop: 10,
              }}>
              Lorem ipsum is placeholder text commonly used in the graphic,
              print, and publishing industries for previewing layouts and visual
              mockups.
            </Text>
            <TouchableOpacity
              style={{
                width: '80%',
                height: 40,
                borderRadius: 20,
                backgroundColor: 'white',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 20,
              }}
              onPress={async () => {
                if (introStep === 1) {
                  this.setState({introStep: 2});
                } else if (introStep === 2) {
                  this.setState({introStep: 3});
                } else {
                  await LocalStorage.setIntroChecked(true);
                  this.props.navigation.navigate('Login');
                }
              }}>
              <Text style={{color: Colors.primary, fontSize: 14}}>
                Continue
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: '80%',
                height: 40,
                borderRadius: 20,
                backgroundColor: 'transparent',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 10,
              }}
              onPress={async () => {
                await LocalStorage.setIntroChecked(true);
                this.props.navigation.navigate('Login');
              }}>
              <Text style={{color: 'white', fontSize: 14}}>
                {introStep < 3 ? 'Skip' : 'Done'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default IntroScreen;
