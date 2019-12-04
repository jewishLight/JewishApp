import React, {Component} from 'react';
import {View, Platform, Text, TouchableOpacity, FlatList} from 'react-native';
import {CommentListItem} from '../../components';
import {styles} from './styles';
import {en, he} from '../../constants';

export class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _keyExtractor = (item, index) => this.props.item._id;

  render() {
    const isEnglish = this.props.isEnglish;
    return (
      <View style={styles.commentsView}>
        <View style={styles.commentsTopView}>
          <Text style={styles.commentsText}>
            {isEnglish ? en.detail.comments : he.detail.comments}
          </Text>
          <Text style={styles.commentsNumberText}>
            {this.props.item.length}{' '}
            {isEnglish ? en.detail.comments : he.detail.comments}
          </Text>
        </View>
        <View style={{marginTop: 10}}>
          <FlatList
            data={this.props.item}
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
