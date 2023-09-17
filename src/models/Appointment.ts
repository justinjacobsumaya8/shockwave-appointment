import Client, { ClientInterface, RawClientInterface } from "./Client";
import Pet, { PetInterface, RawPetInterface } from "./Pet";
import Veterinary, { RawVeterinaryInterface, VeterinaryInterface } from "./Veterinary";

export const CONSULTATION_SERVICE = "Consultation";
export const VACCINATION_SERVICE = "Vaccination";

export const SERVICES = [
    CONSULTATION_SERVICE,
    VACCINATION_SERVICE
];

interface RawAppointmentInterface {
    id: number,
    title: string;
    service: string;
    date: string;
    start_time: string;
    end_time: string;
    client: RawClientInterface;
    veterinary: RawVeterinaryInterface;
    pet: RawPetInterface;
};

export interface AppointmentInterface {
    id: number;
    title: string;
    service: string;
    date: string;
    startTime: string;
    endTime: string;
    client: ClientInterface;
    veterinary: VeterinaryInterface;
    pet: PetInterface
}

class Appointment {
    static format(object: RawAppointmentInterface): AppointmentInterface {
        return {
            id: object.id,
            title: object.title,
            date: object.date,
            startTime: object.start_time,
            endTime: object.end_time,
            service: object.service,
            client: Client.format(object.client),
            veterinary: Veterinary.format(object.veterinary),
            pet: Pet.format(object.pet)
        };
    }
}

export default Appointment;