import React, {Component} from 'react';
import {SafeAreaView} from 'react-navigation';
import {View, Platform, BackHandler, Text} from 'react-native';
import {MapViewHeader} from '../../components';
import MapView from 'react-native-maps';
import {Metric} from '../../themes';

class MapViewScreen extends Component {
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
        <MapViewHeader onBack={this.onBack} />
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <MapView
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            style={{
              width: Metric.width,
              height: Metric.height - Metric.searchHeaderHeight,
            }}
          />
        </View>
      </SafeAreaView>
    );
  }
}

export default MapViewScreen;
