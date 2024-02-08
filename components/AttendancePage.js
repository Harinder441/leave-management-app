import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { Chip, Title } from "react-native-paper";
import apiClient from "../apiClient";
import CircularProgress from "./Form/CircularProgress";
import { useUser } from "../context/UserContext";
import { useSnackbar } from '../context/SnackbarContext';
import { getLocalDateString } from "./Form/utils";
const AttendancePage = () => {
  const {showSnackbar} = useSnackbar(); 
  const [attendanceData, setAttendanceData] = useState(null);
  const { user } = useUser();
  useEffect(() => {
    if (user) {
      fetchAttendanceData();
    }
  }, [user]);

  const fetchAttendanceData = async () => {
    try {
      const res = await apiClient.post(`/getAttendanceRegister`,{
        emp_id:user.emp_id,
        monthyear:"10-2023"
      });
      setAttendanceData(res.data);
    } catch (error) {
      console.log("Error fetching leave status data:", error);
      showSnackbar('Error during API request:'+(error.response.data.message || error.message),'error');
    }
  };

 
  const getStatusText = (status) => {
    switch (status) {
      case 0:
        return "Pending";
      case 1:
        return "Approved";
      case 2:
        return "Rejected";
      default:
        return "";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 0:
        return "#FFC107";
      case 1:
        return "#4CAF50";
      case 2:
        return "#F44336";
      default:
        return "";
    }
  };

  return (
    <>
      {attendanceData ? (
       <p>hello</p>
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
  leaveItemContainer: {
    marginBottom: 20,
    flexDirection:'row',
    justifyContent:"space-between",
    alignItems:"center",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  leaveItemDetails: {
   
  },
  statusChip: {
    // marginTop: 5,
    // alignSelf:'center'
  }
});

export default AttendancePage;
