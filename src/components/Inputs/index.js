import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  TextInput,
  StyleSheet,
  Switch,
  Platform,
} from 'react-native';
import {styles} from './styles';
import Modal from 'react-native-modal';
import {Colors, Metric, Strings} from '../../themes';
import {AddModalCloseButton} from '../../components';
import RNPickerSelect from 'react-native-picker-select';
import {Chevron} from 'react-native-shapes';
import {en, he} from '../../constants';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

export class NormalInput extends Component {
  constructor(props) {
    super(props);
  }

  clear = () => {
    this.setState({text: ''});
  };

  render() {
    const {...rest} = this.props;
    return (
      <View style={{}}>
        <TextInput
          style={[
            styles.newLessonSubjectTextInput,
            this.props.direction === 'rtl'
              ? {textAlign: 'right'}
              : {textAlign: 'left'},
          ]}
          placeholder={this.props.placeholder}
          onChangeText={text => {
            this.setState({text});
            this.props.onChangeText(text);
          }}
          // value={this.state.text}
          keyboardType={this.props.phoneNumber ? 'phone-pad' : 'default'}
          {...rest}
        />
      </View>
    );
  }
}

export class NosachPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    let isEnglish = this.props.isEnglish;
    const {...rest} = this.props;
    return (
      <View style={{marginTop: 10}}>
        <RNPickerSelect
          style={
            this.props.direction === 'rtl'
              ? {
                  inputIOS: {
                    fontSize: 16,
                    paddingVertical: 12,
                    paddingHorizontal: 10,
                    borderWidth: 1,
                    borderColor: 'gray',
                    borderRadius: 4,
                    color: 'black',
                    paddingRight: 40, //
                    textAlign: 'right', // to ensure the text is never behind the icon
                  },
                  inputAndroid: {
                    fontSize: 16,
                    paddingHorizontal: 10,
                    paddingVertical: 8,
                    borderWidth: 0.5,
                    borderColor: 'purple',
                    borderRadius: 8,
                    color: 'black',
                    paddingRight: 40, // to ensure the text is never behind the icon
                    textAlign: 'right',
                  },
                  iconContainer: {
                    right: 10,
                  },
                }
              : {
                  inputIOS: {
                    fontSize: 16,
                    paddingVertical: 12,
                    paddingHorizontal: 10,
                    borderWidth: 1,
                    borderColor: 'gray',
                    borderRadius: 4,
                    color: 'black',
                    paddingRight: 40, //
                    textAlign: 'left', // to ensure the text is never behind the icon
                  },
                  inputAndroid: {
                    fontSize: 16,
                    paddingHorizontal: 10,
                    paddingVertical: 8,
                    borderWidth: 0.5,
                    borderColor: 'purple',
                    borderRadius: 8,
                    color: 'black',
                    paddingRight: 40, // to ensure the text is never behind the icon
                    textAlign: 'left',
                  },
                  iconContainer: {
                    right: 10,
                  },
                }
          }
          onValueChange={value => {
            this.props.onSelect(value);
          }}
          items={[
            {
              label: isEnglish ? en.nosach.value_0 : he.nosach.value_0,
              value: '0',
            },
            {
              label: isEnglish ? en.nosach.value_1 : he.nosach.value_1,
              value: '1',
            },
            {
              label: isEnglish ? en.nosach.value_2 : he.nosach.value_2,
              value: '2',
            },
            {
              label: isEnglish ? en.nosach.value_3 : he.nosach.value_3,
              value: '3',
            },
            {
              label: isEnglish ? en.nosach.value_4 : he.nosach.value_4,
              value: '4',
            },
            {
              label: isEnglish ? en.nosach.value_5 : he.nosach.value_5,
              value: '5',
            },
          ]}
          useNativeAndroidPickerStyle={false}
          placeholder={{label: '', value: null}}
          {...rest}
        />
        <Image
          source={require('../../assets/icon_add_modal_picker_downarrow.png')}
          style={{
            width: 15,
            height: 15,
            resizeMode: 'contain',
            position: 'absolute',
            right: 15,
            top: 13,
          }}
        />
      </View>
    );
  }
}

