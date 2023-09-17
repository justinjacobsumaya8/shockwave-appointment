import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    message: "",
    type: ""
};

const alertMessageSlice = createSlice({
    name: "alertMessage",
    initialState: initialState,
    reducers: {
        setAlertMessage: (state, action) => {
            const { message, type } = action.payload;
            return {
                ...state,
                message,
                type
            };
        },
    },
});

export const alertMessageActions = alertMessageSlice.actions;
export default alertMessageSlice;
