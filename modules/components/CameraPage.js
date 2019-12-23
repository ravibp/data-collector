import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform
} from "react-native";
import { Camera } from "expo-camera";
import * as Permissions from "expo-permissions";
import * as FileSystem from "expo-file-system";
import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons
} from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import Gallery from "./Gallery";

export default class CameraPage extends React.Component {
  constructor(props) {
    console.log("constructor");

    super(props);
    this.state = {
      hasPermission: null,
      cameraType: Camera.Constants.Type.back,
      photos: []
    };
    this.cameraRef = React.createRef();
  }
  getPermissionAsync = async () => {
    // Camera roll Permission
    if (Platform.OS === "ios") {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
    // Camera Permission
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    console.log("permission", status);
    this.setState({ hasPermission: status === "granted" });
  };

  async componentDidMount() {
    this.getPermissionAsync();
  }
  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images
    });
  };
  handleCameraType = () => {
    const { cameraType } = this.state;

    this.setState({
      cameraType:
        cameraType === Camera.Constants.Type.back
          ? Camera.Constants.Type.front
          : Camera.Constants.Type.back
    });
  };
  takePicture = async () => {
    let pic = null;
    if (this.cameraRef) {
      pic = await this.cameraRef.takePictureAsync();
      this.setState({
        photos: [pic, ...this.state.photos]
      });
    }
  };

  render() {
    const { hasPermission, photos } = this.state;
    if (hasPermission === null) {
      return <View />;
    }
    if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    }

    return (
      <Camera
        ref={cameraRef => {
          this.cameraRef = cameraRef;
        }}
        style={{ flex: 1 }}
        type={this.state.cameraType}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            margin: 20
          }}
        >
          <TouchableOpacity
            style={{
              position: "absolute",
              left: 0
            }}
            onPress={this.props.handleCameraClose}
          >
            <MaterialCommunityIcons
              name="arrow-left-circle"
              style={{
                fontSize: 40,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cameraButtons}
            onPress={this.pickImage}
          >
            <Ionicons
              name="ios-photos"
              style={{ color: "#fff", fontSize: 40 }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cameraButtons}
            onPress={this.takePicture}
          >
            <FontAwesome
              name="camera"
              style={{ color: "#fff", fontSize: 40 }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cameraButtons}
            onPress={this.handleCameraType}
          >
            <MaterialCommunityIcons
              name="camera-switch"
              style={{ color: "#fff", fontSize: 40 }}
            />
          </TouchableOpacity>
        </View>
        <View>
          <Gallery captures={photos} />
        </View>
      </Camera>
    );
  }
}

const styles = StyleSheet.create({
  cameraButtons: {
    alignSelf: "flex-end",
    alignItems: "center",
    backgroundColor: "transparent"
  }
});
