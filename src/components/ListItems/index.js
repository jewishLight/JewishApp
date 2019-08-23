import React from "react";
import { View, TouchableOpacity, Text, Image } from "react-native";
import { styles } from "./styles";
import { Metric, Colors } from "../../themes";

export const CommentListItem = ({ onPress }) => (
  <TouchableOpacity style={styles.commentItemContainer} onPress={onPress}>
    <View style={{}}>
      <TouchableOpacity>
        <Image
          source={require("../../assets/icon_commentlist_avatar.png")}
          style={styles.commentItemAvatar}
        />
      </TouchableOpacity>
    </View>
    <View style={{ flex: 1, paddingHorizontal: 10 }}>
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
