import React from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormProvider from "./hook-form/FormProvider";
import { Alert, Button, Stack } from "@mui/material";
import { RHFTextField, RHFAutocomplete } from "./hook-form/";
import { useDispatch, useSelector } from "react-redux";
import { AddStudentData, UpdateManagePageTypeAndId, UpdateStudentData } from "../redux/slices/app";

const StudentForm = ({ defaultDataValues, isDisabled }) => {
  const { type, activeStudent: id } = useSelector((state) => state.app.managePage);

  const dispatch = useDispatch();

  const classOptions = [
    {
      key: "1",
    },
    {
      key: "2",
    },
    {
      key: "3",
    },
    {
      key: "4",
    },
    {
      key: "5",
    },
    {
      key: "6",
    },
    {
      key: "7",
    },
    {
      key: "8",
    },
    {
      key: "9",
    },
    {
      key: "10",
    },
    {
      key: "11",
    },
    {
      key: "12",
    },
  ];

  const divisionOptions = [
    {
      key: "A",
    },
    {
      key: "B",
    },
    {
      key: "C",
    },
    {
      key: "D",
    },
    {
      key: "E",
    },
  ];

  const AddStudentSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required!"),
    middleName: Yup.string(),
    lastName: Yup.string().required("Last Name is required!"),
    Class: Yup.object().required("Class is required!"),
    division: Yup.object().required("Division is required!"),
    rollNumber: Yup.number().required("Roll Number is required!"),
    addressLine1: Yup.string().required("Address is required!"),
    addressLine2: Yup.string(),
    city: Yup.string().required("City is required!"),
    landmark: Yup.string().required("Landmark is required!"),
    pincode: Yup.number().required("Pincode is required!"),
  });

  let defaultValues = defaultDataValues;

  const methods = useForm({
    resolver: yupResolver(AddStudentSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = methods;

  const onSubmit = async (data) => {
    // format data before submit to backend
    if(type === "EDITONE"){
      let formatted_data = {}

      if(data.Class && data.division){
        formatted_data = {...data, Class: data.Class.key, division: data.division.key }
      } else if(data.Class) {
        formatted_data = { ...data, Class: data.Class.key}
      } else if (data.division){
        formatted_data = { ...data, division: data.division.key}
      } else {
        formatted_data = data;
      }

      dispatch(UpdateStudentData(id, formatted_data, reset, setError));
      dispatch(UpdateManagePageTypeAndId("SHOWALL", null));
    } else {
      const formatted_data = {
        firstName: data.firstName,
        middleName: data.middleName,
        lastName: data.lastName,
        Class: data.Class.key,
        division: data.division.key,
        rollNumber: data.rollNumber,
        addressLine1: data.addressLine1,
        addressLine2: data.addressLine2,
        landmark: data.landmark,
        city: data.city,
        pincode: data.pincode,
      };
  
      dispatch(AddStudentData(formatted_data, reset, setError));
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={5}>
        {!!errors.afterSubmit && (
          <Alert severity="error">{errors.afterSubmit.message}</Alert>
        )}
        {isSubmitSuccessful && (
          <Alert severity="success">Student's Data Uploaded Successfully</Alert>
        )}
        <Stack spacing={4}>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={3}>
            <RHFTextField
              isDisabled={isDisabled}
              name="firstName"
              label="First Name"
            />
            <RHFTextField
              isDisabled={isDisabled}
              name="middleName"
              label="Middle Name"
            />
            <RHFTextField
              isDisabled={isDisabled}
              name="lastName"
              label="Last Name"
            />
          </Stack>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={3}>
            <RHFAutocomplete
              isDisabled={isDisabled}
              name="Class"
              label="Class"
              options={classOptions}
            />
            <RHFAutocomplete
              isDisabled={isDisabled}
              name="division"
              label="Division"
              options={divisionOptions}
            />
            <RHFTextField
              isDisabled={isDisabled}
              name="rollNumber"
              label="Roll Number"
              type="number"
              placeholder="Enter 2 Digit Roll Number"
            />
          </Stack>
        </Stack>

        <Stack spacing={4}>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={3}>
            <RHFTextField
              isDisabled={isDisabled}
              name="addressLine1"
              label="Address Line 1"
            />
            <RHFTextField
              isDisabled={isDisabled}
              name="addressLine2"
              label="Address Line 2"
            />
          </Stack>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={3}>
            <RHFTextField
              isDisabled={isDisabled}
              name="landmark"
              label="Landmark"
            />
            <RHFTextField isDisabled={isDisabled} name="city" label="City" />
            <RHFTextField
              isDisabled={isDisabled}
              name="pincode"
              label="Pincode"
              placeholder="Enter 6 Digit Number"
              type="number"
            />
          </Stack>
        </Stack>

        {!isDisabled && (
          <Button
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            sx={{
              minWidth: "200px",
              width: "33%",
              maxWidth: "340px",
              height: "50px",
              fontSize: "16px",
              fontWeight: 600,
              bgcolor: (theme) => theme.palette.error.main,
              color: (theme) =>
                theme.palette.mode === "light" ? "common.white" : "grey.800",
              "&:hover": {
                bgcolor: (theme) => theme.palette.error.dark,
              },
            }}
          >
            {type === "EDITONE" ? "SAVE" : "ADD DATA"}
          </Button>
        )}
      </Stack>
    </FormProvider>
  );
};

export default StudentForm;
