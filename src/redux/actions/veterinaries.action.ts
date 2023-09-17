import { veterinariesActions } from "../slices/veterinaries.slice";
import { AppDispatch } from "../store";
import veterinariesJson from "@/src/dummy/veterinaries.json";
import Veterinary from "@/src/models/Veterinary";

const { setIsLoading, setVeterinaries } = veterinariesActions;

export const fetchVeterinaries = () => {
    return async (dispatch: AppDispatch) => {
        dispatch(setIsLoading(true));

        try {
            const data = veterinariesJson.map((datum) => Veterinary.format(datum));

            dispatch(setVeterinaries(data));
            dispatch(setIsLoading(false));
            return Promise.resolve(data);
        } catch (error) {
            dispatch(setIsLoading(false));
            return Promise.reject(error);
        }
    };
};