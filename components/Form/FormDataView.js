import React from "react";
import { View, Text ,StyleSheet } from "react-native";
import { List,Surface } from "react-native-paper";

export const FormDataItem = ({ label, value }) => {
  return (
    <List.Item
      title={label}
      description={typeof value === "string" ? value : JSON.stringify(value)}
    />
  );
};

export const FormView = ({ formData }) => {
  return (
    <View>
      <Surface  style={styles.surface}> 
        <List.Section >
          {formData.map((data, index) => (
            <FormDataItem key={index} label={data.label} value={data.value} />
          ))}
        </List.Section>

      </Surface>
    </View>
  );
};

const styles = StyleSheet.create({
  surface: {
    // padding: 8,
    // height: 80,
    // width: 80,
    // alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor:'#e7e7e7',
    elevation: 2,
  },
});