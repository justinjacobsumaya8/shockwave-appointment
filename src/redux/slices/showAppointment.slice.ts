import { AppointmentInterface } from "@/src/models/Appointment";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isViewModalShown: false,
    activeAppointment: null as AppointmentInterface | null
};

const showAppointmentSlice = createSlice({
    name: "showAppointment",
    initialState: initialState,
    reducers: {
        setIsViewModalShown: (state, action) => {
            return {
                ...state,
                isViewModalShown: Boolean(action.payload)
            }
        },
        setActiveAppointment: (state, action) => {
            return {
                ...state,
                activeAppointment: {...action.payload}
            };
        },
        resetActiveAppointment: (state) => {
            return {
                ...state,
                activeAppointment: initialState.activeAppointment
            }
        }
    },
});

export const showAppointmentActions = showAppointmentSlice.actions;
export default showAppointmentSlice;
