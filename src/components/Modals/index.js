import React, { Component } from "react";
import { View, TouchableOpacity, Text, Image } from "react-native";
import { styles } from "./styles";
import Modal from "react-native-modal";
import { Metric } from "../../themes";

export class AddModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false
    };
  }

  componentDidMount() {}

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  render() {
    return (
      <Modal
        visible={this.state.modalVisible}
        style={{
          margin: 0
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end"
          }}
        >
          <View
            style={{
              position: "absolute",
              backgroundColor: "black",
              width: Metric.width,
              height: Metric.height,
              opacity: 0.7
            }}
          />
          <View
            style={{
              backgroundColor: "white",
              height: 300,
              justifyContent: "center",
              alignItems: "center",
              borderTopRightRadius: 30,
              borderTopLeftRadius: 30,
              borderColor: "rgba(0, 0, 0, 0.1)"
            }}
          >
            <TouchableOpacity
              style={{
                justifyContent: "center",
                alignItems: "center",
                width: 160,
                height: 35,
                backgroundColor: "white"
              }}
              onPress={() => {
                this.setModalVisible(false);
              }}
            >
              <Text>Exit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}