export class NormalPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <View style={{marginTop: 10}}>
        <RNPickerSelect
          style={
            this.props.direction === 'rtl'
              ? {
                  inputIOS: {
                    fontSize: 16,
                    paddingVertical: 12,
                    paddingHorizontal: 10,
                    borderWidth: 1,
                    borderColor: 'gray',
                    borderRadius: 4,
                    color: 'black',
                    paddingRight: 40, //
                    textAlign: 'right', // to ensure the text is never behind the icon
                  },
                  inputAndroid: {
                    fontSize: 16,
                    paddingHorizontal: 10,
                    paddingVertical: 8,
                    borderWidth: 0.5,
                    borderColor: 'purple',
                    borderRadius: 8,
                    color: 'black',
                    paddingRight: 40, // to ensure the text is never behind the icon
                    textAlign: 'right',
                  },
                  iconContainer: {
                    right: 10,
                  },
                }
              : {
                  inputIOS: {
                    fontSize: 16,
                    paddingVertical: 12,
                    paddingHorizontal: 10,
                    borderWidth: 1,
                    borderColor: 'gray',
                    borderRadius: 4,
                    color: 'black',
                    paddingRight: 40, //
                    textAlign: 'left', // to ensure the text is never behind the icon
                  },
                  inputAndroid: {
                    fontSize: 16,
                    paddingHorizontal: 10,
                    paddingVertical: 8,
                    borderWidth: 0.5,
                    borderColor: 'purple',
                    borderRadius: 8,
                    color: 'black',
                    paddingRight: 40, // to ensure the text is never behind the icon
                    textAlign: 'left',
                  },
                  iconContainer: {
                    right: 10,
                  },
                }
          }
          onValueChange={value => console.log(value)}
          items={[
            {
              label: '0',
              value: '0',
            },
            {
              label: '1',
              value: '1',
            },
            {
              label: '2',
              value: '2',
            },
            {
              label: '3',
              value: '3',
            },
            {
              label: '4',
              value: '4',
            },
            {
              label: '5',
              value: '5',
            },
          ]}
          useNativeAndroidPickerStyle={false}
          placeholder={{label: '', value: null}}
        />
        <Image
          source={require('../../assets/icon_add_modal_picker_downarrow.png')}
          style={{
            width: 15,
            height: 15,
            resizeMode: 'contain',
            position: 'absolute',
            right: 15,
            top: 13,
          }}
        />
      </View>
    );
  }
}

export class SpeakerPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    const {...rest} = this.props;
    return (
      <View style={{marginTop: 10}}>
        <RNPickerSelect
          style={
            this.props.direction === 'rtl'
              ? {
                  inputIOS: {
                    fontSize: 16,
                    paddingVertical: 12,
                    paddingHorizontal: 10,
                    borderWidth: 1,
                    borderColor: 'gray',
                    borderRadius: 4,
                    color: 'black',
                    paddingRight: 40, //
                    textAlign: 'right', // to ensure the text is never behind the icon
                  },
                  inputAndroid: {
                    fontSize: 16,
                    paddingHorizontal: 10,
                    paddingVertical: 8,
                    borderWidth: 0.5,
                    borderColor: 'purple',
                    borderRadius: 8,
                    color: 'black',
                    paddingRight: 40, // to ensure the text is never behind the icon
                    textAlign: 'right',
                  },
                  iconContainer: {
                    right: 10,
                  },
                }
              : {
                  inputIOS: {
                    fontSize: 16,
                    paddingVertical: 12,
                    paddingHorizontal: 10,
                    borderWidth: 1,
                    borderColor: 'gray',
                    borderRadius: 4,
                    color: 'black',
                    paddingRight: 40, //
                    textAlign: 'left', // to ensure the text is never behind the icon
                  },
                  inputAndroid: {
                    fontSize: 16,
                    paddingHorizontal: 10,
                    paddingVertical: 8,
                    borderWidth: 0.5,
                    borderColor: 'purple',
                    borderRadius: 8,
                    color: 'black',
                    paddingRight: 40, // to ensure the text is never behind the icon
                    textAlign: 'left',
                  },
                  iconContainer: {
                    right: 10,
                  },
                }
          }
          onValueChange={value => this.props.onValueChange(value)}
          items={this.props.items}
          useNativeAndroidPickerStyle={false}
          placeholder={{label: this.props.placeholder, value: null}}
          {...rest}
        />
        <Image
          source={require('../../assets/icon_add_modal_picker_downarrow.png')}
          style={{
            width: 15,
            height: 15,
            resizeMode: 'contain',
            position: 'absolute',
            right: 15,
            top: 13,
          }}
        />
      </View>
    );
  }
}

