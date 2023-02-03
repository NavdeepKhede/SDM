import { createSlice } from "@reduxjs/toolkit";
import axios from "../../axios";

const initialState = {
  mode: "light",
  user: null,
  token: null,
  isLoggedIn: false,
  managePage: {
    type: "SHOWALL", // can be SHOWALL, VIEWONE, EDITONE
    activeStudent: null,
  },
};

const slice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.token = null;
    },
    updateManagePageTypeAndId(state, action) {
      state.managePage.type = action.payload.type;
      state.managePage.activeStudent = action.payload.id;
    },
  },
});

//Reducer
export default slice.reducer;
// export const { setMode, setLogin, setLogout, updateManagePageType } = slice.actions;

//Actions
export function ToggleMode() {
  return async (dispatch, getState) => {
    dispatch(slice.actions.setMode());
  };
}

export function LoginUser(formValues, reset, setError) {
  // formValues => { email, password }
  return async (dispatch, getState) => {
    await axios
      .post(
        "/auth/login",
        {
          ...formValues,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      ) // Handle the response from backend here
      .then((res) => {
        dispatch(
          slice.actions.setLogin({
            isLoggedIn: true,
            user: res.data.user,
            token: res.data.token,
          })
        );
      })
      // Catch errors if any
      .catch((error) => {
        reset();
        setError("afterSubmit", {
          ...error,
          message: error.message,
        });
      });
  };
}

export function RegisterUser(formValues, reset, setError) {
  return async (dispatch, getState) => {
    await axios
      .post(
        "/auth/register",
        {
          ...formValues,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      ) // Handle the response from backend here
      .then((res) => {
        dispatch(
          slice.actions.setLogin({
            isLoggedIn: true,
            user: res.data.user,
            token: res.data.token,
          })
        );
      })
      // Catch errors if any
      .catch((error) => {
        console.log(error);
        reset();
        setError("afterSubmit", {
          ...error,
          message: error.message,
        });
      });
  };
}

export function Logout() {
  return async (dispatch, getState) => {
    dispatch(slice.actions.setLogout());
  };
}

export function UpdateManagePageTypeAndId(type, id) {
  return async (dispatch, getState) => {
    dispatch(slice.actions.updateManagePageTypeAndId({ type, id }));
  };
}

export function AddStudentData(formValues, reset, setError) {
  return async (dispatch, getState) => {
    await axios
      .post(
        "/student/add",
        {
          ...formValues,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      ) // Handle the response from backend here
      .then((res) => {
        reset();
      })
      // Catch errors if any
      .catch((error) => {
        console.log(error);
        reset();
        setError("afterSubmit", {
          ...error,
          message: error.message,
        });
      });
  };
}

export function UpdateStudentData(id, formValues, reset, setError) {
  return async (dispatch, getState) => {
    await axios
      .patch(
        `/student/edit/${id}`,
        {
          ...formValues,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      ) // Handle the response from backend here
      .then((res) => {
        reset();
      })
      // Catch errors if any
      .catch((error) => {
        console.log(error);
        reset();
        setError("afterSubmit", {
          ...error,
          message: error.message,
        });
      });
  };
}