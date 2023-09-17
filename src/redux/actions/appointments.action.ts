import Appointment from "@/src/models/Appointment";
import { appointmentsActions } from "../slices/appointments.slice";
import { AppDispatch, RootState } from "../store";
import appointmentsJson from "@/src/dummy/appointments.json";

const { setIsLoading, setAppointments } = appointmentsActions;

export const fetchAppointments = () => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        dispatch(setIsLoading(true));

        const { appointments } = getState().appointments;

        if (appointments.length) {
            return appointments;
        }

        try {
            const data = appointmentsJson.map((datum) => Appointment.format(datum));

            dispatch(setAppointments(data));
            dispatch(setIsLoading(false));
            return Promise.resolve(data);
        } catch (error) {
            dispatch(setIsLoading(false));
            return Promise.reject(error);
        }
    };
};