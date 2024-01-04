// apiService.js

const getUserDataByMobile = async (mobileNumber) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (mobileNumber==="1234567890") {
        const employeeDetails= {
            id: 1,
            emp_att_id:2,
            first_name: "John",
            last_name: "Doe",
            mobile:1234567890,
            // Add more user details as needed
          };
        resolve(employeeDetails);
      } else {
        reject({ message: 'No User Found' });
      }
    }, 1000); // Simulate a delay of 1 second
  });
};

export { getUserDataByMobile };
