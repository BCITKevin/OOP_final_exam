import { IClinic } from "./IClinic";
import { IPerson } from "./IPerson";
import { Queue } from "./Map";

export interface IQueue {
    person: IPerson;
    clinic: IClinic;
    queue?: Queue;
}
