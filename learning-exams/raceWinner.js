const driver = { name: "Max Verstappen", score: 0.98 };
const car = { team: "Red Bull", score: 0.95 };

const teamScore = (driver.score*0.6+ car.score*0.4);

const tires = {
  soft:   { base: 1.00, wearRate: 0.015 },
  medium: { base: 0.95, wearRate: 0.010 },
  hard:   { base: 0.90, wearRate: 0.005 }
};

const totalLaps = 30;
const idealLap = 100; //in seconds
let pitStops = 0;
let raceTime = 0;
for (let lapNumber = 1; lapNumber<=totalLaps; lapNumber++) {

const lapTime = idealLap+(100*(1-(teamScore*(tires.soft.base-(tires.soft.wearRate*lapNumber)))))
raceTime = raceTime+lapTime;

}
let raceTimeInMin = raceTime/60 ;
console.log("race time is" + raceTimeInMin);






function stratigyTester(driversData) {
const laps = 70;
const pitStopTime = 20;
const lapDistance = 5.0; 
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
const driversData = [
    { name: "Luis", speed: 150, pitStops: 2 , tyre: 'hard'},
    { name: "Max", speed: 145, pitStops: 3 , tyre: 'mid'},
    { name: "Lando", speed: 155, pitStops: 1 , tyre: 'hard'}  
];
console.log("winner is: " + stratigyTester(driversData));