import { Teammember } from "./teammember";
import { Team } from "./team";

export interface VolleyEvent {
    eventId: number;
    eventName: string;
    eventDate: string;
    eventLocation: string;
    numberOfHelpersNeeded: number;
    numberOfHelpersOK: boolean;
    teamMembersEager: [Teammember] | undefined;
    teamsEager: [Team] | undefined;
}
