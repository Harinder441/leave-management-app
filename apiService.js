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
        leave_balance: 20,
        month_availed_leave: 2,
        year_availed_leave: 5,
        ett_adm_no: 123,
        needLeaveSubType: true,
        leaveTypes: { "leave": 'Leave', "out_duty": 'Out Duty' },
        leaveSubTypes: { 1: 'Casual Leave', 2: 'Leave Without Pay',3:"Academic Leave" },
        joining_date: '2022-01-01',
        org_joining_date: '2022-01-01',
        father_name: 'John Doe',
        designation: 'Software Engineer',
      };
      resolve(result);
    }, 1000); // Simulate a delay of 1 second
  });
};


export { getUserDataByMobile,getLeaveFormData };
