import React, {Component} from 'react';
import {View, Platform, Text, TouchableOpacity, FlatList} from 'react-native';
import {EventCard} from '../../components';
import {styles} from './styles';

const tempEventsData = [
  {
    id: 1,
  },
  {
    id: 2,
  },
  {
    id: 3,
  },
];

export class AroundEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _keyExtractor = (item, index) => item.id.toString();

  render() {
    return (
      <View style={styles.aroundEventsView}>
        <View style={styles.aroundEventsTopView}>
          <Text style={styles.eventsText}>Events around your city</Text>
          <TouchableOpacity>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.spacingHorizontal}>
          <FlatList
            data={tempEventsData}
            renderItem={this.renderEventsData}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            keyExtractor={this._keyExtractor}
          />
        </View>
      </View>
    );
  }

  renderEventsData = ({item, index}) => {
    return (
      <View style={styles.rowView}>
        <EventCard
          onPress={() => {
            this.props.onDetails();
          }}
        />
        {index < tempEventsData.length - 1 && (
          <View style={styles.horizontalSpacing} />
        )}
      </View>
    );
  };
}
