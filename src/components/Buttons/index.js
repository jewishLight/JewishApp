import React from 'react';
import {View, TouchableOpacity, Text, Image} from 'react-native';
import {styles} from './styles';
import {Metric} from '../../themes';

export const SearchButton = ({onPress, text}) => (
  <TouchableOpacity style={styles.searchBtnContainer} onPress={onPress}>
    <Image
      source={require('../../assets/icon_search.png')}
      style={styles.searchIcon}
    />
    <Text style={[Metric.font.h4, styles.searchText]}>{text}</Text>
  </TouchableOpacity>
);

export const AddButton = ({onPress, text}) => (
  <TouchableOpacity style={styles.addBtnContainer} onPress={onPress}>
    <Image
      source={require('../../assets/icon_add.png')}
      style={styles.addIcon}
    />
    <Text style={[Metric.font.h4, styles.addText]}>{text}</Text>
  </TouchableOpacity>
);

export const FilterButton = ({onPress}) => (
  <TouchableOpacity style={styles.filterBtnContainer} onPress={onPress}>
    <Image
      source={require('../../assets/icon_filter.png')}
      style={styles.filterIcon}
    />
  </TouchableOpacity>
);

export const LikeButton = ({onPress, text}) => (
  <TouchableOpacity style={styles.likeBtnContainer} onPress={onPress}>
    <Image
      source={require('../../assets/icon_detail_like.png')}
      style={styles.likeIcon}
    />
    <Text style={[Metric.font.h4, styles.likeText]}>{text}</Text>
  </TouchableOpacity>
);

export const CommentButton = ({onPress, text}) => (
  <TouchableOpacity style={styles.commentBtnContainer} onPress={onPress}>
    <View style={styles.commentBtnContainerBack} />
    <Text style={[Metric.font.h4, styles.commentText]}>{text}</Text>
  </TouchableOpacity>
);

export const AddModalCloseButton = ({onPress, text}) => (
  <TouchableOpacity style={styles.addModalCloseBtnContainer} onPress={onPress}>
    <View style={styles.addModalCloseBtnContainerBack} />
    <Text style={[Metric.font.h4, styles.commentText]}>{text}</Text>
  </TouchableOpacity>
);
