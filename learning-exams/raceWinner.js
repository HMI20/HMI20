function stratigyTester(driversData) {
const laps = 70;
const pitStopTime = 20;
const lapDistance = 5.0; 
let winner = " ";
let min=Infinity;
for (let i = 0; i < driversData.length; i++) {
    const speed = finalSpeed(driversData[i].speed,driversData[i].tyre)
    

    const raceTime = laps*lapDistance/speed * 60*60 + (driversData[i].pitStops * pitStopTime);
   
        if (raceTime < min) {
            min = raceTime;
            winner = driversData[i].name;
        }
    
            

    }
return winner;  
}
const tyreStrategies = {
soft : {base:1.05, lapsPower:15},
mid : {base:1, lapsPower:25},
hard : {base:0.9, lapsPower:40}
}

function finalSpeed(speed,tyre) {
    debugger
    return speed*tyreStrategies[tyre].base;
}
const driversData = [
    { name: "Luis", speed: 150, pitStops: 2 , tyre: 'hard'},
    { name: "Max", speed: 145, pitStops: 3 , tyre: 'mid'},
    { name: "Lando", speed: 155, pitStops: 1 , tyre: 'hard'}  
];
console.log("winner is: " + stratigyTester(driversData));