import React, { Component } from "react";
import { View, Platform, Text, TouchableOpacity, FlatList } from "react-native";
import { CommentListItem } from "../../components";
import { styles } from "./styles";

const tempCommentsData = [
  {
    id: 1
  },
  {
    id: 2
  },
  {
    id: 3
  },
  {
    id: 4
  },
  {
    id: 5
  },
  {
    id: 6
  }
];

export class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _keyExtractor = (item, index) => item.id.toString();

  render() {
    return (
      <View style={styles.commentsView}>
        <View style={styles.commentsTopView}>
          <Text style={styles.commentsText}>Comments</Text>
          <Text style={styles.commentsNumberText}>82 Comments</Text>
        </View>
        <View>
          <FlatList
            data={tempCommentsData}
            renderItem={this.renderComments}
            showsHorizontalScrollIndicator={false}
            keyExtractor={this._keyExtractor}
          />
        </View>
      </View>
    );
  }

  renderComments = ({ item, index }) => {
    return (
      <View style={styles.rowView}>
        <CommentListItem onPress={() => {}} />
      </View>
    );
  };
}
