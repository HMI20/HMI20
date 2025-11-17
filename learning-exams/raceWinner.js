
const driversData = [
    { name: "Max Verstappen", score: 0.98 },
    { name: "Luis Hamelton", score: 0.96 },
    { name: "Lando Noras", score: 0.97 }  
];
const car = [
    { team: "Red Bull", score: 0.92 },
    { team: "Mercedes", score: 0.95 },
    { team: "Maclaren", score: 0.97 }];

const tires = {
  soft:   { base: 1.00, wearRate: 0.015 },
  medium: { base: 0.95, wearRate: 0.010 },
  hard:   { base: 0.90, wearRate: 0.005 }
};
const totalLaps = 30;
const idealLap = 100; //in seconds
let pitStops = 0;
let raceTime = 0;

for (let i=0; i<driversData.length; i++) {
    const teamScore = (driversData[i].score*0.6+ car[i].score*0.4);

    for (let lapNumber = 1; lapNumber<=totalLaps; lapNumber++) {

    const lapTime = idealLap+(100*(1-(teamScore*(tires.soft.base-(tires.soft.wearRate*lapNumber)))))
    raceTime = raceTime+lapTime;

    }
let raceTimeInMin = raceTime/60 ;
console.log("Driver " +driversData[i].name +" race time " + raceTimeInMin);

}





function stratigyTester(driversData) {

const pitStopTime = 20;

let winner = " ";
let min=Infinity;
for (let i = 0; i < driversData.length; i++) {
    const adjSpeed = finalSpeed(driversData[i].speed,driversData[i].tyre)
   

    const raceTime = laps*lapDistance/adjSpeed * 60*60 + (driversData[i].pitStops * pitStopTime);
   
        if (raceTime < min) {
            min = raceTime;
            winner = driversData[i].name;
        }
    
            

    }
return winner;  
}


function finalSpeed(speed,tyre) {
    
    return speed*tires[tyre].base;
}

console.log("winner is: " + stratigyTester(driversData));