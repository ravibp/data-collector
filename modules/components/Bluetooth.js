/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import {
  StyleSheet,
  View,
  Text,
} from "react-native";

import React, { Component } from "react";
import { TouchableOpacity } from "react-native";
import BluetoothSerial from "react-native-bluetooth-serial-next";
import { PermissionsAndroid } from "react-native";
import {
  MaterialCommunityIcons
} from "@expo/vector-icons";
class Bluetooth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      btStatus: null,
      devices: [],
      pairedDevices: [],
      loading: false,
      connectStatus: null,
      connectedDevice: null
    };
  }

  requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Example App",
          message: "Example App access to your location "
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the location");
        alert("You can use the location");
      } else {
        console.log("location permission denied");
        alert("Location permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };
  async componentDidMount() {
    await this.requestLocationPermission();
    const pairedDevices = await BluetoothSerial.list();
    let btStatus = await BluetoothSerial.isEnabled();

    this.setState({ btStatus, pairedDevices });
  }

  async toggleBluetoothState() {
    try {
      let btStatus = await BluetoothSerial.isEnabled();
      if (btStatus === true) {
        await BluetoothSerial.disable();
        btStatus = false;
      } else if (btStatus === false) {
        await BluetoothSerial.requestEnable();
        btStatus = true;
        this.scanDevices();
      }
      this.setState({
        btStatus
      });
    } catch (error) {
      console.error(error);
    }
  }

  scanDevices = async () => {
    let btStatus = await BluetoothSerial.isEnabled();
    if (!btStatus) {
      this.toggleBluetoothState();
    }
    this.setState({ loading: true }, async () => {
      const devices = await BluetoothSerial.discoverUnpairedDevices();
      console.log("Available devices:", devices);
      const uniqueDevices = devices.filter((device, index) => {
        const _dev = JSON.stringify(device);
        return (
          index ===
          devices.findIndex(obj => {
            return JSON.stringify(obj) === _dev;
          })
        );
      });
      this.setState({ devices: uniqueDevices, loading: false });
    });
  };
  connectDevice = async id => {
    this.setState({ connectStatus: "connecting" }, async () => {
      try {
        let device = await BluetoothSerial.connect(id);
        console.log("device", device);
        if (device) {
          this.setState({
            connectStatus: "connected",
            connectedDevice: device
          });
        } else {
          this.setState({ connectStatus: "notConnected" });
        }
      } catch (err) {
        console.log("not able to connect");
        this.setState({ connectStatus: "notConnected" });
      }
    });
  };
  render() {
    const {
      devices,
      connectStatus,
      connectedDevice,
      pairedDevices
    } = this.state;
    return (
      <>
        <View style={styles.container}>
          <TouchableOpacity
            style={{
              position: "absolute",
              left: 0
            }}
            onPress={this.props.handlePageClose}
          >
            <MaterialCommunityIcons
              name="arrow-left-circle"
              style={{
                fontSize: 40
              }}
            />
          </TouchableOpacity>
          <Text
            style={styles.button}
            onPress={() => {
              this.toggleBluetoothState();
            }}
          >
            Toggle BT
          </Text>
          <Text style={styles.button} onPress={this.scanDevices}>
            Scan BT {this.state.loading && "(Scanning...)"}
          </Text>
          <View>
            <Text style={{ fontWeight: "bold", marginVertical: 10 }}>
              Paired Devices:
            </Text>
            {pairedDevices.length > 0 &&
              pairedDevices.map(device => {
                return (
                  <Text
                    key={device.id}
                    onPress={() => {
                      this.connectDevice(device.id);
                    }}
                  >
                    {device.name ? device.name : device.address}
                  </Text>
                );
              })}
          </View>

          <View>
            {!this.state.loading && (
              <Text style={{ fontWeight: "bold", marginTop: 30 }}>
                Available Devices:
                {connectStatus === "connecting" && "(Connecting...)"}
                {connectStatus === "connected" && "(Connected)"}
                {connectStatus === "notConnected" && "(Connection failed)"}
              </Text>
            )}
          </View>
          {!this.state.loading &&
            devices.length > 0 &&
            devices.map(device => {
              return (
                <Text
                  key={device.id}
                  style={{ marginVertical: 5 }}
                  onPress={() => {
                    this.connectDevice(device.id);
                  }}
                >
                  {device.name ? device.name : device.address}
                </Text>
              );
            })}

          {connectStatus === "connected" && connectedDevice && (
            <Text style={styles.button}>
              Connected to:{" "}
              {connectedDevice.name
                ? connectedDevice.name
                : connectedDevice.address}
            </Text>
          )}
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

export default Bluetooth;
