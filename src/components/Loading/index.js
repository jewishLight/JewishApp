import React, {Component} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {Metric} from '../../themes';

export class Loading extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <View
        style={{
          position: 'absolute',
          width: Metric.width,
          height: Metric.height,
        }}>
        <View
          style={{
            position: 'absolute',
            width: Metric.width,
            height: Metric.height,
            backgroundColor: 'black',
            opacity: 0.4,
          }}
        />
        <View
          style={{
            position: 'absolute',
            width: Metric.width,
            height: Metric.height,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator />
        </View>
      </View>
    );
  }
}
