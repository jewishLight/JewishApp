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
    return (
      <Modal visible={this.state.modalVisible} style={styles.addModalContainer}>
        <View style={styles.addModalView}>
          <View style={styles.addModalDropdownView} />
          <View style={styles.addModalMainView}>
            <View style={styles.addNewLine}>
              <Text style={styles.addNewText}>Add New</Text>
              <AddModalCloseButton
                onPress={() => {
                  this.hide();
                }}
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
                <Text style={styles.synText}>Synagogue</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.addLessonBtn}
                onPress={() => {
                  this.hide();
                  this.props.callBack(Strings.MODAL_FLAG_ADD_LESSON);
                }}>
                <Text style={styles.lessonText}>Lesson</Text>
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
    return (
      <Modal visible={this.state.modalVisible} style={styles.addModalContainer}>
        <View style={styles.addModalView}>
          <View style={styles.addModalDropdownView} />
          <View style={styles.filterModalMainView}>
            <View style={styles.addNewLine}>
              <Text style={styles.addNewText}>Filter</Text>
              <AddModalCloseButton
                onPress={() => {
                  this.hide();
                }}
              />
            </View>
            <View style={styles.addModalSeparator} />
            <View style={styles.addBtnsContainer}>
              <TouchableOpacity
                style={styles.addSynBtn}
                onPress={() => {
                  this.hide();
                }}>
                <Text style={styles.synText}>Lessons</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.addSynBtn}
                onPress={() => {
                  this.hide();
                }}>
                <Text style={styles.synText}>Synagogue</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.addSynBtn}
                onPress={() => {
                  this.hide();
                }}>
                <Text style={styles.synText}>Both Lessons & Synagogue</Text>
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
    return (
      <Modal visible={this.state.modalVisible} style={styles.addModalContainer}>
        <View style={styles.addModalView}>
          <View style={styles.addModalDropdownView} />
          <View style={styles.newLessonModalMainView}>
            <KeyboardAwareScrollView
              keyboardShouldPersistTaps="always"
              style={{flex: 1}}>
              <View style={styles.addNewLine}>
                <Text style={styles.addNewText}>Add New Lesson</Text>
                <AddModalCloseButton
                  onPress={() => {
                    this.hide();
                  }}
                />
              </View>
              <View style={styles.addModalSeparator} />
              {/*<KeyboardAvoidingView behavior="height" style={styles.flexFull}>*/}
              {/*<KeyboardAwareScrollView>*/}
              <View style={styles.newLessonModalContainer}>
                <Text style={styles.newLessonModalTextInputTitle}>
                  Enter Subject
                </Text>
                <NormalInput
                  direction={this.props.direction}
                  placeholder={'Enter subject here...'}
                />
                <Text style={styles.newLessonModalPickerTitle}>Speaker</Text>
                <NormalPicker direction={this.props.direction} />
                <Text style={styles.newLessonModalPickerTitle}>Location</Text>
                <LocationInput
                  direction={this.props.direction}
                  placeholder={'Enter location...'}
                />
                <Text style={styles.newLessonModalPickerTitle}>
                  Time and Date
                </Text>
                <DateTimeSetter
                  mon={false}
                  tue={false}
                  wed={false}
                  thu={false}
                  fri={false}
                  sat={false}
                  sun={false}
                />
                <Text style={styles.newLessonModalPickerTitle}>
                  Description
                </Text>
                <DescriptionInput direction={this.props.direction} />
              </View>
              <View style={styles.verticalSpacing} />
              <View style={styles.addModalSeparator} />
              <View style={styles.verticalSpacingSmall} />
              <View style={styles.newLessonModalContainer}>
                <Text style={styles.newLessonModalTextInputTitle}>
                  Contact Name
                </Text>
                <NormalInput
                  direction={this.props.direction}
                  placeholder={'Enter name here...'}
                />
                <Text style={styles.newLessonModalTextInputTitle}>
                  Contact Number
                </Text>
                <NormalInput
                  direction={this.props.direction}
                  placeholder={'Enter number here...'}
                />
                <Text style={styles.newLessonModalPickerTitle}>
                  Select Audience
                </Text>
                <NormalPicker direction={this.props.direction} />
                <TouchableOpacity
                  style={styles.publishLessonContainer}
                  onPress={() => {
                    this.props.onPublish();
                  }}>
                  <Text style={styles.bigBtnText}>Publish Lessons</Text>
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
    return (
      <Modal visible={this.state.modalVisible} style={styles.addModalContainer}>
        <View style={styles.addModalView}>
          <View style={styles.addModalDropdownView} />
          <View style={styles.newLessonModalMainView}>
            <View style={styles.addNewLine}>
              <Text style={styles.addNewText}>Add New Synagogue</Text>
              <AddModalCloseButton
                onPress={() => {
                  this.hide();
                }}
              />
            </View>
            <View style={styles.addModalSeparator} />
            <KeyboardAvoidingView behavior="padding" style={styles.flexFull}>
              <ScrollView>
                <View style={styles.newLessonModalContainer}>
                  <Text style={styles.newLessonModalTextInputTitle}>
                    Syn Name *
                  </Text>
                  <NormalInput
                    direction={this.props.direction}
                    placeholder={'Enter syn name here...'}
                  />

                  <Text style={styles.newLessonModalPickerTitle}>Nosach</Text>
                  <NormalPicker direction={this.props.direction} />

                  <Text style={styles.newLessonModalPickerTitle}>Location</Text>
                  <LocationInput
                    direction={this.props.direction}
                    placeholder={'Enter location...'}
                  />

                  <Text style={styles.newLessonModalPickerTitle}>
                    Add min times
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
                  />

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <View />
                    <Text style={styles.newLessonModalPickerTitleRed}>
                      Remove
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
                  />

                  <NormalSwitch type={'Shtiblach'} initialStatus={false} />

                  <Text style={styles.newLessonModalPickerTitle}>
                    Amenities
                  </Text>
                  <NormalPicker direction={this.props.direction} />
                  <TagView />

                  <Text style={styles.newLessonModalPickerTitle}>Notes</Text>
                  <DescriptionInput direction={this.props.direction} />

                  <Text style={styles.newLessonModalPickerTitle}>
                    Owner Contact Number
                  </Text>
                  <NormalInput
                    direction={this.props.direction}
                    placeholder={'Enter contact number...'}
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
                      Syna Picture
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
                        Upload
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <TouchableOpacity
                    style={styles.publishLessonContainer}
                    onPress={() => {
                      this.props.onPublish();
                    }}>
                    <Text style={styles.bigBtnText}>Add New Syna</Text>
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
