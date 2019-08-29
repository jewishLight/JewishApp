import React from 'react';
import {View, TouchableOpacity, Text, Image} from 'react-native';
import {styles} from './styles';
import {Metric, Colors} from '../../themes';

export const CommentListItem = ({onPress}) => (
  <TouchableOpacity style={styles.commentItemContainer} onPress={onPress}>
    <View style={{}}>
      <TouchableOpacity>
        <Image
          source={require('../../assets/icon_commentlist_avatar.png')}
          style={styles.commentItemAvatar}
        />
      </TouchableOpacity>
    </View>
    <View style={{flex: 1, paddingHorizontal: 10}}>
      <Text style={styles.commentItemNameText}>Jonathan Levi</Text>
      <Text style={styles.commentItemDescText}>
        Lorem ipsum is placeholder text commonly used in the graphic, print, and
        publishing...
      </Text>
    </View>
    <View style={styles.commentItemTimeText}>
      <Text>10 min</Text>
    </View>
  </TouchableOpacity>
);

export const SearchHistoryItem = ({onPress}) => (
  <TouchableOpacity style={styles.searchHistoryItemContainer} onPress={onPress}>
    <Text style={{color: '#9B9B9B', fontSize: 15}}>Date : 23.2.2019</Text>
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
        <Text style={{marginLeft: 5, fontSize: 18}}>ABC</Text>
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
        Filters
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
        <Text style={{color: Colors.primary, fontSize: 12}}>Syna</Text>
      </View>
      <View
        style={{
          width: 100,
          height: 34,
          borderRadius: 17,
          backgroundColor: '#E6E5F5',
          justifyContent: 'center',
          alignItems: 'center',
          marginLeft: 10,
        }}>
        <Text style={{color: Colors.primary, fontSize: 12}}>Syna</Text>
      </View>
      <View
        style={{
          width: 100,
          height: 34,
          borderRadius: 17,
          backgroundColor: '#E6E5F5',
          justifyContent: 'center',
          alignItems: 'center',
          marginLeft: 10,
        }}>
        <Text style={{color: Colors.primary, fontSize: 12}}>Syna</Text>
      </View>
    </View>
  </TouchableOpacity>
);

export const SearchResultItem = ({onPress}) => (
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
        <Text style={{fontSize: 16}}>P Time: Mincha</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={require('../../assets/icon_search_result_item_location.png')}
            style={{width: 11, height: 14, resizeMode: 'contain'}}
          />
          <Text style={{color: '#9B9B9B', fontSize: 12}}>400m</Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View>
          <Text style={{fontSize: 16}}>Esh Hatorah</Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={require('../../assets/icon_search_result_item_clock.png')}
              style={{width: 15, height: 15, resizeMode: 'contain'}}
            />
            <Text style={{fontSize: 18, color: Colors.primary, marginLeft: 5}}>
              17:30
            </Text>
            <Text style={{fontSize: 14, color: 'green', marginLeft: 5}}>
              23 min))
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
        <Text style={{fontSize: 14, color: '#9B9B9B'}}>20:30</Text>
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
