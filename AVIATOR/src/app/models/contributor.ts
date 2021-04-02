import { pilot } from "./pilot";
import { user } from "./user";

export interface contributor
{
    id: number
    pilot: pilot
    pilotID: number
    user: user
    userID: number
    
}
