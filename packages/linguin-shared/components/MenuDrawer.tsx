import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Animated, StyleSheet, TouchableOpacity } from 'react-native';

const MenuDrawer = ({ isOpen, setIsOpen, children }) => {
  const drawerAnimation = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  useEffect(() => {
    Animated.timing(drawerAnimation, {
      toValue: isOpen ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isOpen]);


  const drawerWidth = drawerAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [-250, 0], // Drawer width is 250
  });

  const drawerOpacity = drawerAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.5], // Opacity is 0.5
  });

  return (
    <>
      {isOpen && <View style={{
        position: 'absolute',
        backgroundColor: 'black',
        opacity: 0.5,
        width: "100%",
        height: "100%",
        zIndex: 1,
      }} onTouchStart={() => setIsOpen(false)} />}
      <Animated.View className="absolute z-50 h-full flex-wrap p-4"
        style={[{
          right: -250,
          top: 0,
          bottom: 0,
          width: 250,
          justifyContent: 'center',
          zIndex: 2,
          backgroundColor: 'white',
          alignItems: 'center',
        },
        {
          transform: [{ translateX: drawerWidth }],
        },
        ]}
      >
        {children}
      </Animated.View>
    </>
  );
};

export default MenuDrawer;

