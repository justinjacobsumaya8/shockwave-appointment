import { createSlice } from "@reduxjs/toolkit";
import { VeterinaryInterface } from "@/src/models/Veterinary";

const initialState = {
    isLoading: false as boolean,
    veterinaries: [] as VeterinaryInterface[],
};

const veterinariesSlice = createSlice({
    name: "veterinaries",
    initialState: initialState,
    reducers: {
        setIsLoading: (state, action) => {
            return {
                ...state,
                isLoading: Boolean(action.payload)
            }
        },
        setVeterinaries: (state, action) => {
            return {
                ...state,
                veterinaries: [...action.payload]
            };
        },
    },
});

export const veterinariesActions = veterinariesSlice.actions;
export default veterinariesSlice;
