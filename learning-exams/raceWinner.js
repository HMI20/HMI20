// I wanted to add more flexibility and validation, but I had to stay within the line limit
function calculateLapTimeLoss(performanceScore, tire, lapNumber) {
  const tirePerformance = tire.base - tire.wearRate * lapNumber; // tire performance decreases each lap
  const performanceFactor = 1 - performanceScore * tirePerformance;
  return 100 * performanceFactor;
}

function getRaceWinner(drivers, idealLapTime, pitStopDuration) {
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
    raceTime = raceTime + (drivers[i].strategy.length - 1) * pitStopDuration; // add pit stop time
    console.log('Driver ' + drivers[i].name + ' race time ' + (raceTime / 60).toFixed(2) + ' mins');
    if (raceTime < fastestRaceTime) {
      fastestRaceTime = raceTime;
      winner = drivers[i];
    }
  }
  return { winner, time: (fastestRaceTime / 60).toFixed(2) }; // convert to minutes and format to 2 decimals
}

function describeStrategy(strategy) {
  let strategyText = 'The winning strategy was ';
  for (let i = 0; i < strategy.length; i++) {
    strategyText = strategyText + strategy[i].tire.type + ' for ' + strategy[i].laps + ' laps ';
  }
  return strategyText;
}

const selectedDrivers = []; // stores drivers added by user (reset by refresh)

function startRaceSimulation() {
  const result = document.getElementById('result');
  if (selectedDrivers.length === 0) {
    result.textContent = 'You need to add at least one driver';
  } else {
    const raceResult = getRaceWinner(selectedDrivers, 100, 20);
    const strategy = describeStrategy(raceResult.winner.strategy);
    result.textContent = raceResult.winner.name + ' driving ' + raceResult.winner.car.team + ' wins in ' + raceResult.time + ' mins. ' + strategy;
  }
}

function addDriver() {
  // Adds a driver to the race based on user selection
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
    [
      { tire: tires.soft, laps: 5 },
      { tire: tires.medium, laps: 10 },
      { tire: tires.hard, laps: 15 },
    ],
    [
      { tire: tires.medium, laps: 9 },
      { tire: tires.medium, laps: 9 },
      { tire: tires.hard, laps: 12 },
    ],
    [
      { tire: tires.medium, laps: 12 },
      { tire: tires.hard, laps: 18 },
    ],
  ];
  const driverIndex = document.getElementById('driver').value;
  const teamIndex = document.getElementById('team').value;
  const strategyElement = document.getElementById('strategy');
  const driver = drivers[driverIndex]; // get chosen driver
  selectedDrivers.push({
    name: driver.name,
    score: driver.score,
    car: cars[teamIndex],
    strategy: strategies[strategyElement.value],
  });
  const list = document.getElementById('selectedDrivers');
  const li = document.createElement('li');
  li.textContent = driver.name + ' driving ' + cars[teamIndex].team + ' with the strategy of ' + strategyElement.selectedOptions[0].textContent;
  list.appendChild(li); // display selection
} // https://github.com/HMI20/HMI20/blob/main/learning-exams/raceWinner.js
window.addDriver = addDriver; // Expose functions so PlayCode can call them from HTML
window.startRaceSimulation = startRaceSimulation;
