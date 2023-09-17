import { configureStore, combineReducers, AnyAction, Store } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";

import alertMessageSlice from "@/src/redux/slices/alertMessage.slice";
import appointmentsSlice from "@/src/redux/slices/appointments.slice";
import createAppointmentSlice from "./slices/createAppointment.slice";
import editAppointmentSlice from "./slices/editAppointment.slice";
import globalSearchSlice from "./slices/globalSearch.slice";
import showAppointmentSlice from "./slices/showAppointment.slice";
import veterinariesSlice from "./slices/veterinaries.slice";

const combinedReducer = combineReducers({
    alertMessage: alertMessageSlice.reducer,
    appointments: appointmentsSlice.reducer,
    createAppointment: createAppointmentSlice.reducer,
    editAppointment: editAppointmentSlice.reducer,
    globalSearch: globalSearchSlice.reducer,
    showAppointment: showAppointmentSlice.reducer,
    veterinaries: veterinariesSlice.reducer,
});

const rootReducer = (state: ReturnType<typeof combinedReducer> | undefined, action: AnyAction) => {
    // Check if action is for logout, then reset all reducers
    // if (action.type === "authentication/saveLogout") {
    //     state = undefined;
    // }
    return combinedReducer(state, action);
};

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            // serializableCheck: false
        })
});

const makeStore = () => store;

export const wrapper = createWrapper<Store>(makeStore, {
    debug: false
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;