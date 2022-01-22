import { ContactPerson } from "./contacperson";

export interface Teammember {
    id: number;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    gender: string;
    email: string;
    mobile: string;
    street: string;
    streetNb: number;
    postalCode: number;
    location: string;
    isPlayer: boolean;
    isCoach: boolean;
    isAdmin: boolean;
    contactPerson: ContactPerson;
}