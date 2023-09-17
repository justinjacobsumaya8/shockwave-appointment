import { createSlice } from "@reduxjs/toolkit";
import { ClientInterface } from "@/src/models/Client";
import { AppointmentInterface } from "@/src/models/Appointment";

const initialState = {
    isLoading: false as boolean,
    appointments: [] as AppointmentInterface[],
    selectedClient: null as ClientInterface | null,
};

const appointmentsSlice = createSlice({
    name: "appointments",
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
        setSelectedClient: (state, action) => {
            return {
                ...state,
                selectedClient: {...action.payload}
            }
        },
        updateAppointment: (state, action) => {
            const appointment = action.payload;
            const newAppointments = state.appointments.map(data => {
                if (data.id === appointment.id) {
                    return appointment;
                }
                return data;
            });
            
            return {
                ...state,
                appointments: newAppointments
            }
        },
        removeAppointment: (state, action) => {
            const appointment = action.payload;
            const newAppointments = state.appointments.filter(data => data.id !== appointment.id);

            return {
                ...state,
                appointments: newAppointments
            }
        }
    },
});

export const appointmentsActions = appointmentsSlice.actions;
export default appointmentsSlice;
