import React from 'react';
import { StyleSheet, Animated } from 'react-native';

const ProgressiveImage = (props:any) => {
  const imageAnimated = new Animated.Value(0);
  const onImageLoad = () => {
  
    Animated.timing(imageAnimated, {
      toValue: 1,
      duration:1500,
      useNativeDriver:true
    }).start();
  }

    const {
      source,
      style,
    } = props;

    return (
        <Animated.Image
          {...props}
          borderRadius={12}
          source={{uri: source}}
        //   resizeMode="contain"
          style={[styles.imageOverlay, { opacity: imageAnimated }, style]}
          onLoad={onImageLoad}
        />
    );
}

export default ProgressiveImage;

const styles = StyleSheet.create({
    imageOverlay: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      top: 0,
    //   borderRadius:12
    },
  });