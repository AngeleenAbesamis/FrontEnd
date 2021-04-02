import { pilot } from "./pilot";
export interface user
{
    userName: string,
    firstName: string,
    lastName: string,
    email: string,
    phoneNumb: number,
    id: number,
    pilots: pilot[]
}