import React, {Component, PureComponent} from 'react';
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
    let latitude = 0;
    let longitude = 0;
    let address = this.props.description;
    if (res) {
      const {location} = res.geometry;
      // address = res.formatted_address;
      latitude = location.lat;
      longitude = location.lng;
    }
    this.props.update({
      latitude,
      longitude,
      address,
      justCity: this.props.structured_formatting.secondary_text,
    });
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
    marginHorizontal: 5,
    height: 40,
    borderBottomWidth: StyleSheet.hairlineWidth,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: 'white',
  },
});
