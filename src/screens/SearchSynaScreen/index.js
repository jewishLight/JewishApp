import {styles} from './styles';
import {Text, TouchableOpacity, View, TextInput, FlatList} from 'react-native';
import {en, he} from '../../constants';
import React, {Component} from 'react';
import {SafeAreaView} from 'react-navigation';
import {Metric} from '../../themes';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {EventCard} from '../../components/Cards';
import {ApiRequest} from '../../utils';

class SearchSynaScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      synas: [],
    };
  }

  componentDidMount() {}

  _keyExtractor = (item, index) => item._id;

  onChangeSyna = text => {
    if (!this.state.isLoading) {
      this.setState({isLoading: true});
      ApiRequest(`search/autocomplete/synagogues?name=${text}`)
        .then(response => {
          this.setState({isLoading: false, synas: response});
        })
        .catch(error => {
          this.setState({isLoading: false, synas: []});
        });
    }
  };

  render() {
    const isEnglish = this.props.navigation.state.params.isEnglish;
    return (
      <SafeAreaView style={styles.searchContainer}>
        <KeyboardAwareScrollView>
          <View style={styles.addNewLine}>
            <Text style={styles.addNewText}>
              {isEnglish ? en.modal.addNewSynagogue : he.modal.addNewSynagogue}
            </Text>
            <TouchableOpacity
              style={styles.addModalCloseBtnContainer}
              onPress={() => {
                this.props.navigation.goBack();
              }}>
              <View style={styles.addModalCloseBtnContainerBack} />
              <Text style={[Metric.font.h4, styles.commentText]}>
                {isEnglish ? en.modal.close : he.modal.close}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.addModalSeparator} />
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TextInput
              style={styles.autoCompleteTextInput}
              onChangeText={this.onChangeSyna}
              placeholder={
                isEnglish
                  ? en.pleaseTypeTheSynagogueName
                  : he.pleaseTypeTheSynagogueName
              }
            />
          </View>
          <View style={{flex: 1, paddingHorizontal: 15, paddingTop: 10}}>
            <FlatList
              data={this.state.synas}
              renderItem={this.renderRow}
              keyExtractor={this._keyExtractor}
            />
            <TouchableOpacity
              style={{paddingVertical: 5}}
              onPress={() => {
                this.props.navigation.goBack();
                this.props.navigation.state.params.onSyna();
              }}>
              <Text style={{fontSize: 18, color: '#6461c4'}}>
                {isEnglish ? en.notHere : he.notHere}
              </Text>
              <Text style={{fontSize: 13, color: '#6461c4'}}>
                {isEnglish
                  ? en.clickHereToCreateNewSyna
                  : he.clickHereToCreateNewSyna}
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }

  renderRow = ({item, index}) => {
    return (
      <TouchableOpacity
        style={{paddingVertical: 5}}
        onPress={() => {
          this.props.navigation.goBack();
          this.props.navigation.state.params.goSyna(item._id);
        }}>
        <Text style={{fontSize: 18}}>{item.address}</Text>
        <Text style={{fontSize: 13}}>Location</Text>
      </TouchableOpacity>
    );
  };
}

export default SearchSynaScreen;
