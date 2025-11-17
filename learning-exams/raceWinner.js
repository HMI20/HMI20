function main (){
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
const pitStopTime = 20;
console.log("the winner is "+ getWinner(driversData,car,totalLaps,idealLap,tires.soft.base,tires.soft.wearRate))
}

function getWinner(driversData, car, totalLaps, idealLap, tiresBase, tiresWear) {
    let winner = " ";
    let min = Infinity;

    for (let i = 0; i < driversData.length; i++) {
        const teamScore = (driversData[i].score * 0.6 + car[i].score * 0.4);
        let raceTime = 0;
        for (let lapNumber = 1; lapNumber <= totalLaps; lapNumber++) {

            const lapTime = idealLap + (100 * (1 - (teamScore * (tiresBase - (tiresWear * lapNumber)))))
            raceTime = raceTime + lapTime;

        }
        let raceTimeInMin = raceTime / 60;
        console.log("Driver " + driversData[i].name + " race time " + raceTimeInMin);
        if (raceTimeInMin < min) {
            min = raceTimeInMin;
            winner = driversData[i].name;
        }
    }
    return winner;
}
