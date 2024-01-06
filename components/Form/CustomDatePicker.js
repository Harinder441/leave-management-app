import React, { useState } from "react";
import { View, Platform, TouchableOpacity } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { TextInput } from "react-native-paper";
import CustomTextInput from "./CustomTextComponent";

const CustomDatePicker = ({ label, defaultValue, onValueChange, disabled }) => {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === "ios");
    setDate(currentDate);
    onValueChange(currentDate);
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  return (
    <View>
      <TouchableOpacity onPress={showDatepicker}>
        <CustomTextInput label={label} defaultValue={defaultValue?defaultValue.toLocaleDateString():""} editable={false} />
      </TouchableOpacity>
      {showDatePicker && !disabled && <DateTimePicker value={date} mode="date" is24Hour={true} display="default" onChange={onChange} />}
    </View>
  );
};

export default CustomDatePicker;
