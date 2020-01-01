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
import * as MediaLibrary from "expo-media-library";
import Gallery from "./Gallery";

export default class CameraPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasPermission: null,
      cameraType: Camera.Constants.Type.back,
      photos: [],
      viewImageFlag: false,
      imageURI: null
    };
    this.cameraRef = React.createRef();
  }
  getPermissionAsync = async () => {
    // Camera roll Permission
    const permission1 = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (permission1.status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
    }
    // Camera Permission
    const permission2 = await Permissions.askAsync(Permissions.CAMERA);
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    this.setState({
      hasPermission:
        permission1.status === "granted" && permission2.status === "granted"
    });
  };

  async componentDidMount() {
    await this.getPermissionAsync();
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
      await this.getPermissionAsync();
      const asset = await MediaLibrary.createAssetAsync(pic.uri);
      MediaLibrary.createAlbumAsync("Expo", asset)
        .then(() => {
          console.log("Album created!");
        })
        .catch(error => {
          console.log("err", error);
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
              left: 0,
              top: 0,
              color: 'white'
            }}
            onPress={this.props.handlePageClose}
          >
            <MaterialCommunityIcons
              name="arrow-left-circle"
              style={{
                fontSize: 40,
                color: 'white'
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
          <Gallery captures={photos} handleImageView={this.handleImageView} />
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
