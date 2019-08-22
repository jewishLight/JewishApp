import React from "react";
import { View, TouchableOpacity, Text, Image } from "react-native";
import { styles } from "./styles";
import { Metric } from "../../themes";

export const SearchButton = ({ onPress }) => (
  <TouchableOpacity style={styles.searchBtnContainer} onPress={onPress}>
    <Image
      source={require("../../assets/icon_search.png")}
      style={styles.searchIcon}
    />
    <Text style={[Metric.font.h4, styles.searchText]}>Search</Text>
  </TouchableOpacity>
);

export const AddButton = ({ onPress }) => (
  <TouchableOpacity style={styles.addBtnContainer} onPress={onPress}>
    <Image
      source={require("../../assets/icon_add.png")}
      style={styles.addIcon}
    />
    <Text style={[Metric.font.h4, styles.addText]}>Add</Text>
  </TouchableOpacity>
);

export const FilterButton = ({ onPress }) => (
  <TouchableOpacity style={styles.filterBtnContainer} onPress={onPress}>
    <Image
      source={require("../../assets/icon_filter.png")}
      style={styles.filterIcon}
    />
  </TouchableOpacity>
);
