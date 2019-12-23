import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Image
} from "react-native";
import CameraPage from "./modules/components/CameraPage";
import LocationPage from "./modules/components/LocationPage";
import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons
} from "@expo/vector-icons";
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cameraFlag: false,
      locationFlag: false
    };
  }
  componentDidMount() {
    console.log("reload");
  }
  handleCameraClose = () => {
    this.setState({
      cameraFlag: false
    });
  };
  handleLocationClose = () => {
    this.setState({
      locationFlag: false
    });
  };
  render() {
    if (this.state.cameraFlag) {
      return (
        <View style={{ flex: 1 }}>
          <CameraPage handleCameraClose={this.handleCameraClose} />
        </View>
      );
    }
    if (this.state.locationFlag) {
      return (
        <View style={styles.container}>
          <LocationPage handleLocationClose={this.handleLocationClose} />
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
    color: "red",
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
