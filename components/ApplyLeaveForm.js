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
import apiClient from "../apiClient";

const ApplyLeaveForm = ({ navigation }) => {
  const { user } = useUser();
  const defaultFormData = {
    school_id:"",
    emp_id:"",
    start_date: "",
    no_of_leaves: "",
    end_date: "",
    address_on_leave: "",
    mobile_on_leave: "",
    sunday_fix: 0,
    reason: "",
    leave_type: "",
    leave_sub_type: "",
    designation_category: "",
    attachment: null
  };
  const [formData, setFormData] = useState(defaultFormData);
  const [displayData, setDisplayData] = useState({});
  const [loading,setLoading] = useState(false);
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        address_on_leave: user.address || "",
        mobile_on_leave: String(user.mobile),
        school_id:user.school_id,
        emp_id:user.emp_id
      }));
      fetchDisplayData();
    }
  }, [user]);
  useEffect(() => {
    autoFillEndDate();
  }, [formData.start_date, formData.no_of_leaves]);
  const fetchDisplayData = async () => {
    try {
      const res = await apiClient.get(`/getLeaveFormData/${user.emp_id}`);
      const data = res.data;
      setDisplayData(data);
      setFormData((prev) => ({
        ...prev,
        designation_category: data?.designation_category ?? ""
      }));
    } catch (error) {
      console.error('Error during API request:', error.response.data.message || error.message);
    }
  };

  const autoFillEndDate = () => {
    if (formData.no_of_leaves && formData.start_date) {
      let date = addDaysToDate(formData.start_date, parseInt(formData.no_of_leaves) - 1);

      setFormData((prev) => ({ ...prev, end_date: date }));
    }
  };
  const handleInputChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleFileInputChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await apiClient.post(`createLeaveRequest`,formData);
      console.log(res.data.message);
      setFormData(defaultFormData);
      navigation.navigate("Dashboard");
    } catch (error) {
      console.error('Error during API request:', error.response.data.message || error.message);
    }finally{
      setLoading(false)
    }
  };

  const viewItems = [
    { label: "Leave Balance", value: displayData.leave_balance || 0 },
    { label: "Leave Availed in Current Month", value: displayData.month_availed_leave || 0 },
    { label: "Leave Availed in Current Session", value: displayData.year_availed_leave || 0 },
    // { label: "ETT Admission Number", value: displayData.ett_adm_no || 0 },
    // { label: "Joining Date", value: displayData.joining_date || null },
    // { label: "Organization Joining Date", value: displayData.org_joining_date || null },
    { label: "Father's Name", value: displayData.father_name || '' },
    // { label: "Designation", value: displayData.designation || '' },
  ];

  return (
    <>
      {displayData ? (
        <ScrollView>
          <View style={styles.container}>
            <FormView formData={viewItems} />
            <CustomDatePicker label="Start Date" defaultValue={formData.start_date} onValueChange={(date) => handleInputChange("start_date", date)} />
            <CustomTextInput label="Number of Leaves" keyboardType="numeric" defaultValue={formData.no_of_leaves} onValueChange={(text) => handleInputChange("no_of_leaves", text)} />
            <CustomDatePicker label="End Date" defaultValue={formData.end_date} disabled />
            <CustomSelectField label="Leave Type" items={objectToArray(displayData.leaveTypes)} defaultValue={formData.leave_type} onValueChange={(value) => handleInputChange("leave_type", value)} />

            {displayData.needLeaveSubType && formData.leave_type === "Leave" && (
              <CustomSelectField
                label="Leave Sub Type"
                items={objectToArray(displayData.leaveSubTypes)}
                defaultValue={formData.leave_sub_type}
                onValueChange={(value) => handleInputChange("leave_sub_type", value)}
              />
            )}
            <CustomTextInput label="Leave Reason" defaultValue={formData.reason} onValueChange={(text) => handleInputChange("reason", text)} />
            <CustomTextInput label="Address" defaultValue={formData.address_on_leave} onValueChange={(text) => handleInputChange("address_on_leave", text)} />
            <CustomTextInput label="Mobile" keyboardType="numeric" defaultValue={formData.mobile_on_leave} onValueChange={(text) => handleInputChange("mobile_on_leave", text)} />
            {/* <CustomFilePicker label="Attachment" onValueChange={(value) => handleFileInputChange("attachment",value)}/> */}

            <Button onPress={handleSubmit} mode="contained" style={styles.submitButton} disabled={loading}>
             {loading?"Submitting...":"Submit"}
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
