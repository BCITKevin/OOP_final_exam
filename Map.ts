import fs from "fs/promises";
import { IdataFormat } from "./IdataFormat";
import { ICityData } from "./ICityData";
import { IClinic } from "./IClinic";
import { IPerson } from "./IPerson";
import { IHousehold } from "./IHousehold";
import { IQueue } from "./IQueue";


export class Map {
    private _mapData: string;
    constructor(mapData: any) {
        this._mapData = mapData;
    }

    async readJson() {
        const data = await fs.readFile("data.json", "utf-8");
        return JSON.parse(data);
    }



    printMap(data: ICityData) {
        const city = data.city;
        let maxBlockNum = 0;

        for (const city in data.city) {
            const houseHoldData = data.city[city].households;
            const clinicData = data.city[city].clinics;

            const houseHoldBlockNum = houseHoldData.map((h) => h.blockNum);
            const clinicBlockNum = clinicData.map((c) => c.blockNum);
            const maxBlocksNum = Math.max(...houseHoldBlockNum, ...clinicBlockNum);
            maxBlockNum = Math.max(maxBlockNum, maxBlocksNum);
        }

        for (const city in data.city) {
            const houseHold = data.city[city].households;
            const clinics = data.city[city].clinics;
            let map = '';

            for (let blockNum = 0; blockNum <= maxBlockNum; blockNum++) {
                const household = houseHold.find((h) => h.blockNum === blockNum);
                const clinic = clinics.find((c) => c.blockNum === blockNum);
                if (household) {
                    const isVaccinated = household.inhabitants.every((data) => data.isVaccinated);
                    map += (isVaccinated? "F,": "H,");
                } else if (clinic) {
                    map += "C,";
                } else {
                    map += "X,";
                }

            }
            console.log(map);
        }
    }

    closestClinic(data: any) {
        for (const city in data.city) {
            const houseHolds = data.city[city].households;
            const clinics = data.city[city].clinics;
            let closestClinicBlock = 0;
            let minNum = 10000;

            houseHolds.forEach((household: IHousehold) => {
                const personBlockNum = household.blockNum;
                clinics.forEach((clinicItem: IClinic) => {
                    const clinicBlockNum = clinicItem.blockNum;
                    const diffNum = Math.abs(personBlockNum - clinicBlockNum);
    
                    if (diffNum < minNum) {
                        closestClinicBlock = clinicBlockNum;
                        minNum = diffNum;
                    }
                });
                const clinic = clinics.find((c: any) => c.blockNum === closestClinicBlock);
                return clinic;
            })
        }
    }

    registerForShots(data: any, currentIntake: number) {
        for (const city in data.city) {
            const houseHolds = data.city[city].households;
           
            
            houseHolds.forEach((household: IHousehold) => {
                household.inhabitants.forEach((person: IPerson) => {
                    if (person.isVaccinated === false && person.age >= currentIntake) {
                       this.closestClinic
                    }
                })
            });
        }
    }
}


export class Queue {
    private _queue: IQueue[];
    constructor(queue: IQueue[]) {
      this._queue = queue;
    }

    avgTime() {
        return this._queue.length;
    }

    getQueue() {
        return this._queue;
    }
  
    enqueue(queueItem: IQueue) {
        this._queue.push(queueItem);
    }
  
    dequeue() {
      return this._queue.shift();
    }
}

interface IReport {
    printDetails(): void;
}

export class ReportMaker {
    private _report: IReport;

    constructor(report: IReport) {
        this._report = report;
    }

    printDetails() {
        this._report.printDetails();
    }
}

export class ComplexReport {
    private _clinics: IQueue[];
    constructor(clinics: IQueue[]) {
      this._clinics = clinics;
    }
    printDetails() {
      this._clinics.forEach(clinic => {
        const allQueue = clinic.queue?.getQueue;
        console.log(allQueue);
        // console.log(`
        // CLINIC NAME: ${clinic.getQueue()} 
        // People In Queue:
        // ${clinic.getQueue}
        // `)
      });
    };
  }

class SimpleReport {
    private _clinics: IClinic[];

    constructor(clinics: IClinic[]) {
        this._clinics = clinics
    }

    // printDetails() {
    //     this._clinics.forEach((clinic: IClinic) => {
    //         console.log(`
    //             ${clinic.getQueue.getQueue()} of people at ${clinic.name}
    //             The Average wait time is ${clinic.getQueue.getQueue() * 15}
    //         `)
    //     })
    // }
}