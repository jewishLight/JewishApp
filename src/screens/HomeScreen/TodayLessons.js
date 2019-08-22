import React, { Component } from "react";
import { View, Platform, Text, TouchableOpacity, FlatList } from "react-native";
import { LessonCard } from "../../components";
import { styles } from "./styles";

const tempTodayLessonData = [
  {
    id: 1
  },
  {
    id: 2
  },
  {
    id: 3
  }
];

export class TodayLessons extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _keyExtractor = (item, index) => item.id.toString();

  render() {
    return (
      <View style={styles.aroundEventsView}>
        <View style={styles.aroundEventsTopView}>
          <Text style={styles.eventsText}>Today's Lessons</Text>
          <TouchableOpacity>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>
        <View style={{ paddingHorizontal: 15 }}>
          <FlatList
            data={tempTodayLessonData}
            renderItem={this.renderEventsData}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            keyExtractor={this._keyExtractor}
          />
        </View>
      </View>
    );
  }

  renderEventsData = ({ item, index }) => {
    return (
      <View style={styles.rowView}>
        <LessonCard />
        {index < tempTodayLessonData.length - 1 && (
          <View style={styles.horizontalSpacing} />
        )}
      </View>
    );
  };
}
