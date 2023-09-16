export interface RawVeterinaryInterface {
    id: number;
    name: string;
    address: string;
    building: string;
    contact_number: string;
}

export interface VeterinaryInterface {
    id: number;
    name: string;
    address: string;
    building: string;
    contactNumber: string;
}

class Veterinary {
    static format(object: RawVeterinaryInterface): VeterinaryInterface {
        return {
            id: object.id,
            name: object.name,
            address: object.address,
            building: object.building,
            contactNumber: object.contact_number,
        };
    }
}

export default Veterinary;