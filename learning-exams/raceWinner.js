let calculateLapTimeLoss = (performanceScore, tire, lapNumber)=> {
    const tirePerformance = tire.base - tire.wearRate * lapNumber; 
    const performanceFactor = 1 - performanceScore * tirePerformance;
    return 100 * performanceFactor;
}

let getStrategy = (lapNumber, strategies)=>{
    let lapsCount = 0;
    let isNew = false;
    for (let i = 0; i < strategies.length; i++){
        lapsCount = lapsCount + strategies[i].laps;
        if (lapNumber > lapsCount){
            if (lapNumber - lapsCount == 1){
                isNew = true;
            }
        } else {
            return { currentStrategy: strategies[i], isNew };
        }
    }
}

let getLapRecord = (drivers, idealLapTime) => {
    const raceTime = [];
    for (let lapNumber = 1; lapNumber <= 30; lapNumber++){
        for (let i = 0; i < drivers.length; i++) {
            const performanceScore = drivers[i].score * 0.6 + drivers[i].car.score * 0.4;
            let lapTime = 0;
            const currentStrategy = getStrategy(lapNumber, drivers[i].strategy);
            lapTime = idealLapTime + calculateLapTimeLoss(performanceScore, currentStrategy.currentStrategy.tire, lapNumber);
            
            if (raceTime[i] == undefined) raceTime[i] = 0;
            
            if (currentStrategy.isNew){
                raceTime[i] = raceTime[i] + lapTime + 20; 
            } else {
                raceTime[i] = raceTime[i] + lapTime;
            }
            console.log(drivers[i].name + " finished lap " + lapNumber + " on " + raceTime[i]);
        }
    }
}

let getRaceWinner = (drivers, idealLapTime, pitStopDuration) =>{
    let winner = '';
    let fastestRaceTime = Infinity;
    for (let i = 0; i < drivers.length; i++) {
        const performanceScore = drivers[i].score * 0.6 + drivers[i].car.score * 0.4;
        let raceTime = 0;
        for (let j = 0; j < drivers[i].strategy.length; j++) {
            const strategy = drivers[i].strategy[j];
            for (let lapNumber = 1; lapNumber <= strategy.laps; lapNumber++) {
                const lapTime = idealLapTime + calculateLapTimeLoss(performanceScore, strategy.tire, lapNumber);
                raceTime = raceTime + lapTime;
            }
        }
        raceTime = raceTime + (drivers[i].strategy.length - 1) * pitStopDuration;
        if (raceTime < fastestRaceTime) {
            fastestRaceTime = raceTime;
            winner = drivers[i];
        }
    }
    return { winner, time: (fastestRaceTime / 60).toFixed(2) };
}

let describeStrategy = (strategy) => {
    let strategyText = ' ';
    for (let i = 0; i < strategy.length; i++) {
        if (i === strategy.length - 1){
            strategyText = strategyText + strategy[i].tire.type + ' for ' + strategy[i].laps + ' laps ';
        } else {
            strategyText = strategyText + strategy[i].tire.type + ' for ' + strategy[i].laps + ' laps → ';
        }
    }
    return strategyText;
}

const selectedDrivers = [];

let startRaceSimulation = () => {
    const result = document.getElementById('result');
    if (selectedDrivers.length === 0) {
        result.textContent = 'You need to add at least one driver';
    } else {
        const raceResult = getRaceWinner(selectedDrivers, 100, 20);
        getLapRecord(selectedDrivers, 100);
        const strategy = describeStrategy(raceResult.winner.strategy);
        result.textContent = raceResult.winner.name + ' driving ' + raceResult.winner.car.team + ' wins in ' + raceResult.time + ' mins. with strategy of ' + strategy;
    }
}
const validator = (selectedDrivers, currentDriver) => {
  
  let entryIdentifier =  currentDriver.name + ' driving ' +currentDriver.car.team + ' with strategy: ' + describeStrategy(currentDriver.strategy);
  
  let alreadyExists = selectedDrivers.some(d => (d.name + ' driving ' + d.car.team + ' with strategy: ' + describeStrategy(d.strategy)) === entryIdentifier);
    return alreadyExists
}
let addDriver = () => {
    const drivers = [
        { name: 'Max Verstappen', score: 0.98 },
        { name: 'Lewis Hamilton', score: 0.96 },
    ];
    const cars = [
        { team: 'Red Bull', score: 0.92 },
        { team: 'Mercedes', score: 0.95 },
    ];
    const tires = {
        soft: { base: 1.0, wearRate: 0.015, type: 'soft' },
        medium: { base: 0.95, wearRate: 0.01, type: 'medium' },
        hard: { base: 0.9, wearRate: 0.005, type: 'hard' },
    };
    const strategies = [
        [{ tire: tires.soft, laps: 5 }, { tire: tires.medium, laps: 10 }, { tire: tires.hard, laps: 15 }],
        [{ tire: tires.medium, laps: 9 }, { tire: tires.medium, laps: 9 }, { tire: tires.hard, laps: 12 }],
        [{ tire: tires.medium, laps: 12 }, { tire: tires.hard, laps: 18 }],
    ];
    const driverIndex = document.getElementById('driver').value;
    const teamIndex = document.getElementById('team').value;
    const strategyElement = document.getElementById('strategy');
    const driver = drivers[driverIndex];
    const theStrategy = strategies[strategyElement.value];

    const currentDriver = {
        name: driver.name,
        score: driver.score,
        car: cars[teamIndex],
        strategy: theStrategy
    };
    
    if (validator(selectedDrivers,currentDriver)) {
        alert("This combination already exists");
        return; 
    }

    selectedDrivers.push(currentDriver);
    const list = document.getElementById('selectedDrivers');
    const li = document.createElement('li');
    li.textContent = driver.name + ' driving ' + cars[teamIndex].team + ' with strategy: ' + describeStrategy(theStrategy);
    list.appendChild(li);
}