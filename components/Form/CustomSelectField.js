import React, { useState } from "react";
import { TextInput, Button, Dialog, Portal, List } from "react-native-paper";
import { View,TouchableOpacity } from "react-native";
import CustomTextInput from "./CustomTextComponent";
const CustomSelectField = ({ label, items, defaultValue, onValueChange, disabled }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleItemSelect = (item) => {
    onValueChange(item.value);
    setModalVisible(false);
  };
  const handelCancel =()=>{
    onValueChange("");
    setModalVisible(false);
  }
  return (
    <View>
      <TouchableOpacity onPress={() => {!disabled && setModalVisible(true)}}>
        <CustomTextInput label={label} defaultValue={items.find((item) => item.value == defaultValue)?.label ?? ""} editable={false} />
      </TouchableOpacity>

      <Portal>
        <Dialog visible={modalVisible} onDismiss={() => setModalVisible(false)}>
          <Dialog.Title>{label}</Dialog.Title>
          <Dialog.Content>
            <List.Section>
              {items.map((item) => (
                <List.Item key={item.value} title={item.label} onPress={() => handleItemSelect(item)} />
              ))}
            </List.Section>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={handelCancel}>Cancel</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default CustomSelectField;