export class AmenitiesPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    let isEnglish = this.props.isEnglish;
    const {...rest} = this.props;
    return (
      <View style={{marginTop: 10}}>
        <RNPickerSelect
          style={
            this.props.direction === 'rtl'
              ? {
                  inputIOS: {
                    fontSize: 16,
                    paddingVertical: 12,
                    paddingHorizontal: 10,
                    borderWidth: 1,
                    borderColor: 'gray',
                    borderRadius: 4,
                    color: 'black',
                    paddingRight: 40, //
                    textAlign: 'right', // to ensure the text is never behind the icon
                  },
                  inputAndroid: {
                    fontSize: 16,
                    paddingHorizontal: 10,
                    paddingVertical: 8,
                    borderWidth: 0.5,
                    borderColor: 'purple',
                    borderRadius: 8,
                    color: 'black',
                    paddingRight: 40, // to ensure the text is never behind the icon
                    textAlign: 'right',
                  },
                  iconContainer: {
                    right: 10,
                  },
                }
              : {
                  inputIOS: {
                    fontSize: 16,
                    paddingVertical: 12,
                    paddingHorizontal: 10,
                    borderWidth: 1,
                    borderColor: 'gray',
                    borderRadius: 4,
                    color: 'black',
                    paddingRight: 40, //
                    textAlign: 'left', // to ensure the text is never behind the icon
                  },
                  inputAndroid: {
                    fontSize: 16,
                    paddingHorizontal: 10,
                    paddingVertical: 8,
                    borderWidth: 0.5,
                    borderColor: 'purple',
                    borderRadius: 8,
                    color: 'black',
                    paddingRight: 40, // to ensure the text is never behind the icon
                    textAlign: 'left',
                  },
                  iconContainer: {
                    right: 10,
                  },
                }
          }
          onValueChange={value => this.props.onSelect(value)}
          items={this.props.items}
          useNativeAndroidPickerStyle={false}
          placeholder={{label: '', value: null}}
          {...rest}
        />
        <Image
          source={require('../../assets/icon_add_modal_picker_downarrow.png')}
          style={{
            width: 15,
            height: 15,
            resizeMode: 'contain',
            position: 'absolute',
            right: 15,
            top: 13,
          }}
        />
      </View>
    );
  }
}

export class LocationInput extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <View style={{}}>
        <TextInput
          style={[
            styles.newLessonSubjectTextInput,
            this.props.direction === 'rtl'
              ? {textAlign: 'right'}
              : {textAlign: 'left'},
          ]}
          placeholder={'Enter location...'}
        />
        <Image
          source={require('../../assets/icon_modal_location_input.png')}
          style={{
            width: 21,
            height: 27,
            resizeMode: 'contain',
            position: 'absolute',
            right: 10,
            top: 20,
          }}
        />
      </View>
    );
  }
}

