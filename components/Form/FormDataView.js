import React from "react";
import { View, Text ,StyleSheet } from "react-native";
import { List,Surface,Grid, Row, Column } from "react-native-paper";

export const FormDataItem = ({ label, value }) => {
  return (
    <List.Item
      title={label}
      description={typeof value === "string" ? value : JSON.stringify(value)}
    />
  );
};

export const FormDataItem2 = ({ label, value }) => (
  <View style={styles.item}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);
export const FormView = ({ formData,itemsPerRow=2 }) => {
  return (
    <View style={styles.container}>
    
          {formData.map((data, index) => (
            <FormDataItem2 key={index} label={data.label} value={data.value} />
          ))}
    </View>
  );
};
export const SectionHeading = ({text})=>{

}
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
  sectionHeading:{
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5, 
    margin: 5, 
    alignItems: 'center', 
    justifyContent: 'center',
    borderWidth: 1, 
    borderColor: "#333", 
  }, 
  
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',

    justifyContent: 'space-between',
    padding: 12,
  },
  item: {
    width: '48%', 
    marginBottom: 12,
    backgroundColor: '#4CAF50',
    padding: 8,
    borderRadius: 8,
  },
  label: {
    fontSize: 14,
    color: 'white',
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});