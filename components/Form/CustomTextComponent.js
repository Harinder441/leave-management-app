import React from "react";
import { TextInput as PaperTextInput } from "react-native-paper";

const CustomTextInput = ({ label, defaultValue, onValueChange, style,marginVertical=5, ...restProps }) => {
  return (
    <PaperTextInput
      label={label}
      value={defaultValue}
      onChangeText={onValueChange}
      style={[{ marginVertical: marginVertical }, style]} 
      {...restProps}
    />
  );
};

export default CustomTextInput;