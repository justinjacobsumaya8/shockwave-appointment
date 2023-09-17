import Veterinary, { RawVeterinaryInterface, VeterinaryInterface } from "./Veterinary";

export interface RawPetInterface {
    name: string;
    breed: string;
    birthday: string;
    gender: string;
    type: string;
    image: string;
}

export interface PetInterface {
    name: string;
    breed: string;
    birthday: string;
    gender: string;
    type: string;
    image: string;
}

class Pet {
    static format(object: RawPetInterface): PetInterface {
        return {
            name: object.name,
            breed: object.breed,
            birthday: object.birthday,
            gender: object.gender,
            type: object.type,
            image: object.image,
        };
    }
}

export default Pet;