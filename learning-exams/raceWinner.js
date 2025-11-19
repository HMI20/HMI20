function main (){
    const driversData = [
        { name: "Max Verstappen", score: 0.98, strategy: strategies[0], team: car [0] },
        { name: "Luis Hamelton", score: 0.96, strategy: strategies[1],team: car [1] },
        { name: "Lando Noras", score: 0.97,strategy: strategies[2],team: car [2] }  ];
    const car = [
        { team: "Red Bull", score: 0.92 },
        { team: "Mercedes", score: 0.95 },
        { team: "Maclaren", score: 0.97 }   ];

    const tires = {
        soft:   { base: 1.00, wearRate: 0.015 },
        medium: { base: 0.95, wearRate: 0.010 },
        hard:   { base: 0.90, wearRate: 0.005 }   };

    const strategies = [
        [ {tire:"soft",laps: 5}, {tire:"midium",laps: 10}, {tire:"hard",laps:15}  ],
        [ {tire:"midium",laps:9} , {tire:"midium",laps: 9}, {tire:"hard",laps: 12}],
        [ {tire:"midium" ,laps: 12}, {tire:"hard",laps: 18} ]    ];

    const idealLap = 100; //in seconds
    const pitStopTime = 20;
    console.log("the winner is "+ getWinner(driversData,idealLap,pitStopTime,tires))
}

function getWinner(driversData, idealLap, pitStopTime, tires) {
    let winner = " ";
    let min = Infinity;

    for (let i = 0; i < driversData.length; i++) {
        const teamScore = (driversData[i].score * 0.6 + driversData[i].team * 0.4);
        let raceTime = 0;

        for( let j = 0; j< driversData[i].strategy.length; j++){


            for (let lapNumber = 1; lapNumber <= driversData[i].strategy[j].laps; lapNumber++) {
                const tiresBase = tires[driversData[i].strategy[j].tire].base;
                const tiresWear = tires[driversData[i].strategy[j].tire].wearRate;
                const lapTime = idealLap + (100 * (1 - (teamScore * (tiresBase - (tiresWear * lapNumber)))))
                raceTime = raceTime + lapTime;

            }
            
        }
        const pitStops = (driversData[i].strategy.length)-1;
        const raceTimeInSec = raceTime + (pitStops*pitStopTime);
        const raceTimeInMin = raceTimeInSec / 60;
            console.log("Driver " + driversData[i].name + " race time " + raceTimeInMin);
            if (raceTimeInMin < min) {
                min = raceTimeInMin;
                winner = driversData[i].name;
            }
    }
    return winner;
}
