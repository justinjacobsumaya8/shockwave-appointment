import Veterinary, { RawVeterinaryInterface, VeterinaryInterface } from "./Veterinary";

export interface RawClientInterface {
    name: string;
    email: string;
    phone: string;
    address: string;
    veterinary: RawVeterinaryInterface
}

export interface ClientInterface {
    name: string;
    email: string;
    phone: string;
    address: string;
    veterinary: VeterinaryInterface;
}

class Client {
    static format(object: RawClientInterface): ClientInterface {
        return {
            name: object.name,
            email: object.email,
            phone: object.phone,
            address: object.address,
            veterinary: Veterinary.format(object.veterinary)
        };
    }
}

export default Client;