import Veterinary, { RawVeterinaryInterface, VeterinaryInterface } from "./Veterinary";

export interface RawClientInterface {
    name: string;
    email: string;
    phone: string;
    address: string;
}

export interface ClientInterface {
    name: string;
    email: string;
    phone: string;
    address: string;
}

class Client {
    static format(object: RawClientInterface): ClientInterface {
        return {
            name: object.name,
            email: object.email,
            phone: object.phone,
            address: object.address,
        };
    }
}

export default Client;