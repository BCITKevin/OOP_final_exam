import { ICity } from "./ICity"

export interface ICityData {
    city: {
        [key:string]: ICity;
    }
}