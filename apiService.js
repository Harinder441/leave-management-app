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
            school_id:1,
            school_name:"Bhai Desa",
            address:"User Address"
            // Add more user details as needed
          };
        resolve(employeeDetails);
      } else {
        reject({ message: 'No User Found' });
      }
    }, 1000); // Simulate a delay of 1 second
  });
};
const getLeaveFormData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const result = {
        leaveBalance: 20,
        leaveAvailedInCurrMonth: 2,
        leaveAvailedInCurrSession: 5,
        ETTAdmNo: 123,
        needLeaveSubType: true,
        leaveTypes: { "leave": 'Leave', "out_duty": 'Out Duty' },
        leaveSubTypes: { 1: 'Casual Leave', 2: 'Leave Without Pay',3:"Academic Leave" },
        joiningDate: '2022-01-01',
        orgJoiningDate: '2022-01-01',
        fatherName: 'John Doe',
        designation: 'Software Engineer',
      };
      resolve(result);
    }, 1000); // Simulate a delay of 1 second
  });
};


export { getUserDataByMobile,getLeaveFormData };
