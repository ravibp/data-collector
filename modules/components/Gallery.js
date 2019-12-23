import React from "react";
import { View, Image, ScrollView, StyleSheet } from "react-native";
export default class Gallery extends React.Component {
  render() {
    const { handleImageView, captures = [] } = this.props;

    return (
      <ScrollView
        horizontal={true}
        style={[styles.bottomToolbar, styles.galleryContainer]}
      >
        {captures.length > 0 &&
          captures.map(image => (
            <View
              style={styles.galleryImageContainer}
              key={image.uri}
              onTouchEndCapture={() => {
                this.setState({
                  uri: image.uri,
                  flag: true
                });
              }}
            >
              <Image source={{ uri: image.uri }} style={styles.galleryImage} />
            </View>
          ))}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  galleryContainer: {
    zIndex: 100,
    top: 0
  },
  galleryImageContainer: {
    width: 75,
    height: 75,
    marginRight: 5
  },
  galleryImage: {
    width: 75,
    height: 75
  }
});
