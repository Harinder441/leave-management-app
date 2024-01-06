import React from "react";
import { View, ActivityIndicator } from "react-native";
import { Colors } from "react-native-paper";

const CircularProgress = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator animating={true} color={Colors.blue500} size="large" />
    </View>
  );
};

export default CircularProgress;
