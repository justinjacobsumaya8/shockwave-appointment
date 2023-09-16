import Client, { ClientInterface, RawClientInterface } from "./Client";
import Veterinary, { RawVeterinaryInterface, VeterinaryInterface } from "./Veterinary";

interface RawAppointmentInterface {
    title: string;
    start_date: string;
    end_date: string;
    client: RawClientInterface,
    veterinary: RawVeterinaryInterface
};

export interface AppointmentInterface {
    title: string;
    startDate: string;
    endDate: string;
    client: ClientInterface,
    veterinary: VeterinaryInterface
}

class Appointment {
    static format(object: RawAppointmentInterface): AppointmentInterface {
        return {
            title: object.title,
            startDate: object.start_date,
            endDate: object.end_date,
            client: Client.format(object.client),
            veterinary: Veterinary.format(object.veterinary)
        };
    }
}

export default Appointment;