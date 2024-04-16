import { Map } from "./Map";

async function main() {
    const map = new Map('');
    const data = map.readJson();
    map.printMap(await data);
    console.log("---End of Map---")
    map.registerForShots(await data);
    // const report = new ReportMaker(new ComplexReport(map));
    // report.printDetails();
    // console.log("---End of Report---")
    map.printMap(await data);
    console.log("---End of Map---")
  }
  
  main();