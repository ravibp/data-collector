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
export default class LocationPage extends React.Component {
  state = {
    location: null,
    errorMessage: null
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
      console.log("location status", status);
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
    let temp = [1, 2, 3, 4];
    if (this.state.location && this.state.location.coords) {
      location = this.state.location.coords;
      console.log("location", location);
      for (let key in location) {
        console.log(key, location[key]);
        locationDetails.push(
          <View key={key} style={styles.locationDetails}>
            <Text style={styles.lockey}>{key}</Text>
            <Text style={styles.locValue}>{location[key]}</Text>
          </View>
        );
      }
    }

    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={this.props.handleLocationClose}
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
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    height: "100%",
    width: "100%",
    backgroundColor: "#ecf0f1",
    
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: "center"
  },
  locationDetails: {
    flexDirection: "row",
    width: "100%",
    padding: 15
  },
  lockey: {
    textAlign: "left",
    width: "50%"
  },
  locValue: {
    textAlign: "center",
    // backgroundColor:"blue",
    width: "50%"
  }
});
