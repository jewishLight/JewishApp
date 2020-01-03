import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Colors} from '../../themes';

class CustomMarker extends React.Component {
  render() {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: 100,
        }}>
        <Text
          style={{fontSize: 11, color: '#3F4046', fontFamily: 'Heebo-Regular'}}>
          {this.props.value}
        </Text>
        <View style={{height: 5}} />
        <View
          style={{
            width: 20,
            height: 20,
            backgroundColor: Colors.primary,
            borderRadius: 10,
          }}
        />
        <View style={{height: 5}} />
        <Text
          style={{fontSize: 11, color: '#3F4046', fontFamily: 'Heebo-Regular'}}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    height: 40,
    width: 40,
  },
});

export default CustomMarker;
