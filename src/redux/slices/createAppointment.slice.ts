import { VeterinaryInterface } from "@/src/models/Veterinary";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    title: "" as string,
    service: "" as string,
    date: "" as string,
    startTime: "" as string,
    endTime: "" as string,
    veterinary: null as VeterinaryInterface | null,
    isCreateModalShown: false as boolean,
};

const createAppointmentSlice = createSlice({
    name: "createAppointment",
    initialState: initialState,
    reducers: {
        setTitle: (state, action) => {
            return {
                ...state,
                title: action.payload
            }
        },
        setService: (state, action) => {
            return {
                ...state,
                service: action.payload
            }
        },
        setDate: (state, action) => {
            return {
                ...state,
                date: action.payload
            }
        },
        setStartTime: (state, action) => {
            return {
                ...state,
                startTime: action.payload
            }
        },
        setEndTime: (state, action) => {
            return {
                ...state,
                endTime: action.payload
            }
        },
        setVeterinary: (state, action) => {
            return {
                ...state,
                veterinary: {...action.payload}
            }
        },
        setIsCreateModalShown: (state, action) => {
            return {
                ...state,
                isCreateModalShown: Boolean(action.payload)
            }
        },
        resetFields: (state) => {
            return {
                ...initialState
            }
        }
    },
});

export const createAppointmentActions = createAppointmentSlice.actions;
export default createAppointmentSlice;
