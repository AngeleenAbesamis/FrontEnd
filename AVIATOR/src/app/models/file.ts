import { pilot } from "./pilot";
import { user } from "./user";

export interface file
{
    ID: number,
    Pilot: pilot,
    PilotID: number,
    Uploader: user,
    UploaderID: number,
    FileURL: string,
    FileName: string,
    FileDescription: string,

}