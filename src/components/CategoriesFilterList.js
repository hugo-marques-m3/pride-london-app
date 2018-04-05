// @flow
import React from "react";
import { StyleSheet, ScrollView, TouchableOpacity, View } from "react-native";
import Text from "./Text";
import { filterBgColor, whiteColor } from "../constants/colors";
import categories from "../constants/event-categories";

type Props = {
  locale: string,
  stagedCategories: Set<string>,
  onPress: Function
};

const CategoriesFilterList = ({ locale, stagedCategories, onPress }: Props) => (
  <ScrollView style={styles.container}>
    {Object.keys(categories[locale]).map(key => {
      const category = categories[locale][key];
      return (
        <TouchableOpacity
          key={category.label}
          style={styles.itemContainer}
          accessibilityTraits={["button"]}
          accessibilityComponentType="button"
          onPressIn={() => onPress(category.label)}
        >
          <View
            style={[
              styles.itemDecoration,
              // eslint-disable-next-line react-native/no-inline-styles
              {
                backgroundColor: category.color,
                width: stagedCategories.has(category.label) ? 48 : 16
              }
            ]}
          />
          <Text style={styles.itemText}>{category.label}</Text>
        </TouchableOpacity>
      );
    })}
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: filterBgColor
  },
  itemContainer: {
    flex: 1,
    flexDirection: "row",
    marginBottom: 8,
    paddingTop: 8,
    paddingBottom: 12,
    width: 339,
    height: 48
  },
  itemDecoration: {
    height: 48,
    width: 16
  },
  itemText: {
    height: 48,
    paddingTop: 12,
    paddingLeft: 16,
    color: whiteColor,
    textAlign: "left",
    fontFamily: "Poppins-Bold",
    fontSize: 24,
    lineHeight: 28,
    letterSpacing: 0
  }
});

export default CategoriesFilterList;