export class DateTimeSetter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mon: false,
      tue: false,
      wed: false,
      thu: false,
      fri: false,
      sat: false,
      sun: false,
    };
  }

  componentDidMount() {
    this.setState({
      mon: this.props.mon,
      tue: this.props.tue,
      wed: this.props.wed,
      thu: this.props.thu,
      fri: this.props.fri,
      sat: this.props.sat,
      sun: this.props.sun,
    });
  }

  render() {
    const {mon, tue, wed, thu, fri, sat, sun} = this.state;
    const isEnglish = this.props.isEnglish;
    return (
      <View
        style={{
          paddingHorizontal: 10,
          paddingVertical: 15,
          borderWidth: 1,
          borderRadius: 10,
          borderColor: Colors.lessonLightText,
          marginTop: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontFamily: 'Heebo-Regular',
          }}>
          <Text style={{fontSize: 15, color: 'black'}}>
            {isEnglish ? en.modal.setDays : he.modal.setDays}
          </Text>
          fontFamily: 'Heebo-Regular',
          <Text
            style={{
              fontSize: 12,
              color: Colors.lessonLightText,
              fontFamily: 'Heebo-Regular',
            }}>
            {isEnglish ? en.modal.weeklyRecurrence : he.modal.weeklyRecurrence}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 10,
          }}>
          <TouchableOpacity
            style={styles.newLessonModalDayContainer}
            onPress={() => {
              this.props.updateWeekdays(mon, tue, wed, thu, fri, sat, !sun);
              this.setState({sun: !sun});
            }}>
            <View
              style={
                sun
                  ? styles.newLessonModalDaySelected
                  : styles.newLessonModalDayUnselected
              }
            />
            <Text style={styles.newLessonModalDayText}>
              {isEnglish ? en.weekDay.sun : he.weekDay.sun}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.newLessonModalDayContainer}
            onPress={() => {
              this.props.updateWeekdays(!mon, tue, wed, thu, fri, sat, sun);
              this.setState({mon: !mon});
            }}>
            <View
              style={
                mon
                  ? styles.newLessonModalDaySelected
                  : styles.newLessonModalDayUnselected
              }
            />
            <Text style={styles.newLessonModalDayText}>
              {isEnglish ? en.weekDay.mon : he.weekDay.mon}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.newLessonModalDayContainer}
            onPress={() => {
              this.props.updateWeekdays(mon, !tue, wed, thu, fri, sat, sun);
              this.setState({tue: !tue});
            }}>
            <View
              style={
                tue
                  ? styles.newLessonModalDaySelected
                  : styles.newLessonModalDayUnselected
              }
            />
            <Text style={styles.newLessonModalDayText}>
              {isEnglish ? en.weekDay.tue : he.weekDay.tue}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.newLessonModalDayContainer}
            onPress={() => {
              this.props.updateWeekdays(mon, tue, !wed, thu, fri, sat, sun);
              this.setState({wed: !wed});
            }}>
            <View
              style={
                wed
                  ? styles.newLessonModalDaySelected
                  : styles.newLessonModalDayUnselected
              }
            />
            <Text style={styles.newLessonModalDayText}>
              {isEnglish ? en.weekDay.wed : he.weekDay.wed}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.newLessonModalDayContainer}
            onPress={() => {
              this.props.updateWeekdays(mon, tue, wed, !thu, fri, sat, sun);
              this.setState({thu: !thu});
            }}>
            <View
              style={
                thu
                  ? styles.newLessonModalDaySelected
                  : styles.newLessonModalDayUnselected
              }
            />
            <Text style={styles.newLessonModalDayText}>
              {isEnglish ? en.weekDay.thu : he.weekDay.thu}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.newLessonModalDayContainer}
            onPress={() => {
              this.props.updateWeekdays(mon, tue, wed, thu, !fri, sat, sun);
              this.setState({fri: !fri});
            }}>
            <View
              style={
                fri
                  ? styles.newLessonModalDaySelected
                  : styles.newLessonModalDayUnselected
              }
            />
            <Text style={styles.newLessonModalDayText}>
              {isEnglish ? en.weekDay.fri : he.weekDay.fri}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.newLessonModalDayContainer}
            onPress={() => {
              this.props.updateWeekdays(mon, tue, wed, thu, fri, !sat, sun);
              this.setState({sat: !sat});
            }}>
            <View
              style={
                sat
                  ? styles.newLessonModalDaySelected
                  : styles.newLessonModalDayUnselected
              }
            />
            <Text style={styles.newLessonModalDayText}>
              {isEnglish ? en.weekDay.sat : he.weekDay.sat}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export class DescriptionInput extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    const {...rest} = this.props;
    return (
      <View style={{}}>
        <TextInput
          style={[
            styles.descriptionInputStyle,
            this.props.direction === 'rtl'
              ? {textAlign: 'right'}
              : {textAlign: 'left'},
          ]}
          placeholder={this.props.placeholder}
          numberOfLines={10}
          multiline={true}
          onChangeText={text => {
            this.props.onChangeText(text);
          }}
          {...rest}
        />
      </View>
    );
  }
}

