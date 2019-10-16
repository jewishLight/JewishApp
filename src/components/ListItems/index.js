import React from 'react';
import {View, TouchableOpacity, Text, Image} from 'react-native';
import {styles} from './styles';
import {Metric, Colors} from '../../themes';
import {en, he} from '../../constants';
import moment from 'moment';

const getTimeDifferent = (date1, date2) => {
  const diffTime = Math.abs(new Date(date1) - new Date(date2) || new Date());
  const diffSeconds = Math.ceil(diffTime / 1000);
  if (diffSeconds < 60) {
    return `${diffSeconds}s`;
  } else {
    const diffMinutes = Math.ceil(diffTime / (1000 * 60));
    if (diffMinutes < 60) {
      return `${diffMinutes}m`;
    } else {
      const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
      if (diffHours < 24) {
        return `${diffHours}h`;
      } else {
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return `${diffDays}d`;
      }
    }
  }
};

export const CommentListItem = ({onPress, item}) => (
  <TouchableOpacity style={styles.commentItemContainer} onPress={onPress}>
    <View style={{}}>
      <TouchableOpacity>
        <Image
          source={
            item.avatar
              ? {uri: item.avatar}
              : require('../../assets/icon_commentlist_avatar.png')
          }
          style={styles.commentItemAvatar}
        />
      </TouchableOpacity>
    </View>
    <View style={{flex: 1, paddingHorizontal: 10}}>
      <Text style={styles.commentItemNameText}>
        {item.first_name} {item.last_name}
      </Text>
      <Text style={styles.commentItemDescText}>{item.comment_body}</Text>
    </View>
    <View style={styles.commentItemTimeText}>
      <Text>{getTimeDifferent(new Date(), item.date)}</Text>
    </View>
  </TouchableOpacity>
);

export const SearchHistoryItem = ({onPress, item, isEnglish}) => (
  <TouchableOpacity style={styles.searchHistoryItemContainer} onPress={onPress}>
    <Text style={{color: '#9B9B9B', fontSize: 15}}>
      {isEnglish ? en.searchHistory.date : he.searchHistory.date} :{' '}
      {moment(item.date).format('YYYY-MM-DD HH:mm')}
    </Text>
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 5,
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image
          source={require('../../assets/icon_search_history_location.png')}
          style={{width: 16, height: 21, resizeMode: 'contain'}}
        />
        <Text
          style={{marginLeft: 5, fontSize: 12}}
          numberOfLines={1}
          ellipsizeMode={'tail'}>
          {item.address}
        </Text>
      </View>
      <Image
        source={require('../../assets/icon_search_history_rightarrow.png')}
        style={{width: 12, height: 12, resizeMode: 'contain'}}
      />
    </View>
    <View
      style={{marginVertical: 10, height: 1, backgroundColor: Colors.separator}}
    />
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <Image
        source={require('../../assets/icon_search_history_filter.png')}
        style={{width: 15, height: 14, resizeMode: 'contain'}}
      />
      <Text style={{marginLeft: 5, color: '#9B9B9B', fontSize: 12}}>
        {`Filters: ${item.type}, ${item.max_radius}km, startTime: ${
          item.startTime
        }, endTime: ${item.endTime}`}
      </Text>
    </View>
    <View style={{flexDirection: 'row', marginTop: 10}}>
      <View
        style={{
          width: 100,
          height: 34,
          borderRadius: 17,
          backgroundColor: '#E6E5F5',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{color: Colors.primary, fontSize: 12}}>{item.sortBy}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

export const SearchResultItem = ({onPress, item}) => (
  <TouchableOpacity style={styles.searchResultItemContainer} onPress={onPress}>
    <View style={styles.searchResultItemImageContainer}>
      <Image
        source={require('../../assets/icon_search_result_item_syna.png')}
        style={{width: 87, height: 90, resizeMode: 'contain'}}
      />
    </View>
    <View style={{flex: 1, paddingLeft: 10, justifyContent: 'space-between'}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 16}} numberOfLines={1} ellipsizeMode={'tail'}>
          {`${item.name}`}
        </Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {/*<Image*/}
          {/*  source={require('../../assets/icon_search_result_item_location.png')}*/}
          {/*  style={{width: 11, height: 14, resizeMode: 'contain'}}*/}
          {/*/>*/}
          {/*<Text style={{color: '#9B9B9B', fontSize: 12}}>400m</Text>*/}
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View style={{flex: 1}}>
          <Text style={{fontSize: 16}} numberOfLines={1} ellipsizeMode={'tail'}>
            {item.address}
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={require('../../assets/icon_search_result_item_clock.png')}
              style={{width: 15, height: 15, resizeMode: 'contain'}}
            />
            <Text style={{fontSize: 18, color: Colors.primary, marginLeft: 5}}>
              {`${
                item.minyans.length > 0 ? item.minyans[0].startTime || '' : ''
              }`}
            </Text>
            <Text style={{fontSize: 14, color: 'green', marginLeft: 5}}>
              {''}
            </Text>
          </View>
        </View>
        <Image
          source={require('../../assets/icon_search_result_item_bigrightarrow.png')}
          style={{width: 15, height: 15, resizeMode: 'contain'}}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 14, color: '#9B9B9B'}}>{`${
          item.minyans.length > 1 ? item.minyans[1].startTime || '' : ''
        }`}</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={require('../../assets/icon_search_result_item_navigate.png')}
            style={{width: 12, height: 12, resizeMode: 'contain'}}
          />
          <Text style={{fontSize: 14, color: Colors.primary, marginLeft: 5}}>
            Navigate
          </Text>
        </View>
      </View>
    </View>
  </TouchableOpacity>
);
