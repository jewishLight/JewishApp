import React, { Component } from "react";
import { View, TouchableOpacity, Text, Image } from "react-native";
import { styles } from "./styles";
import Modal from "react-native-modal";
import { Colors, Metric, Strings } from "../../themes";
import { AddModalCloseButton, NormalInput } from "../../components";

export class AddModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false
    };
  }

  componentDidMount() {}

  show = () => {
    this.setState({ modalVisible: true });
  };

  hide = () => {
    this.setState({ modalVisible: false });
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
                }}
              >
                <Text style={styles.synText}>Synagogue</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.addLessonBtn}
                onPress={() => {
                  this.hide();
                  this.props.callBack(Strings.MODAL_FLAG_ADD_LESSON);
                }}
              >
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
      modalVisible: false
    };
  }

  componentDidMount() {}

  show = () => {
    this.setState({ modalVisible: true });
  };

  hide = () => {
    this.setState({ modalVisible: false });
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
                }}
              >
                <Text style={styles.synText}>Lessons</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.addSynBtn}
                onPress={() => {
                  this.hide();
                }}
              >
                <Text style={styles.synText}>Synagogue</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.addSynBtn}
                onPress={() => {
                  this.hide();
                }}
              >
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
      modalVisible: false
    };
  }

  componentDidMount() {}

  show = () => {
    this.setState({ modalVisible: true });
  };

  hide = () => {
    this.setState({ modalVisible: false });
  };

  render() {
    return (
      <Modal visible={this.state.modalVisible} style={styles.addModalContainer}>
        <View style={styles.addModalView}>
          <View style={styles.addModalDropdownView} />
          <View style={styles.newLessonModalMainView}>
            <View style={styles.addNewLine}>
              <Text style={styles.addNewText}>Add New Lesson</Text>
              <AddModalCloseButton
                onPress={() => {
                  this.hide();
                }}
              />
            </View>
            <View style={styles.addModalSeparator} />
            <View style={styles.newLessonModalContainer}>
              <Text style={styles.newLessonModalTextInputTitle}>
                Enter Subject
              </Text>
              <NormalInput />
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}
