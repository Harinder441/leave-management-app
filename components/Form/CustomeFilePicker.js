import React from "react";
import { Button, View, Text } from "react-native";
import DocumentPicker from "react-native-document-picker";

const CustomFilePicker = ({ label,onValueChange }) => {
  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.allFiles],
      });
      console.log(result.uri)
      // onValueChange(result);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log("File picker canceled");
      } else {
        console.error("Error picking file:", err);
      }
    }
  };

  return (
    <View>
      <Text>{label}</Text>
      <Button title="Choose a File" onPress={pickDocument} />
    </View>
  );
};

export default CustomFilePicker;
