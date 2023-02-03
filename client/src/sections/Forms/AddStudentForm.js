import React from 'react'
import StudentForm from '../../components/StudentForm';

const AddStudentForm = () => {
  const defaultDataValues =  {
    firstName: "",
    middleName: "",
    lastName: "",
    Class: "",
    division: "",
    rollNumber: 0,
    addressLine1: "",
    addressLine2: "",
    landmark: "",
    city: "",
    pincode: 0,
  };

  return (
    <StudentForm defaultDataValues={defaultDataValues} isDisabled={false} />
  );
}

export default AddStudentForm