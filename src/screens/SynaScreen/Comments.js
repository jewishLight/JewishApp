import React, {Component} from 'react';
import {View, Platform, Text, TouchableOpacity, FlatList} from 'react-native';
import {CommentListItem} from '../../components';
import {styles} from './styles';
import {en, he} from '../../constants';

export class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
    };
  }

  _keyExtractor = (item, index) => item._id;

  render() {
    const isEnglish = this.props.isEnglish;
    const {comments} = this.state;
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
            data={comments}
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
        <CommentListItem onPress={() => {}} item={item} />
      </View>
    );
  };
}
