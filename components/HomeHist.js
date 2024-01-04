// Home.js

import React, { useState,useEffect } from 'react';
import { View, Text,TextInput, Image, TouchableOpacity, StyleSheet } from 'react-native';

const Home = ({ navigation }) => {
  const [selectedMobileNumber, setSelectedMobileNumber] = useState(null);
  const [error, setError] = useState(null);

  const handleContinue = async () => {
    if(!isValidPhoneNumber(selectedMobileNumber)){
      setError("Please Enter a Valid Number")
      return;
    }
    try {
      // Make an API request to check if the user exists
      // Replace the placeholder API_URL with your actual API endpoint
      const response = await fetch(`${API_URL}/checkUser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mobileNumber: selectedMobileNumber }),
      });

      const result = await response.json();

      if (response.ok) {
        // If successful, navigate to the Dashboard and pass employee details
        navigation.navigate('Dashboard', { userDetails: result.employeeDetails });
      } else {
        // If API request fails, display an error message
        setError(result.message);
      }
    } catch (error) {
      console.error('Error during API request:', error);
      setError('An error occurred. Please try again.');
    }
  };
  // const simOptions = [{mobileNumber:890111662772},{mobileNumber:7282993837}]
  // const [simOptions, setSimOptions] = useState([]);

  // useEffect(() => {
  //   // Fetch the list of SIM cards when the component mounts
  //   fetchSimCards();
  // }, []);

  // const fetchSimCards = async () => {
  //   try {
  //     const { result } = await SMS.getSimCardsAsync();
  //     setSimOptions(result || []);
  //   } catch (error) {
  //     console.error('Error fetching SIM cards:', error);
  //     setError('An error occurred while fetching SIM cards.');
  //   }
  // };
  const isValidPhoneNumber = (number) => {
    
    return /^\d{10}$/.test(number);
  };
  return (
    <View style={styles.container}>
      {/* <Text style={styles.welcomeText}>Leave Management App</Text> */}
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      
      {/* Display SIM card options, assuming simOptions is an array of available SIM cards */}
      {/* {simOptions.map((sim, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => setSelectedMobileNumber(sim.mobileNumber)}
          style={[styles.simCard, { backgroundColor: selectedMobileNumber === sim.mobileNumber ? 'blue' : 'white' }]}
        >
          <Text>{sim.mobileNumber}</Text>
        </TouchableOpacity>
      ))} */}
    
      <TextInput
        style={styles.input}
        placeholder="Enter your phone number"
        keyboardType="phone-pad"
        value={selectedMobileNumber}
        onChangeText={(text) => setSelectedMobileNumber(text)}
      />

      
      {/* Continue button */}
      <TouchableOpacity onPress={handleContinue} style={styles.continueButton}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>

      {/* Display error message if API request fails */}
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'white'
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
    resizeMode: 'contain'
  },
  simCard: {
    padding: 10,
    margin: 5,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
  continueButton: {
    backgroundColor:  '#4CAF50',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 8,
    paddingRight: 8,
    fontSize: 16,
    borderRadius: 4,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333', 
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Home;
