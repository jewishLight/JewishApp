import React, {Component} from 'react';
import {View, Platform, Text, TouchableOpacity, FlatList} from 'react-native';
import {LessonCard} from '../../components';
import {styles} from './styles';
import {en, he} from '../../constants';

export class PopularLessons extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _keyExtractor = (item, index) => item._id;

  render() {
    const {todayLessons} = this.props;
    return (
      <View style={styles.aroundEventsView}>
        <View style={styles.aroundEventsTopView}>
          <Text style={styles.eventsText}>
            {this.props.isEnglish
              ? en.home.mostPopularLessons
              : he.home.mostPopularLessons}
          </Text>
          <TouchableOpacity>
            <Text style={styles.viewAllText}>
              {this.props.isEnglish ? en.home.viewAll : he.home.viewAll}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.spacingHorizontal}>
          <FlatList
            data={todayLessons}
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
            this.props.onDetails(item._id);
          }}
          item={item}
        />
        {index < this.props.todayLessons.length - 1 && (
          <View style={styles.horizontalSpacing} />
        )}
      </View>
    );
  };
}
