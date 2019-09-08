import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import {styles} from './styles';
import Modal from 'react-native-modal';
import {Colors, Metric} from '../../themes';
import {Strings} from '../../utils';
import {en, he} from '../../constants';
import {
  AddModalCloseButton,
  NormalInput,
  NormalPicker,
  LocationInput,
  DateTimeSetter,
  DescriptionInput,
  SynMinTimes,
  NormalSwitch,
  TagView,
  AtoZList,
} from '../../components';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

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

export class NewLessonModal extends Component {
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
          <View style={styles.newLessonModalMainView}>
            <KeyboardAwareScrollView
              keyboardShouldPersistTaps="always"
              style={{flex: 1}}>
              <View style={styles.addNewLine}>
                <Text style={styles.addNewText}>
                  {isEnglish ? en.modal.addNewLesson : he.modal.addNewLesson}
                </Text>
                <AddModalCloseButton
                  onPress={() => {
                    this.hide();
                  }}
                  text={isEnglish ? en.modal.close : he.modal.close}
                />
              </View>
              <View style={styles.addModalSeparator} />
              {/*<KeyboardAvoidingView behavior="height" style={styles.flexFull}>*/}
              {/*<KeyboardAwareScrollView>*/}
              <View style={styles.newLessonModalContainer}>
                <Text style={styles.newLessonModalTextInputTitle}>
                  {isEnglish ? en.modal.enterSubject : he.modal.enterSubject}
                </Text>
                <NormalInput
                  direction={this.props.direction}
                  placeholder={
                    isEnglish
                      ? en.modal.enterSubjectHere
                      : he.modal.enterSubjectHere
                  }
                />
                <Text style={styles.newLessonModalPickerTitle}>
                  {isEnglish ? en.modal.speaker : he.modal.speaker}
                </Text>
                <NormalPicker direction={this.props.direction} />
                <Text style={styles.newLessonModalPickerTitle}>
                  {isEnglish ? en.modal.location : he.modal.location}
                </Text>
                <LocationInput
                  direction={this.props.direction}
                  placeholder={
                    isEnglish ? en.modal.enterLocation : he.modal.enterLocation
                  }
                />
                <Text style={styles.newLessonModalPickerTitle}>
                  {isEnglish ? en.modal.timeAndDate : he.modal.timeAndDate}
                </Text>
                <DateTimeSetter
                  mon={false}
                  tue={false}
                  wed={false}
                  thu={false}
                  fri={false}
                  sat={false}
                  sun={false}
                  isEnglish={isEnglish}
                />
                <Text style={styles.newLessonModalPickerTitle}>
                  {isEnglish ? en.modal.description : he.modal.description}
                </Text>
                <DescriptionInput direction={this.props.direction} />
              </View>
              <View style={styles.verticalSpacing} />
              <View style={styles.addModalSeparator} />
              <View style={styles.verticalSpacingSmall} />
              <View style={styles.newLessonModalContainer}>
                <Text style={styles.newLessonModalTextInputTitle}>
                  {isEnglish ? en.modal.contactName : he.modal.contactName}
                </Text>
                <NormalInput
                  direction={this.props.direction}
                  placeholder={
                    isEnglish ? en.modal.enterNameHere : he.modal.enterNameHere
                  }
                />
                <Text style={styles.newLessonModalTextInputTitle}>
                  {isEnglish ? en.modal.contactNumber : he.modal.contactNumber}
                </Text>
                <NormalInput
                  direction={this.props.direction}
                  placeholder={
                    isEnglish
                      ? en.modal.enterNumberHere
                      : he.modal.enterNumberHere
                  }
                />
                <Text style={styles.newLessonModalPickerTitle}>
                  {isEnglish ? en.modal.audience : he.modal.audience}
                </Text>
                <NormalPicker direction={this.props.direction} />
                <TouchableOpacity
                  style={styles.publishLessonContainer}
                  onPress={() => {
                    this.props.onPublish();
                  }}>
                  <Text style={styles.bigBtnText}>
                    {isEnglish
                      ? en.modal.publishLessons
                      : he.modal.publishLessons}
                  </Text>
                </TouchableOpacity>
                <View style={styles.verticalSpacingBig} />
              </View>
              {/*</KeyboardAwareScrollView>*/}
              {/*</KeyboardAvoidingView>*/}
            </KeyboardAwareScrollView>
          </View>
        </View>
      </Modal>
    );
  }
}

