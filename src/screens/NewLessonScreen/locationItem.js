import React, {PureComponent} from 'react';
import {
  View,
  Alert,
  Text,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
} from 'react-native';

export default class LocationItem extends PureComponent {
  _handlePress = async () => {
    Keyboard.dismiss();
    this.props.clearSearchs();
    const res = await this.props.fetchDetails(this.props.place_id);
    debugger;
    const {location} = res.geometry;
    const address = res.formatted_address;
    const latitude = location.lat;
    const longitude = location.lng;
    this.props.update({latitude, longitude, address});
  };

  render() {
    return (
      <TouchableOpacity style={styles.root} onPress={this._handlePress}>
        <Text>{this.props.description}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    height: 40,
    borderBottomWidth: StyleSheet.hairlineWidth,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: 'lightgray',
  },
});
