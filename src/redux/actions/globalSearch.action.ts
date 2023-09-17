import Appointment, { AppointmentInterface } from "@/src/models/Appointment";
import { AppDispatch, RootState } from "../store";
import appointmentsJson from "@/src/dummy/appointments.json";
import { globalSearchActions } from "../slices/globalSearch.slice";
import { appointmentsActions } from "../slices/appointments.slice";
import moment from "moment";

const { setIsLoading, setAppointments } = globalSearchActions;

export const search = (keyword: string = "") => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        dispatch(setIsLoading(true));

        let data: AppointmentInterface[] = [];
        const { appointments } = getState().appointments;

        try {
            if (appointments.length) {
                data = appointments;
            } else {
                data = appointmentsJson.map((datum) => Appointment.format(datum));
                dispatch(appointmentsActions.setAppointments(data));
            }

            let newData = [...data];
            newData= newData.filter((datum) => {
                const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
                if (datum.title.match(regex)) {
                    return datum;
                }
            });

            newData.sort((a, b) =>{
                const first = moment(a.date + " " + a.startTime, "YYYY-MM-DD hh:mm:ss").unix();
                const second = moment(b.date + " " + b.startTime, "YYYY-MM-DD hh:mm:ss").unix();
                
                return first - second;
            });

            dispatch(setAppointments(newData));
            dispatch(setIsLoading(false));
            return Promise.resolve(data);
        } catch (error) {
            dispatch(setIsLoading(false));
            return Promise.reject(error);
        }
    };
};