import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Picker, ScrollView } from "react-native";
import { Button } from "react-native-paper";

import { getLeaveFormData } from "../apiService";
import CustomDatePicker from "./Form/CustomDatePicker";
import CustomSelectField from "./Form/CustomSelectField";
import { FormDataItem, FormView } from "./Form/FormDataView";
import CustomFilePicker from "./Form/CustomeFilePicker";
import CustomTextInput from "./Form/CustomTextComponent";
import { objectToArray, addDaysToDate } from "./Form/utils";
import { useUser } from "../context/UserContext";
import CircularProgress from "./Form/CircularProgress";
const ApplyLeaveForm = ({ navigation }) => {
  const { user } = useUser();
  const defaultFormData = {
    startDate: "",
    numberOfLeaves: "",
    endDate: "",
    address: "",
    mobile: "",
    leaveReason: "",
    leaveType: "",
    leaveSubType: "",
    attachment: null
  }
  const [formData, setFormData] = useState(defaultFormData);
  const [displayData, setDisplayData] = useState({});

  useEffect(() => {
    
    fetchDisplayData();
  }, []);
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        address: user.address || "",
        mobile: String(user.mobile)
      }));
    }
  }, [user]);
  useEffect(() => {
    autoFillEndDate();
  }, [formData.startDate, formData.numberOfLeaves]);
  const fetchDisplayData = async () => {
    try {
      const result = await getLeaveFormData();
      setDisplayData(result);
    } catch (error) {
      console.error("Error fetching display data:", error);
    }
  };

  const autoFillEndDate = () => {
    if (formData.numberOfLeaves && formData.startDate) {
      let date = addDaysToDate(formData.startDate, parseInt(formData.numberOfLeaves) - 1);

      setFormData((prev) => ({ ...prev, endDate: date }));
    }
  };
  const handleInputChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleFileInputChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
    
      console.log("Leave application submitted successfully!",formData);
      setFormData(defaultFormData);
      navigation.navigate('Dashboard');
    } catch (error) {
      console.error("Error submitting leave application:", error);
    }
  };
  const selectItems = [
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
    { label: "Option 3", value: "option3" }
  ];

  const viewItems = [
    { label: "Leave Balance", value: displayData.leaveBalance || 0 },
    { label: "Leave Availed in Current Month", value: displayData.leaveAvailedInCurrMonth || 0 },
    { label: "Leave Availed in Current Session", value: displayData.leaveAvailedInCurrSession || 0 }
    // { label: "ETT Admission Number", value: displayData.ETTAdmNo || 0 },
    // { label: "Joining Date", value: displayData.joiningDate || null },
    // { label: "Organization Joining Date", value: displayData.orgJoiningDate || null },
    // { label: "Father's Name", value: displayData.fatherName || '' },
    // { label: "Designation", value: displayData.designation || '' },
  ];
  return (
    <>
      {displayData ? (
        <ScrollView>
          <View style={styles.container}>
            <FormView formData={viewItems} />
            <CustomDatePicker label="Start Date" defaultValue={formData.startDate} onValueChange={(date) => handleInputChange("startDate", date)} />
            <CustomTextInput label="Number of Leaves" keyboardType="numeric" defaultValue={formData.numberOfLeaves} onValueChange={(text) => handleInputChange("numberOfLeaves", text)} />
            <CustomDatePicker label="End Date" defaultValue={formData.endDate} disabled />
            <CustomSelectField label="Leave Type" items={objectToArray(displayData.leaveTypes)} defaultValue={formData.leaveType} onValueChange={(value) => handleInputChange("leaveType", value)} />

            {displayData.needLeaveSubType && formData.leaveType === "leave" && (
              <CustomSelectField
                label="Leave Sub Type"
                items={objectToArray(displayData.leaveSubTypes)}
                defaultValue={formData.leaveSubType}
                onValueChange={(value) => handleInputChange("leaveSubType", value)}
              />
            )}
            <CustomTextInput label="Leave Reason" defaultValue={formData.leaveReason} onValueChange={(text) => handleInputChange("leaveReason", text)} />
            <CustomTextInput label="Address" defaultValue={formData.address} onValueChange={(text) => handleInputChange("address", text)} />
            <CustomTextInput label="Mobile" keyboardType="numeric" defaultValue={formData.mobile} onValueChange={(text) => handleInputChange("mobile", text)} />
            {/* <CustomFilePicker label="Attachment" onValueChange={(value) => handleFileInputChange("attachment",value)}/> */}

            <Button onPress={handleSubmit} mode="contained" style={styles.submitButton}>
              Submit
            </Button>
          </View>
        </ScrollView>
      ) : (
        <CircularProgress />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },

  submitButton: {
    backgroundColor: "#4CAF50"
  }
});

export default ApplyLeaveForm;
