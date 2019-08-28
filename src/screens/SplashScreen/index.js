import React, {Component} from 'react';
import {SafeAreaView} from 'react-navigation';
import {View, Platform, BackHandler} from 'react-native';

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

  componentDidMount(): void {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    setTimeout(() => {
      if (this.getOnlineDataTimerGone === false) {
        this.props.navigation.navigate('DrawerMenu');
      } else {
        this.splashTimerGone = true;
      }
    }, 100);
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
        <View />
      </SafeAreaView>
    );
  }
}

export default SplashScreen;