export class SynMinTimes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mon: false,
      tue: false,
      wed: false,
      thu: false,
      fri: false,
      sat: false,
      sun: false,
      type: 'week',
      showDateTime: false,
      datetime: new Date(),
      mode: '',
      showTimePicker: false,
      datetimemode: '',
      pType: 0,
    };
  }

  componentDidMount() {
    const {initialTime, initialDay} = this.props;
    let time = null;
    if (initialTime) {
      const hour = parseInt(initialTime.split(':')[0]);
      const minute = parseInt(initialTime.split(':')[1]);
      const date = new Date();
      date.setHours(hour, minute);
      time = date;
    }
    // console.log('initialTime', initialTime);

    // console.log('time', time);
    // console.log('time || new Date()', time || new Date());
    this.setState({
      mon: (initialDay && initialDay.includes(0)) || this.props.mon,
      tue: (initialDay && initialDay.includes(1)) || this.props.tue,
      wed: (initialDay && initialDay.includes(2)) || this.props.wed,
      thu: (initialDay && initialDay.includes(3)) || this.props.thu,
      fri: (initialDay && initialDay.includes(4)) || this.props.fri,
      sat: (initialDay && initialDay.includes(5)) || this.props.sat,
      sun: (initialDay && initialDay.includes(6)) || this.props.sun,
      type: this.props.type,
      datetime: time || new Date(),
      mode: 'date',
      showTimePicker: false,
      datetimemode: 'time',
      minyan: false,
    });
  }

  setTime = (event, datetime) => {
    datetime = datetime || this.state.datetime;
    console.log('datetime in setTime', datetime);
    this.setState({
      showTimePicker: false,
      datetime,
    });
    this.props.setTime(datetime);
  };

  showDateTimePicker = () => {
    this.setState({showTimePicker: true});
  };

  render() {
    const {
      mon,
      tue,
      wed,
      thu,
      fri,
      sat,
      sun,
      type,
      date,
      mode,
      datetimemode,
      datetime,
      showTimePicker,
    } = this.state;
    const isEnglish = this.props.isEnglish;
    return (
      <View
        style={{
          paddingHorizontal: 10,
          paddingVertical: 15,
          borderWidth: 1,
          borderRadius: 10,
          borderColor: Colors.lessonLightText,
          marginTop: 10,
        }}>
        <TouchableOpacity
          onPress={() => {
            if (this.state.pType < 2) {
              this.setState({pType: this.state.pType + 1});
            } else {
              this.setState({pType: 0});
            }
          }}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          {this.state.pType === 0 ? (
            <Text
              style={{
                fontSize: 15,
                color: 'black',
                fontFamily: 'Heebo-Regular',
              }}>
              {isEnglish ? en.modal.addMinTimes : he.modal.addMinTimes}
            </Text>
          ) : this.state.pType === 1 ? (
            <Text
              style={{
                fontSize: 15,
                color: 'black',
                fontFamily: 'Heebo-Regular',
              }}>
              {isEnglish ? en.modal.shachrit : he.modal.shachrit}
            </Text>
          ) : (
            <Text
              style={{
                fontSize: 15,
                color: 'black',
                fontFamily: 'Heebo-Regular',
              }}>
              {isEnglish ? en.modal.maariv : he.modal.maariv}
            </Text>
          )}

          <Chevron size={1} color="gray" style={{marginRight: 5}} />
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
            height: 1,
            backgroundColor: Colors.lessonLightText,
            marginVertical: 15,
          }}
        />
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
          onPress={this.showDateTimePicker}>
          <Text
            style={{fontSize: 15, color: 'black', fontFamily: 'Heebo-Regular'}}>
            {isEnglish ? en.modal.selectDateTime : he.modal.selectDateTime}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              fontFamily: 'Heebo-Regular',
            }}>
            <Text
              style={{marginRight: 10, fontFamily: 'Heebo-Regular'}}>{`${moment(
              this.state.datetime,
            ).format('kk:mm:ss')}`}</Text>
            <Image
              source={require('../../assets/icon_modal_timetable.png')}
              style={{width: 14, height: 14, resizeMode: 'contain'}}
            />
          </View>
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
            height: 1,
            backgroundColor: Colors.lessonLightText,
            marginVertical: 15,
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text
            style={{fontSize: 15, color: 'black', fontFamily: 'Heebo-Regular'}}>
            {isEnglish ? en.modal.setDays : he.modal.setDays}
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: Colors.lessonLightText,
              fontFamily: 'Heebo-Regular',
            }}>
            {type === 'week'
              ? isEnglish
                ? en.modal.weeklyRecurrence
                : he.modal.weeklyRecurrence
              : isEnglish
              ? en.modal.daily
              : he.modal.daily}
          </Text>
        </View>
        {type === 'week' && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 10,
            }}>
            <TouchableOpacity
              style={styles.newLessonModalDayContainer}
              onPress={() => {
                this.props.updateWeekdays(mon, tue, wed, thu, fri, sat, !sun);
                this.setState({sun: !sun});
              }}>
              <View
                style={
                  sun
                    ? styles.newLessonModalDaySelected
                    : styles.newLessonModalDayUnselected
                }
              />
              <Text style={styles.newLessonModalDayText}>
                {isEnglish ? en.weekDay.sun : he.weekDay.sun}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.newLessonModalDayContainer}
              onPress={() => {
                this.props.updateWeekdays(!mon, tue, wed, thu, fri, sat, sun);
                this.setState({mon: !mon});
              }}>
              <View
                style={
                  mon
                    ? styles.newLessonModalDaySelected
                    : styles.newLessonModalDayUnselected
                }
              />
              <Text style={styles.newLessonModalDayText}>
                {isEnglish ? en.weekDay.mon : he.weekDay.mon}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.newLessonModalDayContainer}
              onPress={() => {
                this.props.updateWeekdays(mon, !tue, wed, thu, fri, sat, sun);
                this.setState({tue: !tue});
              }}>
              <View
                style={
                  tue
                    ? styles.newLessonModalDaySelected
                    : styles.newLessonModalDayUnselected
                }
              />
              <Text style={styles.newLessonModalDayText}>
                {isEnglish ? en.weekDay.tue : he.weekDay.tue}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.newLessonModalDayContainer}
              onPress={() => {
                this.props.updateWeekdays(mon, tue, !wed, thu, fri, sat, sun);
                this.setState({wed: !wed});
              }}>
              <View
                style={
                  wed
                    ? styles.newLessonModalDaySelected
                    : styles.newLessonModalDayUnselected
                }
              />
              <Text style={styles.newLessonModalDayText}>
                {isEnglish ? en.weekDay.wed : he.weekDay.wed}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.newLessonModalDayContainer}
              onPress={() => {
                this.props.updateWeekdays(mon, tue, wed, !thu, fri, sat, sun);
                this.setState({thu: !thu});
              }}>
              <View
                style={
                  thu
                    ? styles.newLessonModalDaySelected
                    : styles.newLessonModalDayUnselected
                }
              />
              <Text style={styles.newLessonModalDayText}>
                {isEnglish ? en.weekDay.thu : he.weekDay.thu}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.newLessonModalDayContainer}
              onPress={() => {
                this.props.updateWeekdays(mon, tue, wed, thu, !fri, sat, sun);
                this.setState({fri: !fri});
              }}>
              <View
                style={
                  fri
                    ? styles.newLessonModalDaySelected
                    : styles.newLessonModalDayUnselected
                }
              />
              <Text style={styles.newLessonModalDayText}>
                {isEnglish ? en.weekDay.fri : he.weekDay.fri}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.newLessonModalDayContainer}
              onPress={() => {
                this.props.updateWeekdays(mon, tue, wed, thu, fri, !sat, sun);
                this.setState({sat: !sat});
              }}>
              <View
                style={
                  sat
                    ? styles.newLessonModalDaySelected
                    : styles.newLessonModalDayUnselected
                }
              />
              <Text style={styles.newLessonModalDayText}>
                {isEnglish ? en.weekDay.sat : he.weekDay.sat}
              </Text>
            </TouchableOpacity>
          </View>
        )}
        {showTimePicker && (
          <DateTimePicker
            value={datetime}
            mode={datetimemode}
            is24Hour={true}
            display="default"
            onChange={this.setTime}
          />
        )}
      </View>
    );
  }
}

export class NormalSwitch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: '',
      switchValue: false,
    };
  }

  componentDidMount() {
    this.setState({
      type: this.props.type,
      switchValue: this.props.initialStatus,
    });
  }

  render() {
    const {switchValue, type} = this.state;
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: 50,
          marginTop: 15,
        }}>
        <Text style={{fontFamily: 'Heebo-Regular'}}>{type}</Text>
        <Switch
          value={switchValue}
          trackColor={{true: Colors.primary, false: 'lightgray'}}
          onValueChange={value => {
            this.setState({switchValue: value});
            this.props.onChange(value);
          }}
        />
      </View>
    );
  }
}
