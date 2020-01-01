import React, { Component } from "react";
import {
  Platform,
  Text,
  View,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import Constants from "expo-constants";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons
} from "@expo/vector-icons";
import MapView from "react-native-maps";
export default class LocationPage extends React.Component {
  state = {
    location: null,
    errorMessage: null,
    mapRegion: null
  };
  handleMapRegionChange = mapRegion => {
    this.setState({ mapRegion });
  };
  componentDidMount() {
    if (Platform.OS === "android" && !Constants.isDevice) {
      this.setState({
        errorMessage:
          "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
      });
    } else {
      this.getLocationAsync();
    }
  }
  getLocationAsync = async () => {
    try {
      let { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== "granted") {
        this.setState({
          errorMessage: "Permission to access location was denied"
        });
      }

      let location = await Location.getCurrentPositionAsync({});
      this.setState({ location });
    } catch {
      this.setState({
        location: {
          errMsg: "Please check Internet connectivity"
        }
      });
    }
  };
  render() {
    let location = null;
    let locationDetails = [];
    if (this.state.location && this.state.location.coords) {
      location = this.state.location.coords;
      for (let key in location) {
        locationDetails.push(
          <View key={key} style={styles.locationDetails}>
            <Text style={styles.locKey}>{key}</Text>
            <Text style={styles.locValue}>{location[key]}</Text>
          </View>
        );
      }
    }

    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={this.props.handlePageClose}
        >
          <MaterialCommunityIcons
            name="arrow-left-circle"
            style={{
              fontSize: 40,
              textAlign: "left"
            }}
          />
        </TouchableOpacity>
        {this.state.errorMessage && (
          <Text style={styles.paragraph}>{this.state.errorMessage}</Text>
        )}
        {!location && (
          <>
            <Text style={styles.paragraph}>Loading...</Text>
          </>
        )}
        {location && (
          <>
            <Text style={styles.paragraph}>Location Details</Text>
            {locationDetails}
          </>
        )}
        {/* {location && (
          <MapView
            style={{ alignSelf: "stretch", height: 400 }}
            initialRegion={this.state.mapRegion}
            onRegionChange={this.handleMapRegionChange}
          >
            <MapView.Marker
              coordinate={{
                latitude: location.latitude + 0.0005 || -36.82339,
                longitude: location.longitude + 0.0005 || -73.03569
              }}
            >
              <View>
                <Text style={{ color: "#000" }}>
                  <MaterialCommunityIcons
                    name="map-marker"
                    style={{
                      color: "red",
                      fontSize: 40,
                      textAlign: "left"
                    }}
                  />
                </Text>
              </View>
            </MapView.Marker>
          </MapView>
        )} */}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    height: "100%",
    width: "100%",
    backgroundColor: "#ecf0f1"
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: "center"
  },
  locationDetails: {
    flexDirection: "row",
    width: "100%",
    padding: 5
  },
  locKey: {
    textAlign: "left",
    width: "50%"
  },
  locValue: {
    textAlign: "center",
    width: "50%"
  }
});
