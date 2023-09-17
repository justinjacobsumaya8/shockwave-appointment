import { createSlice } from "@reduxjs/toolkit";
import { AppointmentInterface } from "@/src/models/Appointment";
import { DEFAULT_TIME_FORMAT, PROPER_TIME_FORMAT } from "@/src/models/Time";
import moment from "moment";

const initialState = {
    isEditModalShown: false as boolean,
    isRescheduleModalShown: false as boolean,
    activeAppointment: null as AppointmentInterface | null,
};

const editAppointmentSlice = createSlice({
    name: "editAppointment",
    initialState: initialState,
    reducers: {
        setIsEditModalShown: (state, action)=> {
            return {
                ...state,
                isEditModalShown: Boolean(action.payload)
            }
        },
        setIsRescheduleModalShown: (state, action)=> {
            return {
                ...state,
                isRescheduleModalShown: Boolean(action.payload)
            }
        },
        setActiveAppointment: (state, action) => {
            const appointment = action.payload;
            const startTime = moment(appointment.startTime, DEFAULT_TIME_FORMAT).format(PROPER_TIME_FORMAT);
            const endTime = moment(appointment.endTime, DEFAULT_TIME_FORMAT).format(PROPER_TIME_FORMAT);
            return {
                ...state,
                activeAppointment: {
                    ...appointment,
                    startTime,
                    endTime
                }
            }
        },
        setTitle: (state, action) => {
            if (state.activeAppointment) {
                state.activeAppointment.title = action.payload;
            }
        },
        setService: (state, action) => {
            if (state.activeAppointment) {
                state.activeAppointment.service = action.payload;
            }
        },
        setDate: (state, action) => {
            if (state.activeAppointment) {
                state.activeAppointment.date = action.payload
            }
        },
        setStartTime: (state, action) => {
            if (state.activeAppointment) {
                state.activeAppointment.startTime = action.payload
            }
        },
        setEndTime: (state, action) => {
            if (state.activeAppointment) {
                state.activeAppointment.endTime = action.payload
            }
        },
        setVeterinary: (state, action) => {
            if (state.activeAppointment) {
                state.activeAppointment.veterinary = {...action.payload};
            }
        },
        setPetName: (state, action) => {
            if (state.activeAppointment) {
                state.activeAppointment.pet.name = action.payload
            }
        },
        setPetBreed: (state, action) => {
            if (state.activeAppointment) {
                state.activeAppointment.pet.breed = action.payload
            }
        },
        setPetBirthday: (state, action) => {
            if (state.activeAppointment) {
                state.activeAppointment.pet.birthday = action.payload
            }
        },
        setPetGender: (state, action) => {
            if (state.activeAppointment) {
                state.activeAppointment.pet.gender = action.payload
            }
        },
        setPetType: (state, action) => {
            if (state.activeAppointment) {
                state.activeAppointment.pet.type = action.payload
            }
        },
        setPetImage: (state, action) => {
            if (state.activeAppointment) {
                state.activeAppointment.pet.image = action.payload
            }
        },
        setClientName: (state, action) => {
            if (state.activeAppointment) {
                state.activeAppointment.client.name = action.payload
            }
        },
        resetActiveAppointment: (state) => {
            return {
                ...state,
                activeAppointment: initialState.activeAppointment
            }
        } 
    },
});

export const editAppointmentActions = editAppointmentSlice.actions;
export default editAppointmentSlice;
