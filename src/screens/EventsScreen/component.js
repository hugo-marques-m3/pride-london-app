// @flow
import React, { PureComponent } from "react";
import { StyleSheet, Text, View } from "react-native";
import type { NavigationScreenProp, NavigationState } from "react-navigation";
import type { EventDays, LocalizedFieldRef } from "../../data/event";
import EventList from "../../components/EventList";
import FilterHeader from "../../components/ConnectedFilterHeader";
import { bgColor } from "../../constants/colors";
import { EVENT_DETAILS, EVENT_CATEGORIES_FILTER } from "../../constants/routes";
import locale from "../../data/locale";

export type Props = {
  navigation: NavigationScreenProp<NavigationState>,
  events: EventDays,
  loading: boolean,
  refreshing: boolean,
  updateEvents: () => Promise<void>,
  getAssetUrl: LocalizedFieldRef => string,
  selectedCategories: Set<string>
};

class EventsScreen extends PureComponent<Props> {
  static navigationOptions = {
    header: null
  };

  handleFilterCategoriesPress = () => {
    this.props.navigation.navigate(EVENT_CATEGORIES_FILTER);
  };

  render() {
    return (
      <View style={styles.container}>
        <FilterHeader
          onFilterCategoriesPress={this.handleFilterCategoriesPress}
          selectedCategories={this.props.selectedCategories}
        />
        {this.props.loading ? (
          <Text>Loading...</Text>
        ) : (
          <EventList
            locale={locale}
            events={this.props.events}
            refreshing={this.props.refreshing}
            onRefresh={() => {
              this.props.updateEvents();
            }}
            onPress={(eventId: string) => {
              this.props.navigation.navigate(EVENT_DETAILS, { eventId });
            }}
            getAssetUrl={this.props.getAssetUrl}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: bgColor
  }
});

export default EventsScreen;
