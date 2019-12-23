import React from "react";
import { View, Image, ScrollView, StyleSheet } from "react-native";
export default ({ captures = [] }) => {
  return (
    <ScrollView
      horizontal={true}
      style={[styles.bottomToolbar, styles.galleryContainer]}
    >
      {captures.length > 0 &&
        captures.map(image => (
          <View style={styles.galleryImageContainer} key={image.uri}>
            <Image source={{ uri: image.uri }} style={styles.galleryImage} />
          </View>
        ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  galleryContainer: {
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
