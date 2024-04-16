import fs from "fs/promises";
import { IdataFormat } from "./IdataFormat";


export class Map {
    private _mapData: string = '';
    constructor(mapData: any) {
        this._mapData = mapData;
    }

    async readJson() {
        const data = await fs.readFile("data.json", "utf-8");
        return data;
    }



    printMap(data: string) {
        const dataFormat: IdataFormat = JSON.parse(data);
        const city = dataFormat.city;
    
        const BurnabyInfo = city["Burnaby"];
        const VancouverInfo = city["Vancouver"];
        const RichmondInfo = city["Richmond"];
    
        // Burnaby 처리
        const BurnabyHouseholds = BurnabyInfo.households[0];
        const BurnabyInhabitants = BurnabyHouseholds.inhabitants;
    
        BurnabyInhabitants.forEach((person: any) => {
            if (person.isVaccinated === true) {
                this._mapData += "H";
            } else {
                this._mapData += "F";
            }
        });
        for (let i = 0; i < BurnabyInfo.clinics.length; i++) {
            this._mapData += (BurnabyInfo.clinics.length > 0 ? "C" : "");
        }
    
        this._mapData += "\n";
    
        // Vancouver 처리
        const VancouverHouseholds = VancouverInfo.households[0];
        const VancouverInhabitants = VancouverHouseholds.inhabitants;
    
        VancouverInhabitants.forEach((person: any) => {
            if (person.isVaccinated === true) {
                this._mapData += "H";
            } else {
                this._mapData += "F";
            }
        });
        for (let i = 0; i < VancouverInfo.clinics.length; i++) {
            this._mapData += (VancouverInfo.clinics.length > 0 ? "C" : "");
        }
    
        this._mapData += "\n";
    
        // Richmond 처리
        const RichmondHouseholds = RichmondInfo.households[0];
        const RichmondInhabitants = RichmondHouseholds.inhabitants;
    
        RichmondInhabitants.forEach((person: any) => {
            if (person.isVaccinated === true) {
                this._mapData += "H";
            } else {
                this._mapData += "F";
            }
        });
        for (let i = 0; i < RichmondInfo.clinics.length; i++) {
            this._mapData += (RichmondInfo.clinics.length > 0 ? "C" : "");
        }
        console.log(this._mapData);
        
    }

    registerForShots(data: any) {
        const dataFormat = JSON.parse(data);
        const city = dataFormat.city;

        for (const i in city) {
            if (city[i].households[0].inhabitants[0].isVaccinated === false) {
                const person = city[i].households[0].inhabitants;
                for (let i = 0; i < person.length; i++) {
                    if (person[i].age > 20) {
                        Object.keys(city).forEach(element => {
                            
                            const personInfo = city[element].households[0].inhabitants[0]
                            const queue = new Queue([]);
                            queue.enqueue(personInfo.fullName);
                            queue.getQueue()
                        });
                    }
                }
            }
        }
    }
}

class Queue {
    private _queue: string[] = []
    constructor(queue: string[]) {
      this._queue = queue;
    }

    getQueue() {
        console.log(this._queue);
    }
  
    enqueue(person: string) {
      this._queue.push(person);
    }
  
    dequeue() {
      return this._queue.shift();
    }
  }