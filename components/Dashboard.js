import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useUser } from "../context/UserContext";
const Dashboard = ({ navigation, route }) => {
  const { user: userDetails,clearUserData } = useUser();
  const handleLogout = () => {
    clearUserData();
    navigation.navigate('Home');
  };
  return (
    <>
      {userDetails ? (
        <View style={styles.container}>
          {/* Navbar with user details */}
          <View style={styles.navbar}>
          <View style={styles.navbarData}>
            <Text style={styles.username}>
              {userDetails.first_name} {userDetails.last_name}
            </Text>
            <Text style={styles.school}>
              {userDetails.school_name} 
            </Text>
            </View>
            <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
              <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
            {/* Add more user details as needed */}
          </View>

          {/* Main content */}
          <View style={styles.content}>
            {/* Three big buttons */}
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("LeaveForm")}>
              <Text style={styles.buttonText}>Apply Leave</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("LeaveStatus")}>
              <Text style={styles.buttonText}>Leave Status</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("AttendancePage")}>
              <Text style={styles.buttonText}>Show Attendance Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
    </>
  );
};
// function BigMenuButton({text,onPress}) {
//   return (
//     <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("LeaveStatus")}>
//       <Text style={styles.buttonText}>{text}</Text>
//     </TouchableOpacity>
//   );
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  navbar: {
    backgroundColor: "#4CAF50",
    padding: 10,
    marginTop:30,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection:'row'
  },
  navbarData: {
    alignItems: "center",
    gap:10,
    flexDirection:'row'
  },
  username: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold"
  }, 
  school: {
    color: "white",
    fontSize: 16,
    
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    width: "80%",
    alignItems: "center"
  },
  logoutButton:{
    backgroundColor:"blue",
    padding: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold"
  }
});

export default Dashboard;
