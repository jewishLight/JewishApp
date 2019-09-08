import React, {Component} from 'react';
import {View, Platform, Text, TouchableOpacity, FlatList} from 'react-native';
import {CommentListItem} from '../../components';
import {styles} from './styles';
import {en, he} from '../../constants';

const tempCommentsData = [
  {
    id: 1,
  },
  {
    id: 2,
  },
  {
    id: 3,
  },
  {
    id: 4,
  },
  {
    id: 5,
  },
  {
    id: 6,
  },
];

export class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _keyExtractor = (item, index) => item.id.toString();

  render() {
    const isEnglish = this.props.isEnglish;
    return (
      <View style={styles.commentsView}>
        <View style={styles.commentsTopView}>
          <Text style={styles.commentsText}>
            {isEnglish ? en.detail.comments : he.detail.comments}
          </Text>
          <Text style={styles.commentsNumberText}>
            82 {isEnglish ? en.detail.comments : he.detail.comments}
          </Text>
        </View>
        <View style={{marginTop: 10}}>
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

  renderComments = ({item, index}) => {
    return (
      <View style={styles.rowView}>
        <CommentListItem onPress={() => {}} />
      </View>
    );
  };
}
