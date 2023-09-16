import Client, { ClientInterface, RawClientInterface } from "./Client";

interface RawAppointmentInterface {
    title: string;
    start_date: string;
    end_date: string;
    client: RawClientInterface
};

export interface AppointmentInterface {
    title: string;
    startDate: string;
    endDate: string;
    client: ClientInterface
}

class Appointment {
    static format(object: RawAppointmentInterface): AppointmentInterface {
        return {
            title: object.title,
            startDate: object.start_date,
            endDate: object.end_date,
            client: Client.format(object.client),
        };
    }
}

export default Appointment;