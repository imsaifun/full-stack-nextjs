import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null
};

const profile = createSlice({
    name: "profile",
    initialState,
    reducers: {
        loginSuccess(state, action) {
            state.user = action.payload.user;
        }
    }
});

const { loginSuccess } = profile.actions;

export const login = ({ email, password }) => async (dispatch) => {
    const res = await axios.post(`/api/user/profile`, { email } );
    dispatch(loginSuccess(res.data));
};

export default profile.reducer;
