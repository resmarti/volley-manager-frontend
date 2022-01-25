import { Teammember } from "./teammember";

export interface Team {
    teamId: number;
    teamName: string;
    maxAge: number;
    teamMembersEager: [Teammember] | undefined;
}