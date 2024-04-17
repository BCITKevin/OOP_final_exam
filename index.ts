import { Map, ReportMaker, ComplexReport, Queue } from "./Map";

async function main() {
    const map = new Map('');
    const data = map.readJson();
    map.printMap(await data);
    console.log("---End of Map---")
    let currentIntake = 40;
    const register = map.registerForShots(await data, currentIntake);
    const queue = new Queue([]);
    queue.enqueue(register);
    // const report = new ReportMaker(new ComplexReport(register));
    // report.printDetails();
    // console.log("---End of Report---")
    // map.printMap(await data);
    // console.log("---End of Map---")
  }
  
  main();