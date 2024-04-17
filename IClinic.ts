import { Queue } from "./Map"; 


export interface IClinic {
    name: string;
    blockNum: number;
    staff: number;
    getQueue: Queue
}