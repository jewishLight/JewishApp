import React, {Component} from 'react';
import {SafeAreaView} from 'react-navigation';
import {View, Platform, BackHandler, Text} from 'react-native';
import {FavoriteHeader} from '../../components';

class FavoriteScreen extends Component {
  static navigationOptions = {
    gesturesEnabled: Platform.OS !== 'ios',
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

  onBack = () => {
    this.props.navigation.goBack();
  };

  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <FavoriteHeader onBack={this.onBack} />
        <View
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
        />
      </SafeAreaView>
    );
  }
}

export default FavoriteScreen;
