import React, { useState,useEffect } from 'react';
import { View, Text,TextInput, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { getUserDataByMobile } from '../apiService';
import { useUser } from '../context/UserContext';

const Home = ({ navigation }) => {
  const { user,storeUserData,getLastLoginMobile } = useUser();
  // const defaultMobile = await getLastLoginMobile();
  useEffect(() => {
    if (user) {
      navigation.navigate('Dashboard', { userDetails: user });
    }else{
      const setDefaultMobileNumber = async () => {
        const defaultMobile = await getLastLoginMobile();
        if (defaultMobile) {
          setSelectedMobileNumber(defaultMobile);
        }
      };
      setDefaultMobileNumber();
    }
  }, [getLastLoginMobile,navigation, user]);
  const [selectedMobileNumber, setSelectedMobileNumber] = useState(null);
  const [error, setError] = useState(null);
  const handleContinue = async () => {
    if(!isValidPhoneNumber(selectedMobileNumber)){
      setError("Please Enter a Valid Number")
      return;
    }
    try {

      const result = await getUserDataByMobile(selectedMobileNumber);
      storeUserData(result);
      navigation.navigate('Dashboard', { userDetails: result});

    } catch (error) {
      console.error('Error during API request:', error);
      setError('An error occurred. Please try again.');
    }
  };
 
  const isValidPhoneNumber = (number) => {
    
    return /^\d{10}$/.test(number);
  };
  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
        
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

  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Home;
