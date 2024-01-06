import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { Chip, Title } from "react-native-paper";
import apiClient from "../apiClient";
import CircularProgress from "./Form/CircularProgress";
import { useUser } from "../context/UserContext";

const LeaveStatus = () => {
  const [leaveStatusData, setLeaveStatusData] = useState(null);
  const { user } = useUser();
  useEffect(() => {
    if (user) {
      fetchLeaveStatusData();
    }
  }, [user]);

  const fetchLeaveStatusData = async () => {
    try {
      const res = await apiClient.get(`/getLeaveStatusData/${user.emp_id}`);
      setLeaveStatusData(res.data);
    } catch (error) {
      console.error("Error fetching leave status data:", error);
    }
  };

  const renderLeaveItem = ({ item }) => (
    <View style={styles.leaveItem}>
      <View>
        <Title>{`Start Date: ${item.start_date}`}</Title>
        <Text>{`Type: ${item.leave_sub_type || item.leave_type}`}</Text>
        <Text>{`For: ${item.no_of_leaves} days`}</Text>
      </View>
      <Chip mode="outlined" style={[styles.statusChip, { backgroundColor: getStatusColor(item.final_status) }]}>
        {getStatusText(item.final_status)}
      </Chip>
    </View>
  );

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
      {leaveStatusData ? (
        <View style={styles.container}>
          {leaveStatusData.length > 0 ? <FlatList data={leaveStatusData} keyExtractor={(item) => item.id.toString()} renderItem={renderLeaveItem} /> : <Text>No leave status data available.</Text>}
        </View>
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
  leaveItem: {
    marginBottom: 20,
    flexDirection:'row',
    justifyContent:"space-between",
    alignItems:"center"
  },
  statusChip: {
    // marginTop: 5,
    // alignSelf:'center'
  }
});

export default LeaveStatus;
