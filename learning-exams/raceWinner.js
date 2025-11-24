function calculateLapTimeLoss(performanceScore, tireBaseGrip, tireWearRate, lapNumber) {
    const tirePerformance = Math.max(0, tireBaseGrip - tireWearRate * lapNumber); // tire performance decreases each lap
    const performanceFactor = 1 - (performanceScore * tirePerformance); // performanceFactor goes from 0 (perfect) → 1 (very slow)
    return 100 * performanceFactor;
}


function getRaceWinner(drivers, idealLapTime, pitStopDuration) {
    let winner = "";
    let fastestRaceTime = Infinity;
    for (let i = 0; i < drivers.length; i++) {
        const performanceScore = (drivers[i].score * 0.6 + drivers[i].team.score * 0.4);
        let raceTime = 0;

        for (let j = 0; j < drivers[i].strategy.length; j++) {
            const strategy = drivers[i].strategy[j];
            for (let lapNumber = 1; lapNumber <= strategy.laps; lapNumber++) {
                const tireBaseGrip = strategy.tire.base;
                const tireWearRate = strategy.tire.wearRate;
                const lapTime = idealLapTime + calculateLapTimeLoss(performanceScore, tireBaseGrip, tireWearRate, lapNumber);
                raceTime = raceTime + lapTime;

            }

        }
        const pitStopCount = (drivers[i].strategy.length) - 1;
        const raceTimeInSec = raceTime + (pitStopCount * pitStopDuration);
        const raceTimeInMin = raceTimeInSec / 60;
        console.log("Driver " + drivers[i].name + " race time " + raceTimeInMin.toFixed(2) + " minutes");
        if (raceTimeInMin < fastestRaceTime) {
            fastestRaceTime = raceTimeInMin;
            winner = drivers[i].name;
        }
    }
    return winner;
}

function startRaceSimulation() {
    const cars = [
        { team: "Red Bull", score: 0.92 },
        { team: "Mercedes", score: 0.95 },
        { team: "McLaren", score: 0.97 }
    ];
    const tires = {
        soft:   { base: 1.00, wearRate: 0.015 },
        medium: { base: 0.95, wearRate: 0.010 },
        hard:   { base: 0.90, wearRate: 0.005 }
    };
    const strategies = [
        [{tire: tires.soft, laps: 5}, {tire: tires.medium, laps: 10}, {tire: tires.hard, laps: 15}],
        [{tire: tires.medium,laps: 9} , {tire: tires.medium, laps: 9}, {tire: tires.hard, laps: 12}],
        [{tire: tires.medium, laps: 12}, {tire: tires.hard, laps: 18}]    
    ];
    const drivers = [ 
        {name: "Max Verstappen", score: 0.98, strategy: strategies[0], team: cars[0]},
        {name: "Lewis Hamilton", score: 0.96, strategy: strategies[1], team: cars[1]},
        {name: "Lando Norris", score: 0.97, strategy: strategies[2], team: cars[2]}
    ];
    const idealLapTime = 100;
    const pitStopSeconds = 20;

    console.log("the winner is "+ getRaceWinner(drivers, idealLapTime, pitStopSeconds))
}

startRaceSimulation();