import React, {Component} from 'react';
import {View, TouchableOpacity, Text, Image} from 'react-native';
import {styles} from './styles';
import {Metric, Colors} from '../../themes';
import Tags from 'react-native-tags';

export class TagView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
    };
  }

  componentDidMount() {}

  render() {
    return (
      <Tags
        readonly={true}
        initialText="monkey"
        textInputProps={{
          placeholder: 'Any type of animal',
        }}
        initialTags={this.props.items}
        onChangeTags={tags => console.log(tags)}
        onTagPress={(index, tagLabel, event, deleted) => {
          let tags = this.props.items;
          tags.splice(index, 1);
          this.props.itemSelected(tags);
        }}
        containerStyle={{
          marginTop: 10,
        }}
        inputStyle={{backgroundColor: 'white'}}
        renderTag={({tag, index, onPress, deleteTagOnPress, readonly}) => (
          <View
            key={`${tag}-${index}`}
            style={{flexDirection: 'row', marginTop: 10}}>
            <TouchableOpacity
              onPress={onPress}
              style={{
                backgroundColor: Colors.tagBack,
                paddingHorizontal: 10,
                paddingVertical: 5,
                justifyContent: 'center',
                alignItems: 'center',
                height: 30,
                borderRadius: 15,
                flexDirection: 'row',
              }}>
              <Text>{tag}</Text>
              <Image
                source={require('../../assets/icon_modal_tag_cancel.png')}
                style={{
                  width: 9,
                  height: 10,
                  resizeMode: 'contain',
                  marginLeft: 10,
                }}
              />
            </TouchableOpacity>
            <View style={{width: 10}} />
          </View>
        )}
      />
    );
  }
}

export class AmView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      initialTags: initialTagsData,
    };
  }

  componentDidMount() {}

  render() {
    const {initialTags} = this.state;
    return (
      <Tags
        readonly={true}
        initialText="monkey"
        textInputProps={{
          placeholder: 'Any type of animal',
        }}
        initialTags={initialTags}
        onChangeTags={tags => console.log(tags)}
        onTagPress={(index, tagLabel, event, deleted) => {
          // let tags = initialTags;
          // tags.splice(index, 1);
          // this.setState({initialTags: tags});
        }}
        containerStyle={{
          marginTop: 10,
        }}
        inputStyle={{backgroundColor: 'white'}}
        renderTag={({tag, index, onPress, deleteTagOnPress, readonly}) => (
          <View
            key={`${tag}-${index}`}
            style={{flexDirection: 'row', marginTop: 10}}>
            <TouchableOpacity
              onPress={onPress}
              style={{
                backgroundColor: Colors.tagBack,
                paddingHorizontal: 10,
                paddingVertical: 5,
                justifyContent: 'center',
                alignItems: 'center',
                height: 30,
                borderRadius: 15,
                flexDirection: 'row',
              }}>
              <Text>{tag}</Text>
            </TouchableOpacity>
            <View style={{width: 10}} />
          </View>
        )}
      />
    );
  }
}

export class TimeTagView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      initialTags: initialTagsData,
    };
  }

  componentDidMount() {}

  render() {
    const {initialTags} = this.state;
    return (
      <Tags
        readonly={true}
        initialText="monkey"
        textInputProps={{
          placeholder: 'Any type of animal',
        }}
        initialTags={initialTags}
        onChangeTags={tags => console.log(tags)}
        onTagPress={(index, tagLabel, event, deleted) => {
          // let tags = initialTags;
          // tags.splice(index, 1);
          // this.setState({initialTags: tags});
        }}
        containerStyle={{
          marginTop: 10,
        }}
        inputStyle={{backgroundColor: 'white'}}
        renderTag={({tag, index, onPress, deleteTagOnPress, readonly}) => (
          <View
            key={`${tag}-${index}`}
            style={{flexDirection: 'row', marginTop: 10}}>
            <TouchableOpacity
              onPress={onPress}
              style={{
                backgroundColor: Colors.tagBack,
                paddingHorizontal: 10,
                paddingVertical: 10,
                width: Metric.width - 30,
                borderRadius: 5,
              }}>
              <Text style={{color: '#4B5461', fontSize: 12}}>{tag}</Text>
              <Text style={{color: '#EC4256', fontSize: 12, marginTop: 5}}>
                08:00
              </Text>
            </TouchableOpacity>
            <View style={{width: 10}} />
          </View>
        )}
      />
    );
  }
}
