import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import CameraPage from "./modules/components/CameraPage";
import LocationPage from "./modules/components/LocationPage";
import Bluetooth from "./modules/components/Bluetooth";
// import LocationMap from "./modules/components/LocationMap";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cameraFlag: false,
      bluetoothFlag: false,
      locationFlag: false
    };
  }
  handlePageClose = flag => {
    this.setState({
      [flag]: false
    });
  };

  render() {
    if (this.state.cameraFlag) {
      return (
        <View style={{ flex: 1 }}>
          <CameraPage
            handlePageClose={this.handlePageClose.bind(this, "cameraFlag")}
          />
        </View>
      );
    }
    if (this.state.locationFlag) {
      return (
        <View style={styles.container}>
          <LocationPage
            handlePageClose={this.handlePageClose.bind(this, "locationFlag")}
          />
          {/* <LocationMap  handlePageClose={this.handlePageClose.bind(this, 'locationFlag')} /> */}
        </View>
      );
    }
    if (this.state.bluetoothFlag) {
      return (
        <View style={{ flex: 1 }}>
          <Bluetooth
            handlePageClose={this.handlePageClose.bind(this, "bluetoothFlag")}
          />
        </View>
      );
    }
    return (
      <>
        <View style={styles.container}>
          <Text style={styles.header}>DATA COLLECTOR APP</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.setState({
                cameraFlag: true
              });
            }}
          >
            <MaterialCommunityIcons
              name="camera"
              style={{
                fontSize: 40,
                textAlign: "center"
              }}
            />
            <Text style={styles.buttonText}>Open Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.setState({
                locationFlag: true
              });
            }}
          >
            <MaterialCommunityIcons
              name="map-marker"
              style={{
                fontSize: 40,
                textAlign: "center"
              }}
            />
            <Text style={styles.buttonText}>Get Location</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.setState({
                bluetoothFlag: true
              });
            }}
          >
            <MaterialCommunityIcons
              name="bluetooth"
              style={{
                fontSize: 40,
                textAlign: "center"
              }}
            />
            <Text style={styles.buttonText}>Bluetooth</Text>
          </TouchableOpacity>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
    alignItems: "center"
  },
  header: {
    marginBottom: 20,
    fontWeight: "bold"
  },
  button: {
    padding: 10,
    margin: 10,
    fontWeight: "bold",
    color: "red"
  },
  buttonText: {
    textAlign: "center"
  },
  imageContainer: {
    height: 100,
    width: 100,
    borderColor: "red",
    borderWidth: 10
  }
});
