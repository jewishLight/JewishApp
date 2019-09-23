import React, {Component} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {styles} from './styles';
import Modal from 'react-native-modal';
import {Colors, Metric} from '../../themes';
import {Strings} from '../../utils';
import {en, he} from '../../constants';
import {AddModalCloseButton} from '../../components';

export class AddModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
    };
  }

  componentDidMount() {}

  show = () => {
    this.setState({modalVisible: true});
  };

  hide = () => {
    this.setState({modalVisible: false});
  };

  render() {
    const isEnglish = this.props.isEnglish;
    return (
      <Modal visible={this.state.modalVisible} style={styles.addModalContainer}>
        <View style={styles.addModalView}>
          <View style={styles.addModalDropdownView} />
          <View style={styles.addModalMainView}>
            <View style={styles.addNewLine}>
              <Text style={styles.addNewText}>
                {isEnglish ? en.modal.addNew : he.modal.addNew}
              </Text>
              <AddModalCloseButton
                onPress={() => {
                  this.hide();
                }}
                text={isEnglish ? en.modal.close : he.modal.close}
              />
            </View>
            <View style={styles.addModalSeparator} />
            <View style={styles.addBtnsContainer}>
              <TouchableOpacity
                style={styles.addSynBtn}
                onPress={() => {
                  this.hide();
                  this.props.callBack(Strings.MODAL_FLAG_ADD_SYN);
                }}>
                <Text style={styles.synText}>
                  {isEnglish ? en.modal.synagogue : he.modal.synagogue}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.addLessonBtn}
                onPress={() => {
                  this.hide();
                  this.props.callBack(Strings.MODAL_FLAG_ADD_LESSON);
                }}>
                <Text style={styles.lessonText}>
                  {isEnglish ? en.modal.lesson : he.modal.lesson}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

export class FilterModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
    };
  }

  componentDidMount() {
    this.tagData = [];
  }

  show = () => {
    this.setState({modalVisible: true});
  };

  hide = () => {
    this.setState({modalVisible: false});
  };

  render() {
    const isEnglish = this.props.isEnglish;
    return (
      <Modal visible={this.state.modalVisible} style={styles.addModalContainer}>
        <View style={styles.addModalView}>
          <View style={styles.addModalDropdownView} />
          <View style={styles.filterModalMainView}>
            <View style={styles.addNewLine}>
              <Text style={styles.addNewText}>
                {isEnglish ? en.modal.filter : he.modal.filter}
              </Text>
              <AddModalCloseButton
                onPress={() => {
                  this.hide();
                }}
                text={isEnglish ? en.modal.close : he.modal.close}
              />
            </View>
            <View style={styles.addModalSeparator} />
            <View style={styles.addBtnsContainer}>
              <TouchableOpacity
                style={styles.addSynBtn}
                onPress={() => {
                  this.hide();
                }}>
                <Text style={styles.synText}>
                  {isEnglish ? en.modal.lesson : he.modal.lesson}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.addSynBtn}
                onPress={() => {
                  this.hide();
                }}>
                <Text style={styles.synText}>
                  {isEnglish ? en.modal.synagogue : he.modal.synagogue}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.addSynBtn}
                onPress={() => {
                  this.hide();
                }}>
                <Text style={styles.synText}>
                  {isEnglish
                    ? en.modal.bothLessonsAndSynagogue
                    : he.modal.bothLessonsAndSynagogue}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

import AlphaScrollFlatList from 'alpha-scroll-flat-list';
const ITEM_HEIGHT = 50;
import people from './names';

export class ChangeLocationModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
    };
  }

  componentDidMount() {}

  show = () => {
    this.setState({modalVisible: true});
  };

  hide = () => {
    this.setState({modalVisible: false});
  };

  onSelectLocation = (index, name) => {
    this.hide();
    this.props.onSelectLocation(index, name);
  };

  renderItem = ({item, index}) => {
    return (
      <View style={{paddingRight: 30}}>
        <TouchableOpacity
          style={{
            height: 50,
            flexDirection: 'row',
            alignItems: 'center',
          }}
          onPress={() => {
            this.onSelectLocation(index, item.name);
          }}>
          <Text>{item.name}</Text>
        </TouchableOpacity>
        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: Colors.separator,
          }}
        />
      </View>
    );
  };

  keyExtractor = item => {
    return item.code;
  };

  render() {
    return (
      <Modal visible={this.state.modalVisible} style={styles.addModalContainer}>
        <View style={styles.addModalView}>
          <View style={styles.addModalDropdownView} />
          <View style={styles.alphaModalMainView}>
            <View style={styles.addNewLine}>
              <Text style={styles.addNewText}>Change Location</Text>
              <AddModalCloseButton
                onPress={() => {
                  this.hide();
                }}
                text={this.props.isEnglish ? en.modal.close : he.modal.close}
              />
            </View>
            <View style={styles.addModalSeparator} />
            <View style={styles.alphaListModalContainer}>
              <AlphaScrollFlatList
                keyExtractor={this.keyExtractor.bind(this)}
                data={people.sort((prev, next) =>
                  prev.name.localeCompare(next.name),
                )}
                renderItem={this.renderItem}
                scrollKey={'name'}
                reverse={false}
                itemHeight={ITEM_HEIGHT}
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

export class SearchSynaModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
    };
  }

  componentDidMount() {}

  show = () => {
    this.setState({modalVisible: true});
  };

  hide = () => {
    this.setState({modalVisible: false});
  };

  render() {
    const isEnglish = this.props.isEnglish;
    return (
      <Modal visible={this.state.modalVisible} style={styles.addModalContainer}>
        <View style={styles.addModalView}>
          <View style={styles.addModalDropdownView} />
          <View style={styles.searchSynModalMainView}>
            <View style={styles.addNewLine}>
              <Text style={styles.addNewText}>
                {isEnglish
                  ? en.modal.addNewSynagogue
                  : he.modal.addNewSynagogue}
              </Text>
              <AddModalCloseButton
                onPress={() => {
                  this.hide();
                }}
                text={isEnglish ? en.modal.close : he.modal.close}
              />
            </View>
            <View style={styles.addModalSeparator} />
            <View style={styles.addBtnsContainer} />
          </View>
        </View>
      </Modal>
    );
  }
}
