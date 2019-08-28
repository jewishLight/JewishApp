import React, {Component} from 'react';
import {View, Platform, Text, TouchableOpacity, FlatList} from 'react-native';
import {LessonCard} from '../../components';
import {styles} from './styles';

const tempRecentLessonData = [
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

export class RecentLessons extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _keyExtractor = (item, index) => item.id.toString();

  render() {
    return (
      <View style={styles.aroundEventsView}>
        <View style={styles.aroundEventsTopView}>
          <Text style={styles.eventsText}>Recently Added Lessons</Text>
          <TouchableOpacity>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.spacingHorizontal}>
          <FlatList
            data={tempRecentLessonData}
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
        <LessonCard
          onPress={() => {
            this.props.onDetails();
          }}
        />
        {index < tempRecentLessonData.length - 1 && (
          <View style={styles.horizontalSpacing} />
        )}
      </View>
    );
  };
}