export class NewSynModal extends Component {
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
          <View style={styles.newLessonModalMainView}>
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
            <KeyboardAvoidingView behavior="padding" style={styles.flexFull}>
              <ScrollView>
                <View style={styles.newLessonModalContainer}>
                  <Text style={styles.newLessonModalTextInputTitle}>
                    {isEnglish
                      ? en.modal.synagogueName
                      : he.modal.synagogueName}
                  </Text>
                  <NormalInput
                    direction={this.props.direction}
                    placeholder={
                      isEnglish
                        ? en.modal.enterSynagogueNameHere
                        : he.modal.enterSynagogueNameHere
                    }
                  />

                  <Text style={styles.newLessonModalPickerTitle}>
                    {isEnglish ? en.modal.nosach : he.modal.nosach}
                  </Text>
                  <NormalPicker direction={this.props.direction} />

                  <Text style={styles.newLessonModalPickerTitle}>
                    {isEnglish ? en.modal.location : he.modal.location}
                  </Text>
                  <LocationInput
                    direction={this.props.direction}
                    placeholder={
                      isEnglish
                        ? en.modal.enterLocation
                        : he.modal.enterLocation
                    }
                  />

                  <Text style={styles.newLessonModalPickerTitle}>
                    {isEnglish ? en.modal.addMinTimes : he.modal.addMinTimes}
                  </Text>
                  <SynMinTimes
                    mon={false}
                    tue={false}
                    wed={false}
                    thu={false}
                    fri={false}
                    sat={false}
                    sun={false}
                    type={'week'}
                    isEnglish={isEnglish}
                  />

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <View />
                    <Text style={styles.newLessonModalPickerTitleRed}>
                      {isEnglish ? en.modal.remove : he.modal.remove}
                    </Text>
                  </View>
                  <SynMinTimes
                    mon={false}
                    tue={false}
                    wed={false}
                    thu={false}
                    fri={false}
                    sat={false}
                    sun={false}
                    type={'day'}
                    isEnglish={isEnglish}
                  />

                  <NormalSwitch
                    type={isEnglish ? en.modal.shtiblach : he.modal.shtiblach}
                    initialStatus={false}
                  />

                  <Text style={styles.newLessonModalPickerTitle}>
                    {isEnglish ? en.modal.amenities : he.modal.amenities}
                  </Text>
                  <NormalPicker direction={this.props.direction} />
                  <TagView />

                  <Text style={styles.newLessonModalPickerTitle}>
                    {isEnglish ? en.modal.notes : he.modal.notes}
                  </Text>
                  <DescriptionInput direction={this.props.direction} />

                  <Text style={styles.newLessonModalPickerTitle}>
                    {isEnglish
                      ? en.modal.ownerContactNumber
                      : he.modal.ownerContactNumber}
                  </Text>
                  <NormalInput
                    direction={this.props.direction}
                    placeholder={
                      isEnglish
                        ? en.modal.enterNumberHere
                        : he.modal.enterNumberHere
                    }
                  />
                </View>

                <View style={styles.verticalSpacing} />
                <View style={styles.addModalSeparator} />
                <View style={styles.verticalSpacingSmall} />

                <View style={styles.newLessonModalContainer}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <Text style={styles.newLessonModalTextInputTitle}>
                      {isEnglish
                        ? en.modal.synagoguePicture
                        : he.modal.synagoguePicture}
                    </Text>
                    <TouchableOpacity
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: Colors.uploadImage,
                        width: 160,
                        height: 50,
                        borderRadius: 25,
                        marginTop: 5,
                      }}>
                      <Image
                        source={require('../../assets/icon_modal_upload.png')}
                        style={{width: 20, height: 13, resizeMode: 'contain'}}
                      />
                      <Text
                        style={{color: 'white', marginLeft: 5, fontSize: 15}}>
                        {isEnglish ? en.modal.upload : he.modal.upload}
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <TouchableOpacity
                    style={styles.publishLessonContainer}
                    onPress={() => {
                      this.props.onPublish();
                    }}>
                    <Text style={styles.bigBtnText}>
                      {isEnglish
                        ? en.modal.addNewSynagogue
                        : he.modal.addNewSynagogue}
                    </Text>
                  </TouchableOpacity>
                  <View style={styles.verticalSpacingBig} />
                </View>
              </ScrollView>
            </KeyboardAvoidingView>
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
