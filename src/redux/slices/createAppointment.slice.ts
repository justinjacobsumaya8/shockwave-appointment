import { PetInterface } from "@/src/models/Pet";
import { VeterinaryInterface } from "@/src/models/Veterinary";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    title: "" as string,
    service: "" as string,
    date: "" as string,
    startTime: "" as string,
    endTime: "" as string,
    pet: {
        name: "",
        breed: "",
        birthday: "",
        gender: "",
        type: "",
        image: "",
    } as PetInterface,
    client: {
        name: "" as string,
    },
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
        setPetName: (state, action) => {
            state.pet.name = action.payload
        },
        setPetBreed: (state, action) => {
            state.pet.breed = action.payload
        },
        setPetBirthday: (state, action) => {
            state.pet.birthday = action.payload
        },
        setPetGender: (state, action) => {
            state.pet.gender = action.payload
        },
        setPetType: (state, action) => {
            state.pet.type = action.payload
        },
        setPetImage: (state, action) => {
            state.pet.image = action.payload
        },
        setClientName: (state, action) => {
            state.client.name = action.payload
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
