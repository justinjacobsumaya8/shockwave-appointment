import { AppointmentInterface } from "@/src/models/Appointment";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false as boolean,
    appointments: [] as AppointmentInterface[]
};

const globalSearchSlice = createSlice({
    name: "globalSearch",
    initialState: initialState,
    reducers: {
        setIsLoading: (state, action) => {
            return {
                ...state,
                isLoading: Boolean(action.payload)
            }
        },
        setAppointments: (state, action) => {
            return {
                ...state,
                appointments: [...action.payload]
            };
        },
    },
});

export const globalSearchActions = globalSearchSlice.actions;
export default globalSearchSlice;
